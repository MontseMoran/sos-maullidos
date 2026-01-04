import React from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <main className="container">
      <h1>{t("contact_title")}</h1>

      <section className="card">
        <h2>{t("help_title")}</h2>
        <p className="muted">{t("contact_intro")}</p>
        <div className="cta-grid">
          <a
            className="btn"
            href="https://www.teaming.net/sosmaullidos"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("help_teaming")}
          </a>
          <a
            className="btn"
            href="https://www.amazon.es/hz/wishlist/ls/1EXW0OQXB7M6B?ref_=wl_share"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("help_amazon")}
          </a>
          <a
            className="btn"
            href="https://es.wallapop.com/user/sosmaullidosp-275011390"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("help_wallapop")}
          </a>
          <a
            className="btn"
            href="https://www.vinted.es/member/187388390-sosmaullidos"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("help_vinted")}
          </a>
        </div>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h2>{t("contact_title")}</h2>
        <p className="muted">{t("contact_intro")}</p>
        <p>
          {t("contact_email")}{" "}
          <a href="mailto:contacto@sosmaullidos.org">
            contacto@sosmaullidos.org
          </a>
        </p>
        <p>
          {t("contact_whatsapp")}{" "}
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            +34 600 000 000
          </a>
        </p>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>{t("collaborations")}</h3>
        <p className="muted">{t("collaborations_intro")}</p>
        <ul className="secondary-list">
          <li>
            <a
              href="https://www.gosigatalimentacio.org/ca/39-sos-maullidos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gos i Gat Alimentació
            </a>
          </li>
          <li>
            <a
              href="https://www.bodas.net/detalles-de-bodas/sos-maullidos--e158091"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bodas.net — detalles solidarios
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
