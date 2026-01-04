import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";

export default function News() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .in("type", ["news", "event"])
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (mounted) setPosts(data || []);
    })();
    return () => (mounted = false);
  }, []);

  return (
    <main className="container">
      <h1>{t("news")}</h1>
      <div className="grid">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <img
              src={
                p.image_path
                  ? supabase.storage
                      .from(import.meta.env.VITE_SUPABASE_BUCKET || "public")
                      .getPublicUrl(p.image_path).publicUrl
                  : ""
              }
              alt={p.title}
            />
            <h3>{p.title}</h3>
            <p className="meta">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
