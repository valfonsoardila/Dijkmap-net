import React from "react";
import "./Layout.css";
import Header from "../header/Header.js";
import Sidebar from "../sidebar/Sidebar.js";
import Content from "../content/Content.js";

function Layout ({children}) {
  return (
    <div className="background">
      <Header />
      <div className="main">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default Layout;
