import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";
import "../styles/postDetail.scss";

export default function PostDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (mounted) {
        setPost(data);
        setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [id]);

  if (loading) return <main className="postDetail">Cargando...</main>;
  if (!post) return <main className="postDetail">No encontrado</main>;

  const isCat = i18n.language?.startsWith("cat");

  const title =
    (isCat ? post.title_cat : post.title_es) ||
    post.title_es ||
    post.title_cat ||
    "";

  const content =
    (isCat ? post.content_cat : post.content_es) ||
    post.content_es ||
    post.content_cat ||
    "";

  const imageUrl = post.image_path
    ? supabase.storage.from("cats").getPublicUrl(post.image_path).data?.publicUrl
    : null;

  return (
    <main className="postDetail">
      <div className="postDetail__container">

        {imageUrl && (
          <img
            className="postDetail__image"
            src={imageUrl}
            alt={title}
          />
        )}

        <h1 className="postDetail__title">{title}</h1>

        <div className="postDetail__content">
          {content}
        </div>

      </div>
    </main>
  );
}