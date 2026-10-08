import React, { useState, useEffect } from 'react';
import heroImg from '../assets/hero.png';
import embroideryImg from '../assets/embroidery.png';
import tailoringImg from '../assets/tailoring.jpg';
import bakingImg from '../assets/baking.jpg';
import jewelleryImg from '../assets/jewellery.jpg';

const FALLBACK_IMAGES = {
  hero: heroImg,
  tailoring: tailoringImg,
  embroidery: embroideryImg,
  baking: bakingImg,
  jewellery: jewelleryImg,
  handicrafts: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  painting: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  default: heroImg
};

export default function SafeImage({ src, alt, category = 'default', className = '', style = {} }) {
  const getCategoryKey = (catStr) => {
    if (!catStr) return 'default';
    const clean = String(catStr).toLowerCase();
    if (clean.includes('hero') || clean.includes('landing')) return 'hero';
    if (clean.includes('tailor') || clean.includes('sew') || clean.includes('stitch')) return 'tailoring';
    if (clean.includes('embroid') || clean.includes('thread')) return 'embroidery';
    if (clean.includes('bak') || clean.includes('cook') || clean.includes('cake')) return 'baking';
    if (clean.includes('jewel') || clean.includes('bead')) return 'jewellery';
    if (clean.includes('paint') || clean.includes('art')) return 'painting';
    if (clean.includes('handicraft') || clean.includes('potter') || clean.includes('wood') || clean.includes('bag')) return 'handicrafts';
    return 'default';
  };

  const categoryKey = getCategoryKey(category);
  const fallbackSrc = FALLBACK_IMAGES[categoryKey] || FALLBACK_IMAGES.default;

  const [imgSrc, setImgSrc] = useState(() => {
    if (!src || src.trim() === '' || src.includes('placeholder') || src.includes('1606813907291')) {
      return fallbackSrc;
    }
    return src;
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src || src.trim() === '' || src.includes('placeholder') || src.includes('1606813907291')) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Swadhara Craft'}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
    />
  );
}
