import React, { useState } from "react";
import "./Sidebar.css";
import logoPNG from "../../../assets/ic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCog,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import Cities from "../../../assets/data/Cities.json";
import Transport from "../../../assets/data/Transports.json";

function Sidebar() {
  const [expandedData, setExpandedData] = useState(false);
  const [expandedResults, setExpandedResults] = useState(false);
  const [expandedConfig, setExpandedConfig] = useState(false);
  const options = ["Opción 1", "Opción 2", "Opción 3"];
  const [selectedOptionOrigin, setSelectedOptionOrigin] = useState(options[0]);
  const [selectedOptionDestination, setSelectedOptionDestination] = useState(
    options[0]
  );
  const [selectedOptionTransport, setSelectedOptionTransport] = useState(
    options[0]
  );
  const [checkData, setcheckData] = useState(false);
  const [checkResults, setcheckResults] = useState(false);

  const handlecheckData = () => {
    setcheckData(!checkData);
  };
  const handlecheckResults = () => {
    setcheckResults(!checkResults);
  };
  const handleChangeOrigen = (event) => {
    setSelectedOptionOrigin(event.target.value);
  };
  const handleChangeDestination = (event) => {
    setSelectedOptionDestination(event.target.value);
  };
  const handleChangeTransport = (event) => {
    setSelectedOptionTransport(event.target.value);
  };
  const toggleExpandedData = () => {
    setExpandedData(!expandedData);
  };
  const toggleExpandedResults = () => {
    setExpandedResults(!expandedResults);
  };
  const toggleExpandedConfig = () => {
    setExpandedConfig(!expandedConfig);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logoPNG} alt="logo" />
        <h1>DijkMap Net</h1>
      </div>
      <div className="sidebar__menu">
        <ul>
          <span>Menu</span>
          <li>
            <div className="collapsible-item">
              <div className="collapsible-header" onClick={toggleExpandedData}>
                <FontAwesomeIcon icon={faDashboard} />
                <span>Datos</span>
              </div>
              {expandedData && (
                <div className="collapsible-content">
                  <div className="collapsible-options">
                    <span>Origen: </span>
                    <select
                      value={selectedOptionOrigin}
                      onChange={handleChangeOrigen}
                    >
                      {Object.keys(Cities).map((city) => (
                        <option key={city} value={Cities[city]}>
                          {Cities[city]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="collapsible-options">
                    <span>Destino: </span>
                    <select
                      value={selectedOptionDestination}
                      onChange={handleChangeDestination}
                    >
                      {Object.keys(Cities).map((city) => (
                        <option key={city} value={Cities[city]}>
                          {Cities[city]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="collapsible-options">
                    <span>Transp: </span>
                    <select
                      value={selectedOptionTransport}
                      onChange={handleChangeTransport}
                    >
                      {Object.keys(Transport).map((key) => (
                        <option key={key} value={Transport[key].Tipo}>
                          {Transport[key].Tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="collapsible-item">
              <div
                className="collapsible-header"
                onClick={toggleExpandedResults}
              >
                <FontAwesomeIcon icon={faCalculator} />
                <span>Resultados</span>
              </div>
              {expandedResults && (
                <div className="collapsible-content">
                  <div className="collapsible-options">
                    <span># Nodos: </span>
                    <p>∞</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Distancia: </span>
                    <p>∞</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Duracion: </span>
                    <p>∞</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Costo: </span>
                    <p>∞</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Veloc: </span>
                    <p>∞</p>
                  </div>
                </div>
              )}
            </div>
            <div className="collapsible-item">
              <div
                className="collapsible-header"
                onClick={toggleExpandedConfig}
              >
                <FontAwesomeIcon icon={faCog} />
                <span>Configuracion</span>
              </div>
              {expandedConfig && (
                <div className="collapsible-content">
                  <div className="collapsible-options">
                    <input
                      type="checkbox"
                      checked={checkData}
                      onChange={handlecheckData}
                    />
                    <span>Ver datos en pant. </span>
                  </div>
                  <div className="collapsible-options">
                    <input
                      type="checkbox"
                      checked={checkResults}
                      onChange={handlecheckResults}
                    />
                    <span>Ver resultados en pant. </span>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
