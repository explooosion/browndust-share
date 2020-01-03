import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from "i18next-browser-languagedetector";
import { get } from './utils/Cookies';
// the translations
// (tip move them in a JSON file and import them)
import translationEN from './locales/US.json';
import translationTW from './locales/TW.json';
import translationCN from './locales/CN.json';
import translationKR from './locales/KR.json';
import translationJP from './locales/JP.json';

const lng = get('locale') === undefined ? 'US' : get('locale');

const resources = {
  US: { translation: translationEN },
  TW: { translation: translationTW },
  CN: { translation: translationCN },
  KR: { translation: translationKR },
  JP: { translation: translationJP },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,

    lng, // get default from cookie

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
