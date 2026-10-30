import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTransation from './locals/en.json';
import guTransation from './locals/gu.json';

// Language translation files
const resources = {
  en: {
    translation: enTransation
  },
  gu: {
    translation: guTransation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'gu', // Default language
    fallbackLng: 'gu', // Fallback language if no translation is available
    interpolation: {
      escapeValue: false // React already escapes values to prevent XSS
    }
  });

export default i18n;