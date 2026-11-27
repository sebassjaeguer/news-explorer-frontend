import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import "./Header.css";

function Header({ onLoginClick, onLogout }) {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        NewsExplorer
      </Link>

      <Navigation
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;