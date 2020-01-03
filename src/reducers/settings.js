import { set } from '../utils/Cookies';
import Settings from '../models/Settings';
import i18n from '../i18n';

export default (state = Settings, action) => {
  switch (action.type) {
    case 'SET_LOCALE':
      i18n.changeLanguage(action.payload.locale);
      set('locale', action.payload.locale);
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
