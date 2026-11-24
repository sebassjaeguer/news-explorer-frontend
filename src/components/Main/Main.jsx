import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import About from "../About/About.jsx";
import Preloader from "../Preloader/Preloader.jsx";

import "./Main.css";

function Main({
  onLoginClick,
  searchKeyword,
  onSearchKeywordChange,
  articles,
  hasSearched,
  isLoading,
  searchError,
  onSearch,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="main__intro">
        <h1 className="main__title">
          ¿Qué está pasando en el mundo?
        </h1>

        <p className="main__description">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas
          en tu cuenta personal.
        </p>

        <SearchForm
          onSearch={onSearch}
          searchKeyword={searchKeyword}
          onSearchKeywordChange={onSearchKeywordChange}
          isLoading={isLoading}
        />
      </section>

      {isLoading && <Preloader />}

      {hasSearched && !isLoading && searchError && (
        <section className="main__search-message" role="alert">
          <p>{searchError}</p>
        </section>
      )}

      {hasSearched &&
        !isLoading &&
        !searchError &&
        articles.length === 0 && (
          <section className="main__search-message">
            <h2>No se ha encontrado nada</h2>
            <p>
              Lo sentimos, pero no hay nada que coincida con tus términos
              de búsqueda.
            </p>
          </section>
        )}

      {hasSearched &&
        !isLoading &&
        !searchError &&
        articles.length > 0 && (
          <NewsCardList
            key={currentUser?._id || "visitante"}
            articles={articles}
            keyword={searchKeyword}
            onLoginClick={onLoginClick}
          />
        )}

      <About />
    </main>
  );
}

export default Main;