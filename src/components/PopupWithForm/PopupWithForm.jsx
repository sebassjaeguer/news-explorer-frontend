import { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({ title, children, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>

        <h2 className="popup__title">{title}</h2>

        <div className="popup__content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;