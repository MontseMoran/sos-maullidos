import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dropdown.scss";

export default function Dropdown({ label, items = [], id }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!panelRef.current) return;
      if (btnRef.current && btnRef.current.contains(e.target)) return;
      if (!panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div
      className="dropdown"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        className="drop-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        {label}
        <span className="caret" aria-hidden>
          ▾
        </span>
      </button>

      <div
        id={id}
        ref={panelRef}
        className={`drop-panel ${open ? "open" : ""}`}
        role="menu"
      >
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="drop-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
