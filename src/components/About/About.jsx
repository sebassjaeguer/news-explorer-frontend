import authorImage from "../../images/about-author.webp";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img
        className="about__image"
        src={authorImage}
        alt="Autora sentada sobre el césped"
        loading="lazy"
        decoding="async"
      />

      <div className="about__content">
        <h2 className="about__title">
          Acerca del autor
        </h2>

        <p className="about__description">
          Este bloque describe al autor del proyecto.
          Aquí debe indicar tu nombre, a qué te dedicas
          y qué tecnologías de desarrollo conoces.
        </p>

        <p className="about__description">
          También puedes hablar de tu experiencia con
          Practicum, de lo que aprendiste allí y de cómo
          puedes ayudar a los clientes potenciales.
        </p>
      </div>
    </section>
  );
}

export default About;