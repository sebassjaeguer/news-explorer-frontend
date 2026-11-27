import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

function LoginForm({ onClose, onRegisterClick, onLogin }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const input = event.target;
    const { name, value, validity } = input;

    let message = "";

    if (validity.valueMissing) {
      message =
        name === "email"
          ? "Introduce tu correo electrónico"
          : "Introduce tu contraseña";
    } else if (validity.typeMismatch) {
      message = "Introduce un correo electrónico válido";
    } else if (name === "password" && value.length < 8) {
      message = "La contraseña debe tener al menos 8 caracteres";
    }

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: message,
    }));

    setServerError("");
    setIsValid(input.form.checkValidity());
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || !event.currentTarget.checkValidity()) {
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      await onLogin(values);
    } catch (error) {
      setServerError(
        error.message || "No se pudo iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    if (!isSubmitting) {
      onClose();
    }
  }

  return (
    <PopupWithForm
      title="Iniciar sesión"
      isOpen
      onClose={handleClose}
    >
      <form
        className="popup__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="popup__label" htmlFor="login-email">
          Correo electrónico
        </label>

        <input
          className="popup__input"
          id="login-email"
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-describedby="login-email-error"
          aria-invalid={Boolean(errors.email)}
          required
        />

        <span className="popup__error" id="login-email-error">
          {errors.email}
        </span>

        <label className="popup__label" htmlFor="login-password">
          Contraseña
        </label>

        <input
          className="popup__input"
          id="login-password"
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          autoComplete="current-password"
          minLength={8}
          value={values.password}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-describedby="login-password-error"
          aria-invalid={Boolean(errors.password)}
          required
        />

        <span className="popup__error" id="login-password-error">
          {errors.password}
        </span>

        {serverError && (
          <p className="popup__error" role="alert">
            {serverError}
          </p>
        )}

        <button
          className="popup__submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Entrando…" : "Iniciar sesión"}
        </button>
      </form>

      <p className="popup__switch">
        ¿No tienes una cuenta?{" "}
        <button
          className="popup__switch-button"
          type="button"
          disabled={isSubmitting}
          onClick={onRegisterClick}
        >
          Regístrate
        </button>
      </p>
    </PopupWithForm>
  );
}

function Login({ isOpen, onClose, onRegisterClick, onLogin }) {
  if (!isOpen) return null;

  return (
    <LoginForm
      onClose={onClose}
      onRegisterClick={onRegisterClick}
      onLogin={onLogin}
    />
  );
}

export default Login;