import "./NewsCard.css";

function NewsCard({
  article,
  isLoggedIn,
  isSaved,
  isSavedPage = false,
  isBusy,
  onToggleSave,
}) {
  let buttonLabel = "Inicia sesión para guardar artículos";

  if (isSavedPage) {
    buttonLabel = "Eliminar de guardados";
  } else if (isLoggedIn) {
    buttonLabel = isSaved ? "Quitar de mis artículos" : "Guardar artículo";
  }

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title}
        />

        {isSavedPage && article.keyword && (
          <span className="news-card__keyword">{article.keyword}</span>
        )}

        <button
          className="news-card__save-button"
          type="button"
          aria-label={buttonLabel}
          title={isLoggedIn ? buttonLabel : undefined}
          aria-disabled={!isLoggedIn}
          data-tooltip={isLoggedIn ? undefined : buttonLabel}
          aria-pressed={isSavedPage ? undefined : Boolean(isSaved)}
          disabled={isBusy}
          onClick={isLoggedIn ? onToggleSave : undefined}
        >
          <svg
            className="news-card__save-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isSavedPage ? (
              <g strokeLinecap="round">
                <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
                <path d="M10 10v7m4-7v7" />
              </g>
            ) : (
              <path
                d="M6 3H18V21L12 17L6 21V3Z"
                fill={isSaved ? "#2f71e5" : "none"}
                stroke={isSaved ? "#2f71e5" : "currentColor"}
              />
            )}
          </svg>
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{article.date}</p>

        <h3 className="news-card__title">
          <a
            className="news-card__title-link"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </h3>

        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;