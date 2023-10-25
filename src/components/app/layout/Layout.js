import React, { useState } from "react";
import "./Layout.css";
import Header from "../header/Header.js";
import Sidebar from "../sidebar/Sidebar.js";
import Content from "../content/Content.js";
import { motion } from "framer-motion";

function Layout() {
  const [expandedData, setExpandedData] = useState(false);
  const [cityOrigin, setCityOrigin] = useState("");
  const [cityDestinity, setCityDestinity] = useState("");
  const [transport, setTransport] = useState("");
  const [estimtedTime, setEstimtedTime] = useState(0);
  const [estimtedDistance, setEstimtedDistance] = useState(0);
  const [numberNodes, setNumberNodes] = useState(0);
  const [route, setRoute] = useState([]);

  const handleCityOriginSelected = (cityOrigin) => {
    setCityOrigin(cityOrigin);
    console.log(cityOrigin);
  };
  const handleCityDestinitySelected = (cityDestinity) => {
    setCityDestinity(cityDestinity);
    console.log(cityDestinity);
  };
  const handleTransport = (transport) => {
    setTransport(transport);
    console.log(transport);
  };
  const handleChangeExpandedData = (expandedData) => {
    setExpandedData(expandedData);
  };

  const handleEstimtedTime = (estimtedTime) => {
    setEstimtedTime(estimtedTime);
    
  }
  const handleEstimtedDistance = (estimtedDistance) => {
    setEstimtedDistance(estimtedDistance);
  }
  const handleNumberNodes = (numberNodes) => {
    setNumberNodes(numberNodes);
  }
  const handleRoute = (route) => {
    setRoute(route);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="background"
    >
      <Header />
      <div className="main">
        <Sidebar
          onExpandedData={handleChangeExpandedData}
          onCityOriginSelected={handleCityOriginSelected}
          cityOrigin={cityOrigin}
          onCityDestinitySelected={handleCityDestinitySelected}
          cityDestinity={cityDestinity}
          onTransport={handleTransport}
          transport={transport}
          estimtedTime={estimtedTime}
          estimtedDistance={estimtedDistance}
          numberNodes={numberNodes}
          route={route}
        />
        <Content
          expandedData={expandedData}
          cityOrigin={cityOrigin}
          cityDestinity={cityDestinity}
          transport={transport}
          onEstimtedTime={handleEstimtedTime}
          onEstimtedDistance={handleEstimtedDistance}
          onNumberNodes={handleNumberNodes}
          onRoute={handleRoute}
        />
      </div>
    </motion.div>
  );
}

export default Layout;
