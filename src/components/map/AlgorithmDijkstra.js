import React, {useState} from "react";
import Position from "../../assets/positions/Positions.json";
import Transport from "../../assets/data/Transports.json";

const AlgorithmDijkstra = ({ cityOrigin, cityDestinity, transport, onEstimtedTime, onEstimtedDistance, onEstimtedRoute }) => {
    const [estimtedTime, setEstimtedTime] = useState(0);
    const [estimtedDistance, setEstimtedDistance] = useState(0);
    const [estimtedRoute, setEstimtedRoute] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState("Bus"); // Tipo de vehículo por defecto
    
    const handleEstimtedTime = (estimtedTime) => {
      setEstimtedTime(estimtedTime);
      onEstimtedTime(estimtedTime);
    }
    const handleEstimtedDistance = (estimtedDistance) => {
      setEstimtedDistance(estimtedDistance);
      onEstimtedDistance(estimtedDistance);
    }
    const handleEstimtedRoute = (estimtedRoute) => {
      setEstimtedRoute(estimtedRoute);
      onEstimtedRoute(estimtedRoute);
    }

    const findShortestPath = (start, end) => {
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
  
      // Encontrar la velocidad del vehículo seleccionado
      const selectedVehicleData = Transport.find((vehicle) => vehicle.Tipo === selectedVehicle);
  
      if (selectedVehicleData) {
        // Calcular el tiempo basado en la velocidad del vehículo seleccionado
        const averageSpeed = parseFloat(selectedVehicleData.Velocidad); // Convertir la velocidad a número
        const time = distance / averageSpeed;
  
        // Lista de nodos en la ruta (puedes modificar esto según la implementación de Dijkstra)
        const nodeList = ["Bogotá", "Node2", "Node3", "Medellín"];

        return { distance, time, nodeList };
      } else {
        return { distance, time: null, nodeList: [] }; // Manejar el caso si no se encuentra el vehículo
      }
    };
    
  
    const startNode = "Valledupar";
    const endNode = "Sincelejo";
  
    const { distance, time, nodeList } = findShortestPath(startNode, endNode);
    const calculateRoute = () => {
      handleEstimtedTime(time); // Establece el valor de tiempo en el estado
      handleEstimtedDistance(distance); // Establece el valor de distancia en el estado
      handleEstimtedRoute(nodeList); // Establece el valor de nodeList en el estado
    };

    return (
      <div>
        <h1>
          Ruta más corta de {startNode} a {endNode}
        </h1>
        <p>Distancia: {distance} km</p>
        {time !== null && <p>Tiempo estimado: {time} horas</p>}
        <p>Ruta: {nodeList.join(" -> ")}</p>
  
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          {Transport.map((vehicle, index) => (
            <option key={index} value={vehicle.Tipo}>
              {vehicle.Tipo}
            </option>
          ))}
        </select>
        <button onClick={calculateRoute}>Calcular Ruta</button>
      </div>
    );
  };
  
  export default AlgorithmDijkstra;
  
  