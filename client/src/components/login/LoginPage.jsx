import { useEffect, useState } from "react";
import { IoPerson, IoAlertCircleSharp, IoLockClosed } from "react-icons/io5";
import LoadingPage from "./LoadingPage";
import { useAuth } from "../../hooks/authHook";
import "../../css/login.css";
import { useLocation, useNavigate } from "react-router";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
    const passwordCheck = document.getElementById("show-pass");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordCheck.checked = true;
    } else {
      passwordInput.type = "password";
      passwordCheck.checked = false;
    }
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    // Previene a la página de recargarse
    event.preventDefault();

    let from = location.state?.from?.pathname || "/";
    const { user, password } = document.forms[0];
    const accessToken = user.value + password.value;
    auth.signin(accessToken, () => {
      navigate(from, { replace: true });
    });
    setIsAuthenticating(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticating) {
        setIsAuthenticating(false);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isAuthenticating]);

  return (
    <>
      {!isAuthenticating ? (
        <div id="form-container">
          <form id="form-prompt" onSubmit={handleSubmit}>
            <h1 id="form-title-spaced">Iniciar sesión</h1>
            <div className="label-container">
              <input
                type="text"
                name="user"
                id="user"
                className="text-input"
                placeholder="Usuario o Email"
              />
              <IoPerson className="label-icon" />
            </div>
            <div className="label-container">
              <input
                type="password"
                name="password"
                id="password"
                className="text-input"
                placeholder="Contraseña"
              />
              <IoLockClosed className="label-icon" />
            </div>
            {incorrectPassword ? (
              <div id="form-warning">
                <IoAlertCircleSharp id="warning-icon" />
                <span id="warning-text">
                  Contraseña incorrecta. Vuelve a intentarlo o selecciona
                  "¿Olvidaste tu contraseña?" para cambiarla.
                </span>
              </div>
            ) : null}
            <label htmlFor="show-pass">
              <input
                id="show-pass"
                type="checkbox"
                name="show-password"
                onClick={() => togglePasswordVisibility()}
              />
              Mostrar contraseña
            </label>
            <input type="submit" value="Ingresar" id="submit-button" />
            <a id="did-you-forget-pasword" href="/recover-password">
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default LoginPage;
