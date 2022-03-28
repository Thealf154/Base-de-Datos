import { useEffect, useState } from "react";
import { IoPerson, IoAlertCircleSharp, IoLockClosed } from "react-icons/io5";
import LoadingPage from "./LoadingPage";
import { useAuth } from "../../hooks/authHook";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import "../../css/login.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const passwordCheck = document.getElementById(
      "show-pass"
    ) as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordCheck.checked = true;
    } else {
      passwordInput.type = "password";
      passwordCheck.checked = false;
    }
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let from = location.state as string || "/";
    const { user, password } = document.forms[0];
    //setIsAuthenticating(true);

    axios({
      method: "POST",
      url: "http://localhost:3000/user/login",
      data: { user_email: user.value, user_password: password.value },
    })
      .then((response) => {
        const accessToken = response.data.accessToken;
        auth.signin(accessToken, () => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        if (error.response.data.message === "login_error") {
          setIncorrectPassword(true);
        } else {
          setErrorMessages(error);
        }
      });
  };

  useEffect(() => {
    /*const timer = setTimeout(() => {
      if (isAuthenticating) {
        setIsAuthenticating(false);
      }
    }, 10000); 

    return () => clearTimeout(timer); */
  }, [isAuthenticating]);

  return (
    <>
      {!isAuthenticating ? (
        <IconContext.Provider
          value={{ className: "label-icon", size: "2.0em" }}
        >
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
                <IoPerson />
              </div>
              <div className="label-container">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="text-input"
                  placeholder="Contraseña"
                />
                <IoLockClosed />
              </div>
              {incorrectPassword ? (
                <div id="form-warning">
                  <IoAlertCircleSharp  size={"30px"}/>
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
        </IconContext.Provider>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default LoginPage;
