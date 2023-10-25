import React from "react";
import { motion } from "framer-motion";
import "./CalculationView.css";

const CalculationView = ({ distance, time, route, graph }) => {
  return (
    <motion.div
      className="calculation-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1>Ruta más corta</h1>
      <p>Distancia: {distance} km</p>
      {time !== null && <p>Tiempo estimado: {time} horas</p>}
      <p>Nodos: {route}</p>
      <div className="matrix">
        <div className="matrix-header">
          <h2>Matriz de adyacencia</h2>
        </div>
        <div className="matrix-body"></div>
      </div>
    </motion.div>
  );
};

export default CalculationView;
