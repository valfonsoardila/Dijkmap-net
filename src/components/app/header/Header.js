import React, { useState } from "react";
import {
  faArrowRightArrowLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

function Header({ onSidebarClick, onCardClick }) {
  const [sidebar, setSidebar] = useState(false);
  const [card, setCard] = useState(false);

  const sidebarClick = () => {
    setSidebar(!sidebar);
    onSidebarClick(sidebar);
  };

  const cardClick = () => {
    setCard(!card);
    onCardClick(card);
  };

  return (
    <div className="header">
      <div className="header-left">
        <div
          className="button-sidebar-container"
          onClick={sidebarClick}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="header-icon"
            onClick={sidebarClick}
            title="Abrir Menu"
          />
        </div>
      </div>
      <div className="header-center"></div>
      <div className="header-right">
        <div className="button-card-container" onClick={cardClick}>
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            className="header-icon"
            onClick={cardClick}
            title="Cambiar Vista"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
