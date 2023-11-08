import React, { useState } from "react";
import "./Layout.css";
import Header from "../header/Header.js";
import Sidebar from "../sidebar/Sidebar.js";
import Content from "../content/Content.js";
import { useGlobalState, setClearRoute } from '../../../hooks/GlobalStateContext';
import { motion } from "framer-motion";

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const [card, setCard] = useState(false);
  const [checkNodes, setCheckNodes] = useState(false);
  const [checkSeeRoute, setCheckSeeRoute] = useState(false);
  const [cityOrigin, setCityOrigin] = useState("");
  const [cityDestinity, setCityDestinity] = useState("");
  const [transport, setTransport] = useState("");
  const [estimtedTime, setEstimtedTime] = useState(0);
  const [estimtedDistance, setEstimtedDistance] = useState(0);
  const [numberNodes, setNumberNodes] = useState(0);
  const [cost, setCost] = useState(0);
  const [route, setRoute] = useState([]);
  const { state, dispatch } = useGlobalState();

  const sidebarClick = () => {
    setSidebar(!sidebar);
  };
  const cardClick = () => {
    setCard(!card);
  };
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
  const handleCheckNodes = (checkNodes) => {
    setCheckNodes(checkNodes);
  };
  const handleCheckSeeRoute = (checkSeeRoute) => {
    setCheckSeeRoute(checkSeeRoute);
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
  const handleCost = (cost) => {
    console.log(cost);
    setCost(cost);
  }
  const handleRoute = (route) => {
    setRoute(route);
  }
  const handleSetClearRoute = (value) => {
    console.log(value);
    setClearRoute(dispatch, value);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="background"
    >
      <Header onSidebarClick={sidebarClick} onCardClick={cardClick} />
      <div className="main">
        <Sidebar
          sidebarOption={sidebar}
          onCheckNodes={handleCheckNodes}
          onCheckSeeRoute={handleCheckSeeRoute}
          onCityOriginSelected={handleCityOriginSelected}
          cityOrigin={cityOrigin}
          onCityDestinitySelected={handleCityDestinitySelected}
          cityDestinity={cityDestinity}
          onTransport={handleTransport}
          transport={transport}
          estimtedTime={estimtedTime}
          estimtedDistance={estimtedDistance}
          numberNodes={numberNodes}
          cost={cost}
          route={route}
          onClearRoute={handleSetClearRoute}
        />
        <Content
          cardOption={card}
          checkNodes={checkNodes}
          checkSeeRoute={checkSeeRoute}
          cityOrigin={cityOrigin}
          cityDestinity={cityDestinity}
          transport={transport}
          onEstimtedTime={handleEstimtedTime}
          onEstimtedDistance={handleEstimtedDistance}
          onNumberNodes={handleNumberNodes}
          onCost={handleCost}
          onRoute={handleRoute}
        />
      </div>
    </motion.div>
  );
}

export default Layout;
