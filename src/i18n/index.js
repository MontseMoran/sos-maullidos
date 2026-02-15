import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esCommon from "./locales/es/common.json";
import catCommon from "./locales/cat/common.json";
import esHome from "./locales/es/home.json";
import catHome from "./locales/cat/home.json";
import esAbout from "./locales/es/about.json";
import catAbout from "./locales/cat/about.json";



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
 resources: {
  es: {
    common: esCommon,
    home: esHome,
    about: esAbout,
  },
  ca: {
    common: catCommon,
    home: catHome,
    about: catAbout,
  },
},
ns: ["common", "home", "about"],
defaultNS: "common",

    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
