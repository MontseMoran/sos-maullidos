import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";

export default function Adoption() {
  const { t } = useTranslation();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("cats")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (mounted) setCats(data || []);
    })();
    return () => (mounted = false);
  }, []);

  return (
    <main className="container">
      <h1>{t("adoption")}</h1>
      <p className="muted">{t("adoption_intro")}</p>
      <div className="grid">
        {cats.map((cat) => (
          <article key={cat.id} className="card">
            <img
              src={
                cat.image_path
                  ? supabase.storage
                      .from(import.meta.env.VITE_SUPABASE_BUCKET || "public")
                      .getPublicUrl(cat.image_path).publicUrl
                  : ""
              }
              alt={cat.name}
            />
            <h3>{cat.name}</h3>
            <div className="meta">
              {cat.age_text} • {cat.location}
            </div>
            <p>{cat.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
