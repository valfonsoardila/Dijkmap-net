import React from "react";
import AlgorithmDijkstra from "../../map/AlgorithmDijkstra";
import "./Content.css";

function Content({ checkNodes, checkSeeRoute, cardOption, cityOrigin, cityDestinity, transport, onEstimtedTime, onEstimtedDistance, onNumberNodes, onCost, onRoute }) {
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
  const handleCost = (cost) => {
    onCost(cost);
  }  

  return (
    <div className="content">
      <AlgorithmDijkstra
        cardOption={cardOption}
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
  );
}

export default Content;
