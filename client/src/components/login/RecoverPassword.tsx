import React, { useState, useEffect } from "react";
import "../../css/login.css";
import { IoMail, IoMailOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

function RecoverPassword() {
  const [hasSubmited, setHasSubmited] = useState(false);
  const [user, setUser] = useState("");
  const [timeLeft, setTimeLeft] = useState(12000);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { user } = document.forms[0];

    setUser(user.value);

    setHasSubmited(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1000);
      }
      if (timeLeft === 0) {
        navigate("/login");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hasSubmited, timeLeft, navigate]);

  const censorUser = () => {
    let result = "";

    const userParts = user.split("@");

    const censorRange = Math.floor(userParts[0].length / 4);

    userParts[0].split("").forEach((value, index) => {
      if (censorRange >= index && index <= user.length) {
        result += value;
      } else {
        result += "*";
      }
    });

    result += "@";

    userParts[1].split("").forEach((value, index) => {
      result += "*";
    });
    return result;
  };

  return (
    <div id="form-container">
      <form id="form-prompt" onSubmit={handleSubmit}>
        {!hasSubmited ? (
          <>
            <h1 id="form-title-spaced">¿Olvidaste tu contraseña?</h1>
            <div className="label-container">
              <input
                type="text"
                name="user"
                id="user"
                className="text-input"
                placeholder="Ingresa tu email"
              />
              <IoMail />
            </div>
            <input type="submit" value="Enviar" id="submit-button" />
          </>
        ) : (
          <>
            <h1 id="form-title-contracted">Checa tu correo</h1>
            <IoMailOpenOutline size={"5rem"} />
            <p className="form-text">
              Se ha enviado un correo a {censorUser()} con instrucciones para
              recuperar tu contraseña.
            </p>
            <a href="/login" className="gray-link">
              Haz click aquí para regresar a iniciar sesión
            </a>
            <p id="time-left">
              Se te redigirá en {(timeLeft / 1000).toFixed(0)} segundos a
              iniciar sesión...
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default RecoverPassword;
