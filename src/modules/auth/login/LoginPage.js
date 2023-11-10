import React, { useState } from "react";
import { resources } from "../../../assets/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
// import ApiGoogle from "./APIs/ApiGoogle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./LoginPage.css";

const LoginPage = ({ onComponentChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes al usuario
  const [alertView, setAlertView] = useState(false); // Para mostrar mensajes al usuario

  const handleRegisterClick = () => {
    onComponentChange("register");
  };
  const handleForgotClick = () => {
    onComponentChange("forgot");
  };
  const handleLogin = () => {
    if (email === "" || password === "") {
      setMessage("Por favor, ingresa todos los campos");
      setAlertView(true);
      setTimeout(() => {
        setAlertView(false);
      }, 2600);
      return;
    } else {
      if (password.length < 6) {
        setMessage("La contraseña debe tener al menos 6 caracteres");
        setAlertView(true);
        setTimeout(() => {
          setAlertView(false);
        }, 2600);
        return;
      } else {
        if (!email.includes("@")) {
          setMessage("El correo ingresado no es válido");
          setAlertView(true);
          setTimeout(() => {
            setAlertView(false);
          }, 2600);
          return;
        } else {
          if (email === "" && password !== "") {
            setMessage("No ha ingresado el correo electrónico");
            setAlertView(true);
            setTimeout(() => {
              setAlertView(false);
            }, 2600);
            return;
          } else {
            if (email !== "" && password === "") {
              setMessage("No ha ingresado la contraseña");
              setAlertView(true);
              setTimeout(() => {
                setAlertView(false);
              }, 2600);
              return;
            } else {
              const auth = getAuth();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  window.location.href = "/dashboard";
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  setMessage(errorMessage);
                  setAlertView(true);
                  setTimeout(() => {
                    setAlertView(false);
                  }, 2600);
                });
            }
          }
        }
      }
    }
  };

  return (
    <>
      <div className="logocontainer">
        <img src={resources.ic} alt="icon" />
        <span className="logotext">DijkMap Net</span>
        <span className="logintext">Login</span>
      </div>
      <div className="form-container-login">
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faKey} />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="forgotpassword" onClick={handleForgotClick}>
              Forgot password?
            </span>
          </div>
          <div className="form-group">
            <button type="submit" className="btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
        <div className="form-footer">
          <span className="form-footer-text">
            Don't have an account?{" "}
            <span onClick={handleRegisterClick}>Sign up</span>
          </span>
          {/* <div className="form-footer-divider" />
          <div className="form-footer-google">
            <ApiGoogle />
          </div> */}
        </div>
        <div className="form-footer-alert">
          {alertView && (
            <div
              className="form-message"
              style={{
                background: message.includes("Error")
                  ? "#f23030"
                  : message.includes("ingresa")
                  ? "#f23030"
                  : "green",
              }}
            >
              {message && <p>{message}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
