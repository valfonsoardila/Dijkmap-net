import React from "react";
// import MapView from "../../map/map-model/MapView";
import AlgorithmDijkstra from "../../map/AlgorithmDijkstra";
import "./Content.css";
import { motion } from "framer-motion";

function Content({ cityOrigin, cityDestinity, transport, onEstimtedTime, onEstimtedDistance, onNumberNodes, onRoute }) {
  const handleEstimtedTime = (estimtedTime) => {
    onEstimtedTime(estimtedTime);
  }
  const handleEstimtedDistance = (estimtedDistance) => {
    onEstimtedDistance(estimtedDistance);
  }
  const handleNumberNodes = (numberNodes) => {
    onNumberNodes(numberNodes);
  }
  const handleRoute = (route) => {
    onRoute(route);
  }

  return (
    <div className="content">
      <AlgorithmDijkstra
        cityOrigin={cityOrigin}
        cityDestinity={cityDestinity}
        transport={transport}
        onEstimtedTime={handleEstimtedTime}
        onEstimtedDistance={handleEstimtedDistance}
        onNumberNodes={handleNumberNodes}
        onRoute={handleRoute}
      />
      {/* <MapView onExpandedData={expandedData} cityOrigin={cityOrigin} cityDestinity={cityDestinity} transport={transport}/> */}
    </div>
  );
}

export default Content;
