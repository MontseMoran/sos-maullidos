import React from "react";
import { useTranslation } from "react-i18next";

export default function Ajuda() {
  const { t } = useTranslation();

  return (
    <main className="container">
      <h1>{t("cta_how_help")}</h1>
      <section id="donar" className="card" style={{ marginTop: 12 }}>
        <h2>{t("help_donate")}</h2>
        <p>Haz una donacion puntual o mensual para apoyar rescates.</p>
      </section>
      <section id="comprar" className="card" style={{ marginTop: 12 }}>
        <h2>{t("help_shop")}</h2>
        <p>Compra en la tienda solidaria y ayuda a financiar cuidados.</p>
      </section>
      <section id="voluntariat" className="card" style={{ marginTop: 12 }}>
        <h2>{t("help_volunteer")}</h2>
        <p>Unete como voluntario en eventos, acogidas o transporte.</p>
      </section>
    </main>
  );
}
