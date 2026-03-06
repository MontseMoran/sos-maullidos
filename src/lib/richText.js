function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function toRichTextHtml(value) {
  const input = String(value ?? "");
  let safe = escapeHtml(input);

  // Allow only the small subset used by the admin toolbar.
  safe = safe
    .replace(/&lt;(\/?)(strong|em|u|b|i)&gt;/gi, (_, close, tag) => {
      const normalized =
        tag.toLowerCase() === "b"
          ? "strong"
          : tag.toLowerCase() === "i"
            ? "em"
            : tag.toLowerCase();
      return `<${close}${normalized}>`;
    })
    .replace(/&lt;br\s*\/?&gt;/gi, "<br />")
    .replace(/\r\n|\r|\n/g, "<br />");

  return safe;
}

export function stripRichText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, "")
    .trim();
}
