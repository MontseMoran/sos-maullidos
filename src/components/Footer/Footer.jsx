import React from "react";
import { useTranslation } from "react-i18next";
import "./footer.scss";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="inner">
        <div className="left">
          <div className="brand-small">{t("brand")}</div>
          <div className="contact-small">
            {t("contact_email")}{" "}
            <a href="mailto:contacto@sosmaullidos.org">
              contacto@sosmaullidos.org
            </a>
          </div>
          <div className="contact-small">
            {t("contact_whatsapp")}{" "}
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              +34 600 000 000
            </a>
          </div>
        </div>

        <div className="socials">
          <div className="social-label">{t("footer_redes")}</div>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/sosmaullidos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                  stroke="#333"
                  strokeWidth="1.2"
                  fill="#fff"
                />
                <path
                  d="M12 8.2a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6z"
                  stroke="#333"
                  strokeWidth="1.2"
                  fill="#ff8a65"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/sosmaullidos?locale=es_ES"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 3h3v4h-3v2h3v6h-3v8h-4v-8H9v-6h2V7a3 3 0 013-3h1z"
                  fill="#1877F2"
                />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@sos.maullidos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 3v8a4 4 0 11-4-4"
                  stroke="#000"
                  strokeWidth="1.2"
                  fill="#000"
                />
              </svg>
            </a>
            <a
              href="https://x.com/sos_maullidos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3l18 18M21 3L3 21"
                  stroke="#333"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="right">
          <div className="help-cta">
            <a className="btn" href="/contacto">
              {t("footer_help")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
