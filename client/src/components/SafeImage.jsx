import React, { useState, useEffect } from 'react';

const FALLBACK_IMAGES = {
  tailoring: 'https://images.unsplash.com/photo-1524295981997-ec4f4e30424d?q=80&w=600&auto=format&fit=crop',
  embroidery: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop',
  baking: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
  jewellery: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
  handicrafts: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
};

export default function SafeImage({ src, alt, category = 'default', className = '', style = {} }) {
  const [imgSrc, setImgSrc] = useState('');
  const [hasError, setHasError] = useState(false);

  // Normalize category slugs
  const getCategoryKey = (catStr) => {
    if (!catStr) return 'default';
    const clean = catStr.toLowerCase();
    if (clean.includes('tailor') || clean.includes('sew')) return 'tailoring';
    if (clean.includes('embroid') || clean.includes('stitch')) return 'embroidery';
    if (clean.includes('bak') || clean.includes('cook')) return 'baking';
    if (clean.includes('jewel')) return 'jewellery';
    if (clean.includes('handicraft') || clean.includes('potter') || clean.includes('wood')) return 'handicrafts';
    return 'default';
  };

  const categoryKey = getCategoryKey(category);
  const fallbackSrc = FALLBACK_IMAGES[categoryKey] || FALLBACK_IMAGES.default;

  useEffect(() => {
    if (!src || src.trim() === '') {
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
      alt={alt} 
      className={className} 
      style={style} 
      onError={handleError}
      loading="lazy"
    />
  );
}
