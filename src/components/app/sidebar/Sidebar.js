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
import Position from "../../../assets/positions/Positions.json";

function Sidebar({
  onExpandedData,
  onCityOriginSelected,
  cityOrigin,
  onCityDestinitySelected,
  cityDestinity,
  onTransport,
  estimtedTime,
  estimtedDistance,
  estimtedRoute,
}) {
  const [expandedData, setExpandedData] = useState(false);
  const [expandedResults, setExpandedResults] = useState(false);
  const [expandedConfig, setExpandedConfig] = useState(false);
  const [selectedOptionOrigin, setSelectedOptionOrigin] = useState("Origen");
  const [selectedOptionDestination, setSelectedOptionDestination] =
    useState("Destino");
  const [selectedOptionTransport, setSelectedOptionTransport] =
    useState("Transporte");
  const [transportVelocity, setTransportVelocity] = useState("0km/h");
  const [checkData, setcheckData] = useState(false);
  const [checkResults, setcheckResults] = useState(false);

  const handlecheckData = () => {
    setcheckData(!checkData);
    onExpandedData(checkData);
  };
  const handlecheckResults = () => {
    setcheckResults(!checkResults);
  };
  const handleChangeOrigen = (event) => {
    setSelectedOptionOrigin(event.target.value);
    findLocationOrigin(event.target.value);
  };
  const findLocationOrigin = (city) => {
    //necesito recorrer el json de posiciones y encontrar la posicion de la ciudad
    const cities = Object.keys(Position);
    for (let i = 0; i < cities.length; i++) {
      if (cities[i] === city) {
        const latitude = Position[cities[i]].lat;
        const longitude = Position[cities[i]].lon;
        const location = {city: city, lat: latitude, lon: longitude };
        onCityOriginSelected(location);
        break;
      }
    }
  };
  const handleChangeDestination = (event) => {
    setSelectedOptionDestination(event.target.value);
    console.log(event.target.value);
    findLocationDestinity(event.target.value);
  };
  const findLocationDestinity = (city) => {
    //necesito recorrer el json de posiciones y encontrar la posicion de la ciudad
    const cities = Object.keys(Position);
    for (let i = 0; i < cities.length; i++) {
      if (cities[i] === city) {
        const latitude = Position[cities[i]].lat;
        const longitude = Position[cities[i]].lon;
        const location = { city: city, lat: latitude, lon: longitude };
        onCityDestinitySelected(location);
        break;
      }
    }
  };
  const handleChangeTransport = (event) => {
    setSelectedOptionTransport(event.target.value);
    findLocationTransport(event.target.value);
  };
  const findLocationTransport = (transport) => {
    const selectedVehicleData = Transport.find(
      (vehicle) => vehicle.Tipo === transport
    );
    console.log(selectedVehicleData.Velocidad);
    onTransport(selectedVehicleData);
    setTransportVelocity(selectedVehicleData.Velocidad);
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
                      <option value="Origen" disabled hidden>
                        Origen
                      </option>
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
                      <option value="Destino" disabled hidden>
                        Destino
                      </option>
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
                      <option value="Transporte" disabled hidden>
                        Transporte
                      </option>
                      {Transport.map((vehicle, index) => (
                        <option key={index} value={vehicle.Tipo}>
                          {vehicle.Tipo}
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
                    <p>{estimtedRoute}</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Lista de nodos: </span>
                    {/* <p>{estimtedRoute.join(" -> ")}</p> */}
                  </div>
                  <div className="collapsible-options">
                    <span>Distancia: </span>
                    <p>{estimtedDistance} km</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Duracion: </span>
                    <p>{estimtedTime} horas</p>
                  </div>
                  <div className="collapsible-options">
                    <span>Veloc: </span>
                    <p>{transportVelocity} km/h</p>
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
