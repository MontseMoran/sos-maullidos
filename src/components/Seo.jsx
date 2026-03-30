import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "SOS Maullidos";
const SITE_URL = "https://www.sosmaullidos.org";
const DEFAULT_TITLE = `${SITE_NAME} | Asociación felina en Pallejà (Barcelona)`;
const DEFAULT_DESCRIPTION =
  "SOS Maullidos es una asociación felina de Pallejà (Barcelona). Rescatamos, cuidamos y buscamos adopción responsable para gatos y gatitos. Colabora, amadrina o adopta.";
const DEFAULT_IMAGE = `${SITE_URL}/images/logo_transp.png`;

const ROUTE_META = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/quienes-somos": {
    title: `Quiénes Somos | ${SITE_NAME}`,
    description:
      "Conoce la labor de SOS Maullidos, nuestra asociación felina en Pallejà y cómo cuidamos, rescatamos y acompañamos a los gatos de la colonia.",
  },
  "/adopcion": {
    title: `Adopción | ${SITE_NAME}`,
    description:
      "Descubre los gatos y gatitos en adopción responsable de SOS Maullidos y encuentra su perfil completo antes de adoptar.",
  },
  "/casos-dificiles": {
    title: `Casos Difíciles | ${SITE_NAME}`,
    description:
      "Conoce los casos especiales de SOS Maullidos y cómo puedes ayudar mediante adopción, padrinazgo o apoyo económico.",
  },
  "/ultimos-adoptados": {
    title: `Últimos Adoptados | ${SITE_NAME}`,
    description:
      "Consulta las últimas adopciones gestionadas por SOS Maullidos y las historias de gatos que ya han encontrado hogar.",
  },
  "/donar": {
    title: `Donar | ${SITE_NAME}`,
    description:
      "Apoya a SOS Maullidos con donaciones para cubrir rescates, alimentación, esterilizaciones y atención veterinaria.",
  },
  "/voluntariat": {
    title: `Voluntariado | ${SITE_NAME}`,
    description:
      "Colabora como voluntario con SOS Maullidos y participa en el cuidado, rescate y bienestar de los gatos de la asociación.",
  },
  "/compras-solidarias": {
    title: `Compras Solidarias | ${SITE_NAME}`,
    description:
      "Ayuda a SOS Maullidos mediante compras solidarias y otras formas de colaboración para sostener el trabajo diario de la asociación.",
  },
  "/noticias": {
    title: `Noticias | ${SITE_NAME}`,
    description:
      "Lee las noticias y novedades de SOS Maullidos sobre rescates, campañas, eventos y actualidad de la asociación.",
  },
  "/blog": {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Consulta artículos, historias y contenidos del blog de SOS Maullidos sobre gatos, cuidados y adopción responsable.",
  },
  "/contacto": {
    title: `Contacto | ${SITE_NAME}`,
    description:
      "Contacta con SOS Maullidos para adopciones, colaboraciones, dudas sobre colonias felinas o ayuda con gatos necesitados.",
  },
  "/privacidad": {
    title: `Privacidad | ${SITE_NAME}`,
    description:
      "Consulta la política de privacidad y el tratamiento de datos personales en la web de SOS Maullidos.",
  },
};

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function ensureLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function buildMeta(pathname) {
  if (pathname.startsWith("/admin")) {
    return {
      title: `Admin | ${SITE_NAME}`,
      description: "Área de administración de SOS Maullidos.",
      robots: "noindex, nofollow",
      canonical: `${SITE_URL}${pathname}`,
    };
  }

  if (pathname.startsWith("/adopcion/")) {
    return {
      title: `Ficha de Adopción | ${SITE_NAME}`,
      description:
        "Consulta la ficha completa del gato o gatito en adopción, con información de salud, carácter y necesidades.",
      canonical: `${SITE_URL}${pathname}`,
    };
  }

  if (pathname.startsWith("/noticias/")) {
    return {
      title: `Noticia | ${SITE_NAME}`,
      description:
        "Lee la noticia completa de SOS Maullidos sobre rescates, campañas y actualidad de la asociación.",
      canonical: `${SITE_URL}${pathname}`,
    };
  }

  if (pathname.startsWith("/blog/")) {
    return {
      title: `Artículo | ${SITE_NAME}`,
      description:
        "Lee el artículo completo del blog de SOS Maullidos sobre gatos, cuidados y adopción responsable.",
      canonical: `${SITE_URL}${pathname}`,
    };
  }

  if (pathname.startsWith("/historias/")) {
    return {
      title: `Historia | ${SITE_NAME}`,
      description:
        "Descubre una historia destacada de SOS Maullidos y el recorrido de sus gatos hasta encontrar ayuda o un hogar.",
      canonical: `${SITE_URL}${pathname}`,
    };
  }

  const routeMeta = ROUTE_META[pathname] || ROUTE_META["/"];

  return {
    ...routeMeta,
    robots: "index, follow",
    canonical: `${SITE_URL}${pathname}`,
  };
}

export default function Seo() {
  const location = useLocation();

  useEffect(() => {
    const meta = buildMeta(location.pathname);

    document.title = meta.title;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: meta.description,
    });
    ensureMeta('meta[name="robots"]', {
      name: "robots",
      content: meta.robots,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    ensureMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "es_ES",
    });
    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: meta.title,
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: meta.canonical,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: DEFAULT_IMAGE,
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: meta.title,
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: meta.description,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: DEFAULT_IMAGE,
    });
    ensureLink('link[rel="canonical"]', {
      rel: "canonical",
      href: meta.canonical,
    });
  }, [location.pathname]);

  return null;
}
