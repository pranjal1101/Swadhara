const { GoogleGenAI } = require('@google/genai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const getAiApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Gemini API configured:", Boolean(process.env.GEMINI_API_KEY));
  const isConfigured = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'your_key_here' && apiKey !== 'your_api_key');
  if (!isConfigured) {
    return null;
  }
  return apiKey.trim();
};

const generateGeminiText = async (systemInstruction, userPrompt) => {
  const apiKey = getAiApiKey();
  if (!apiKey) {
    throw new Error('AI service unavailable');
  }

  const modelsToTry = [
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
    'gemini-pro-latest'
  ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log("Calling Gemini with model:", modelName);
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7
        }
      });

      console.log("Gemini response received:", Boolean(response));

      if (response && response.text && typeof response.text === 'string' && response.text.trim() !== '') {
        return response.text.trim();
      }
    } catch (error) {
      console.error(`Gemini API ERROR (model ${modelName}):`);
      console.error("Message:", error.message);
      console.error("Status:", error.status);
      console.error("Code:", error.code);
      lastError = error;
    }
  }

  try {
    console.log("Calling Gemini (fallback GoogleGenerativeAI)...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction
    });
    const result = await model.generateContent(userPrompt);
    const text = result && result.response ? result.response.text() : null;

    console.log("Gemini response received:", Boolean(text));

    if (text && typeof text === 'string' && text.trim() !== '') {
      return text.trim();
    }
  } catch (error) {
    console.error("Gemini API ERROR (GoogleGenerativeAI):");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Code:", error.code);
    lastError = error;
  }

  throw new Error('AI service unavailable');
};

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

  return [];
};

const askCourseTutor = async ({ course, lesson, question, language = 'en' }) => {
  const courseTitle = typeof course.title === 'object' ? (course.title.en || course.title.hi || '') : course.title;
  const courseCategory = course.category?.name?.en || course.category?.slug || 'Skill';
  const courseDescription = typeof course.description === 'object' ? (course.description.en || course.description.hi || '') : course.description;
  const lessonTitle = lesson ? (typeof lesson.title === 'object' ? (lesson.title.en || lesson.title.hi || '') : lesson.title) : 'Course Overview';
  const lessonDescription = lesson ? (typeof lesson.description === 'object' ? (lesson.description.en || lesson.description.hi || '') : lesson.description) : '';

  const systemInstruction = `You are the Swadhara AI Tutor.

Swadhara is an educational and earning platform helping women learn practical skills (tailoring, sewing, embroidery, baking, jewellery making, handicrafts, product creation, selling, pricing).

HIGHEST-PRIORITY BEHAVIORAL RULE:
Answer the user's exact question before giving any general advice.
The user's latest message is your primary task.
Do not answer the general topic instead of answering the specific question.

Context & Flexibility Rules:
- The user may ask about baking, tailoring, embroidery, jewellery, selling, pricing, or any practical skill topic regardless of the current course page.
- Always answer the user's CURRENT QUESTION accurately. Use course/lesson context for reference when relevant, but NEVER let course context override or restrict an unrelated user question.
- If the user asks for a solution, recommendation, explanation, or comparison, answer directly first.

NEVER replace a specific question with generic educational guidance or template structures.`;

  const userPrompt = `
COURSE CONTEXT (For reference if relevant to the question):
Course: ${courseTitle}
Category: ${courseCategory}
Difficulty: ${course.difficulty || 'Easy'}
Course description: ${courseDescription}
Current lesson: ${lessonTitle}
Lesson description: ${lessonDescription}

USER'S CURRENT QUESTION:
${question}
`;

  try {
    const generatedAnswer = await generateGeminiText(systemInstruction, userPrompt);
    if (generatedAnswer) {
      return generatedAnswer;
    }
    throw new Error('AI service unavailable');
  } catch (err) {
    console.error('Gemini Tutor Error:', err.message);
    throw new Error('AI service unavailable');
  }
};

module.exports = {
  recommendCourses,
  askCourseTutor
};
