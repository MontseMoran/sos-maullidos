import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
const heroPositions = [
  "center 35%", // Félix (blanco y negro)
  "center 15%", // Vincent (naranja)
];

const heroImages = ["/images/felix.png", "/images/vincent.png"];
export default function Home() {
  const { t } = useTranslation();
  const [isAActive, setIsAActive] = useState(true);
  const [aIndex, setAIndex] = useState(0);
  const [bIndex, setBIndex] = useState(1);

  
useEffect(() => {
  const interval = setInterval(() => {
    // 1) Calculamos cuál es la imagen "actual" (la que se está viendo)
    const visibleIndex = isAActive ? aIndex : bIndex;

    // 2) Calculamos la siguiente imagen
    const nextIndex = (visibleIndex + 1) % heroImages.length;

    // 3) Cargamos la siguiente imagen en la capa que está OCULTA
    if (isAActive) {
      setBIndex(nextIndex); // A se ve, B se prepara
    } else {
      setAIndex(nextIndex); // B se ve, A se prepara
    }

    // 4)  hacemos el fundido cambiando la capa activa
    setIsAActive((prev) => !prev);
  }, 5000);

  return () => clearInterval(interval);
}, [isAActive, aIndex, bIndex]);


  return (
    <main>
      <section className="hero">
       <div className={`hero-bg ${isAActive ? "is-active" : ""}`}
    style={{
  backgroundImage: `url(${heroImages[aIndex]})`,
  backgroundPosition: heroPositions[aIndex],
}}

/>

<div className={`hero-bg ${!isAActive ? "is-active" : ""}`}
     style={{
  backgroundImage: `url(${heroImages[bIndex]})`,
  backgroundPosition: heroPositions[bIndex],
}}

/>


        <div className="hero-inner container">
          <div>
            <h1 className="hero-title">{t("home_hero_title")}</h1>
          </div>
          {/*<p className="muted">{t("home_hero_sub")}</p>
            <div className="hero-ctas">
              <Link to="/adopcion" className="btn large">
                {t("cta_view_cats")}
              </Link>
              <Link to="/contacto" className="btn outline">
                {t("cta_how_help")}
              </Link>
            </div>
          </div> */}
          <div className="hero-illustration" aria-hidden></div>
        </div>
      </section>
      <section className="container">
        <h2>{t("adoption")}</h2>
        <p className="muted">{t("adoption_intro")}</p>
      </section>
    </main>
  );
}
