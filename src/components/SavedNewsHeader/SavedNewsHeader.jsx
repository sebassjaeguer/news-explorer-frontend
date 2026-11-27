import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ articles }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "";
  const count = articles.length;

  const keywordCounts = new Map();

  articles.forEach((article) => {
    const keyword = article.keyword?.trim();

    if (!keyword) return;

    keywordCounts.set(
      keyword,
      (keywordCounts.get(keyword) || 0) + 1
    );
  });

  const keywords = [...keywordCounts.entries()]
    .sort((first, second) => {
      const frequencyDifference = second[1] - first[1];

      return (
        frequencyDifference ||
        first[0].localeCompare(second[0], "es")
      );
    })
    .map(([keyword]) => keyword);

  const visibleKeywords =
    keywords.length <= 3 ? keywords : keywords.slice(0, 2);

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__subtitle">
        Artículos guardados
      </p>

      <h1 className="saved-news-header__title">
        {userName}, tienes {count}{" "}
        {count === 1 ? "artículo guardado" : "artículos guardados"}
      </h1>

      {keywords.length > 0 && (
        <p className="saved-news-header__keywords">
          Por palabras clave:{" "}
          <strong>{visibleKeywords.join(", ")}</strong>
          {keywords.length > 3 && ` y ${keywords.length - 2} más`}
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;