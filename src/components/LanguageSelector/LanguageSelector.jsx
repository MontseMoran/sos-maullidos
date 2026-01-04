import React from "react";
import { useTranslation } from "react-i18next";
import "./language-selector.scss";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("locale", lng);
  };

  const current = i18n.language?.startsWith("ca") ? "ca" : "es";

  return (
    <div className="lang-switch">
      <button
        className={`lang-btn ${current === "es" ? "active" : ""}`}
        onClick={() => setLang("es")}
        aria-label="Español"
      >
        ES
      </button>

      <button
        className={`lang-btn ${current === "ca" ? "active" : ""}`}
        onClick={() => setLang("ca")}
        aria-label="Català"
      >
        CAT
      </button>
    </div>
  );
}

