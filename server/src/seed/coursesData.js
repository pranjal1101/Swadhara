const coursesData = [

  {
    categorySlug: 'tailoring',
    title: {
      en: 'Tailoring Basics — Tools, Machine & First Stitches',
      hi: 'सिलाई की मूल बातें — उपकरण, मशीन और बुनियादी टांके',
      gu: 'ટેલરિંગ મૂળભૂત બાબતો — સાધનો, મશીન અને પાયાના ટાંકા'
    },
    description: {
      en: 'Learn essential tailoring tools, needle threading, and fundamental hand and sewing machine stitches for beginners.',
      hi: 'शुरुआती लोगों के लिए सिलाई के आवश्यक उपकरण, सुई में धागा डालना, हाथ और सिलाई मशीन के मुख्य टांके सीखें।',
      gu: 'શરૂઆતી લોકો માટે સિલાઈના જરૂરી સાધનો, સોયમાં દોરો નાખવો અને મશીનના ટાંકા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Tools & Equipment', hi: 'सिलाई के उपकरण और औजार', gu: 'સિલાઈના સાધનો અને ઓજારો' },
        description: { en: 'Essential tailoring tools like measuring tape, fabric shears, chalk, and pins.', hi: 'इंच टेप, कैंची, चौक और पिन जैसे आवश्यक सिलाई उपकरणों की जानकारी।', gu: 'ટેપ, કાતર અને ચોક જેવા જરૂરી સાધનોની માહિતી.' },
        videoUrl: 'https://www.youtube.com/watch?v=-8MdMa-lZ5c',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Needles & Threads', hi: 'सुई और धागे की जानकारी', gu: 'સોય અને દોરાની માહિતી' },
        description: { en: 'Selecting needle sizes and matching threads for different fabrics.', hi: 'विभिन्न कपड़ों के लिए सही सुई का आकार और मैचिंग धागा चुनना।', gu: 'જુદા જુદા કાપડ માટે સાચી સોય અને દોરો પસંદ કરવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=COMbHpU24Qs',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Basic Hand Stitches', hi: 'हाथ की बुनियादी सिलाई', gu: 'હાથની પાયાની સિલાઈ' },
        description: { en: 'Mastering running stitch, backstitch, and hemming without a sewing machine.', hi: 'बिना मशीन के रनिंग स्टिच, बैकस्टिच और तुरपाई का अभ्यास।', gu: 'મશીન વગર રનિંગ સ્ટીચ, બેકસ્ટીચ અને તુરપાઈની પ્રેક્ટિસ.' },
        videoUrl: 'https://www.youtube.com/watch?v=go89e8xpVYs',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Basic Machine Stitches', hi: 'सिलाई मशीन के मुख्य टांके', gu: 'સિલાઈ મશીનના મુખ્ય ટાંકા' },
        description: { en: 'Operating sewing machine, bobbin winding, and stitching straight lines.', hi: 'सिलाई मशीन चलाना, बॉबिन भरना और सीधी सिलाई लगाना।', gu: 'સિલાઈ મશીન ચલાવવું, બોબીન ભરવું અને સીધી સિલાઈ કરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=2a7Yp0G3Kk0',
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'tailoring',
    title: {
      en: 'Measurements & Fabric Cutting',
      hi: 'शारीरिक माप और कपड़े की कटिंग',
      gu: 'શરીરના માપ અને કાપડનું કટિંગ'
    },
    description: {
      en: 'Master taking body measurements correctly, using measurement charts, and laying out fabric for clean cutting.',
      hi: 'कपड़ों के लिए शरीर का सही नाप लेना, नाप की तालिका समझना और कपड़े पर कटिंग का तरीका सीखें।',
      gu: 'કપડાં માટે શરીરનું સાચું માપ લેવું, માપ કોષ્ટક સમજવું અને કટિંગ કરવાની રીત શીખો.'
    },
    difficulty: 'Easy',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1524295981997-ec4f4e30424d?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Body Measurements', hi: 'शारीरिक माप लेने का परिचय', gu: 'શરીરના માપ લેવાનો પરિચય' },
        description: { en: 'Understanding shoulder, chest, waist, and hip body points.', hi: 'कंधे, सीने, कमर और हिप्स के मुख्य बिंदुओं को समझना।', gu: 'ખભા, છાતી, કમર અને હીપ્સના માપ સમજવા.' },
        videoUrl: 'https://www.youtube.com/watch?v=DJswZ7fERJ4',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'How to Take Measurements', hi: 'नाप लेने की सही विधि', gu: 'માપ લેવાની સાચી રીત' },
        description: { en: 'Step-by-step guide to taking accurate dress measurements with measuring tape.', hi: 'इंच टेप से कपड़े के लिए सटीक नाप लेने की व्यावहारिक विधि।', gu: 'ટેપથી કપડાં માટે સાચું માપ લેવાની રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=URhaw_jSkPM',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 3,
        title: { en: 'Measurement Charts', hi: 'सिलाई नाप तालिका (Charts)', gu: 'સિલાઈ માપ કોષ્ટક (Charts)' },
        description: { en: 'Using standard measurement charts and calculating margins.', hi: 'मानक नाप चार्ट का उपयोग और सिलाई मार्जिन जोड़ना।', gu: 'માપ ચાર્ટનો ઉપયોગ અને સિલાઈ માર્જિન ઉમેરવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=vQttL6SUENI',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Fabric Layout & Cutting', hi: 'कपड़ा मोड़ना और कटिंग करना', gu: 'કાપડ વાળવું અને કટિંગ કરવું' },
        description: { en: 'Laying out fabric folds and marking with chalk for straight cuts.', hi: 'कपड़े को सही तरीके से मोड़ना और चौक से निशान लगाकर काटना।', gu: 'કાપડને યોગ્ય રીતે વાળવું અને ચોકથી નિશાન કરી કાપવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=LBjXBIImo-g',
        language: 'Hindi',
        duration: '13 mins'
      }
    ]
  },
  {
    categorySlug: 'tailoring',
    title: {
      en: 'Simple Kurti & Kurta Making',
      hi: 'साधारण कुर्ती और कुर्ता सिलाई',
      gu: 'સાદી કુર્તી અને કુર્તા સિલાઈ'
    },
    description: {
      en: 'Learn how to take a basic kurti pattern from cutting to stitching, sleeve joining, and side slit finishing.',
      hi: 'साधारण कुर्ती की ड्राफ्टिंग, कटिंग, बाजू जोड़ना और साइड चाक सिलने का आसान तरीका सीखें।',
      gu: 'સાદી કુર્તીનું ડ્રાફ્ટિંગ, કટિંગ, બાય જોડવી અને સાઈડ કટ સીવવાની સરળ રીત શીખો.'
    },
    difficulty: 'Medium',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Kurti/Kameez Cutting', hi: 'कुर्ती/कमीज की कटिंग', gu: 'કુર્તી/કમીઝનું કટિંગ' },
        description: { en: 'Drafting shoulder, chest, and hip curves for a straight kurti.', hi: 'सीधी कुर्ती के कंधे, सीने और हिप्स की कटिंग करना।', gu: 'કુર્તીના ખભા, છાતી અને હીપ્સનું કટિંગ કરવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=uoZGQVyFB_c',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 2,
        title: { en: 'Simple Suit/Kurti Cutting', hi: 'साधारण सूट/कुर्ती कटिंग', gu: 'સાદા સૂટ/કુર્તી કટિંગ' },
        description: { en: 'Complete cutting technique for daily wear ladies suits and kurtis.', hi: 'रोजमर्रा के महिलाओं के सूट और कुर्ती की पूरी कटिंग विधि।', gu: 'રોજિંદા સૂટ અને કુર્તીની પૂરી કટિંગ રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=sdnk8Kp6gf4',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 3,
        title: { en: 'Sleeves', hi: 'आस्तीन/बाजू की कटिंग और सिलाई', gu: 'બાયની કટિંગ અને સિલાઈ' },
        description: { en: 'Drafting sleeve curves and stitching them onto armholes cleanly.', hi: 'बाजू की शेप काटना और मुड्डे में जोड़कर सिलाई करना।', gu: 'બાયનો શેપ કાપવો અને બગલમાં જોડી સિલાઈ કરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=kO81H6a1R30',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 4,
        title: { en: 'Hemming & Finishing', hi: 'साइड कट और नीचे का घेरा सिलना', gu: 'સાઈડ કટ અને નીચેનો ઘેર સીવવો' },
        description: { en: 'Folding neat side slits (chaak) and hemming the bottom Kurti edge.', hi: 'साइड चाक को मोड़कर सिलना और कुर्ती के नीचे का घेरा बनाना।', gu: 'સાઈડ કટ વાળીને સીવવો અને નીચેનો ઘેર સીવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=LTPSPjGqMcs',
        language: 'Hindi',
        duration: '15 mins'
      }
    ]
  },
  {
    categorySlug: 'tailoring',
    title: {
      en: 'Salwar & Churidar Making',
      hi: 'सलवार और चूड़ीदार सिलाई',
      gu: 'સલવાર અને ચૂડીદાર સિલાઈ'
    },
    description: {
      en: 'Draft, cut, and stitch traditional Punjabi Salwar, waist pleats, bottom mohri, and churidar pants.',
      hi: 'पारंपरिक पंजाबी सलवार, कमर बेल्ट की चुन्नटें, मोहरी और चूड़ीदार पजामी सिलना सीखें।',
      gu: 'પરંપરાગત પંજાબી સલવાર, કમર બેલ્ટ પ્લેટ્સ અને ચૂડીદાર પજામી સીવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Punjabi Salwar Cutting & Stitching', hi: 'पंजाबी सलवार कटिंग और सिलाई', gu: 'પંજાબી સલવાર કટિંગ અને સિલાઈ' },
        description: { en: 'Cutting heavy gathers panels and stitching a flared Punjabi salwar.', hi: 'ज्यादा घेरे वाली पंजाबी सलवार की कटिंग और सिलाई करना।', gu: 'વધુ ઘેર વાળી પંજાબી સલવારનું કટિંગ અને સિલાઈ.' },
        videoUrl: 'https://www.youtube.com/watch?v=gG6gqy8lw6E',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 2,
        title: { en: 'Simple Salwar & Suit Cutting', hi: 'साधारण सलवार कटिंग विधि', gu: 'સાદી સલવાર કટિંગ રીત' },
        description: { en: 'Simple salwar leg panel layout, waist belt, and crotch curve cutting.', hi: 'साधारण सलवार के पल्ले, बेल्ट और मियानी काटने का तरीका।', gu: 'સાદી સલવારના ભાગો અને બેલ્ટ કાપવાની રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=Al7_nvhAhy0',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 3,
        title: { en: 'Salwar/Kurti Complete Cutting', hi: 'सलवार-कुर्ती की पूरी कटिंग', gu: 'સલવાર-કુર્તીનું પૂરું કટિંગ' },
        description: { en: 'Complete masterclass on cutting salwar suit sets cleanly.', hi: 'सलवार सूट सेट को सफाई से काटने का मास्टर क्लास।', gu: 'સલવાર સૂટ સેટ સફાઈથી કાપવાનો માસ્ટર ક્લાસ.' },
        videoUrl: 'https://www.youtube.com/watch?v=sdnk8Kp6gf4',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 4,
        title: { en: 'Churidar', hi: 'चूड़ीदार पजामी की सिलाई', gu: 'ચૂડીદાર પજામીની સિલાઈ' },
        description: { en: 'Churidar legs drafting and bias cut folds for lower ankle gathers.', hi: 'चूड़ीदार पजामी की कटिंग और नीचे चूड़ियों की सिलाई की विधि।', gu: 'ચૂડીદાર પજામીનું કટિંગ અને ચૂડીઓની સિલાઈ.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '15 mins'
      }
    ]
  },
  {
    categorySlug: 'tailoring',
    title: {
      en: 'Blouse Making',
      hi: 'साड़ी ब्लाउज की कटिंग और सिलाई',
      gu: 'સાડી બ્લાઉઝનું કટિંગ અને સિલાઈ'
    },
    description: {
      en: 'Learn basic Indian saree blouse measurement, paper pattern drafting, dart placement, and neckline finishing.',
      hi: 'साड़ी ब्लाउज का नाप लेना, पेपर पैटर्न तैयार करना, डाट बनाना और गले की पाइपिंग सीखें।',
      gu: 'સાડી બ્લાઉઝનું માપ લેવું, પેટર્ન તૈયાર કરવી અને ગળાની પાઈપિંગ શીખો.'
    },
    difficulty: 'Medium',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Blouse Cutting & Stitching', hi: 'ब्लाउज कटिंग और सिलाई', gu: 'બ્લાઉઝ કટિંગ અને સિલાઈ' },
        description: { en: 'Basic saree blouse drafting, panel cutting, and shoulder joining.', hi: 'साधारण ब्लाउज की कटिंग, पल्ले काटना और कंधे जोड़ना।', gu: 'સાદા બ્લાઉઝનું કટિંગ અને ખભા જોડવા.' },
        videoUrl: 'https://www.youtube.com/watch?v=DAe4WlcHxeI',
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 2,
        title: { en: 'Blouse Measurement', hi: 'ब्लाउज का सही नाप लेना', gu: 'બ્લાઉઝનું સાચું માપ લેવું' },
        description: { en: 'Taking blouse length, chest, waist, and front/back neck depth measurements.', hi: 'ब्लाउज की लंबाई, सीना, कमर और गले की गहराई नापना।', gu: 'બ્લાઉઝની લંબાઈ, છાતી, કમર અને ગળાનું માપ લેવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 3,
        title: { en: 'Blouse Pattern Drafting', hi: 'ब्लाउज डाट और पट्टी ड्राफ्टिंग', gu: 'બ્લાઉઝ ટક્સ અને પટ્ટી ડ્રાફ્ટિંગ' },
        description: { en: 'Drafting 4-dart blouse dots, cross पट्टी, and armhole curves.', hi: 'ब्लाउज में 4 टक्स/डाट का निशान लगाना और पट्टी काटना।', gu: 'બ્લાઉઝમાં 4 ટક્સનું નિશાન લગાવવું અને પટ્ટી કાપવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '15 mins'
      },
      {
        order: 4,
        title: { en: 'Blouse Neck/Piping Finishing', hi: 'गले की पट्टी और पाइपिंग फिनिशिंग', gu: 'ગળાની પટ્ટી અને પાઈપિંગ ફિનિશિંગ' },
        description: { en: 'Attaching bias strip piping, hook-eye placket, and neck finishing.', hi: 'गले में पाइपिंग लगाना, हुक-आई की पट्टी सिलना और फिनिशिंग।', gu: 'ગળામાં પાઈપિંગ લગાવવી, હૂક-આઈ પટ્ટી સીવવી અને ફિનિશિંગ.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '15 mins'
      }
    ]
  },
  {
    categorySlug: 'tailoring',
    title: {
      en: 'Advanced Women’s Garment Making',
      hi: 'उन्नत महिला परिधान निर्माण (Advanced Tailoring)',
      gu: 'અદ્યતન મહિલા વસ્ત્ર નિર્માણ (Advanced Tailoring)'
    },
    description: {
      en: 'Advanced tailoring course covering darts, pleats, gathers, Mandarin collars, pockets, plackets, and designer sleeves.',
      hi: 'डाट, प्लेट्स, चुन्नटें, कॉलर, जेब और डिजाइनर बाजू वाली एडवांस कुर्ती सिलाई सीखें।',
      gu: 'ટક્સ, પ્લેટ્સ, કોલર, ખિસ્સા અને ડિઝાઇનર બાય વાળી એડવાન્સ સિલાઈ શીખો.'
    },
    difficulty: 'Hard',
    duration: '1.5 hours',
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Darts, Pleats & Tucks', hi: 'डाट, प्लेट्स और टक्स बनाना', gu: 'ટક્સ, પ્લેટ્સ અને સરમોળ બનાવવી' },
        description: { en: 'Creating shaping darts, box pleats, and pin tucks on garments.', hi: 'कपड़ों में फिटिंग डाट, बॉक्स प्लेट्स और पिन टक्स बनाना।', gu: 'કપડાંમાં ફિટિંગ ટક્સ, પ્લેટ્સ અને પિન ટક્સ બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=c4o9_MxjGxY',
        language: 'Hindi',
        duration: '18 mins'
      },
      {
        order: 2,
        title: { en: 'Gathers & Frills', hi: 'गैदर्स और झालर (Frills) सिलना', gu: 'ગ્રેધર્સ અને ઝાલર (Frills) સીવવી' },
        description: { en: 'Stitching gathers, ruffle frills, and elastic casings for dresses.', hi: 'कपड़ों में सुंदर झालर, फ्रिल और इलास्टिक चुन्नटें बनाना।', gu: 'કપડાંમાં સુંદર ઝાલર, ફ્રિલ અને ઇલાસ્ટિક ચૂંટ બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=0VwYHenyvhs',
        language: 'Hindi',
        duration: '18 mins'
      },
      {
        order: 3,
        title: { en: 'Chinese/Mandarin Collar', hi: 'चाइनीज/मैंडरिन कॉलर बनाना', gu: 'ચાઇનીઝ/મેન્ડરિન કોલર બનાવવો' },
        description: { en: 'Drafting Mandarin collar pattern on buckram and stitching onto neck.', hi: 'बुकरम पर मैंडरिन कॉलर काटना और गले से जोड़कर सिलना।', gu: 'કેનવાસ પર કોલર કાપવો અને ગળા સાથે જોડી સીવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=VMxM9IWJtOE',
        language: 'Hindi',
        duration: '20 mins'
      },
      {
        order: 4,
        title: { en: 'Pockets & Plackets', hi: 'पॉकेट और बटन पट्टी बनाना', gu: 'પોકેટ અને બટન પટ્ટી બનાવવી' },
        description: { en: 'Stitching concealed side seam pockets and front button plackets.', hi: 'कुर्ती में छुपी हुई साइड पॉकेट और आगे बटन पट्टी सिलना।', gu: 'કુર્તીમાં અદ્રશ્ય સાઇડ પોકેટ અને બટન પટ્ટી સીવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=dHqm4ADTb1E',
        language: 'Hindi',
        duration: '18 mins'
      },
      {
        order: 5,
        title: { en: 'Advanced Sleeve Designs', hi: 'डिजाइनर बाजू (Sleeves) की सिलाई', gu: 'ડિઝાઇનર બાય (Sleeves) ની સિલાઈ' },
        description: { en: 'Crafting puff sleeves, cuff sleeves, and umbrella bell sleeves.', hi: 'पफ बाजू, कफ बाजू और अम्ब्रेला बेल बाजू की कटिंग और सिलाई।', gu: 'પફ બાય, કફ બાય અને અમ્બ્રેલા બાયનું કટિંગ અને સિલાઈ.' },
        videoUrl: 'https://www.youtube.com/watch?v=SDqWwr3Cv0k',
        language: 'Hindi',
        duration: '18 mins'
      }
    ]
  },

  {
    categorySlug: 'embroidery',
    title: {
      en: 'Hand Embroidery Basics',
      hi: 'हाथ की कढ़ाई की शुरुआत',
      gu: 'હાથ ભરતકામની શરૂઆત'
    },
    description: {
      en: 'Learn basic hand embroidery stitches, thread tensioning, and permanent decorative stitch patterns.',
      hi: 'हाथ की कढ़ाई के आसान टांके, धागे का उपयोग और सजावटी पैटर्न बनाना सीखें।',
      gu: 'હાથ ભરતકામના સરળ ટાંકા, દોરાનો ઉપયોગ અને સજાવટી પેટર્ન બનાવતા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Basic Hand Stitches', hi: 'कढ़ाई के बुनियादी टांके', gu: 'ભરતકામના પાયાના ટાંકા' },
        description: { en: 'Introduction to basic embroidery needles, thread, and initial stitches.', hi: 'सुई, धागा और कढ़ाई के शुरुआती टांकों का परिचय।', gu: 'સોય, દોરો અને ભરતકામના શરૂઆતી ટાંકાનો પરિચય.' },
        videoUrl: 'https://www.youtube.com/watch?v=go89e8xpVYs',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Permanent Stitches', hi: 'मजबूत और स्थायी टांके', gu: 'મજબૂત અને કાયમી ટાંકા' },
        description: { en: 'Stitching strong outlines using backstitch and stem stitch.', hi: 'बैकस्टिच और स्टेम स्टिच से मजबूत आउटलाइन बनाना।', gu: 'બેકસ્ટીચ અને સ્ટેમ સ્ટીચથી મજબૂત આઉટલાઇન બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=Jd0uqFkBr0g',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Decorative Stitches', hi: 'सजावटी कढ़ाई टांके', gu: 'સજાવટી ભરતકામ ટાંકા' },
        description: { en: 'Creating decorative border patterns and floral outlines.', hi: 'सजावटी बॉर्डर पैटर्न और फूलों की आउटलाइन कढ़ना।', gu: 'સજાવટી બોર્ડર પેટર્ન અને ફૂલોની આઉટલાઇન ભરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=x18uYL7YZAg',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Flat, Loop & Knotted Stitches', hi: 'सपाट, लूप और गांठ वाले टांके', gu: 'સપાટ, લૂપ અને ગાંઠ વાળા ટાંકા' },
        description: { en: 'Mastering flat stitches, lazy daisy loops, and French knots.', hi: 'सैटिन स्टिच, लूप और फ्रेंच नॉट से कढ़ाई करना।', gu: 'સેટીન સ્ટીચ, લૂપ અને ફ્રેન્ચ નોટથી ભરતકામ કરવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=wY7hWEwe_mI',
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'embroidery',
    title: {
      en: 'Traditional Embroidery Stitches',
      hi: 'पारंपरिक कढ़ाई के टांके',
      gu: 'પરંપરાગત ભરતકામના ટાંકા'
    },
    description: {
      en: 'Master traditional embroidery stitches including running stitch, satin stitch, French knots, and Lazy Daisy.',
      hi: 'रनिंग स्टिच, सैटिन स्टिच, फ्रेंच नॉट और लेजी डिजी जैसे पारंपरिक टांके सीखें।',
      gu: 'રનિંગ સ્ટીચ, સેટીન સ્ટીચ, ફ્રેન્ચ નોટ અને લેઝી ડીઝી જેવા ટાંકા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Running / Basic Stitches', hi: 'रनिंग और बुनियादी टांके', gu: 'રનિંગ અને પાયાના ટાંકા' },
        description: { en: 'Practice running stitch and split stitch for neat line designs.', hi: 'साफ सुथरी रेखाओं के लिए रनिंग स्टिच का अभ्यास।', gu: 'ચોખ્ખી રેખાઓ માટે રનિંગ સ્ટીચની પ્રેક્ટિસ.' },
        videoUrl: 'https://www.youtube.com/watch?v=go89e8xpVYs',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Decorative Stitching', hi: 'सजावटी कढ़ाई की विधि', gu: 'સજાવટી ભરતકામની રીત' },
        description: { en: 'Combining line stitches into traditional ethnic motifs.', hi: 'विभिन्न टांकों को मिलाकर पारंपरिक डिजाइन तैयार करना।', gu: 'વિવિધ ટાંકા ભેગા કરી પરંપરાગત ડિઝાઇન તૈયાર કરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=x18uYL7YZAg',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Satin Stitch', hi: 'सैटिन स्टिच (भरने का टांका)', gu: 'સેટીન સ્ટીચ (પૂરવાનો ટાંકો)' },
        description: { en: 'Filling shapes smoothly with parallel satin stitches.', hi: 'सैटिन स्टिच से पत्तियों और फूलों में सफाई से रंग भरना।', gu: 'સેટીન સ્ટીચથી પાંદડીઓમાં સફાઈથી રંગ પૂરવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=ubbpTd7QstM',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'French Knot & Lazy Daisy', hi: 'फ्रेंच नॉट और लेजी डिजी फूल', gu: 'ફ્રેન્ચ નોટ અને લેઝી ડીઝી ફૂલ' },
        description: { en: 'Crafting textured dots with French knots and floral petals with Lazy Daisy.', hi: 'फ्रेंच नॉट से बिंदु और लेजी डिजी से सुंदर पंखुड़ियां बनाना।', gu: 'ફ્રેન્ચ નોટથી ટપકાં અને લેઝી ડીઝીથી પાંદડીઓ બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=K_DPWZ32GUc',
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'embroidery',
    title: {
      en: 'Kutch & Mirror Work',
      hi: 'कच्छी और शीशा (Mirror Work) कढ़ाई',
      gu: 'કચ્છી અને આભલા (Mirror Work) ભરતકામ'
    },
    description: {
      en: 'Learn regional Kutchi embroidery, mirror work (Shisha), and decorative blouse neck embroidery.',
      hi: 'राजस्थानी/गुजराती कच्छी कढ़ाई, शीशा (मिरर) बैठाना और गले की कढ़ाई सीखें।',
      gu: 'રાજસ્થાની/ગુજરાતી કચ્છી ભરતકામ, આભલા બેસાડવા અને ગળાનું ભરતકામ શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Kutch Embroidery', hi: 'कच्छी कढ़ाई की मूल बातें', gu: 'કચ્છી ભરતકામની પાયાની વાતો' },
        description: { en: 'Geometrical base grid and filling technique for Kutchi work.', hi: 'कच्छी वर्क की जाली बनाना और धागे से भराई करना।', gu: 'કચ્છી વર્કની જાળી બનાવવી અને દોરાથી ભરાઈ કરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=zRPQH7KFHvg',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Kutchi Mirror Work', hi: 'शीशा (मिरर) बैठाने की विधि', gu: 'આભલાં (મિરર) બેસાડવાની રીત' },
        description: { en: 'Securing round glass mirrors on fabric with grid lock stitches.', hi: 'कपड़े पर गोल शीशा रखकर धागे की जाली से लॉक करना।', gu: 'કાપડ પર ગોળ આભલું મૂકી દોરાની જાળીથી લોક કરવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=9SkLNuKIHiA',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Kutch + Mirror Work on Blouse', hi: 'ब्लाउज पर कच्छ और शीशा वर्क', gu: 'બ્લાઉઝ પર કચ્છી અને આભલાં વર્ક' },
        description: { en: 'Designing ethnic saree blouse necklines with mirror motifs.', hi: 'ब्लाउज के गले पर शीशा और कच्छी कढ़ाई से डिजाइन बनाना।', gu: 'બ્લાઉઝના ગળા પર આભલાં અને કચ્છી ભરતકામથી ડિઝાઇન બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=XQZiAv9AF8Q',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Shisha/Mirror Work', hi: 'शीशा (Shisha) कढ़ाई तकनीक', gu: 'આભલાં (Shisha) ભરતકામ ટેકનીક' },
        description: { en: 'Traditional Shisha work loops for dupattas and Kurti borders.', hi: 'दुपट्टे और कुर्ती के लिए शीशा वर्क की बॉर्डर तैयार करना।', gu: 'દુપટ્ટા અને કુર્તી માટે આભલાં વર્કની બોર્ડર તૈયાર કરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=U_fgZD960Xo',
        language: 'Hindi',
        duration: '11 mins'
      }
    ]
  },
  {
    categorySlug: 'embroidery',
    title: {
      en: 'Indian Traditional Embroidery',
      hi: 'भारतीय पारंपरिक कढ़ाई कला (Phulkari, Kantha, Chikankari)',
      gu: 'ભારતીય પરંપરાગત ભરતકામ કળા'
    },
    description: {
      en: 'Discover famous Indian traditional embroidery art styles like Phulkari, Kantha, Chikankari, and classic motifs.',
      hi: 'भारत की प्रसिद्ध पारंपरिक कढ़ाई शैलियों जैसे फुलकारी, कांथा और चिकनकारी की जानकारी सीखें।',
      gu: 'ભારતની પ્રખ્યાત પરંપરાગત ભરતકામ શૈલીઓ જેવી કે ફુલકારી, કાંથા અને ચિકનકારી શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Phulkari', hi: 'पंजाब की फुलकारी कढ़ाई', gu: 'પંજાબની ફુલકારી ભરતકામ' },
        description: { en: 'Traditional Punjabi Phulkari embroidery technique using silk thread.', hi: 'रेशमी धागे से पंजाब की प्रसिद्ध फुलकारी कढ़ाई करना।', gu: 'રેશમી દોરાથી પંજાબનું પ્રખ્યાત ફુલકારી ભરતકામ કરવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=mvlrHgLJ8nw',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Kantha', hi: 'बंगाल की कांथा कढ़ाई', gu: 'બંગાળની કાંથા ભરતકામ' },
        description: { en: 'Traditional Bengal running stitch Kantha work on sarees and dupattas.', hi: 'साड़ी और दुपट्टों पर कांथा रनिंग स्टिच से डिजाइन बनाना।', gu: 'સાડી અને દુપટ્ટા પર કાંથા રનિંગ સ્ટીચથી ડિઝાઇન બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=HDe2sLyKtRM',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Chikankari', hi: 'लखनऊ की चिकनकारी कढ़ाई', gu: 'લખનૌની ચિકનકારી ભરતકામ' },
        description: { en: 'Shadow work and traditional Chikankari stitches of Lucknow.', hi: 'लखनऊ की मशहूर शेडो वर्क और चिकनकारी कढ़ाई का तरीका।', gu: 'લખનૌનું પ્રખ્યાત શેડો વર્ક અને ચિકનકારી ભરતકામની રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=Ja7td25gOJw',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Traditional Motifs', hi: 'पारंपरिक भारतीय पैटर्न और बूटे', gu: 'પરંપરાગત ભારતીય પેટર્ન અને બૂટા' },
        description: { en: 'Stitching classic Indian paisley, peacock, and floral motifs.', hi: 'कैरी, मोर और फूलों के पारंपरिक भारतीय बूटे कढ़ना।', gu: 'કેરી, મોર અને ફૂલોના પરંપરાગત ભારતીય બૂટા ભરવા.' },
        videoUrl: 'https://www.youtube.com/watch?v=Bf61ghb20p8',
        language: 'Hindi',
        duration: '11 mins'
      }
    ]
  },
  {
    categorySlug: 'embroidery',
    title: {
      en: 'Floral & Decorative Embroidery',
      hi: 'फूलों और सजावटी कढ़ाई डिज़ाइन',
      gu: 'ફૂલો અને સજાવટી ભરતકામ ડિઝાઇન'
    },
    description: {
      en: 'Combine Phulkari border designs, Kutchi floral motifs, and mirror work motifs for home decor and clothing.',
      hi: 'फुलकारी बॉर्डर, कच्छी फूलों के बूटे और शीशा वर्क से कपड़ों को सजाना सीखें।',
      gu: 'ફુલકારી બોર્ડર, કચ્છી ફૂલોના બૂટા અને આભલાં વર્કથી કપડાં સજાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Phulkari Border Design', hi: 'फुलकारी बेल और बॉर्डर', gu: 'ફુલકારી વેલ અને બોર્ડર' },
        description: { en: 'Stitching colorful Phulkari geometric border patterns.', hi: 'दुपट्टे और कुर्ती के लिए रंग-बिरंगी फुलकारी बॉर्डर कढ़ना।', gu: 'દુપટ્ટા અને કુર્તી માટે રંગબેરંગી ફુલકારી બોર્ડર ભરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=rnO7bgTbScY',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Kutch Floral Motifs', hi: 'कच्छी स्टाइल फूलों के बूटे', gu: 'કચ્છી સ્ટાઇલ ફૂલોના બૂટા' },
        description: { en: 'Crafting Gujarati Kutch style floral centerpieces.', hi: 'गुजराती कच्छी स्टाइल के सुंदर फूलों के सेंटरपीस कढ़ना।', gu: 'ગુજરાતી કચ્છી સ્ટાઇલના સુંદર ફૂલોના સેન્ટરપીસ ભરવા.' },
        videoUrl: 'https://www.youtube.com/watch?v=zRPQH7KFHvg',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Mirror Work Motif', hi: 'शीशा वर्क का फूल डिज़ाइन', gu: 'આભલાં વર્કનું ફૂલ ડિઝાઇન' },
        description: { en: 'Surrounding mirrors with floral petal stitches for ethnic wear.', hi: 'शीशे के चारों ओर पंखुड़ियां बनाकर सुंदर फूल कढ़ना।', gu: 'આભલાની ચારેય બાજુ પાંદડીઓ બનાવી સુંદર ફૂલ ભરવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=hnTPdvU99cg',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Decorative Stitching', hi: 'कपड़ों पर सजावटी सिलाई', gu: 'કપડાં પર સજાવટી સિલાઈ' },
        description: { en: 'Combining various decorative stitches for custom outfits.', hi: 'कपड़ों पर विभिन्न टांकों के मेल से सजावटी पैटर्न बनाना।', gu: 'કપડાં પર વિવિધ ટાંકાના મિશ્રણથી સજાવટી પેટર્ન બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=x18uYL7YZAg',
        language: 'Hindi',
        duration: '11 mins'
      }
    ]
  },
  {
    categorySlug: 'embroidery',
    title: {
      en: 'Zardozi & Bridal Embroidery',
      hi: 'ज़रदोज़ी और दुल्हन की कढ़ाई (Zardozi Work)',
      gu: 'જરદોજી અને દુલહનની ભરતકામ (Zardozi Work)'
    },
    description: {
      en: 'Advanced course covering metallic Zardozi wire, bead and sequin work, and intricate bridal embroidery designs.',
      hi: 'मखमली कपड़े पर शाही ज़रदोज़ी के सुनहरे तार, सितारे और मोतियों की दुल्हन कढ़ाई सीखें।',
      gu: 'મખમલ કાપડ પર શાહી જરદોજીના સોનેરી તાર, સિતારા અને મોતીની ભરતકામ શીખો.'
    },
    difficulty: 'Hard',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Zardozi Basics', hi: 'ज़रदोज़ी तार (दबका) की मूल बातें', gu: 'જરદોજી તાર (દબકા) ની પાયાની વાતો' },
        description: { en: 'Introductory guide to Dabka metallic spring wire cutting and hooping.', hi: 'ज़रदोज़ी के सुनहरे दबका तार को काटने और पिरोने का तरीका।', gu: 'જરદોજીના સોનેરી દબકા તારને કાપવાની અને પરોવવાની રીત.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 2,
        title: { en: 'Bead & Sequin Work', hi: 'मोती और सितारे पिरोने की विधि', gu: 'મોતી અને સિતારા પરોવવાની રીત' },
        description: { en: 'Stitching metallic sequins (sitara) and glass seed beads tightly.', hi: 'सितारे और मोतियों को कपड़े पर मजबूती से कढ़ना।', gu: 'સિતારા અને મોતીઓને કાપડ પર મજબૂતીથી ભરવા.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 3,
        title: { en: 'Metallic Embroidery', hi: 'सुनहरे तार की भराई सिलाई', gu: 'સોનેરી તારની ભરાઈ સિલાઈ' },
        description: { en: 'Metallic thread filling and heavy embroidery motif outlines.', hi: 'ज़रदोज़ी तार से आकृतियों में उभार के साथ भराई करना।', gu: 'જરદોજી તારથી આકારોમાં ઉપસાવીને ભરાઈ કરવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Bridal Embroidery Design', hi: 'दुल्हन के लहंगे/ब्लाउज की कढ़ाई', gu: 'દુલહનના લહેંગા/બ્લાઉઝની ભરતકામ' },
        description: { en: 'Designing heavy bridal motifs for lehengas and festive blouses.', hi: 'लहंगे और ब्राइडल ब्लाउज के लिए शाही मोर व बेल डिज़ाइन।', gu: 'લહેંગા અને બ્રાઇડલ બ્લાઉઝ માટે શાહી મોર અને વેલ ડિઝાઇન.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 5,
        title: { en: 'Final Bridal Embroidery', hi: 'ब्राइडल कढ़ाई की फिनिशिंग', gu: 'બ્રાઇડલ ભરતકામનું ફિનિશિંગ' },
        description: { en: 'Final detailing, securing back threads, and pressing bridal wear.', hi: 'ब्राइडल कपड़े के पीछे फिनिशिंग देना और पॉलिश करना।', gu: 'બ્રાઇડલ કાપડની પાછળ ફિનિશિંગ આપવું અને પોલિશ કરવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },

  {
    categorySlug: 'baking',
    title: {
      en: 'Baking Basics — Oven, Ingredients & Measurements',
      hi: 'बेकिंग की शुरुआत — बर्तन, सामग्री और नाप',
      gu: 'બેકિંગની શરૂઆત — વાસણ, મટીરીયલ અને માપ'
    },
    description: {
      en: 'Learn eggless baking foundations, measuring ingredients, and baking cakes in a pressure cooker or vessel without an oven.',
      hi: 'बिना अंडे के बेकिंग की शुरुआत, सामग्री नापना और बिना ओवन के कुकर में केक बनाना सीखें।',
      gu: 'ઈંડા વગર બેકિંગની શરૂઆત, મટીરીયલ માપવું અને ઓવન વગર કુકરમાં કેક બનાવતા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Eggless Baking Basics', hi: 'बिना अंडे की बेकिंग के नियम', gu: 'ઈંડા વગરની બેકિંગના નિયમો' },
        description: { en: 'Understanding curd/milk/baking soda substitutes for eggless cakes.', hi: 'बिना अंडे के केक के लिए दही, दूध और बेकिंग पाउडर का अनुपात।', gu: 'ઈંડા વગરના કેક માટે દહીં, દૂધ અને બેકિંગ પાવડરનું માપ.' },
        videoUrl: 'https://www.youtube.com/watch?v=E7SJcII52Fk',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Cake Baking Without Oven', hi: 'बिना ओवन के केक बनाना', gu: 'ઓવન વગર કેક બનાવવો' },
        description: { en: 'Baking cake in a heavy kadhai or steel vessel with salt base.', hi: 'कड़ाही या पतीले में नमक डालकर प्री-हीट करके केक बेक करना।', gu: 'કઢાઈ કે તપેલામાં મીઠું નાખી પ્રી-હીટ કરી કેક બેક કરવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=TP39MU5bNf0',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Eggless Cake in Cooker', hi: 'कुकर में एगलेस स्पंज केक', gu: 'કુકરમાં એગલેસ સ્પોન્જ કેક' },
        description: { en: 'Baking sponge cake in pressure cooker without whistle and gasket.', hi: 'प्रेशर कुकर की सीटी और रबड़ हटाकर स्पंज केक पकाने की विधि।', gu: 'પ્રેશર કુકરની સીટી અને રબર હટાવી સ્પોન્જ કેક બનાવવાની રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=-Ol6GG_La4A',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Testing Cake Doneness', hi: 'टूथपिक से केक चेक करना', gu: 'ટૂથપિકથી કેક ચકાસવો' },
        description: { en: 'Toothpick doneness test and cooling cake tins correctly.', hi: 'टूथपिक से केक पकने की जांच और टिन से केक निकालना।', gu: 'ટૂથપિકથી કેક પાક્યો છે કે નહિ તે ચકાસવું અને ડીમોલ્ડ કરવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'baking',
    title: {
      en: 'Eggless Cookies & Biscuits',
      hi: 'बिना अंडे की कुकीज़ और बिस्कुट',
      gu: 'ઈંડા વગરની કુકીઝ અને બિસ્કિટ'
    },
    description: {
      en: 'Bake crunchy eggless chocolate chip cookies, traditional bakery-style Nankhatai, and butter biscuits at home.',
      hi: 'घर पर कुरकुरी एगलेस चॉकलेट चिप कुकीज़ और पारंपरिक नानखटाई बनाना सीखें।',
      gu: 'ઘરે ક્રિસ્પી એગલેસ ચોકલેટ ચિપ કુકીઝ અને પરંપરાગત નાનખટાઈ બનાવતા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1558961313-7f8a9a5902e7?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Eggless Chocolate Chip Cookies', hi: 'एगलेस चॉकलेट चिप कुकीज़ रेसिपी', gu: 'એગલેસ ચોકલેટ ચિપ કુકીઝ રેસિપી' },
        description: { en: 'Mixing butter, sugar, flour, and chocochips into crispy cookies.', hi: 'मक्खन, चीनी और मैदा मिलाकर चॉकलेट चिप कुकीज़ बनाना।', gu: 'માખણ, ખાંડ અને મેદો ભેળવી ચોકલેટ ચિપ કુકીઝ બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=dicByF0igIs',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Eggless Chocolate Chip Cookies — Alternative', hi: 'चॉकलेट चिप कुकीज़ (दूसरा तरीका)', gu: 'ચોકલેટ ચિપ કુકીઝ (બીજી રીત)' },
        description: { en: 'Alternative easy recipe for baking cookies in a kadhai/oven.', hi: 'कड़ाही या ओवन में कुकीज़ बेक करने का सरल तरीका।', gu: 'કઢાઈ કે ઓવનમાં કુકીઝ બેક કરવાની સરળ રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=fEl7_ti9_pQ',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Nankhatai', hi: 'बेसन-सूजी की पारंपरिक नानखटाई', gu: 'બેસન-સોજીની પરંપરાગત નાનખટાઈ' },
        description: { en: 'Baking melt-in-mouth traditional ghee Nankhatai biscuits.', hi: 'शुद्ध घी, बेसन और सूजी से खस्ता नानखटाई बनाना।', gu: 'ચોખ્ખા ઘી, બેસન અને સોજીમાંથી ખસ્તા નાનખટાઈ બનાવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Cookie Baking & Cooling', hi: 'कुकीज़ बेक करना और स्टोर करना', gu: 'કુકીઝ બેક કરવી અને સાચવવી' },
        description: { en: 'Baking temperature control and airtight jar storage tips.', hi: 'कुकीज़ को सही तापमान पर पकाना और एयरटाइट जार में रखना।', gu: 'કુકીઝને યોગ્ય તાપમાને પકવવી અને બરણીમાં સાચવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'baking',
    title: {
      en: 'Eggless Cakes',
      hi: 'बिना अंडे के केक (Vanilla & Chocolate Cakes)',
      gu: 'ઈંડા વગરના કેક (Vanilla & Chocolate Cakes)'
    },
    description: {
      en: 'Master soft eggless vanilla sponge cake, quick biscuit cake, and rich eggless chocolate cake recipes.',
      hi: 'नरम वैनिला स्पंज केक, बिस्कुट केक और रिच चॉकलेट केक बनाना सीखें।',
      gu: 'સોફ્ટ વેનીલા સ્પોન્જ કેક, બિસ્કિટ કેક અને રિચ ચોકલેટ કેક બનાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Eggless Vanilla Sponge', hi: 'एगलेस वैनिला स्पंज केक', gu: 'એગલેસ વેનીલા સ્પોન્જ કેક' },
        description: { en: 'Baking basic fluffy vanilla sponge cake base.', hi: 'दही और तेल के साथ सॉफ्ट वैनिला स्पंज केक बेक करना।', gu: 'દહીં અને તેલ સાથે સોફ્ટ વેનીલા સ્પોન્જ કેક બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=E7SJcII52Fk',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Eggless Biscuit Cake', hi: '5 मिनट में बिस्कुट से केक बनाना', gu: '5 મિનિટમાં બિસ્કિટમાંથી કેક બનાવવો' },
        description: { en: 'Instant cake recipe using ground biscuits and milk.', hi: 'पार्ले-जी या ओरियो बिस्कुट और दूध से झटपट केक बनाना।', gu: 'બિસ્કિટ અને દૂધમાંથી ઝટપટ કેક બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=TP39MU5bNf0',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Eggless Chocolate Cake', hi: 'रिच एगलेस चॉकलेट केक', gu: 'રિચ એગલેસ ચોકલેટ કેક' },
        description: { en: 'Baking soft chocolate sponge cake with cocoa powder.', hi: 'कोको पाउडर से स्पंजी और स्वादिष्ट चॉकलेट केक बनाना।', gu: 'કોકો પાવડરથી સ્પોન્જી અને ટેસ્ટી ચોકલેટ કેક બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=-Ol6GG_La4A',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Cake Slicing & Finishing', hi: 'केक की कटिंग और लेयरिंग', gu: 'કેકનું કટિંગ અને લેયરિંગ' },
        description: { en: 'Slicing cake into layers and sugar syrup soaking.', hi: 'धागे या चाकू से केक को 2 लेयर में काटना और सिरप लगाना।', gu: 'દોરા કે ચાકુથી કેકને 2 લેયરમાં કાપવો અને પાણી ચોપડવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      }
    ]
  },
  {
    categorySlug: 'baking',
    title: {
      en: 'Cupcakes & Cake Decoration',
      hi: 'कपकेक्स और केक सजावट (Frosting & Decoration)',
      gu: 'કપકેક્સ અને કેક સજાવટ (Frosting & Decoration)'
    },
    description: {
      en: 'Bake moist eggless chocolate cupcakes and learn whipping cream frosting techniques and nozzle decoration.',
      hi: 'छोटे चॉकलेट कपकेक्स बनाना, व्हिप्पिंग क्रीम फेंटना और नोज़ल से सजाना सीखें।',
      gu: 'નાના ચોકલેટ કપકેક્સ બનાવવા, ક્રીમ ફેંટવી અને નોઝલથી સજાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Eggless Chocolate Cupcake', hi: 'एगलेस चॉकलेट कपकेक्स रेसिपी', gu: 'એગલેસ ચોકલેટ કપકેક્સ રેસિપી' },
        description: { en: 'Mixing batter for soft chocolate muffin cupcakes.', hi: 'पेपर कप में सॉफ्ट चॉकलेट कपकेक्स का बैटर तैयार करना।', gu: 'પેપર કપમાં સોફ્ટ ચોકલેટ કપકેક્સનું ખીરું બનાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Cupcake Baking', hi: 'कपकेक्स बेक करने का तरीका', gu: 'કપકેક્સ બેક કરવાની રીત' },
        description: { en: 'Baking flat-topped cupcakes in tray or kadhai.', hi: 'सपाट टॉप वाले कपकेक्स ओवन या कड़ाही में बेक करना।', gu: 'ફ્લેટ ટોપ વાળી કપકેક્સ ઓવન કે કઢાઈમાં બેક કરવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Frosting', hi: 'व्हिप्पिंग क्रीम फेंटना (Whipped Cream)', gu: 'વ્હિપિંગ ક્રીમ ફેટવી (Whipped Cream)' },
        description: { en: 'Whipping non-dairy cream to stiff peaks for frosting.', hi: 'व्हिप्पिंग क्रीम को सही तरीके से फेंटकर गाढ़ा बनाना।', gu: 'વ્હિપિંગ ક્રીમને યોગ્ય રીતે ફેંટીને ઘટ્ટ બનાવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Cupcake Decoration', hi: 'नोज़ल से कपकेक्स पर डिज़ाइन बनाना', gu: 'નોઝલથી કપકેક્સ પર ડિઝાઇન બનાવવી' },
        description: { en: 'Piping 1M star nozzle swirls and adding sprinkles.', hi: 'स्टार नोज़ल से कपकेक्स पर सुंदर क्रीम के फूल बनाना।', gu: 'સ્ટાર નોઝલથી કપકેક્સ પર સુંદર ક્રીમના ફૂલ બનાવવા.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },
  {
    categorySlug: 'baking',
    title: {
      en: 'Eggless Bread & Pav',
      hi: 'घर पर ब्रेड और लड़ी पाँव (Bread & Pav Baking)',
      gu: 'ઘરે બ્રેડ અને લડી પાવ (Bread & Pav Baking)'
    },
    description: {
      en: 'Learn yeast activation, dough kneading, proofing, and baking soft homemade eggless Ladi Pav and bread.',
      hi: 'ईस्ट (Yeast) एक्टिवेट करना, आटा गूंथना, आथा लाना और सॉफ्ट लड़ी पाँव बेक करना सीखें।',
      gu: 'ઈસ્ટ (Yeast) એક્ટિવેટ કરવું, લોટ બાંધવો, આથો લાવવો અને સોફ્ટ પાવ બેક કરતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Eggless Pav', hi: 'घर पर सॉफ्ट लड़ी पाँव बनाना', gu: 'ઘરે સોફ્ટ લડી પાવ બનાવવો' },
        description: { en: 'Baking fresh bakery-style soft Ladi Pav at home.', hi: 'घर पर बेकरी जैसे नरम और स्पंजी लड़ी पाँव पकाने की विधि।', gu: 'ઘરે બેકરી જેવા સોફ્ટ અને સ્પોન્જી લડી પાવ બનાવવાની રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=NCTrii2XSeI',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 2,
        title: { en: 'Bread Dough & Yeast', hi: 'ईस्ट (Yeast) एक्टिवेट करना और आटा गूंथना', gu: 'ઈસ્ટ (Yeast) એક્ટિવેટ કરવું અને લોટ બાંધવો' },
        description: { en: 'Dissolving dry yeast in warm milk and gluten kneading test.', hi: 'गुनगुने दूध में ईस्ट जगाना और 10 मिनट आटा गूंथना।', gu: 'હૂંફાળા દૂધમાં ઈસ્ટ એક્ટિવેટ કરવું અને લોટ મસળવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Proofing', hi: 'आटे में खमीर (Proofing) उठाना', gu: 'લોટમાં આથો (Proofing) લાવવો' },
        description: { en: 'First and second proofing techniques for light airy bread.', hi: 'आटे को ढककर 1 घंटे खमीर उठने देना और पाँव की शेप देना।', gu: 'લોટને ઢાંકીને 1 કલાક આથો લાવવો અને પાવનો શેપ આપવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Baking & Finishing', hi: 'पाँव बेक करना और बटर लगाना', gu: 'પાવ બેક કરવો અને માખણ ચોપડવું' },
        description: { en: 'Baking pav and brushing with melted butter.', hi: 'पाँव बेक करके ओवन से निकालते ही ऊपर मक्खन लगाना।', gu: 'પાવ બેક કરી ઓવનમાંથી કાઢી તરત માખણ ચોપડવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      }
    ]
  },
  {
    categorySlug: 'baking',
    title: {
      en: 'Celebration Cake Making',
      hi: 'एडवांस सेलिब्रेशन केक और फोंडेंट (Celebration Cakes)',
      gu: 'એડવાન્સ સેલિબ્રેશન કેક અને ફોન્ડન્ટ'
    },
    description: {
      en: 'Advanced celebration cake course covering layered sponge bases, rich chocolate ganache, fondant rolling, and cake decoration.',
      hi: 'जन्मदिन/शादी के लिए बहुमंजिला चॉकलेट गनाच केक, फोंडेंट और शुगर फ्लावर्स बनाना सीखें।',
      gu: 'બર્થડે/લગ્ન માટે ચોકલેટ ગનાશ કેક, ફોન્ડન્ટ અને સુગર ફ્લાવર્સ બનાવતા શીખો.'
    },
    difficulty: 'Hard',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Cake Base', hi: 'स्पंज केक बेस तैयार करना', gu: 'સ્પોન્જ કેક બેઝ તૈયાર કરવો' },
        description: { en: 'Baking thick vanilla sponge cake base for layered cakes.', hi: 'लेयर्ड केक के लिए मोटा वैनिला स्पंज केक बेक करना।', gu: 'લેયર્ડ કેક માટે જાડો વેનીલા સ્પોન્જ કેક બેક કરવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=E7SJcII52Fk',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 2,
        title: { en: 'Chocolate Cake', hi: 'चॉकलेट स्पंज केक बेकिंग', gu: 'ચોકલેટ સ્પોન્જ કેક બેકિંગ' },
        description: { en: 'Baking rich chocolate sponge base for birthday cakes.', hi: 'बर्थडे केक के लिए डार्क चॉकलेट स्पंज तैयार करना।', gu: 'બર્થડે કેક માટે ડાર્ક ચોકલેટ સ્પોન્જ બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=-Ol6GG_La4A',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 3,
        title: { en: 'Cake Decoration', hi: 'गनाच लगाना और शार्प एज बनाना', gu: 'ગનાશ લગાવવું અને શાર્પ ધાર બનાવવી' },
        description: { en: 'Applying chocolate ganache for smooth sharp cake edges.', hi: 'चॉकलेट गनाच लगाकर केक के किनारों को शार्प करना।', gu: 'ચોકલેટ ગનાશ લગાવી કેકની ધારો શાર્પ કરવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Fondant', hi: 'फोंडेंट की चादर चढ़ाना', gu: 'ફોન્ડન્ટનું પડ ચડાવવું' },
        description: { en: 'Rolling and covering cake with smooth white fondant icing.', hi: 'फोंडेंट बेलकर केक पर बिना रिंकल के चढ़ाना।', gu: 'ફોન્ડન્ટ વણીને કેક પર કરચલી વગર ચડાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 5,
        title: { en: 'Final Celebration Cake', hi: 'शुगर फ्लावर्स और फाइनल केक सजावट', gu: 'સુગર ફ્લાવર્સ અને આખરી કેક સજાવટ' },
        description: { en: 'Handcrafting sugar roses and assembling 2-tier celebration cake.', hi: 'शुगर फ्लावर्स बनाना और 2-मंजिला सेलिब्रेशन केक सजाना।', gu: 'સુગર ફ્લાવર્સ બનાવવો અને 2-માળનો કેક સજાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },

  {
    categorySlug: 'jewellery',
    title: {
      en: 'Jewellery Basics — Tools, Beads & Wire',
      hi: 'हैंडमेड ज्वेलरी की शुरुआत — औजार और मोती',
      gu: 'હેન્ડમેડ જ્વેલરીની શરૂઆત — સાધનો અને મોતી'
    },
    description: {
      en: 'Introductory guide to jewellery crafting tools, beads, findings, and silk thread jewellery raw materials.',
      hi: 'ज्वेलरी के औजारों (Pliers), मोतियों, जम्प रिंग्स और सिल्क धागे के सामान की जानकारी।',
      gu: 'જ્વેલરીના સાધનો (Pliers), મોતી, જમ્પ રિંગ્સ અને સિલ્ક દોરાના સાધનોની માહિતી.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Silk Thread Jewellery Materials', hi: 'सिल्क थ्रेड ज्वेलरी का सामान', gu: 'સિલ્ક થ્રેડ જ્વેલરીનું મટીરીયલ' },
        description: { en: 'Overview of silk thread spools, plastic bangle bases, and Jhumka molds.', hi: 'सिल्क थ्रेड, प्लास्टिक चूड़ियों और झुमकी मोल्ड का परिचय।', gu: 'સિલ્ક દોરા, બંગડીઓ અને ઝૂમખી મોલ્ડનો પરિચય.' },
        videoUrl: 'https://www.youtube.com/watch?v=grk2kKKNicw',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Jewellery Tools', hi: 'ज्वेलरी के प्लायर और कटिंग औजार', gu: 'જ્વેલરીના પક્કડ અને કટિંગ સાધનો' },
        description: { en: 'Using round-nose pliers, flat pliers, and wire cutters correctly.', hi: 'राउंड नोज, फ्लैट नोज और कटर प्लायर का इस्तेमाल।', gu: 'રાઉન્ડ નોઝ, ફ્લેટ નોઝ અને કટર પક્કડનો ઉપયોગ.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Beads & Findings', hi: 'मोती, जम्प रिंग और हुक की जानकारी', gu: 'મોતી, જમ્પ રિંગ અને હૂકની માહિતી' },
        description: { en: 'Understanding jump rings, headpins, eyepins, and lobster clasps.', hi: 'जम्प रिंग्स, हेडपिन, आईपिन और कुंडी की जानकारी।', gu: 'જમ્પ રિંગ્સ, હેડપિન, આઈપિન અને લોકની માહિતી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Basic Jewellery Assembly', hi: 'ज्वेलरी जोड़ने का आसान तरीका', gu: 'જ્વેલરી જોડવાની સરળ રીત' },
        description: { en: 'Opening jump rings sideways and connecting charms to pins.', hi: 'जम्प रिंग खोलना और मोतियों को पिन में पिरोकर लूप बनाना।', gu: 'જમ્પ રિંગ ખોલવી અને મોતીઓને પિનમાં પરોવી લૂપ બનાવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'jewellery',
    title: {
      en: 'Bracelets & Bangles',
      hi: 'सिल्क थ्रेड ब्रेसलेट और चूड़ियां',
      gu: 'સિલ્ક થ્રેડ બ્રેસલેટ અને બંગડીઓ'
    },
    description: {
      en: 'Learn how to craft silk thread wrapped bangles and stretch beaded bracelets with charms.',
      hi: 'सिल्क धागे की चूड़ियां और इलास्टिक धागे के मोतियों वाले ब्रेसलेट बनाना सीखें।',
      gu: 'સિલ્ક દોરાની બંગડીઓ અને ઇલાસ્ટિક દોરાના મોતી વાળા બ્રેસલેટ બનાવતા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1611591475155-4284fa289353?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Silk Thread Bangles', hi: 'चूड़ी पर सिल्क धागा लपेटना', gu: 'બંગડી પર સિલ્ક દોરો વીંટવો' },
        description: { en: 'Wrapping silk thread bundle tightly over plastic bangle base.', hi: 'प्लास्टिक की चूड़ी पर सिल्क धागा लपेटने की आसान विधि।', gu: 'બંગડી પર સિલ્ક દોરો વીંટવાની સરળ રીત.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Beaded Bracelet', hi: 'इलास्टिक धागे से मोतियों का ब्रेसलेट', gu: 'ઇલાસ્ટિક દોરાથી મોતીનું બ્રેસલેટ' },
        description: { en: 'Stringing beads on 0.8mm stretch cord and measuring wrist.', hi: 'इलास्टिक धागे में क्रिस्टल मोती और स्पैसर पिरोना।', gu: 'ઇલાસ્ટિક દોરામાં મોતી અને સ્પેસર પરોવવા.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Bracelet Assembly', hi: 'सर्जन नॉट (Knot) बांधना और लॉक करना', gu: 'સર્જન નોટ બાંધવી અને લોક કરવું' },
        description: { en: 'Tying secure surgeon’s knot and dabbing glue inside bead.', hi: 'ब्रेसलेट पर कभी न खुलने वाली सर्जन गांठ बांधना।', gu: 'બ્રેસલેટ પર ક્યારેય ન ખુલે તેવી મજબૂત ગાંઠ મારવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Decorative Finishing', hi: 'स्टोन चैन चिपकाना और सजाना', gu: 'સ્ટોન ચેન ચોંટાડવી અને સજાવવું' },
        description: { en: 'Decorating bangles with rhinestone ball chain and stone chain.', hi: 'चूड़ी के ऊपर स्टोन चैन चिपकाकर सुंदर डिज़ाइन बनाना।', gu: 'બંગડી પર સ્ટોન ચેન ચોંટાડી સુંદર ડિઝાઇન બનાવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'jewellery',
    title: {
      en: 'Jhumka & Earring Making',
      hi: 'झुमकी और इयररिंग्स (Earring Making)',
      gu: 'ઝૂમખી અને એરિંગ્સ (Earring Making)'
    },
    description: {
      en: 'Craft traditional Indian silk thread Jhumkas, pearl dangling earrings, and beaded earrings at home.',
      hi: 'सिल्क थ्रेड झुमकी, मोतियों वाली झुमकी और लटकने वाले इयररिंग्स बनाना सीखें।',
      gu: 'સિલ્ક થ્રેડ ઝૂમખી, મોતી વાળી ઝૂમખી અને લટકતા એરિંગ્સ બનાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Silk Thread Jhumka', hi: 'सिल्क थ्रेड झुमकी बनाना', gu: 'સિલ્ક થ્રેડ ઝૂમખી બનાવવી' },
        description: { en: 'Wrapping silk thread on dome Jhumka cap base.', hi: 'झुमकी मोल्ड पर सिल्क धागा लपेटकर झुमकी तैयार करना।', gu: 'ઝૂમખી મોલ્ડ પર સિલ્ક દોરો વીંટી ઝૂમખી બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?yLUClkdzIzE',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Pearl Jhumka', hi: 'मोतियों वाली लटकन झुमकी', gu: 'મોતી વાળી લટકણ ઝૂમખી' },
        description: { en: 'Attaching small white pearl drops (Loreals) around Jhumka rim.', hi: 'झुमकी के निचले किनारे पर छोटी मोतियों की लटकन लगाना।', gu: 'ઝૂમખીની ધાર પર નાની મોતીની લટકણો લગાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=B25DHC2gY14',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Beaded Earrings', hi: 'क्रिस्टल मोतियों के इयररिंग्स', gu: 'ક્રિસ્ટલ મોતીના એરિંગ્સ' },
        description: { en: 'Stitching dangling crystal bead earrings with eyepins.', hi: 'आईपिन में क्रिस्टल मोती पिरोकर लटकने वाले इयररिंग्स बनाना।', gu: 'આઈપિનમાં મોતી પરોવી લટકતા એરિંગ્સ બનાવવા.' },
        videoUrl: 'https://www.youtube.com/watch?v=L5TX0SAb3w0',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Jhumka Finishing', hi: 'कान का हुक (Earhook) जोड़ना', gu: 'કાનનો હૂક (Earhook) જોડવો' },
        description: { en: 'Connecting fishhook ear wires to Jhumka studs firmly.', hi: 'झुमकी में कान का हुक (Earhook) लगाना और फिनिशिंग।', gu: 'ઝૂમખીમાં કાનનો હૂક લગાવવો અને ફિનિશિંગ.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      }
    ]
  },
  {
    categorySlug: 'jewellery',
    title: {
      en: 'Necklace & Choker Making',
      hi: 'गले का हार और चोकर (Necklace & Choker)',
      gu: 'ગળાનો હાર અને ચોકર (Necklace & Choker)'
    },
    description: {
      en: 'Create stylish beaded necklaces, trendsetting choker sets, and thread necklaces.',
      hi: 'टाइगर टेल वायर से मोतियों का हार, चोकर सेट और थ्रेड हार बनाना सीखें।',
      gu: 'ટાઈગર ટેલ વાયરથી મોતીનો હાર, ચોકર સેટ અને થ્રેડ હાર બનાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Beaded Necklace', hi: 'मोतियों का सुंदर हार बनाना', gu: 'મોતીનો સુંદર હાર બનાવવો' },
        description: { en: 'Stringing glass pearls on tiger tail wire with crimp beads.', hi: 'टाइगर टेल वायर में मोती पिरोकर हार बनाना।', gu: 'ટાઈગર ટેલ વાયરમાં મોતી પરોવી હાર બનાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Choker Necklace', hi: 'ट्रेंडिंग चोकर हार (Choker Set)', gu: 'ટ્રેન્ડિંગ ચોકર હાર (Choker Set)' },
        description: { en: 'Assembling pearl choker with side connector bars.', hi: 'गले से सटा हुआ सुंदर मोतियों का चोकर हार तैयार करना।', gu: 'ગળા સાથે ફિટ થતો મોતીનો ચોકર હાર બનાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Thread Necklace', hi: 'सिल्क थ्रेड का पेंडेंट वाला हार', gu: 'સિલ્ક થ્રેડનો પેન્ડન્ટ વાળો હાર' },
        description: { en: 'Combining silk thread braided cord with heavy metal pendant.', hi: 'सिल्क थ्रेड की डोरी में पेंडेंट डालकर हार बनाना।', gu: 'સિલ્ક થ્રેડની દોરીમાં પેન્ડન્ટ નાખી હાર બનાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Necklace Finishing', hi: 'हार में एडजस्टेबल डोरी (Dori) लगाना', gu: 'હારમાં એડજસ્ટેબલ દોરી (Dori) લગાવવી' },
        description: { en: 'Attaching thread dori cords to necklace end rings.', hi: 'हार के सिरों पर घटाने-बढ़ाने वाली डोरी बांधना।', gu: 'હારના છેડે એડજસ્ટેબલ દોરી બાંધવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },
  {
    categorySlug: 'jewellery',
    title: {
      en: 'Silk Thread Jewellery Set',
      hi: 'सिल्क थ्रेड ज्वेलरी सेट (Bangles & Earrings)',
      gu: 'સિલ્ક થ્રેડ જ્વેલરી સેટ (Bangles & Earrings)'
    },
    description: {
      en: 'Master silk thread wrapping for bangles, Jhumkas, earrings, and matching handmade jewellery sets.',
      hi: 'सिल्क थ्रेड से चूड़ियां, झुमकी, इयररिंग्स और पूरा मैचिंग सेट बनाना सीखें।',
      gu: 'સિલ્ક થ્રેડથી બંગડીઓ, ઝૂમખી, એરિંગ્સ અને આખો મેચિંગ સેટ બનાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1611591475155-4284fa289353?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Materials', hi: 'सिल्क थ्रेड ज्वेलरी का सारा सामान', gu: 'સિલ્ક થ્રેડ જ્વેલરીનું બધું મટીરીયલ' },
        description: { en: 'Selecting thread shades, glue, stone chains, and bases.', hi: 'मैचिंग सिल्क धागे, गोंद और स्टोन चैन का चुनाव।', gu: 'મેચિંગ સિલ્ક દોરો, ગુંદર અને સ્ટોન ચેન પસંદ કરવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=grk2kKKNicw',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Silk Thread Jhumka', hi: 'सिल्क थ्रेड डोम झुमकी', gu: 'સિલ્ક થ્રેડ ડોમ ઝૂમખી' },
        description: { en: 'Wrapping silk thread on round Jhumka base.', hi: 'झुमकी बेस पर सफाई से धागा लपेटने की विधि।', gu: 'ઝૂમખી બેઝ પર સફાઈથી દોરો વીંટવાની રીત.' },
        videoUrl: 'https://www.youtube.com/watch?v=yLUClkdzIzE',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Silk Thread Earrings', hi: 'सिल्क थ्रेड टॉप्स इयररिंग्स', gu: 'સિલ્ક થ્રેડ બુટિયા એરિંગ્સ' },
        description: { en: 'Stitching matching silk thread stud earrings.', hi: 'झुमकी के साथ मैचिंग सिल्क थ्रेड के स्टड/टॉप्स बनाना।', gu: 'ઝૂમખી સાથે મેચિંગ સિલ્ક થ્રેડના બુટિયા બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=L5TX0SAb3w0',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Silk Thread Jewellery Set', hi: 'पूरा सिल्क थ्रेड मैचिंग सेट असेंबली', gu: 'આખો સિલ્ક થ્રેડ મેચિંગ સેટ એસેમ્બલી' },
        description: { en: 'Assembling matching bangles, earrings, and neck dori.', hi: 'चूड़ियों और झुमकी का पूरा मैचिंग ब्राइडल सेट तैयार करना।', gu: 'બંગડીઓ અને ઝૂમખીનો આખો મેચિંગ સેટ તૈયાર કરવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },
  {
    categorySlug: 'jewellery',
    title: {
      en: 'Kundan & Bridal Jewellery',
      hi: 'कुंदन और ब्राइडल ज्वेलरी (Kundan Set)',
      gu: 'કુંદન અને બ્રાઇડલ જ્વેલરી (Kundan Set)'
    },
    description: {
      en: 'Advanced Kundan stone connector assembly, pearl bridal jewellery crafting, and Maang Tikka set making.',
      hi: 'शादी-विवाह के लिए कुंदन पत्थरों का चोकर हार, मोतियों की लटकन, झुमकी और मांग टीका सीखें।',
      gu: 'લગ્નપ્રસંગ માટે કુંદન સ્ટોનનો ચોકર હાર, મોતીની લટકણ અને માંગ ટીકો બનાવતા શીખો.'
    },
    difficulty: 'Hard',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Kundan Jewellery Basics', hi: 'कुंदन स्टोन फ्रेम और वायर जोड़ना', gu: 'કુંદન સ્ટોન ફ્રેમ અને વાયર જોડવો' },
        description: { en: 'Linking Kundan stone frames together with brass binding wire.', hi: 'ब्रास वायर से कुंदन के पत्थरों के फ्रेम आपस में जोड़ना।', gu: 'બ્રાસ વાયરથી કુંદન સ્ટોનના ફ્રેમ એકબીજા સાથે જોડવા.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 2,
        title: { en: 'Kundan Bridal Design', hi: 'कुंदन चोकर हार का पैटर्न', gu: 'કુંદન ચોકર હારની ડિઝાઇન' },
        description: { en: 'Designing heavy Kundan choker arc for bridal wear.', hi: 'दुल्हन के लिए भारी कुंदन चोकर हार का ढांचा तैयार करना।', gu: 'દુલહન માટે ભારી કુંદન ચોકર હાર બનાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 3,
        title: { en: 'Pearl Bridal Jewellery', hi: 'मोतियों की लटकन (Loreals) लगाना', gu: 'મોતીની લટકણ (Loreals) લગાવવી' },
        description: { en: 'Wiring pearl loreals drops around Kundan frame.', hi: 'कुंदन हार के नीचे हरी/सफेद मोतियों की लटकन पिरोना।', gu: 'કુંદન હારની નીચે મોતીની લટકણો પરોવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Maang Tikka', hi: 'मैचिंग कुंदन मांग टीका बनाना', gu: 'મેચિંગ કુંદન માંગ ટીકો બનાવવો' },
        description: { en: 'Crafting matching forehead Kundan Maang Tikka ornament.', hi: 'माथे के लिए मैचिंग कुंदन मांग टीका और चैन तैयार करना।', gu: 'માથા માટે મેચિંગ કુંદન માંગ ટીકો અને ચેન બનાવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 5,
        title: { en: 'Bridal Set Finishing', hi: 'वेलवेट डोरी जोड़ना और सेट फिनिशिंग', gu: 'વેલ્વેટ દોરી જોડવી અને સેટ ફિનિશિંગ' },
        description: { en: 'Attaching velvet dori and finishing full bridal jewellery set.', hi: 'हार में वेलवेट डोरी जोड़ना और ब्राइडल सेट की फिनिशिंग।', gu: 'હારમાં વેલ્વેટ દોરી જોડવી અને બ્રાઇડલ સેટનું ફિનિશિંગ.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },

  {
    categorySlug: 'handicrafts',
    title: {
      en: 'Paper Quilling',
      hi: 'पेपर क्विलिंग कला (Paper Quilling)',
      gu: 'પેપર ક્વિલિંગ કળા (Paper Quilling)'
    },
    description: {
      en: 'Learn paper quilling basics, rolling paper coils, quilled flowers, leaves, and 3D quilling flowers.',
      hi: 'कागज की पट्टियों को रोल करना, क्विलिंग फूल, पत्तियां और 3D पेपर फ्लावर बनाना सीखें।',
      gu: 'કાગળની પટ્ટીઓ રોલ કરવી, ક્વિલિંગ ફૂલ, પાંદડા અને 3D પેપર ફ્લાવર બનાવતા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Basic Quilling', hi: 'पेपर क्विलिंग रोल बनाने की शुरुआत', gu: 'પેપર ક્વિલિંગ રોલ બનાવવાની શરૂઆત' },
        description: { en: 'Using slotted quilling tool to roll tight and loose paper coils.', hi: 'क्विलिंग टूल से कागज़ की पट्टियों को गोल रोल करना।', gu: 'ક્વિલિંગ ટૂલથી કાગળની પટ્ટીઓ ગોળ રોલ કરવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Quilling Flowers', hi: 'क्विलिंग से फूल बनाना', gu: 'ક્વિલિંગથી ફૂલ બનાવવો' },
        description: { en: 'Pinching loose coils into teardrop petals to form flowers.', hi: 'रोल किए कागज़ को दबाकर पत्ती का शेप देना और फूल बनाना।', gu: 'રોલ કરેલા કાગળને દબાવી પાંદડી બનાવવી અને ફૂલ બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=lcC6wj6Np6k',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Quilled Leaves', hi: 'क्विलिंग की पत्तियां', gu: 'ક્વિલિંગના પાંદડા' },
        description: { en: 'Shaping marquise and eye-shaped green leaves.', hi: 'हरे कागज़ की पट्टियों से सुंदर पत्तियां तैयार करना।', gu: 'લીલા કાગળની પટ્ટીઓમાંથી સુંદર પાંદડા બનાવવા.' },
        videoUrl: 'https://youtu.be/m2nCs6Y2Dk8',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: '3D Quilling Flower', hi: '3D उभरता हुआ क्विलिंग फूल', gu: '3D ઉપસતો ક્વિલિંગ ફૂલ' },
        description: { en: 'Crafting 3D cup-shaped quilling flowers for decor.', hi: 'उभरा हुआ 3D कप स्टाइल क्विलिंग फूल तैयार करना।', gu: 'ઉપસતો 3D કપ સ્ટાઇલ ક્વિલિંગ ફૂલ તૈયાર કરવો.' },
        videoUrl: 'https://youtu.be/1lB88I0KvJk',
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'handicrafts',
    title: {
      en: 'Paper Flowers & Decorative Crafts',
      hi: 'कागज के फूल और सजावटी क्राफ्ट',
      gu: 'કાગળના ફૂલ અને સજાવટી ક્રાફ્ટ'
    },
    description: {
      en: 'Craft handmade paper flowers, quilled leaves, and handmade greeting cards for home decor and gifts.',
      hi: 'रंग-बिरंगे कॉप्ट पेपर से फूल, पत्तियां और सुंदर बधाई कार्ड (Greeting Card) बनाना सीखें।',
      gu: 'રંગબેરંગી કાગળમાંથી ફૂલ, પાંદડા અને સુંદર ગ્રીટિંગ કાર્ડ બનાવતા શીખો.'
    },
    difficulty: 'Easy',
    duration: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Paper Flowers', hi: 'कागज के स्पाइरल गुलाब के फूल', gu: 'કાગળના સ્પાઇરલ ગુલાબના ફૂલ' },
        description: { en: 'Folding and rolling paper cutout spirals into roses.', hi: 'गोल कागज़ काटकर बाहर से मोड़ते हुए गुलाब बनाना।', gu: 'ગોળ કાગળ કાપી વાળીને ગુલાબ બનાવવું.' },
        videoUrl: 'https://youtu.be/1lB88I0KvJk',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 2,
        title: { en: 'Quilled Flowers', hi: 'क्विलिंग पेपर फ्लावर्स', gu: 'ક્વિલિંગ પેપર ફ્લાવર્સ' },
        description: { en: 'Crafting quilled multi-petal daisy flowers.', hi: 'क्विलिंग कागज़ की पट्टियों से सुंदर डेज़ी फूल बनाना।', gu: 'ક્વિલિંગ કાગળની પટ્ટીઓમાંથી સુંદર ડેઝી ફૂલ બનાવવું.' },
        videoUrl: 'https://www.youtube.com/watch?v=lcC6wj6Np6k',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 3,
        title: { en: 'Quilled Leaves', hi: 'कागज की सजावटी पत्तियां', gu: 'કાગળના સજાવટી પાંદડા' },
        description: { en: 'Making quilled leaves to pair with paper flowers.', hi: 'फूलों के साथ सजाने के लिए हरी क्विलिंग पत्तियां बनाना।', gu: 'ફૂલો સાથે સજાવવા માટે લીલા ક્વિલિંગ પાંદડા બનાવવા.' },
        videoUrl: 'https://youtu.be/m2nCs6Y2Dk8',
        language: 'Hindi',
        duration: '10 mins'
      },
      {
        order: 4,
        title: { en: 'Greeting Card', hi: 'हैंडमेड ग्रीटिंग कार्ड सजाना', gu: 'હેન્ડમેડ ગ્રીટિંગ કાર્ડ સજાવવું' },
        description: { en: 'Assembling paper flowers on cardstock greeting cards.', hi: 'कार्डबोर्ड पर कागज़ के फूल चिपकाकर सुंदर कार्ड बनाना।', gu: 'કાર્ડબોર્ડ પર કાગળના ફૂલો ચોંટાડી ગ્રીટિંગ કાર્ડ બનાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '10 mins'
      }
    ]
  },
  {
    categorySlug: 'handicrafts',
    title: {
      en: 'Jute & Bottle Home Decor',
      hi: 'जूट की रस्सी और बोतल क्राफ्ट (Home Decor)',
      gu: 'જૂટનું દોરડું અને બોટલ ક્રાફ્ટ (Home Decor)'
    },
    description: {
      en: 'Transform eco-friendly jute twine rope and glass bottles into rustic home decor planters and lamps.',
      hi: 'जूट की रस्सी के गमले, सजावटी कांच की बोतल लैंप और देसी होम डेकोर बनाना सीखें।',
      gu: 'જૂટના દોરડાના કૂંડા, સજાવટી કાચની બોટલ લેમ્પ અને દેશી હોમ ડેકોર બનાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Jute Rope Decoration', hi: 'जूट की रस्सी से सजावटी सामान', gu: 'જૂટના દોરડામાંથી સજાવટી સામાન' },
        description: { en: 'Coiling jute rope using hot glue onto containers.', hi: 'डिब्बों पर जूट की रस्सी लपेटने की बुनियादी तकनीक।', gu: 'ડબ્બા પર જૂટનું દોરડું ચોંટાડવાની પાયાની ટેકનીક.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Jute Bottle Decor', hi: 'कांच की बोतल पर जूट क्राफ्ट', gu: 'કાચની બોટલ પર જૂટ ક્રાફ્ટ' },
        description: { en: 'Wrapping glass wine bottles with jute twine and lace.', hi: 'कांच की बोतल पर जूट की रस्सी और लीस लपेटना।', gu: 'કાચની બોટલ પર જૂટનું દોરડું અને લેસ ચોંટાડવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Jute Planter', hi: 'प्लास्टिक डिब्बे से जूट का गमला', gu: 'પ્લાસ્ટિક ડબ્બામાંથી જૂટનું કૂંડું' },
        description: { en: 'Transforming plastic tubs into rustic jute planters.', hi: 'प्लास्टिक के डिब्बे पर जूट लपेटकर सुंदर गमला बनाना।', gu: 'પ્લાસ્ટિકના ડબ્બા પર જૂટ ચોંટાડી સુંદર કૂંડું બનાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Rustic Home Decor', hi: 'बोतल लैंप और LED लाइट लगाना', gu: 'બોટલ લેમ્પ અને LED લાઈટ મૂકવી' },
        description: { en: 'Inserting LED fairy lights into decorated bottles for home decor.', hi: 'सजी हुई बोतल में फेयरी लाइट डालकर बोतल लैंप तैयार करना।', gu: 'સજાવેલી બોટલમાં ફેરી લાઈટ નાખી બોટલ લેમ્પ તૈયાર કરવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },
  {
    categorySlug: 'handicrafts',
    title: {
      en: 'Air-Dry Clay Crafts',
      hi: 'क्ले क्राफ्ट — मोमबत्ती स्टैंड और बर्तन (Clay Crafts)',
      gu: 'ક્લે ક્રાફ્ટ — દીવા સ્ટેન્ડ અને વાસણ (Clay Crafts)'
    },
    description: {
      en: 'Sculpt air-dry clay lotus tealight candle holders, clay ornaments, painting, and clear varnish sealing.',
      hi: 'बिना ओवन के हवा में सूखने वाली क्ले से कमल का मोमबत्ती स्टैंड बनाना और पेंट करना सीखें।',
      gu: 'ઓવન વગર હવામાં સુકાતી ક્લેમાંથી કમળનો દીવા સ્ટેન્ડ બનાવવો અને પેઇન્ટ કરતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Working With Air-Dry Clay', hi: 'एयर-ड्राय क्ले गूंथना और बेलना', gu: 'એર-ડ્રાય ક્લે મસળવી અને વણવી' },
        description: { en: 'Conditioning air-dry clay and rolling smooth slabs.', hi: 'क्ले को गूंथकर लचीला बनाना और समतल बेलना।', gu: 'ક્લેને મસળીને સોફ્ટ બનાવવી અને ફ્લેટ વણવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Lotus/Candle Holder', hi: 'कमल के फूल वाला कैंडल होल्डर', gu: 'કમળના ફૂલ વાળું કેન્ડલ હોલ્ડર' },
        description: { en: 'Sculpting clay lotus petals around candle base.', hi: 'क्ले की पंखुड़ियां काटकर कमल का मोमबत्ती स्टैंड बनाना।', gu: 'ક્લેની પાંદડીઓ કાપી કમળનો દીવા સ્ટેન્ડ બનાવવો.' },
        videoUrl: 'https://www.youtube.com/watch?v=jg9z54aCBbQ',
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Clay Decoration', hi: 'क्ले पर नक्काशी और फिनिशिंग', gu: 'ક્લે પર નકશીકામ અને ફિનિશિંગ' },
        description: { en: 'Smoothing cracks with water drops and drying clay 24 hours.', hi: 'पानी से क्ले की दरारें मिटाना और 24 घंटे सुखाना।', gu: 'પાણીથી ક્લેની તિરાડો દૂર કરવી અને 24 કલાક સુકવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Painting & Finishing', hi: 'एक्रिलिक पेंट और शाइनिंग वार्निश', gu: 'એક્રિલિક પેઇન્ટ અને શાઇનિંગ વાર્નિશ' },
        description: { en: 'Painting clay craft with metallic colors and applying varnish seal.', hi: 'एक्रिलिक रंगों से पेंट करना और वार्निश से चमकाना।', gu: 'એક્રિલિક રંગોથી પેઇન્ટ કરવું અને વાર્નિશથી ચમકાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },
  {
    categorySlug: 'handicrafts',
    title: {
      en: 'Upcycled Crafts',
      hi: 'पुरानी जींस और बोतलों से नए क्राफ्ट (Upcycled Crafts)',
      gu: 'જૂના જીન્સ અને બોટલોમાંથી નવા ક્રાફ્ટ (Upcycled Crafts)'
    },
    description: {
      en: 'Upcycle old denim jeans, glass bottles, and fabric scraps into stylish home decor organizers and storage items.',
      hi: 'पुरानी डेनिम जींस की जेबों से वॉल ऑर्गनाइज़र, बोतल क्राफ्ट और कतरन से सजावट सीखें।',
      gu: 'જૂના જીન્સના ખિસ્સામાંથી વોલ ઓર્ગેનાઈઝર અને બોટલ ક્રાફ્ટ બનાવતા શીખો.'
    },
    difficulty: 'Medium',
    duration: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Denim Upcycling', hi: 'जींस की जेब से वॉल ऑर्गनाइज़र', gu: 'જીન્સના ખિસ્સામાંથી વોલ ઓર્ગેનાઈઝર' },
        description: { en: 'Cutting old denim pockets and stitching onto wall hanging sheet.', hi: 'जींस की जेबें काटकर कपड़े पर सिलना और ऑर्गनाइज़र बनाना।', gu: 'જીન્સના ખિસ્સા કાપી કાપડ પર સીવી ઓર્ગેનાઈઝર બનાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 2,
        title: { en: 'Bottle Upcycling', hi: 'पुरानी कांच की बोतलों का उपयोग', gu: 'જૂની કાચની બોટલોનો ઉપયોગ' },
        description: { en: 'Painting and wrapping old bottles into decorative flower vases.', hi: 'कांच की खाली बोतलों पर पेंट करके फ्लावर वास बनाना।', gu: 'કાચની ખાલી બોટલો પર પેઇન્ટ કરી ફ્લાવર વાસ બનાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 3,
        title: { en: 'Fabric Waste Crafts', hi: 'कपड़े की कतरन से सजावटी सामान', gu: 'કાપડની કાતરીમાંથી સજાવટી સામાન' },
        description: { en: 'Using leftover fabric scraps for patchwork coasters and mats.', hi: 'बची हुई कतरन से पैचवर्क कोस्टर और मैट तैयार करना।', gu: 'વધેલી કાતરીમાંથી પેચવર્ક કોસ્ટર અને મેટ તૈયાર કરવા.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '11 mins'
      },
      {
        order: 4,
        title: { en: 'Home Decor From Waste', hi: 'वेस्ट मटेरियल से होम डेकोर असेंबली', gu: 'વેસ્ટ મટીરીયલમાંથી હોમ ડેકોર એસેમ્બલી' },
        description: { en: 'Assembling complete eco-friendly home decor setup.', hi: 'बेकार सामान से बने क्राफ्ट को घर में सही जगह सजाना।', gu: 'બેકાર સામાનમાંથી બનેલા ક્રાફ્ટને ઘરમાં સજાવવો.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  },
  {
    categorySlug: 'handicrafts',
    title: {
      en: 'Macramé Home Decor',
      hi: 'मैक्रैम कॉर्ड से बोहो वॉल हैंगिंग (Macramé Art)',
      gu: 'મેક્રમે દોરડામાંથી બોહો વોલ હેંગિંગ (Macramé Art)'
    },
    description: {
      en: 'Master Macramé knotting techniques to create cotton cord plant hangers and boho wall hangings.',
      hi: 'सूती कॉर्ड में गांठे बांधकर पौधा लटकाने वाला होल्डर और बोहो वॉल हैंगिंग बनाना सीखें।',
      gu: 'કોટન દોરડામાં ગાંઠો બાંધી છોડ ટીંગાડવાનો હોલ્ડર અને વોલ હેંગિંગ બનાવતા શીખો.'
    },
    difficulty: 'Hard',
    duration: '1 hour',
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    lessons: [
      {
        order: 1,
        title: { en: 'Macramé Plant Hanger', hi: 'पौधा लटकाने वाला मैक्रैम होल्डर', gu: 'છોડ ટીંગાડવાનો મેક્રમે હોલ્ડર' },
        description: { en: 'Knotting cotton cord plant hanger for pots.', hi: 'सूती रस्सी में गांठे बांधकर गमला लटकाने की बास्केट बनाना।', gu: 'કોટન દોરડામાં ગાંઠો બાંધી કૂંડું ટીંગાડવાની બાસ્કેટ બનાવવી.' },
        videoUrl: 'https://www.youtube.com/watch?v=QmLwyIgq6-U',
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 2,
        title: { en: 'Basic Macramé Knots', hi: 'मैक्रैम की मुख्य गांठे (Knots)', gu: 'મેક્રમેની મુખ્ય ગાંઠો (Knots)' },
        description: { en: 'Learning Lark’s head knot and Square knot fundamentals.', hi: 'लार्क हैड नॉट और स्क्वायर नॉट बांधने का अभ्यास।', gu: 'લાર્ક હેડ નોટ અને સ્ક્વેર નોટ બાંધવાની પ્રેક્ટિસ.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 3,
        title: { en: 'Macramé Wall Hanging', hi: 'बोहो मैक्रैम वॉल हैंगिंग', gu: 'બોહો મેક્રમે વોલ હેંગિંગ' },
        description: { en: 'Weaving Macramé cords on wooden dowel rod.', hi: 'लकड़ी की छड़ पर मैक्रैम रस्सियां बांधकर वॉल हैंगिंग बनाना।', gu: 'લાકડાની સળી પર મેક્રમે દોરડા બાંધી વોલ હેંગિંગ બનાવવું.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 4,
        title: { en: 'Plant Hanger Design', hi: 'प्लांट हैंगर की जालीदार डिज़ाइन', gu: 'પ્લાન્ટ હેંગરની જાળીદાર ડિઝાઇન' },
        description: { en: 'Creating pot basket mesh using square knots.', hi: 'गमले को रोकने के लिए नीचे जालीदार बास्केट सिलना।', gu: 'કૂંડાને ટકાવવા નીચે જાળીદાર બાસ્કેટ સીવવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      },
      {
        order: 5,
        title: { en: 'Finishing & Tassels', hi: 'झाड़न काटना और कंगे से संवारना', gu: 'ઝાલર કાપવી અને કાંસકાથી ઓળવી' },
        description: { en: 'Trimming cord fringe in V-shape and combing plies.', hi: 'नीचे की झालर V-शेप में काटना और कंगे से संवारना।', gu: 'નીચેની ઝાલર V-શેપમાં કાપવી અને કાંસકાથી ઓળવી.' },
        videoUrl: null,
        language: 'Hindi',
        duration: '12 mins'
      }
    ]
  }
];

module.exports = coursesData;
