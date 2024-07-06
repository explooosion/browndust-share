import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import isUndefined from "lodash/isUndefined";

import { get } from "./utils/Cookies";
import flags from "./models/Flags";

const lng = isUndefined(get("locale")) ? "US" : get("locale");

i18n.use(detector)
    .use(initReactI18next)
    .init({
        resources: flags,
        lng,
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
