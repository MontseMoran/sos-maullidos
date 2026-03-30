let turnstileScriptPromise = null;

export function loadTurnstileScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile unavailable on server"));
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]'
      );

      if (existing) {
        existing.addEventListener("load", () => resolve(window.turnstile), {
          once: true,
        });
        existing.addEventListener(
          "error",
          () => reject(new Error("Failed to load Turnstile")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () =>
        reject(new Error("Failed to load Turnstile"));
      document.head.appendChild(script);
    });
  }

  return turnstileScriptPromise;
}
