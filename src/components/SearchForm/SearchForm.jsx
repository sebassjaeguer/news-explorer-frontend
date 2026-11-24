
import { useState } from "react";
import "./SearchForm.css";

function SearchForm({
  onSearch,
  searchKeyword,
  onSearchKeywordChange,
  isLoading,
}) {
  const [searchError, setSearchError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;

    const keyword = searchKeyword.trim();

    if (!keyword) {
      setSearchError("Por favor, introduzca una palabra clave");
      return;
    }

    setSearchError("");
    onSearch(keyword);
  };

  return (
    <div className="search-form-container">
      <form
        className="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="search-form__input"
          type="search"
          name="keyword"
          placeholder="Introduce un tema"
          aria-label="Tema de búsqueda"
          value={searchKeyword}
          onChange={(event) =>
            onSearchKeywordChange(event.target.value)
          }
          required
        />

       <button
  className="search-form__button"
  type="submit"
  disabled={isLoading}
>
  {isLoading ? "Buscando…" : "Buscar"}
</button>
      </form>

      {searchError && (
        <span className="search-form__error" role="alert">
          {searchError}
        </span>
      )}
    </div>
  );
}

export default SearchForm;
