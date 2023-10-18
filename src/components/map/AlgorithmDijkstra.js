import React, { useState } from "react";
import Position from "../../assets/positions/Positions.json";
import Transport from "../../assets/data/Transports.json";

const AlgorithmDijkstra = ({
  cityOrigin,
  cityDestinity,
  transport,
  onEstimtedTime,
  onEstimtedDistance,
  onEstimtedRoute,
}) => {
  const [startNode, setStartNode] = useState("Valledupar");
  const [endNode, setEndNode] = useState("Valledupar");

  const findShortestPath = () => {
    var start;
    var end;
    if (cityOrigin.city !== undefined && cityDestinity.city !== undefined) {
      start = cityOrigin.city;
      end = cityDestinity.city;
    }else{
      start = startNode;
      end = endNode;
      console.log("No hay ciudades seleccionadas");
    }
    // Función para calcular la distancia entre dos coordenadas (Haversine formula)
    const haversine = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radio de la Tierra en kilómetros
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const startCoords = Position[start];
    const endCoords = Position[end];

    const distance = haversine(
      startCoords.lat,
      startCoords.lon,
      endCoords.lat,
      endCoords.lon
    );

    if (transport) {
      // Calcular el tiempo basado en la velocidad del vehículo seleccionado
      const averageSpeed = parseFloat(transport.Velocidad); // Convertir la velocidad a número
      const time = distance / averageSpeed;
    
      // Lista de nodos en la ruta (puedes modificar esto según la implementación de Dijkstra)
      const nodeList = ["Bogotá", "Node2", "Node3", "Medellín"];
       
      onEstimtedDistance(distance.toFixed(4));
      onEstimtedTime(time.toFixed(2));
      onEstimtedRoute(nodeList.length);
      return { distance, time, nodeList };
    } else {
      return { distance, time: null, nodeList: [] }; // Manejar el caso si no se encuentra el vehículo
    }
  };

  const { distance, time, nodeList } = findShortestPath(startNode, endNode);

  return (
    <div>
      <h1>
        Ruta más corta
      </h1>
      <p>Distancia: {distance} km</p>
      {time !== null && <p>Tiempo estimado: {time} horas</p>}
      <p>Ruta: {nodeList.join(" -> ")}</p>
    </div>
  );
};

export default AlgorithmDijkstra;
