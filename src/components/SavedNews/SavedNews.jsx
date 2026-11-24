import { useEffect, useState } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import {
  getArticles,
  deleteArticle,
} from "../../utils/MainApi.js";
import "./SavedNews.css";

function SavedNews() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const controller = new AbortController();

    async function loadArticles() {
      setIsLoading(true);
      setLoadError("");
      setDeleteError("");
      setArticles([]);

      try {
        const data = await getArticles(token, controller.signal);

        if (!controller.signal.aborted) {
          setArticles(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error.message || "No se pudieron cargar tus artículos guardados."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadArticles();

    return () => controller.abort();
  }, [token]);

  async function handleDelete(id) {
    if (deletingId) return;

    setDeletingId(id);
    setDeleteError("");

    try {
      await deleteArticle(id, token);

      setArticles((current) =>
        current.filter((article) => article._id !== id)
      );
    } catch (error) {
      setDeleteError(
        error.message || "No se pudo eliminar la noticia. Inténtalo de nuevo."
      );
    } finally {
      setDeletingId("");
    }
  }

  return (
    <main className="saved-news">
      {isLoading && (
        <p role="status">Cargando tus artículos…</p>
      )}

      {loadError && (
        <p role="alert">{loadError}</p>
      )}

      {!isLoading && !loadError && (
        <>
          <SavedNewsHeader articles={articles} />

          <section
            className="saved-news__articles"
            aria-label="Noticias guardadas"
          >
            <div className="saved-news__container">
              {deleteError && (
                <p role="alert">{deleteError}</p>
              )}

              {articles.length === 0 ? (
                <p className="saved-news__empty">
                  Todavía no tienes artículos guardados.
                </p>
              ) : (
                <div className="saved-news__grid">
                  {articles.map((article) => (
                    <NewsCard
                      key={article._id}
                      article={article}
                      isLoggedIn
                      isSaved
                      isSavedPage
                      isBusy={Boolean(deletingId)}
                      onToggleSave={() => handleDelete(article._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default SavedNews;