import React, { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../constants/translations/en';
import { hi } from '../constants/translations/hi';
import { gu } from '../constants/translations/gu';

const LanguageContext = createContext();

const translations = { en, hi, gu };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('swadhara_lang') || 'en';
  });

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('swadhara_lang', lang);
    }
  };

  // Helper function to translate static UI strings
  const t = (key) => {
    const resource = translations[language] || en;
    return resource[key] || en[key] || key;
  };

  // Helper function to translate dynamic database objects containing { en, hi, gu }
  const tDynamic = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj['en'] || Object.values(obj)[0] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, tDynamic }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
