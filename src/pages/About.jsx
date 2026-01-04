import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <main className="container">
      <h1>{t("about")}</h1>
      <p className="muted">{t("about_desc")}</p>
    </main>
  );
}
