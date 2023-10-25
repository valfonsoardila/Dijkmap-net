import React, {useState} from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

function Header({onSidebarClick}) {
  const [sidebar, setSidebar] = useState(false);
  
  const sidebarClick = () => {
    setSidebar(!sidebar);
    onSidebarClick(sidebar);
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="button-sidebar-container" onClick={sidebarClick}>
          <FontAwesomeIcon icon={faBars} className="header__icon" onClick={sidebarClick} />
        </div>
      </div>
      <div className="header-center"></div>
      <div className="header-right"></div>
    </div>
  );
}

export default Header;
