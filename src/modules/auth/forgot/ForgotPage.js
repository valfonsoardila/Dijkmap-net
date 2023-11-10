import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./ForgotPage.css";

const ForgotPage = ({ onComponentChange }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes al usuario
  const [alertView, setAlertView] = useState(false); // Para mostrar mensajes al usuario

  const handleForgotClick = () => {
    const auth = getAuth();
    if (email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage("Se ha enviado el correo de recuperación de contraseña");
          setAlertView(true);
          setTimeout(() => {
            setAlertView(false);
          }, 2600);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          setMessage(
            "Ha ocurrido un error al enviar el correo de recuperación de contraseña"
          );
          setAlertView(true);
          setTimeout(() => {
            setAlertView(false);
          }, 2600);
        });
    } else {
      setMessage("Por favor, ingresa tu correo electrónico");
      setAlertView(true);
      setTimeout(() => {
        setAlertView(false);
      }, 2600);
    }
  };

  const handleReturnClick = () => {
    onComponentChange("login");
  };

  return (
    <>
      <div className="back-arrow">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleReturnClick} />
      </div>

      <div className="form-container-forgot">
        <div className="form-header">
          <h3>Did you forget your password?</h3>
        </div>
        <div className="form-paragraph">
          <p>
            If you have forgotten your password, please enter your email address
            to send you an access recovery link.
          </p>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={handleForgotClick}>
              Reset password
            </button>
          </div>
        </div>
        <div className="form-footer-alert">
          {alertView && (
            <div
              className="form-message"
              style={{
                background: message.includes("error")
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

export default ForgotPage;
