import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./Navigation.css";

function getLinkClassName({ isActive }) {
  return isActive
    ? "navigation__link navigation__link_active"
    : "navigation__link";
}

function Navigation({ onLoginClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleAccountClick() {
    closeMenu();

    if (currentUser) {
      onLogout();
    } else {
      onLoginClick();
    }
  }

  return (
    <nav className="navigation" aria-label="Navegación principal">
      <button
        className={`navigation__menu-button ${
          isMenuOpen ? "navigation__menu-button_open" : ""
        }`}
        type="button"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        aria-controls="navigation-list"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="navigation__menu-line" />
        <span className="navigation__menu-line" />
      </button>

      <ul
        id="navigation-list"
        className={`navigation__list ${
          isMenuOpen ? "navigation__list_open" : ""
        }`}
      >
        <li className="navigation__item">
          <NavLink
            to="/"
            end
            className={getLinkClassName}
            onClick={closeMenu}
          >
            Inicio
          </NavLink>
        </li>

        {currentUser && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={getLinkClassName}
              onClick={closeMenu}
            >
              Artículos guardados
            </NavLink>
          </li>
        )}

        <li className="navigation__item">
          <button
            className="navigation__button"
            type="button"
            onClick={handleAccountClick}
            aria-label={
              currentUser
                ? `Cerrar sesión de ${currentUser.name}`
                : "Iniciar sesión"
            }
            title={currentUser ? "Cerrar sesión" : undefined}
          >
            {currentUser ? currentUser.name : "Iniciar sesión"}

            {currentUser && (
              <svg
                className="navigation__logout-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10 4H5v16h5" />
                <path d="M9 12h11m-5-5 5 5-5 5" />
              </svg>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;