import React, { useEffect, useState } from "react";
import Position from "../../assets/positions/Positions.json";
import Awns from "../../assets/awns/Awns.json";
import Costs from "../../assets/costs/Costs.json";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { distance } from "framer-motion";

const AlgorithmDijkstra = ({
  cityOrigin,
  cityDestinity,
  transport,
  onEstimtedTime,
  onEstimtedDistance,
  onEstimtedRoute,
  onRoute,
}) => {
  const [startNode, setStartNode] = useState("Valledupar");
  const [endNode, setEndNode] = useState("Valledupar");
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [nodeList, setNodeList] = useState("");

  useEffect(() => {
    const findShortestPath = () => {
      var start;
      var end;
      if (cityOrigin.city !== undefined && cityDestinity.city !== undefined) {
        start = cityOrigin.city;
        end = cityDestinity.city;
      } else {
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
      const buildGraph = () => {
        const graph = {};
        for (const location in Position) {
          graph[location] = {};
          for (const neighbor of Awns[location]) {
            const neighborName = Object.keys(Position)[neighbor - 1]; // El JSON está basado en 1-index, ajustar a 0-index
            const lat1 = Position[location].lat;
            const lon1 = Position[location].lon;
            const lat2 = Position[neighborName].lat;
            const lon2 = Position[neighborName].lon;
            const distance = haversine(lat1, lon1, lat2, lon2);
            graph[location][neighborName] = distance;
          }
        }
        return graph;
      };

      const dijkstra = (graph, start, end) => {
        const distances = {};
        const visited = {};
        const parents = {};
        const queue = [...Object.keys(graph)];

        // Inicializar las distancias con infinito y el nodo inicial con distancia 0
        for (const node of queue) {
          distances[node] = Infinity;
        }
        distances[start] = 0;

        while (queue.length) {
          const current = queue.reduce((min, node) =>
            distances[node] < distances[min] ? node : min
          );

          const neighbors = graph[current];

          for (const neighbor in neighbors) {
            const distance = distances[current] + neighbors[neighbor];
            if (distance < distances[neighbor]) {
              distances[neighbor] = distance;
              parents[neighbor] = current;
            }
          }

          visited[current] = true;
          queue.splice(queue.indexOf(current), 1);
        }

        const path = [end];
        let current = end;
        while (current !== start) {
          path.unshift(parents[current]);
          current = parents[current];
        }

        return { distance: distances[end], path };
      };

      const graph = buildGraph();
      const shortestPath = dijkstra(graph, start, end);
      //console.log(`Ruta: ${shortestPath.path.join(' -> ')}`);
      
      // Obtener el tiempo estimado
      if (transport) {
        // Calcular el tiempo basado en la velocidad del vehículo seleccionado
        const averageSpeed = parseFloat(transport.Velocidad); // Convertir la velocidad a número
        const time = distance / averageSpeed;

        onEstimtedDistance(distance.toFixed(2));
        onEstimtedTime(time.toFixed(2));
        // onEstimtedRoute();
        return { distance, time, nodeList };
      } else {
        return { distance, time: null, nodeList: [] }; // Manejar el caso si no se encuentra el vehículo
      }
    };
    const { distance, time } = findShortestPath(startNode, endNode);
    setDistance(distance);
    setTime(time);
  }, [startNode, endNode, cityOrigin.city, cityDestinity.city, transport, onEstimtedDistance, onEstimtedTime, onEstimtedRoute, nodeList]);

  return (
    <div>
      <h1>Ruta más corta</h1>
      <p>Distancia: {distance} km</p>
      {time !== null && <p>Tiempo estimado: {time} horas</p>}
      {/* <p>Ruta: {nodeList.join(" -> ")}</p> */}
    </div>
  );
};

export default AlgorithmDijkstra;
