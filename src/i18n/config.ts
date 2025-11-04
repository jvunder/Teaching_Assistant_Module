import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi.json';
import zh from './locales/zh.json';

// Get saved language from localStorage, default to 'vi'
const savedLanguage = localStorage.getItem('language') || 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: vi
      },
      zh: {
        translation: zh
      }
    },
    lng: savedLanguage, // Use saved language or default to Vietnamese
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    },
    // Prevent language detection that might cause switching
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;