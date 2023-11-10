import React, { useState } from "react";
import { resources } from "../../../assets/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./RegisterPage.css";

const RegisterPage = ({ onComponentChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes al usuario
  const [alertView, setAlertView] = useState(false); // Para mostrar mensajes al usuario

  const handleRegisterClick = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessage("Por favor, ingresa todos los campos");
      setAlertView(true);
      setTimeout(() => {
        setAlertView(false);
      }, 2600);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setAlertView(true);
      setTimeout(() => {
        setAlertView(false);
      }, 2600);
      return;
    } else {
      // Si las contraseñas coinciden, puedes continuar con el registro
      const auth = getAuth(); // Obtén la instancia de autenticación
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          onComponentChange("login");
        })
        .catch((error) => {
          setMessage(
            "Ha ocurrido un error al crear la cuenta. Por favor, intenta nuevamente"
          );
          setAlertView(true);
          setTimeout(() => {
            setAlertView(false);
          }, 2600);
        });
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
      <div className="user-image">
        <img src={resources.user} alt="user" />
      </div>
      <div className="form-container-register">
        <div className="form-header">
          <h3>Register</h3>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label htmlFor="name">Introduce your name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
        <div className="form-footer-alert">
          {alertView && (
            <div
              className="form-message"
              style={{
                background: message.includes("Por favor")
                  ? "#f23030"
                  : message.includes("no coinciden")
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

export default RegisterPage;
