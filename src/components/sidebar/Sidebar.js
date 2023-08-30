import React from "react";
import "./Sidebar.css";
import logoPNG from "../../assets/ic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faCog, faDashboard } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div
      className="sidebar"
    >
      <div className="sidebar__logo">
        <img src={logoPNG} alt="logo" />
        <h1>DijkMap Net</h1>
      </div>
      <div className="sidebar__menu">
        <ul>
          <span>Menu</span>
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faDashboard} />
              <span>Datos</span>
            </a>
            <a href="/resultado">
              <FontAwesomeIcon icon={faCalculator} />
              <span>Resultados</span>
            </a>
            <a href="/configuracion">
              <FontAwesomeIcon icon={faCog} />
              <span>Configuracion</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
