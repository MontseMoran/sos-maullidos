import React, { useEffect, useRef } from "react";
import { toRichTextHtml } from "../../lib/richText";

function normalizeEditorHtml(rawHtml) {
  return String(rawHtml || "")
    .replace(/<div><br><\/div>/gi, "<br />")
    .replace(/<div>/gi, "<br />")
    .replace(/<\/div>/gi, "")
    .replace(/<p>/gi, "<br />")
    .replace(/<\/p>/gi, "")
    .replace(/<b>/gi, "<strong>")
    .replace(/<\/b>/gi, "</strong>")
    .replace(/<i>/gi, "<em>")
    .replace(/<\/i>/gi, "</em>")
    .replace(/&nbsp;/gi, " ")
    .replace(/<(?!\/?(strong|em|u|br)\b)[^>]*>/gi, "")
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br /><br />");
}

export default function RichTextEditor({
  label,
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 6, // kept for compatibility
}) {
  const editorRef = useRef(null);
  const lastValidRef = useRef("");
  const lastPropValueRef = useRef(String(value ?? ""));
  const draftValueRef = useRef(String(value ?? ""));

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const incoming = String(value ?? "");
    const editorIsFocused = document.activeElement === editor;

    // Never rewrite DOM while typing; it moves the caret.
    if (editorIsFocused) return;

    const nextHtml = toRichTextHtml(incoming);
    if (editor.innerHTML !== nextHtml) editor.innerHTML = nextHtml;
    lastValidRef.current = normalizeEditorHtml(editor.innerHTML);
    lastPropValueRef.current = incoming;
    draftValueRef.current = incoming;
  }, [value]);

  const applyTag = (command) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false);
    const normalized = normalizeEditorHtml(editor.innerHTML);
    lastValidRef.current = normalized;
    lastPropValueRef.current = normalized;
    draftValueRef.current = normalized;
    onChange(name, normalized);
  };

  const onInput = () => {
    const editor = editorRef.current;
    if (!editor) return;

    if (typeof maxLength === "number") {
      const textLen = (editor.textContent || "").length;
      if (textLen > maxLength) {
        editor.innerHTML = toRichTextHtml(lastValidRef.current);
        return;
      }
    }

    const normalized = normalizeEditorHtml(editor.innerHTML);
    lastValidRef.current = normalized;
    draftValueRef.current = normalized;
  };

  const onBlur = () => {
    const normalized = draftValueRef.current;
    if (normalized !== lastPropValueRef.current) {
      lastPropValueRef.current = normalized;
      onChange(name, normalized);
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  };

  const minHeight = Math.max(140, rows * 28);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertLineBreak");
    }
  };

  return (
    <div className="admin-richtext">
      <label>{label}</label>
      <div className="admin-richtext__toolbar" role="group" aria-label="Rich text toolbar">
        <button type="button" onClick={() => applyTag("bold")} aria-label="Negrita" title="Negrita">
          <span className="admin-richtext__icon admin-richtext__icon--bold">B</span>
        </button>
        <button type="button" onClick={() => applyTag("italic")} aria-label="Cursiva" title="Cursiva">
          <span className="admin-richtext__icon admin-richtext__icon--italic">I</span>
        </button>
        <button type="button" onClick={() => applyTag("underline")} aria-label="Subrayado" title="Subrayado">
          <span className="admin-richtext__icon admin-richtext__icon--underline">U</span>
        </button>
      </div>
      <div
        ref={editorRef}
        className="admin-richtext__editable"
        contentEditable
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder || ""}
        style={{ minHeight }}
        onInput={onInput}
        onBlur={onBlur}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        suppressContentEditableWarning
      />
    </div>
  );
}
