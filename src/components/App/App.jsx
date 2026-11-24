import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import RegisterSuccess from "../RegisterSuccess/RegisterSuccess.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import {
  getCurrentUser,
  login,
  register,
} from "../../utils/MainApi.js";
import { getNews } from "../../utils/newsApi.js";

import "./App.css";

function readSavedSearch() {
  try {
    const savedArticles = localStorage.getItem("articles");
    const keyword = localStorage.getItem("keyword");

    if (savedArticles && keyword) {
      const articles = JSON.parse(savedArticles);

      if (Array.isArray(articles)) {
        return {
          articles,
          keyword,
          hasSearched: true,
        };
      }
    }
  } catch {
    // Si los datos guardados son inválidos, iniciamos sin resultados.
  }

  return {
    articles: [],
    keyword: "",
    hasSearched: false,
  };
}

function App() {
  const [initialSearch] = useState(readSavedSearch);

  const [searchKeyword, setSearchKeyword] = useState(
    initialSearch.keyword
  );
  const [articles, setArticles] = useState(initialSearch.articles);
  const [hasSearched, setHasSearched] = useState(
    initialSearch.hasSearched
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const [sessionError, setSessionError] = useState("");

  const [activePopup, setActivePopup] = useState(null);

  const userName = currentUser?.name || "";

  const handleLoginClick = useCallback(() => {
    setActivePopup("login");
  }, []);

  const handleRegisterClick = useCallback(() => {
    setActivePopup("register");
  }, []);

  const handleClosePopup = useCallback(() => {
    setActivePopup(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const controller = new AbortController();

    async function checkSession() {
      try {
        const user = await getCurrentUser(
          token,
          controller.signal
        );

        if (
          controller.signal.aborted ||
          localStorage.getItem("token") !== token
        ) {
          return;
        }

        setCurrentUser(user);
        localStorage.setItem("userName", user.name);
        setSessionError("");
      } catch (error) {
        if (
          controller.signal.aborted ||
          localStorage.getItem("token") !== token
        ) {
          return;
        }

        if (
          error.statusCode === 401 ||
          error.statusCode === 404
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          setCurrentUser(null);
        } else {
          setSessionError(
            "No se pudo comprobar tu sesión. Recarga la página para reintentar."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => controller.abort();
  }, []);

  async function handleSearch(keyword) {
    setSearchKeyword(keyword);
    setHasSearched(true);
    setIsLoading(true);
    setSearchError("");
    setArticles([]);

    localStorage.removeItem("articles");
    localStorage.removeItem("keyword");

    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;

      if (!apiKey) {
        throw new Error("Falta configurar la clave de News API");
      }

      const data = await getNews(keyword, apiKey);

      const formattedArticles = (data.articles || [])
        .filter((article) => article.title && article.urlToImage)
        .map((article) => ({
          id: article.url,
          keyword,
          date: new Date(article.publishedAt).toLocaleDateString(
            "es-MX",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          ),
          title: article.title,
          description:
            article.description?.trim() ||
            "Descripción no disponible.",
          source: article.source?.name || "Fuente desconocida",
          image: article.urlToImage,
          url: article.url,
        }));

      setArticles(formattedArticles);

      localStorage.setItem(
        "articles",
        JSON.stringify(formattedArticles)
      );
      localStorage.setItem("keyword", keyword);
    } catch (error) {
      console.error("Error al buscar noticias:", error);

      setSearchError(
        "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(data) {
    const result = await login(data);

    localStorage.setItem("token", result.token);
    localStorage.setItem("userName", result.user.name);

    setCurrentUser(result.user);
    setSessionError("");
    handleClosePopup();
  }

  async function handleRegister(data) {
    await register(data);
    setActivePopup("register-success");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    setCurrentUser(null);
    setSessionError("");
    handleClosePopup();
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            onLoginClick={handleLoginClick}
            onLogout={handleLogout}
            userName={userName}
          />

          {isCheckingSession ? (
            <main className="main">
              <p role="status">Comprobando tu sesión…</p>
            </main>
          ) : sessionError ? (
            <main className="main">
              <p role="alert">{sessionError}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </main>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    onLoginClick={handleLoginClick}
                    searchKeyword={searchKeyword}
                    onSearchKeywordChange={setSearchKeyword}
                    articles={articles}
                    hasSearched={hasSearched}
                    isLoading={isLoading}
                    searchError={searchError}
                    onSearch={handleSearch}
                  />
                }
              />

              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute
                    onRequireLogin={handleLoginClick}
                  >
                    <SavedNews userName={userName} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          )}

          <Footer />

          <Login
            isOpen={activePopup === "login"}
            onClose={handleClosePopup}
            onRegisterClick={handleRegisterClick}
            onLogin={handleLogin}
          />

          <Register
            isOpen={activePopup === "register"}
            onClose={handleClosePopup}
            onLoginClick={handleLoginClick}
            onRegister={handleRegister}
          />

          <RegisterSuccess
            isOpen={activePopup === "register-success"}
            onClose={handleClosePopup}
            onLoginClick={handleLoginClick}
          />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;