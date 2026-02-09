import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
const heroPositions = [
  "center 35%", // Félix (blanco y negro)
  "center 15%",// Vincent (naranja)
  "center 25%" //bob
];

const heroImages = ["images/felix.png", "images/vincent.png", "images/bob.png"];
export default function Home() {
  const { t: tHome } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");


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
          <h1 className="hero-title">{tHome("hero_title")}</h1>
          <div className="hero-illustration" aria-hidden></div>
        </div>
      </section>

      <section className="help-section">
        <div className="container">
          <h2 className="help-title">{tHome("help_title")}</h2>

          <div className="help-grid">
            <Link to="/adopcion" className="help-card">
              <div class="help-icon-wrapper">
                <img className="help-icon help-icon--adopt" src="images/adoptar.png" alt="" aria-hidden="true" />
              </div>
              <h3>{tHome("help_adopt_title")}</h3>
              <p className="muted">{tHome("help_adopt_desc")}</p>
            </Link>

            <Link to="/donar" className="help-card">
              <div class="help-icon-wrapper">
                <img className="help-icon" src="images/donar.png" alt="" aria-hidden="true" />
              </div>
              <h3>{tHome("help_donate_title")}</h3>
              <p className="muted">{tHome("help_donate_desc")}</p>
            </Link>

            <Link to="/voluntariat" className="help-card">
              <div class="help-icon-wrapper">
                <img className="help-icon" src="images/colaborar.png" alt="" aria-hidden="true" />
              </div>
              <h3>{tHome("help_volunteer_title")}</h3>
              <p className="muted">{tHome("help_volunteer_desc")}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="container success-section">
        <h2>{tHome("success_title")}</h2>
        <p className="muted">{tHome("success_intro")}</p>

        <div className="stories-grid">

          <div className="story-card">
            <div className="story-image">
              <img src="images/felix.png" alt="Félix" />
              <span className="badge">{tHome("adopted_badge")}</span>
            </div>
            <p>{tHome("felix_excerpt")}</p>
            <Link to="/historias/felix" className="btn">
              {tHome("read_story")}
            </Link>
          </div>

          <div className="story-card">
            <div className="story-image">
              <img src="images/vincent.png" alt="Vincent" />
              <span className="badge">{tHome("adopted_badge")}</span>
            </div>
            <p>{tHome("vincent_excerpt")}</p>
            <Link to="/historias/vincent" className="btn">
              {tHome("read_story")}
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
