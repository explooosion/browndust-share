import Cookies from 'js-cookie';

const Settings = {
  locale: Cookies.get('locale') === undefined ? 'en' : Cookies.get('locale'),
};

export default Settings;
