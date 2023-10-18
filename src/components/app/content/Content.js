import React from "react";
import MapView from "../../map/model/MapView";
import AlgorithmDijkstra from "../../map/AlgorithmDijkstra";
import "./Content.css";
import { motion } from "framer-motion";

function Content({ expandedData, cityOrigin, cityDestinity, transport }) {
  return (
    <motion.div
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <AlgorithmDijkstra onExpandedData={expandedData} cityOrigin={cityOrigin} cityDestinity={cityDestinity} transport={transport} />
      {/* <MapView onExpandedData={expandedData} cityOrigin={cityOrigin} cityDestinity={cityDestinity} transport={transport}/> */}
    </motion.div>
  );
}

export default Content;
