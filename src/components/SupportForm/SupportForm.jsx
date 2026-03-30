import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { loadTurnstileScript } from "../../lib/turnstile";
import "./SupportForm.scss";


export default function SupportForm({
  mode = "donation",
  context = null,
  showAmount,
}) {
  const { t, i18n } = useTranslation("common");

  const isCatLang =
    i18n.language?.startsWith("cat") ||
    i18n.language?.startsWith("ca");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [website, setWebsite] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);

  const [sending, setSending] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [warnMsg, setWarnMsg] = useState("");
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const title = useMemo(() => {
    if (mode === "volunteer") return t("support_volunteer_title");
    if (mode === "member") return t("support_member_title");
    if (mode === "sponsor") return t("support_sponsor_title");
    if (mode === "cat")
      return t("support_cat_title", { name: context?.catName || "" });
    return t("support_donation_title");
  }, [mode, context, t]);

  const shouldShowAmount =
    showAmount ?? ["donation", "member"].includes(mode);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) {
      setCaptchaReady(false);
      return;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !turnstileRef.current) return;

        if (turnstileWidgetId.current !== null) {
          turnstile.remove(turnstileWidgetId.current);
          turnstileWidgetId.current = null;
        }

        turnstileWidgetId.current = turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          theme: "light",
          callback: (token) => {
            setCaptchaToken(token);
            setErrMsg("");
          },
          "expired-callback": () => {
            setCaptchaToken("");
          },
          "error-callback": () => {
            setCaptchaToken("");
            setCaptchaReady(false);
            setErrMsg(t("support_captcha_load_error"));
          },
        });

        setCaptchaReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setCaptchaReady(false);
        setErrMsg(t("support_captcha_load_error"));
      });

    return () => {
      cancelled = true;

      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [t, turnstileSiteKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setErrMsg("");
    setOkMsg("");
    setWarnMsg("");

    if (!turnstileSiteKey) {
      setErrMsg(t("support_captcha_missing"));
      setSending(false);
      return;
    }

    if (!captchaToken) {
      setErrMsg(t("support_captcha_required"));
      setSending(false);
      return;
    }

    try {
      const payload = {
        mode,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        amount: shouldShowAmount ? Number(amount || 0) : null,
        message: message.trim(),

        cat_id: context?.catId || null,
        cat_name: context?.catName || null,

        lang: isCatLang ? "cat" : "es",
        turnstileToken: captchaToken,
        website: website.trim(),
      };

      const { data, error } = await supabase.functions.invoke(
        "send-inquiry-email",
        {
          body: payload,
        }
      );

      if (error) throw error;

      if (!data?.ok) {
        throw new Error(data?.error || "Unexpected response");
      }

      if (!data?.email_sent) {
        setWarnMsg(t("support_notice_email_failed"));
      }

      setOkMsg(t("support_sent_ok"));

      setName("");
      setEmail("");
      setPhone("");
      setAmount("");
      setMessage("");
      setAcceptedPrivacy(false);
      setWebsite("");
      setCaptchaToken("");

      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.reset(turnstileWidgetId.current);
      }

    } catch (err) {
      console.error("SupportForm submit error:", err);
      setErrMsg(t("support_sent_error"));

      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
      setCaptchaToken("");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="support-form">

      <h2 className="support-form__title">
        {title}
      </h2>

      <form
        className="support-form__grid"
        onSubmit={handleSubmit}
      >

        <label className="support-form__field">
          <span>{t("support_name")}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="support-form__field">
          <span>{t("support_email")}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="support-form__field">
          <span>{t("support_phone")}</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        {shouldShowAmount && (
          <label className="support-form__field">
            <span>{t("support_amount")}</span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        )}

        <label className="support-form__field support-form__field--full">
          <span>{t("support_message")}</span>
          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <label className="support-form__privacy support-form__field--full">
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            onInvalid={(e) =>
              e.target.setCustomValidity(
                isCatLang
                  ? "Has d'acceptar la política de privacitat per continuar."
                  : "Debes aceptar la política de privacidad para continuar."
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
            required
          />
          <span>
            {isCatLang
              ? "He llegit i accepto la "
              : "He leído y acepto la "}
            <Link to="/privacidad">
              {isCatLang ? "política de privacitat" : "política de privacidad"}
            </Link>
            .
          </span>
        </label>

        <label
          className="support-form__field support-form__field--full"
          style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <span>Website</span>
          <input
            tabIndex="-1"
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>

        <div className="support-form__field support-form__field--full">
          <span>{t("support_captcha_label")}</span>
          <div ref={turnstileRef} />
          {!captchaReady && (
            <div className="support-form__msg support-form__msg--warn">
              {t("support_captcha_loading")}
            </div>
          )}
        </div>

        {errMsg && (
          <div className="support-form__msg support-form__msg--err">
            {errMsg}
          </div>
        )}

        {okMsg && (
          <div className="support-form__msg support-form__msg--ok">
            {okMsg}
          </div>
        )}

        {warnMsg && (
          <div className="support-form__msg support-form__msg--warn">
            {warnMsg}
          </div>
        )}

        <button
          className="support-form__btn cat-card__readmore"
          disabled={sending || !turnstileSiteKey}
        >
          {sending
            ? t("support_sending")
            : t("support_send")}
        </button>

      </form>

    </section>
  );
}
