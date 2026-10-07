import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, BookOpen, ShoppingBag, Sparkles, CheckCircle, Users, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';
import heroImg from '../assets/hero.png';
import embroideryImg from '../assets/embroidery.png';
import tailoringImg from '../assets/tailoring.jpg';
import bakingImg from '../assets/baking.jpg';
import jewelleryImg from '../assets/jewellery.jpg';

export default function Home() {
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();

  // Data States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledProgress, setEnrolledProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [catsRes, prodsRes, coursesRes] = await Promise.all([
          axios.get('/api/products/categories'),
          axios.get('/api/products'),
          axios.get('/api/courses')
        ]);

        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
        if (prodsRes.data.success) {
          setProducts(prodsRes.data.data);
        }
        if (coursesRes.data.success) {
          setCourses(coursesRes.data.data);
        }

        if (user) {
          const progressRes = await axios.get('/api/courses/user/enrolled');
          if (progressRes.data.success) {
            setEnrolledProgress(progressRes.data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [user]);

  // Featured Skill Categories for Visual Display
  const featuredSkillCards = [
    { title: 'Tailoring', slug: 'tailoring', image: tailoringImg },
    { title: 'Embroidery', slug: 'embroidery', image: embroideryImg },
    { title: 'Baking', slug: 'baking', image: bakingImg },
    { title: 'Jewellery', slug: 'jewellery', image: jewelleryImg },
    { title: 'Handicrafts', slug: 'handicrafts', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500&auto=format&fit=crop' }
  ];

  // Creator Avatars for Women Supporting Women Section
  const creatorAvatars = [
    { name: 'Meena Sharma', skill: 'Embroidery', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Rani Devi', skill: 'Baking', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Puja Patel', skill: 'Crochet', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' }
  ];

  return (
    <div className="homepage-redesign-container">
      {/* SECTION 1: EDITORIAL HERO BANNER */}
      <section className="section" style={{ backgroundColor: 'var(--bg-base)', paddingTop: '40px', paddingBottom: '56px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '48px',
            alignItems: 'center',
            backgroundColor: 'var(--bg-pink-soft)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '48px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div>
              <span className="eyebrow-pill">LEARN &bull; CREATE &bull; EARN</span>
              
              <h1 style={{ fontSize: '3.2rem', marginBottom: '20px', lineHeight: '1.15', color: 'var(--primary-dark)' }}>
                Real skills.<br />
                Handmade dreams.<br />
                Your journey.
              </h1>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '480px' }}>
                Learn practical craft skills step-by-step, create beautiful products, and build your own sustainable income.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => navigate('/courses')} 
                  className="btn btn-rose btn-lg"
                >
                  Explore the Journey <ArrowRight size={18} />
                </button>

                <button 
                  onClick={() => navigate('/marketplace')} 
                  className="btn btn-outline btn-lg"
                >
                  Explore Marketplace
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                height: '380px',
                border: '2px solid #FFFFFF'
              }}>
                <SafeImage
                  src={heroImg}
                  alt="Woman artisan embroidering"
                  category="hero"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Story Pill */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                backgroundColor: '#FFFFFF',
                padding: '14px 20px',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-pink-soft)', color: 'var(--primary-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)', display: 'block' }}>Real people</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Real handmade stories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: POPULAR SKILLS SHOWCASE */}
      <section className="section" style={{ padding: '32px 0 56px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <h2 style={{ margin: 0 }}>Popular Skills</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Start with what interests you most.</p>
            </div>
            <Link to="/courses" style={{ color: 'var(--primary-rose-dark)', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {featuredSkillCards.map((skill) => (
              <div 
                key={skill.slug} 
                className="card-editorial"
                onClick={() => navigate(`/courses?category=${skill.slug}`)}
                style={{ cursor: 'pointer', textAlign: 'center', padding: '12px' }}
              >
                <div style={{ height: '140px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', marginBottom: '12px' }}>
                  <SafeImage src={skill.image} alt={skill.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--primary-dark)' }}>{skill.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: EDITORIAL STORY - SMALL STEPS BIG DREAMS */}
      <section className="section" style={{ backgroundColor: '#FAF0F2', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Small steps.<br />Big dreams.</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
                Learn new skills, create what you love, and build your own income — at your pace. Swadhara provides step-by-step video courses, AI guidance, and a direct marketplace to showcase your creations to appreciative buyers.
              </p>
              <button 
                onClick={() => navigate('/courses')} 
                className="btn btn-outline"
                style={{ fontWeight: '700', color: 'var(--primary-rose-dark)' }}
              >
                How Swadhara works <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', height: '320px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
              <SafeImage
                src="https://images.unsplash.com/photo-1524295981997-ec4f4e30424d?q=80&w=800&auto=format&fit=crop"
                alt="Women sewing and tailoring"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WOMEN SUPPORTING WOMEN */}
      <section className="section">
        <div className="container">
          <div style={{
            backgroundColor: 'var(--bg-pink-soft)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                Women supporting women
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>
                Real stories. Real progress. Real livelihood created from home.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex' }}>
                {creatorAvatars.map((c, i) => (
                  <img 
                    key={i} 
                    src={c.img} 
                    alt={c.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: i > 0 ? '-12px' : 0, objectFit: 'cover' }} 
                  />
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/profile')} 
                className="btn btn-rose btn-sm"
              >
                Read our Creators <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED COURSES & PRODUCTS FROM DATABASE */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0 }}>Featured Opportunities</h2>
            
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`btn btn-sm ${activeCategory === 'all' ? 'btn-rose' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--border-radius-pill)' }}
              >
                All
              </button>
              {categories.slice(0, 4).map((cat) => (
                <button 
                  key={cat._id} 
                  onClick={() => setActiveCategory(cat.slug)} 
                  className={`btn btn-sm ${activeCategory === cat.slug ? 'btn-rose' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--border-radius-pill)' }}
                >
                  {tDynamic(cat.name)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Courses & Products */}
          {loading ? (
            <div className="grid grid-3">
              {[1, 2, 3].map(n => (
                <div key={n} className="skeleton" style={{ height: '260px' }}></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-3">
              {courses.slice(0, 3).map((course) => (
                <div 
                  key={course._id} 
                  className="card-editorial"
                  onClick={() => navigate(`/courses/${course._id}`)}
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <SafeImage src={course.thumbnail} alt={tDynamic(course.title)} category={course.category?.slug} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span className="badge-tag" style={{ width: 'fit-content', marginBottom: '10px' }}>
                      <BookOpen size={12} /> {tDynamic(course.category?.name) || 'Course'}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{tDynamic(course.title)}</h3>
                    <p style={{ fontSize: '0.85rem', flexGrow: 1, marginBottom: '16px' }}>{tDynamic(course.description)}</p>
                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>{course.duration} &bull; {course.level || 'Beginner'}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-rose-dark)' }}>Start &rarr;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
