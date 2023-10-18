import React, {useState} from "react";
// import MapView from "../../map/map-model/MapView";
import AlgorithmDijkstra from "../../map/AlgorithmDijkstra";
import "./Content.css";
import { motion } from "framer-motion";

function Content({ cityOrigin, cityDestinity, transport, onEstimtedTime, onEstimtedDistance, onEstimtedRoute }) {
  
  const handleEstimtedTime = (estimtedTime) => {
    onEstimtedTime(estimtedTime);
  }
  const handleEstimtedDistance = (estimtedDistance) => {
    onEstimtedDistance(estimtedDistance);
  }
  const handleEstimtedRoute = (estimtedRoute) => {
    onEstimtedRoute(estimtedRoute);
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
      />
      {/* <MapView onExpandedData={expandedData} cityOrigin={cityOrigin} cityDestinity={cityDestinity} transport={transport}/> */}
    </motion.div>
  );
}

export default Content;
