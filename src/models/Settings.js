import { get } from '../service/Cookies';

export default {
  locale: get('locale') === undefined ? 'US' : get('locale'),
  countries: ['US', 'TW', 'CN', 'KR', 'JP'],
  // language rule: https://github.com/ekwonye-richard/react-flags-select/blob/master/src/countries.js
  customLabels: { 'US': 'English (en-US)', 'TW': '正體中文 (zh-TW)', 'CN': '简体中文 (zh-CN)', 'KR': '대한민국 (ko-KR)', 'JP': '日本 (ja-JP)' },
};
