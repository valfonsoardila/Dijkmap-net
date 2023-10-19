import React from "react";
// import MapView from "../../map/map-model/MapView";
import AlgorithmDijkstra from "../../map/AlgorithmDijkstra";
import "./Content.css";
import { motion } from "framer-motion";

function Content({ cityOrigin, cityDestinity, transport, onEstimtedTime, onEstimtedDistance, onEstimtedRoute, onRoute }) {
  
  const handleEstimtedTime = (estimtedTime) => {
    onEstimtedTime(estimtedTime);
  }
  const handleEstimtedDistance = (estimtedDistance) => {
    onEstimtedDistance(estimtedDistance);
  }
  const handleEstimtedRoute = (estimtedRoute) => {
    onEstimtedRoute(estimtedRoute);
  }
  const handleRoute = (route) => {
    onRoute(route);
  }

  return (
    <motion.div
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <AlgorithmDijkstra
        cityOrigin={cityOrigin}
        cityDestinity={cityDestinity}
        transport={transport}
        onEstimtedTime={handleEstimtedTime}
        onEstimtedDistance={handleEstimtedDistance}
        onEstimtedRoute={handleEstimtedRoute}
        onRoute={handleRoute}
      />
      {/* <MapView onExpandedData={expandedData} cityOrigin={cityOrigin} cityDestinity={cityDestinity} transport={transport}/> */}
    </motion.div>
  );
}

export default Content;
