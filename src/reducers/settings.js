import { createSlice } from '@reduxjs/toolkit';

import { set } from '../utils/Cookies';
import Settings from '../models/Settings';
import i18n from '../i18n';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: Settings,
  reducers: {
    setLocale(state, action) {
      i18n.changeLanguage(action.payload);
      set('locale', action.payload);
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = settingsSlice.actions;

export default settingsSlice.reducer;
