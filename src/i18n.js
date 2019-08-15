import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them)
import translationEN from './locales/en.json';
import translationZHTW from './locales/zh-tw.json';
import translationZHCN from './locales/zh-cn.json';

const resources = {
  en: { translation: translationEN },
  zhTW: { translation: translationZHTW },
  zhCN: { translation: translationZHCN },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
