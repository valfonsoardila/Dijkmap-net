import React, {useState} from "react";
import "./MapView.css";
import { MapContainer, TileLayer, useMap  } from "react-leaflet";
import Markers from "./markers/Markers";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";

const MapView = () => {
  const [state, setState] = useState({
    currentLocation: { lat: "4.570868", lng: "-74.297333" },
    zoom: 6,
  });
  function Routing() {
    const map = useMap();

    L.Routing.control({
      waypoints: [
        L.latLng(4.8133, -75.6961), // Pereira
        L.latLng(4.6243, -74.0636) // Bogotá
      ],
      router: L.Routing.osrmv1({
        serviceUrl: "http://router.project-osrm.org/route/v1"
      }),
      createMarker: function() { return null; }
    }).addTo(map);

    return null;
  }
  return (
    <div className="container">
      <div className="title">
        <FontAwesomeIcon icon={faMapMarked} />
        <span>Mapa Interactivo</span>
      </div>
      <div className="map">
        <MapContainer center={state.currentLocation} zoom={state.zoom} >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers />
          <Routing />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
