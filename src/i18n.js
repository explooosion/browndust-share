import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import _ from 'lodash';

import { get } from './utils/Cookies';

// the translations
// (tip move them in a JSON file and import them)
const locales = ['US', 'TW', 'CN', 'KR', 'JP'];

const resources = locales.reduce((prev, current) => ({
  ...prev,
  [current]: { translation: require(`./locales/${current}.json`) },
}), {});

const lng = _.isUndefined(get('locale')) ? 'US' : get('locale');

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
