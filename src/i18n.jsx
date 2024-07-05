import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import _ from "lodash";

import { get } from "./utils/Cookies";

// 导入所有翻译文件
import US from "./locales/US.json";
import ES from "./locales/ES.json";
import DE from "./locales/DE.json";
import TW from "./locales/TW.json";
import CN from "./locales/CN.json";
import JP from "./locales/JP.json";
import KR from "./locales/KR.json";
import TH from "./locales/TH.json";

const resources = {
    US: { translation: US },
    ES: { translation: ES },
    DE: { translation: DE },
    TW: { translation: TW },
    CN: { translation: CN },
    JP: { translation: JP },
    KR: { translation: KR },
    TH: { translation: TH },
};

const lng = _.isUndefined(get("locale")) ? "US" : get("locale");

i18n.use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng,
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
