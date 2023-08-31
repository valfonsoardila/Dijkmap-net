import React, {useState} from "react";
import "./MapView.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./markers/Markers";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";

const MapView = () => {
  const [state, setState] = useState({
    currentLocation: { lat: "4.570868", lng: "-74.297333" },
    zoom: 6,
  });
  return (
    <div className="container">
      <div className="title">
        <FontAwesomeIcon icon={faMapMarked} />
        <span>Mapa Interactivo</span>
      </div>
      <div className="map">
        <MapContainer center={state.currentLocation} zoom={state.zoom} >
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers/>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
