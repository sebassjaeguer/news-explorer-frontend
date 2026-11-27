import { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";
import {
  getArticles,
  createArticle,
  deleteArticle,
} from "../../utils/MainApi.js";
import "./NewsCardList.css";

function NewsCardList({ articles = [], keyword, onLoginClick }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);
  const [pendingUrl, setPendingUrl] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const [isReady, setIsReady] = useState(!token);

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    async function loadSavedArticles() {
      try {
        const data = await getArticles(token, controller.signal);

        if (!controller.signal.aborted) {
          setSavedArticles(data);
          setIsReady(true);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(
            "No se pudieron cargar tus guardados. Recarga la página para reintentar."
          );
        }
      }
    }

    loadSavedArticles();

    return () => controller.abort();
  }, [token]);

  async function handleToggleSave(article) {
    if (!token) {
      onLoginClick();
      return;
    }

    if (!isReady || pendingUrl) return;

    const saved = savedArticles.find(
      (item) => item.url === article.url
    );

    setPendingUrl(article.url);
    setError("");

    try {
      if (saved) {
        await deleteArticle(saved._id, token);

        setSavedArticles((items) =>
          items.filter((item) => item._id !== saved._id)
        );
      } else {
        const data = await createArticle(
          {
            ...article,
            keyword: article.keyword || keyword,
          },
          token
        );

        setSavedArticles((items) => [...items, data]);
      }
    } catch (err) {
      setError(
        err.message || "No se pudo conectar con el servidor."
      );
    } finally {
      setPendingUrl("");
    }
  }

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <h2 className="news-card-list__title">
          Resultados de la búsqueda
        </h2>

        {error && <p role="alert">{error}</p>}

        <div className="news-card-list__grid">
          {articles.slice(0, visibleCount).map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isLoggedIn={Boolean(token)}
              isSaved={savedArticles.some(
                (item) => item.url === article.url
              )}
              isBusy={!isReady || Boolean(pendingUrl)}
              onToggleSave={() => handleToggleSave(article)}
            />
          ))}
        </div>

        {visibleCount < articles.length && (
          <button
            className="news-card-list__more"
            type="button"
            onClick={() => setVisibleCount((count) => count + 3)}
          >
            Mostrar más
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;