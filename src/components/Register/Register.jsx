import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

function RegisterForm({ onClose, onLoginClick, onRegister }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const input = event.target;
    const { name, value } = input;

    input.setCustomValidity("");

    let message = "";

    if (input.validity.valueMissing) {
      const requiredMessages = {
        email: "Introduce tu correo electrónico",
        password: "Introduce tu contraseña",
        name: "Introduce tu nombre",
      };

      message = requiredMessages[name];
    } else if (input.validity.typeMismatch) {
      message = "Introduce un correo electrónico válido";
    } else if (name === "password" && value.length < 8) {
      message = "La contraseña debe tener al menos 8 caracteres";
    } else if (name === "name" && value.trim().length < 2) {
      message = "El nombre debe tener al menos 2 caracteres";
    } else if (name === "name" && value.trim().length > 30) {
      message = "El nombre debe tener como máximo 30 caracteres";
    }

    input.setCustomValidity(message);

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
      await onRegister({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
    } catch (error) {
      setServerError(
        error.message || "No se pudo crear la cuenta. Inténtalo de nuevo."
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
      title="Registrarse"
      isOpen
      onClose={handleClose}
    >
      <form
        className="popup__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="popup__label" htmlFor="register-email">
          Correo electrónico
        </label>

        <input
          className="popup__input"
          id="register-email"
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-describedby="register-email-error"
          aria-invalid={Boolean(errors.email)}
          required
        />

        <span className="popup__error" id="register-email-error">
          {errors.email}
        </span>

        <label className="popup__label" htmlFor="register-password">
          Contraseña
        </label>

        <input
          className="popup__input"
          id="register-password"
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          autoComplete="new-password"
          minLength={8}
          value={values.password}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-describedby="register-password-error"
          aria-invalid={Boolean(errors.password)}
          required
        />

        <span className="popup__error" id="register-password-error">
          {errors.password}
        </span>

        <label className="popup__label" htmlFor="register-name">
          Nombre de usuario
        </label>

        <input
          className="popup__input"
          id="register-name"
          type="text"
          name="name"
          placeholder="Introduce tu nombre"
          autoComplete="name"
          minLength={2}
          maxLength={30}
          value={values.name}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-describedby="register-name-error"
          aria-invalid={Boolean(errors.name)}
          required
        />

        <span className="popup__error" id="register-name-error">
          {errors.name}
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
          {isSubmitting ? "Registrando…" : "Registrarse"}
        </button>
      </form>

      <p className="popup__switch">
        ¿Ya tienes una cuenta?{" "}
        <button
          className="popup__switch-button"
          type="button"
          disabled={isSubmitting}
          onClick={onLoginClick}
        >
          Inicia sesión
        </button>
      </p>
    </PopupWithForm>
  );
}

function Register({ isOpen, onClose, onLoginClick, onRegister }) {
  if (!isOpen) return null;

  return (
    <RegisterForm
      onClose={onClose}
      onLoginClick={onLoginClick}
      onRegister={onRegister}
    />
  );
}

export default Register;