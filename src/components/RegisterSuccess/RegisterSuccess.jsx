import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

function RegisterSuccess({ isOpen, onClose, onLoginClick }) {
  return (
    <PopupWithForm
      title="¡Registro completado con éxito!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="popup__switch">
        <button
          className="popup__switch-button"
          type="button"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </button>
      </p>
    </PopupWithForm>
  );
}

export default RegisterSuccess;