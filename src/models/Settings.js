import { get } from '../service/Cookies';

export default {
  locale: get('locale') === undefined ? 'US' : get('locale'),
  countries: ['US', 'TW', 'CN', 'KR', 'JP'],
  // language rule: https://github.com/ekwonye-richard/react-flags-select/blob/master/src/countries.js
  customLabels: { 'US': 'English', 'TW': 'Traditional Chinese', 'CN': 'Simplified Chinese', 'KR': 'Korea', 'JP': 'Japan' },
};
