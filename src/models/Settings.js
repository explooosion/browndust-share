import { get } from '../utils/Cookies';

export default {
  locale: get('locale') === undefined ? 'US' : get('locale'),
  countries: [
    'US',
    'ES',
    'DE',
    'TW',
    'CN',
    'JP',
    'KR',
    'TH',
  ],
  // language rule: https://github.com/ekwonye-richard/react-flags-select/blob/master/src/countries.js
  customLabels: {
    US: 'English',
    ES: 'Español',
    DE: 'German',
    TW: '繁體中文',
    CN: '简体中文',
    JP: '日本語',
    KR: '한국어',
    TH: 'ไทย',
  },
};
