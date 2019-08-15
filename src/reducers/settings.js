import Cookies from 'js-cookie';

import Settings from '../models/Settings';
import i18n from '../i18n';

const settings = (state = Settings, action) => {
  switch (action.type) {
    case 'SET_LOCALE':
      i18n.changeLanguage(action.locale);
      Cookies.set('locale', action.locale);
      return {
        locale: action.locale,
      };
    default:
      return state;
  }
}

export default settings;
