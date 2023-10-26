import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import "./CalculationView.css";

const CalculationView = ({ distance, time, route, graph }) => {
  const cities = Object.keys(graph);

  // Función para construir la tabla de matriz de adyacencia
  const buildMatrixTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            {cities.length > 0 &&
              cities.map((city) => <th key={city}>{city}</th>)}
          </tr>
        </thead>
        <tbody>
          {cities.map((city1) => (
            <tr key={city1}>
              <th>{city1}</th>
              {cities.map((city2) => (
                <td key={city2}>
                  {city1 === city2
                    ? "0"
                    : (graph[city1][city2] || "∞") !== "∞"
                    ? Number(graph[city1][city2]).toFixed(3) + " km"
                    : "∞"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <motion.div
      className="calculation-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="calculation-title-header">
        <h1>Ruta más corta</h1>
        <FontAwesomeIcon icon={faRoad} />
      </div>
      <p>Distancia: {distance} km</p>
      {time !== null && <p>Tiempo estimado: {time} horas</p>}
      <p>Ruta: {route}</p>
      <div className="matrix-container">
        <div className="matrix">
          <div className="matrix-header">
            <h2>Matriz de adyacencia</h2>
          </div>
          <div className="matrix-body">{buildMatrixTable()}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculationView;
