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

const coursesData = require('./coursesData');

const extractYouTubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : (url.length === 11 ? url : '');
};

const seedData = async (shouldDisconnect = true) => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swadhara';
    if (mongoose.connection.readyState === 0) {
      console.log(`Connecting to database: ${mongoUri}...`);
      await mongoose.connect(mongoUri);
    }
    console.log('Connected to MongoDB. Checking existing data...');

    console.log('Seeding initial data if needed...');

    const defaultPassword = 'password123';

    let sellerRadha = await User.findOne({ email: 'radha@swadhara.org' });
    if (!sellerRadha) {
      sellerRadha = await User.create({
        name: 'Radha Sharma',
        email: 'radha@swadhara.org',
        password: defaultPassword,
        role: 'seller',
        profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
        bio: 'A passionate home cook and skilled tailor based in Jaipur. Radha has been running her own small cottage tailoring shop for the last 5 years and loves teaching embroidery to young girls in her community.',
        location: 'Jaipur, Rajasthan'
      });
    }

    let userSunita = await User.findOne({ email: 'sunita@swadhara.org' });
    if (!userSunita) {
      userSunita = await User.create({
        name: 'Sunita Patel',
        email: 'sunita@swadhara.org',
        password: defaultPassword,
        role: 'user',
        profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
        bio: 'Interested in learning home baking to start a tiny custom cookie kitchen from my apartment.',
        location: 'Ahmedabad, Gujarat'
      });
    }

    console.log(`Verified default users: Radha (Seller), Sunita (User). Seeding categories...`);

    const categoryData = [
      { name: { en: 'Tailoring', hi: 'सिलाई-कटाई', gu: 'ટેલરિંગ' }, slug: 'tailoring', image: '/images/tailoring.jpg' },
      { name: { en: 'Embroidery', hi: 'कढ़ाई', gu: 'ભરતકામ' }, slug: 'embroidery', image: '/images/embroidery.png' },
      { name: { en: 'Baking', hi: 'बेकिंग', gu: 'બેકિંગ' }, slug: 'baking', image: '/images/baking.jpg' },
      { name: { en: 'Jewellery Making', hi: 'आभूषण बनाना', gu: 'ઝવેરાત બનાવવી' }, slug: 'jewellery', image: '/images/jewellery.jpg' },
      { name: { en: 'Handicrafts', hi: 'हस्तशिल्प', gu: 'હસ્તકલા' }, slug: 'handicrafts', image: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=400&auto=format&fit=crop' }
    ];

    const categoryMap = {};
    for (const catItem of categoryData) {
      let catDoc = await Category.findOne({ slug: catItem.slug });
      if (!catDoc) {
        catDoc = await Category.create(catItem);
      }
      categoryMap[catItem.slug] = catDoc._id;
    }

    console.log(`Verified categories. Checking courses & lessons...`);

    let seededCourseCount = 0;
    let seededLessonCount = 0;

    for (const item of coursesData) {
      const categoryId = categoryMap[item.categorySlug];
      if (!categoryId) continue;

      let courseObj = await Course.findOne({ 'title.en': item.title.en });
      if (!courseObj) {
        courseObj = await Course.create({
          title: item.title,
          description: item.description,
          category: categoryId,
          thumbnail: item.thumbnail,
          difficulty: item.difficulty,
          level: item.difficulty,
          duration: item.duration,
          learningOutcomes: item.learningOutcomes || [],
          materials: item.materials || []
        });
        seededCourseCount++;

        if (item.lessons && item.lessons.length > 0) {
          const lessonDocs = item.lessons.map(l => ({
            course: courseObj._id,
            title: l.title,
            description: l.description,
            videoUrl: l.videoUrl,
            youtubeVideoId: extractYouTubeId(l.videoUrl),
            duration: l.duration,
            order: l.order
          }));
          await Lesson.insertMany(lessonDocs);
          seededLessonCount += lessonDocs.length;
        }
      }
    }

    console.log(`Seeding check: ${seededCourseCount} new courses with ${seededLessonCount} lessons added.`);

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
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
      console.log('Seeded default products successfully!');
    }

    console.log('Seeding verification completed non-destructively!');
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    if (shouldDisconnect) {
      await mongoose.disconnect();
      console.log('Database disconnected.');
    }
  }
};

if (require.main === module) {
  seedData(true);
}

module.exports = { seedData };
