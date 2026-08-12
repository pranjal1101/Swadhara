require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Progress = require('../models/Progress');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swadhara';
    console.log(`Connecting to database: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB. Clearing old data...');

    // Clear existing collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Progress.deleteMany({});

    console.log('Old database collections cleared. Seeding users...');

    // 1. Seed Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create a Maker/Seller Radha
    const sellerRadha = await User.create({
      name: 'Radha Sharma',
      email: 'radha@swadhara.org',
      password: hashedPassword,
      role: 'seller',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      bio: 'A passionate home cook and skilled tailor based in Jaipur. Radha has been running her own small cottage tailoring shop for the last 5 years and loves teaching embroidery to young girls in her community.',
      location: 'Jaipur, Rajasthan'
    });

    // Create a Customer/Learner Sunita
    const userSunita = await User.create({
      name: 'Sunita Patel',
      email: 'sunita@swadhara.org',
      password: hashedPassword,
      role: 'user',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
      bio: 'Interested in learning home baking to start a tiny custom cookie kitchen from my apartment.',
      location: 'Ahmedabad, Gujarat'
    });

    console.log(`Created users: Radha (Seller), Sunita (User). Seeding categories...`);

    // 2. Seed Categories (with translations)
    const categoryData = [
      {
        name: { en: 'Tailoring', hi: 'सिलाई-कटाई', gu: 'ટેલરિંગ' },
        slug: 'tailoring',
        image: 'https://images.unsplash.com/photo-1524295981997-ec4f4e30424d?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: { en: 'Embroidery', hi: 'कढ़ाई', gu: 'ભરતકામ' },
        slug: 'embroidery',
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: { en: 'Baking', hi: 'बेकिंग', gu: 'બેકિંગ' },
        slug: 'baking',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: { en: 'Jewellery', hi: 'आभूषण बनाना', gu: 'ઝવેરાત બનાવવી' },
        slug: 'jewellery',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop'
      },
      {
        name: { en: 'Handicrafts', hi: 'हस्तशिल्प', gu: 'હસ્તકલા' },
        slug: 'handicrafts',
        image: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=400&auto=format&fit=crop'
      }
    ];

    const categories = await Category.insertMany(categoryData);
    
    // Map slugs to ObjectIDs for reference
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    console.log(`Created 5 categories. Seeding courses & lessons...`);

    // 3. Seed Course 1: Basic Tailoring
    const course1 = await Course.create({
      title: {
        en: 'Basic Tailoring & Stitching',
        hi: 'सिलाई और कटाई की मूल बातें',
        gu: 'ટેલરિંગ અને સિલાઈની મૂળભૂત બાબતો'
      },
      description: {
        en: 'Learn how to handle a sewing machine, take proper body measurements, stitch straight lines, and sew basic garments from home.',
        hi: 'सिलाई मशीन चलाना सीखें, शरीर की सही माप लें, सीधी सिलाई करना सीखें और घर बैठे साधारण कपड़े सिलना सीखें।',
        gu: 'સિલાઈ મશીન ચલાવતા શીખો, શરીરના માપ લેતા શીખો, સીધી સિલાઈ અને ઘર બેઠા સામાન્ય કપડાં સીવતા શીખો.'
      },
      category: categoryMap['tailoring'],
      instructor: 'Savitri Devi',
      thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      level: 'Beginner',
      duration: '3 hours'
    });

    const lessonsCourse1 = [
      {
        course: course1._id,
        title: {
          en: 'How to Thread a Sewing Machine',
          hi: 'सिलाई मशीन में धागा कैसे डालें',
          gu: 'સિલાઈ મશીનમાં દોરો કેવી રીતે નાખવો'
        },
        description: {
          en: 'A step-by-step video guide showing how to place the bobbin, thread the upper needle, and prepare your machine.',
          hi: 'बॉबिन लगाने, ऊपर की सुई में धागा डालने और अपनी सिलाई मशीन तैयार करने का आसान वीडियो गाइड।',
          gu: 'બોબીન લગાવવા, ઉપરની સોયમાં દોરો નાખવા અને મશીન તૈયાર કરવા માટેનો સરળ વિડિયો ગાઇડ.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=9jKsnq16Faw',
        duration: '8 mins',
        order: 1
      },
      {
        course: course1._id,
        title: {
          en: 'Stitching a Straight Line',
          hi: 'सीधी सिलाई कैसे लगाएं',
          gu: 'સીધી સિલાઈ કેવી રીતે કરવી'
        },
        description: {
          en: 'Learn how to guide fabric under the presser foot to achieve perfectly straight seams every time.',
          hi: 'कपड़े को दबाकर सुई के नीचे सीधा आगे बढ़ाना और सीधी सिलाई के अभ्यास का तरीका सीखें।',
          gu: 'કાપડને સીધું રાખીને મશીન ચલાવવા અને સીધી સિલાઈની પ્રેક્ટિસ કેવી રીતે કરવી તે શીખો.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=sC6wepVb2Qc',
        duration: '10 mins',
        order: 2
      },
      {
        course: course1._id,
        title: {
          en: 'Sewing a Simple Cushion Cover',
          hi: 'साधारण कुशन कवर सिलना',
          gu: 'સાદા કુશન કવરની સિલાઈ'
        },
        description: {
          en: 'Put your stitching skills to use by creating a beautiful square cushion cover for your home.',
          hi: 'अपनी सिलाई कला का उपयोग करके घर के लिए सुंदर चौकोर तकिया/कुशन कवर तैयार करना सीखें।',
          gu: 'તમારી સિલાઈ કળાનો ઉપયોગ કરીને ઘર માટે સુંદર ચોરસ કુશન કવર સીવતા શીખો.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=sC6wepVb2Qc',
        duration: '15 mins',
        order: 3
      }
    ];
    await Lesson.insertMany(lessonsCourse1);

    // Seed Course 2: Creative Embroidery
    const course2 = await Course.create({
      title: {
        en: 'Creative Embroidery Patterns',
        hi: 'रचनात्मक कढ़ाई के तरीके',
        gu: 'સર્જનાત્મક ભરતકામ પેટર્ન'
      },
      description: {
        en: 'Master basic hand embroidery stitches including running stitch, backstitch, french knots, and create floral designs.',
        hi: 'हाथ की कढ़ाई के मुख्य टाँके सीखें जैसे रनिंग स्टिच, बैकस्टिच, फ्रेंच नॉट और सुंदर फूलों के पैटर्न बनाएं।',
        gu: 'હાથ ભરતકામના મુખ્ય ટાંકા શીખો જેવા કે રનિંગ સ્ટીચ, બેકસ્ટીચ, ફ્રેન્ચ નોટ અને સુંદર ફૂલોની પેટર્ન બનાવો.'
      },
      category: categoryMap['embroidery'],
      instructor: 'Radha Sharma',
      thumbnail: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=600&auto=format&fit=crop',
      level: 'Beginner',
      duration: '2.5 hours'
    });

    const lessonsCourse2 = [
      {
        course: course2._id,
        title: {
          en: 'Essential Embroidery Tools',
          hi: 'कढ़ाई के आवश्यक साधन',
          gu: 'ભરતકામ માટેના જરૂરી સાધનો'
        },
        description: {
          en: 'Learn about embroidery hoops, different types of needles, and cotton embroidery floss selection.',
          hi: 'कढ़ाई की फ्रेम (फ्रेम), धागे के प्रकार और सुइयों के चयन के बारे में विस्तार से जानें।',
          gu: 'ભરતકામ ફ્રેમ (ફ્રેમ), સોયના પ્રકાર અને ગુણવત્તાવાળા દોરાઓની પસંદગી વિશે માહિતી.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=mYpS3zDqMug',
        duration: '6 mins',
        order: 1
      },
      {
        course: course2._id,
        title: {
          en: 'Running Stitch & Backstitch',
          hi: 'रनिंग स्टिच और बैकस्टिच बनाना',
          gu: 'રનિંગ સ્ટીચ અને બેકસ્ટીચ બનાવતા શીખો'
        },
        description: {
          en: 'Learn the two most fundamental outline stitches used for drawing patterns on cotton canvas.',
          hi: 'कपड़े पर पैटर्न की रूपरेखा (आउटलाइन) बनाने के दो सबसे आसान टांकों का अभ्यास करें।',
          gu: 'કાપડ પર આઉટલાઇન દોરવા માટેના બે સૌથી પાયાના ટાંકાઓની પ્રેક્ટિસ.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=mYpS3zDqMug',
        duration: '9 mins',
        order: 2
      }
    ];
    await Lesson.insertMany(lessonsCourse2);

    // Seed Course 3: Baking
    const course3 = await Course.create({
      title: {
        en: 'Home Baking Basics',
        hi: 'घरेलू बेकिंग सीखें',
        gu: 'ઘરેલુ બેકિંગ પાયાના નિયમો'
      },
      description: {
        en: 'Learn how to bake sponge cakes, measuring dry and wet ingredients correctly, and handling oven temperature settings.',
        hi: 'स्पंज केक बनाना सीखें, सूखी और गीली सामग्रियों को सही तरीके से नापना और ओवन का तापमान सेट करना सीखें।',
        gu: 'સ્પોન્જ કેક બનાવતા શીખો, સૂકી અને ભીની વસ્તુઓનું માપ લેતા શીખો અને ઓવનનું તાપમાન સેટ કરતા શીખો.'
      },
      category: categoryMap['baking'],
      instructor: 'Chef Ananya Sen',
      thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      level: 'Beginner',
      duration: '4 hours'
    });

    const lessonsCourse3 = [
      {
        course: course3._id,
        title: {
          en: 'Baking Measurements & Kitchen Tools',
          hi: 'बेकिंग की माप और रसोई के उपकरण',
          gu: 'બેકિંગ માપન અને રસોઈ સાધનો'
        },
        description: {
          en: 'Learn how to use cups, spoons, and kitchen scales to get perfect baking results.',
          hi: 'कप, चम्मच और किचन वजन कांटे की मदद से बेकिंग सामग्री का सही अनुपात मापना सीखें।',
          gu: 'કપ, ચમચી અને કિચન સ્કેલની મદદથી બેકિંગ મટીરીયલનું યોગ્ય માપ લેતા શીખો.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=qtlhdIofo-8',
        duration: '7 mins',
        order: 1
      },
      {
        course: course3._id,
        title: {
          en: 'Baking Chocolate Chip Cookies',
          hi: 'चॉकलेट चिप कुकीज़ बनाना',
          gu: 'ચોકલેટ ચિપ કુકીઝ બનાવવાની રીત'
        },
        description: {
          en: 'Simple recipe to bake crispy-on-the-outside and soft-on-the-inside cookies at home.',
          hi: 'घर पर कुरकुरी और अंदर से सॉफ्ट चॉकलेट कुकीज़ बनाने का सबसे सरल तरीका।',
          gu: 'ઘરે બહારથી ક્રિસ્પી અને અંદરથી સોફ્ટ ચોકલેટ કૂકીઝ બનાવવાની સૌથી સરળ રીત.'
        },
        videoUrl: 'https://www.youtube.com/watch?v=yfS0K43gU84',
        duration: '12 mins',
        order: 2
      }
    ];
    await Lesson.insertMany(lessonsCourse3);

    console.log(`Created 3 courses with lessons. Seeding products...`);

    // 4. Seed Products (sold by Radha Sharma)
    const productData = [
      {
        seller: sellerRadha._id,
        name: 'Hand-stitched Floral Cushion Covers (Set of 2)',
        description: 'Set of two hand-stitched pure cotton cushion covers with standard size 16x16 inches. Made with premium fabric from Jaipur and styled with clean invisible zippers. Hand washable and durable.',
        price: 450,
        category: categoryMap['tailoring'],
        images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop'],
        stock: 10
      },
      {
        seller: sellerRadha._id,
        name: 'Hand-Embroidered Cotton Tote Bag',
        description: 'Spacious cotton canvas tote bag hand-embroidered with beautiful floral patterns using premium cotton threads. Features sturdy shoulder handles and a small inner pocket for keys/phone.',
        price: 320,
        category: categoryMap['embroidery'],
        images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'],
        stock: 5
      },
      {
        seller: sellerRadha._id,
        name: 'Fresh Homemade Oatmeal Raisin Cookies (Pack of 12)',
        description: 'Delicious freshly baked cookies using organic rolled oats, raisins, and pure clarified butter (ghee). Pack of 12 cookies, baked in small batches. Order is dispatched within 24 hours.',
        price: 180,
        category: categoryMap['baking'],
        images: ['https://images.unsplash.com/photo-1558961313-7f8a9a5902e7?q=80&w=600&auto=format&fit=crop'],
        stock: 12
      },
      {
        seller: sellerRadha._id,
        name: 'Handcrafted Wooden Bead Necklace',
        description: 'Beautiful necklace handcrafted using natural polished wooden and colorful glass beads. Features an adjustable sliding thread closure to fit comfortably. Handcrafted in Jaipur.',
        price: 250,
        category: categoryMap['jewellery'],
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'],
        stock: 8
      }
    ];

    await Product.insertMany(productData);

    console.log('Seeded 4 products successfully!');
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

// Run the script directly if invoked
if (require.main === module) {
  seedData();
}
