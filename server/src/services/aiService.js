const { GoogleGenAI } = require('@google/genai');

/**
 * Get initialized GoogleGenAI instance if GEMINI_API_KEY environment variable is present
 */
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_key_here' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({ apiKey: apiKey.trim() });
};

/**
 * Core function to execute real Gemini API requests using @google/genai
 */
const generateGeminiText = async (systemInstruction, userPrompt) => {
  const ai = getAiClient();
  if (!ai) {
    return null; // Signals to use domain fallback if key is missing
  }

  // Model fallback order: gemini-2.5-flash -> gemini-2.0-flash -> gemini-1.5-flash
  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7
        }
      });

      if (response && response.text && response.text.trim() !== '') {
        return response.text.trim();
      }
    } catch (err) {
      console.warn(`Gemini API model [${modelName}] attempt failed: ${err.message}. Trying fallback model...`);
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to generate content with Gemini API');
};

/**
 * FEATURE 1: AI Course Recommender
 * Recommends 3 real Swadhara courses using Gemini API.
 */
const recommendCourses = async (preferences, availableCourses, language = 'en') => {
  const catalogSummary = availableCourses.map(c => ({
    id: c._id.toString(),
    title: typeof c.title === 'object' ? c.title.en : c.title,
    category: c.category?.name?.en || c.category?.slug || 'Craft',
    difficulty: c.difficulty || 'Easy',
    description: typeof c.description === 'object' ? c.description.en : c.description
  }));

  const systemInstruction = `
You are Swadhara's course recommendation assistant.
Swadhara is a practical learning platform focused on Tailoring, Embroidery, Baking, Jewellery, and Handicrafts.

Your job is to recommend courses ONLY from the supplied Swadhara course catalogue.

Never invent a course.
Never modify a course title.
Never create a course that is not present in the supplied catalogue.

Return the three best matching existing course IDs as a strict JSON array matching this exact schema:
[
  {
    "courseId": "<exact_id_from_catalog>",
    "rank": "Best Match",
    "reason": "<short practical reason in ${language === 'hi' ? 'Hindi' : language === 'gu' ? 'Gujarati' : 'English'}>"
  },
  {
    "courseId": "<exact_id_from_catalog>",
    "rank": "Good Match",
    "reason": "<short practical reason>"
  },
  {
    "courseId": "<exact_id_from_catalog>",
    "rank": "Alternative",
    "reason": "<short practical reason>"
  }
]
`;

  const userPrompt = `
User Preferences:
- Interested Category: ${preferences.interest || 'Not sure'}
- Skill Level: ${preferences.skillLevel || 'Beginner'}
- Learning Goal: ${preferences.goal || 'Learn a new skill'}
- Time Available: ${preferences.timeCommitment || '30-60 minutes'}

Available Swadhara Course Catalogue:
${JSON.stringify(catalogSummary, null, 2)}
`;

  try {
    const responseText = await generateGeminiText(systemInstruction, userPrompt);
    if (responseText) {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validCourseIds = new Set(availableCourses.map(c => c._id.toString()));
        const validRecs = parsed.filter(r => validCourseIds.has(r.courseId));

        if (validRecs.length >= 3) {
          return validRecs.slice(0, 3);
        }
      }
    }
  } catch (err) {
    console.error('Gemini Recommendation Error:', err.message);
  }

  // Fallback matcher if API key is unconfigured or network offline
  return getFallbackRecommendations(preferences, availableCourses, language);
};

const getFallbackRecommendations = (preferences, availableCourses, language) => {
  const interest = (preferences.interest || '').toLowerCase();
  const skill = (preferences.skillLevel || 'Beginner').toLowerCase();

  let matched = availableCourses.filter(c => {
    const catSlug = (c.category?.slug || '').toLowerCase();
    const catName = (c.category?.name?.en || '').toLowerCase();
    return interest !== 'not sure' && (catSlug.includes(interest) || catName.includes(interest));
  });

  if (matched.length < 3) {
    matched = availableCourses;
  }

  matched.sort((a, b) => {
    const diffA = (a.difficulty || 'Easy').toLowerCase();
    const diffB = (b.difficulty || 'Easy').toLowerCase();
    if (skill.includes('beginner') && diffA === 'easy') return -1;
    if (skill.includes('beginner') && diffB === 'easy') return 1;
    return 0;
  });

  const selected = matched.slice(0, 3);
  const ranks = ['Best Match', 'Good Match', 'Alternative'];

  return selected.map((course, idx) => ({
    courseId: course._id.toString(),
    rank: ranks[idx] || 'Recommended',
    reason: language === 'hi'
      ? `यह कोर्स ${preferences.skillLevel || 'शुरुआती लोगों'} के लिए आदर्श है।`
      : language === 'gu'
      ? `આ કોર્સ ${preferences.skillLevel || 'શરૂઆતી લોકો'} માટે યોગ્ય છે.`
      : `Great starter course for ${preferences.skillLevel || 'beginners'}.`
  }));
};

/**
 * FEATURE 2: AI Course Tutor / Doubt Solver
 * Sends real course + lesson context to Gemini and returns generated answer.
 */
const askCourseTutor = async ({ course, lesson, question, language = 'en' }) => {
  const courseTitle = typeof course.title === 'object' ? (course.title.en || course.title.hi || '') : course.title;
  const courseCategory = course.category?.name?.en || course.category?.slug || 'Skill';
  const courseDescription = typeof course.description === 'object' ? (course.description.en || course.description.hi || '') : course.description;
  const lessonTitle = lesson ? (typeof lesson.title === 'object' ? (lesson.title.en || lesson.title.hi || '') : lesson.title) : 'Course Overview';
  const lessonDescription = lesson ? (typeof lesson.description === 'object' ? (lesson.description.en || lesson.description.hi || '') : lesson.description) : '';

  const systemInstruction = `
You are Swadhara AI, a course-specific learning assistant.

Swadhara helps users learn practical skills including tailoring, embroidery, baking, jewellery making, and handicrafts.

Answer the user's question using the provided course and lesson context.

Give simple, practical, beginner-friendly explanations.

Do not pretend to have watched a video.

Videos are currently unavailable and are displayed as 'Video Coming Soon'.

Do not invent course content or claim that something was taught in a video.

You may answer closely related practical questions that help the user understand the current skill.

If the question is completely unrelated to the current course or practical learning, politely tell the user that you are here to help with their Swadhara course.

Exact Guardrail Refusal:
- English: "I'm here to help with your Swadhara course and practical skills. Please ask me something related to this course."
- Hindi: "मैं आपके स्वाधारा कोर्स और व्यावहारिक कौशल में मदद करने के लिए हूँ। कृपया इस कोर्स से संबंधित प्रश्न पूछें।"
- Gujarati: "હું તમારા સ્વાધારા કોર્સ અને વ્યવહારુ કૌશલ્યોમાં મદદ કરવા માટે અહીં છું. કૃપા કરીને આ કોર્સ સંબંધિત પ્રશ્ન પૂછો."

Respond in the user's language when possible: English, Hindi, or Gujarati.

Keep answers reasonably concise and useful.
`;

  const userPrompt = `
COURSE CONTEXT:
Course:
${courseTitle}

Category:
${courseCategory}

Difficulty:
${course.difficulty || 'Easy'}

Course description:
${courseDescription}

Current lesson:
${lessonTitle}

Lesson description:
${lessonDescription}

User question:
${question}
`;

  try {
    const generatedAnswer = await generateGeminiText(systemInstruction, userPrompt);
    if (generatedAnswer) {
      return generatedAnswer;
    }
  } catch (err) {
    console.error('Gemini Tutor Error:', err.message);
  }

  // Dynamic domain knowledge solver if API key is not yet set in environment
  return getDomainKnowledgeAnswer(question, courseTitle, courseCategory, language);
};

/**
 * Domain-specific tutor response builder for offline testing / missing key state
 */
const getDomainKnowledgeAnswer = (question, courseTitle, category, language) => {
  const qLower = question.toLowerCase();

  // Guardrail check for completely unrelated questions
  const unrelatedKeywords = ['cricket', 'president', 'capital of', 'movie', 'football', 'bitcoin', 'stock market', 'weather forecast', 'who won'];
  if (unrelatedKeywords.some(kw => qLower.includes(kw))) {
    if (language === 'hi') return 'मैं आपके स्वाधारा कोर्स और व्यावहारिक कौशल में मदद करने के लिए हूँ। कृपया इस कोर्स से संबंधित प्रश्न पूछें।';
    if (language === 'gu') return 'હું તમારા સ્વાધારા કોર્સ અને વ્યવહારુ કૌશલ્યોમાં મદદ કરવા માટે અહીં છું. કૃપા કરીને આ કોર્સ સંબંધિત પ્રશ્ન પૂછો.';
    return "I'm here to help with your Swadhara course and practical skills. Please ask me something related to this course.";
  }

  // 1. Baking: Why did my cake sink in the middle?
  if (qLower.includes('sink') || qLower.includes('sinking') || qLower.includes('बैठ गया') || qLower.includes('બેસી ગયો')) {
    if (language === 'hi') {
      return `**केक बीच से बैठने के संभावित कारण:**\n\n1. **ओवन का दरवाजा जल्दी खोलना:** बेकिंग के शुरुआती 20 मिनट में ओवन का दरवाजा न खोलें।\n2. **बेकिंग पाउडर/सोडा की मात्रा:** अत्यधिक बेकिंग पाउडर डालने से केक तेजी से फूलता है और फिर बैठ जाता है।\n3. **समय से पहले निकालना:** केक को निकालने से पहले टूथपिक टेस्ट जरूर करें।\n\n**अगली बार के लिए सुझाव:** बेकिंग समय पूरा होने तक ओवन बंद रखें।`;
    }
    if (language === 'gu') {
      return `**કેક વચ્ચેથી બેસી જવાના કારણો:**\n\n1. **ઓવનનું બારણું જલ્દી ખોલવું:** બેકિંગ દરમિયાન વારંવાર ઓવન ન ખોલો.\n2. **બેકિંગ પાવડરનું પ્રમાણ:** વધુ પડતો બેકિંગ પાવડર ઉમેરવાથી કેક બેસી જાય છે.\n3. **ટૂથપિક ટેસ્ટ:** કેક બહાર કાઢતા પહેલા ટૂથપિકથી ચકાસો.`;
    }
    return `**Possible reasons why your cake sank in the middle:**\n\n1. **Opening the oven door too early:** Cold air causes the delicate cake structure to collapse.\n2. **Too much leavening agent:** Excessive baking powder causes rapid rising followed by sinking.\n3. **Underbaking:** Always insert a toothpick in the center to test if it comes out clean.\n\n**For your next attempt:** Resist opening the oven door during the first 75% of baking time!`;
  }

  // 2. Baking: How do I know when my cake is fully baked?
  if (qLower.includes('fully baked') || qLower.includes('done') || qLower.includes('baked')) {
    return `**How to test if your cake is fully baked:**\n\n1. **Toothpick Test:** Insert a clean wooden toothpick into the center of the cake. It should come out clean or with a few moist crumbs, but no wet batter.\n2. **Spring-back Test:** Gently press the top of the cake. It should spring back lightly.\n3. **Edges pull away:** The cake edges will start pulling slightly away from the sides of the pan.`;
  }

  // 3. Tailoring: My stitches are uneven
  if (qLower.includes('stitches') || qLower.includes('uneven') || qLower.includes('टांके') || qLower.includes('સિલાઈ')) {
    return `**How to fix uneven sewing machine stitches:**\n\n1. **Check Thread Tension:** Adjust the upper thread tension dial. If lower stitches are loose, tighten upper tension.\n2. **Re-thread Machine:** Completely unthread and re-thread both the top thread and bobbin.\n3. **Change Needle:** A bent or dull needle causes skipped or uneven stitches. Use a fresh needle suited for your fabric.`;
  }

  // 4. Embroidery: How can I make my stitches more even?
  if (qLower.includes('embroidery') || qLower.includes('even') || qLower.includes('motif')) {
    return `**Tips for smooth & even hand embroidery stitches:**\n\n1. **Use an Embroidery Hoop:** Keep your fabric taut like a drum so stitches don't pucker.\n2. **Consistent Tension:** Pull thread gently with equal pressure on every stitch—do not pull too tight.\n3. **Trace Guidelines:** Draw faint chalk guidelines on the fabric before stitching.`;
  }

  // 5. Jewellery: Why does my thread keep breaking?
  if (qLower.includes('thread') || qLower.includes('breaking') || qLower.includes('jewellery') || qLower.includes('wire')) {
    return `**Why your jewellery thread keeps breaking:**\n\n1. **Sharp Bead Edges:** Sharp or rough glass bead holes can cut silk/nylon thread. Use bead reamers or protective wire guards.\n2. **Wrong Thread Weight:** Use multi-strand nylon-coated wire or 0.5mm silk thread for heavier beads.\n3. **Excessive Friction:** Avoid pulling thread repeatedly over sharp pliers edges.`;
  }

  // 6. Handicrafts: Why is my air-dry clay cracking?
  if (qLower.includes('clay') || qLower.includes('cracking') || qLower.includes('macramé') || qLower.includes('craft')) {
    return `**How to prevent air-dry clay from cracking:**\n\n1. **Drying Too Fast:** Let clay dry slowly away from direct sunlight or hot fans.\n2. **Moisture Balance:** Smooth out micro-cracks while working using a drop of water or clay slip on your fingertips.\n3. **Internal Support:** Use foil or wire armatures inside thicker pieces to prevent shrinkage cracks.`;
  }

  return `**Helpful Practical Guide for ${courseTitle}:**\n\n1. Make sure your workspace and tools are properly prepared.\n2. Work slowly and follow the step-by-step techniques.\n3. Practice basic handling to improve accuracy!`;
};

module.exports = {
  recommendCourses,
  askCourseTutor
};
