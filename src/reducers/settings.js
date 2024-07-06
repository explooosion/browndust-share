import { createSlice } from "@reduxjs/toolkit";

import { get, set } from "../utils/Cookies";
import i18n from "../i18n";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        locale: get("locale") === undefined ? "US" : get("locale"),
    },
    reducers: {
        setLocale(state, action) {
            i18n.changeLanguage(action.payload);
            set("locale", action.payload);
            state.locale = action.payload;
        },
    },
});

export const { setLocale } = settingsSlice.actions;

export default settingsSlice.reducer;
