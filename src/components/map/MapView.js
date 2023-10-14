import React, { useState } from "react";
import "./MapView.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Markers from "./markers/Markers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom";
import { motion } from "framer-motion";

const MapView = ({ onExpandedData, cityOrigin, cityDestinity, transport }) => {
  const [originCurrent, setOriginCurrent] = useState({ lat: "", lon: "" });
  const [destinityCurrent, setDestinityCurrent] = useState({ lat: "", lon: ""});

  const [state, setState] = useState({
    currentLocation: { lat: "4.570868", lng: "-74.297333" },
    zoom: 6,
  });
  
  function ClearRouting() {
    const map = useMap();
    map.eachLayer(function (layer) {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });
  }

  function Routing({ origin, destinity }) {
    setOriginCurrent(cityOrigin);
    setDestinityCurrent(cityDestinity);
    const map = useMap();

    L.Routing.control({
      waypoints: [
        L.latLng(origin["lat"], origin["lon"]), // Valledupar
        L.latLng(destinity["lat"], destinity["lon"]), // Mitú
      ],
      router: L.Routing.osrmv1({
        //Servicio de ruteo de OSRM para desplazarme en colombia
        serviceUrl: "http://router.project-osrm.org/route/v1",
        profile: "car",
      }),
      createMarker: function () {
        return null;
      },
      show: true, //onExpandedData // Add this line to hide the route information
    }).addTo(map);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="container"
    >
      <div className="title">
        <FontAwesomeIcon icon={faMapMarked} />
        <span>Mapa Interactivo</span>
      </div>
      <div className="map">
        <MapContainer center={state.currentLocation} zoom={state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Markers />
          {
            cityOrigin !== "" &&
            cityDestinity !== "" &&
            cityOrigin !== originCurrent &&
            cityDestinity !== destinityCurrent
              ? (
                  console.log("Escuchó el cambio de datos"),
                  (<Routing origin={cityOrigin} destinity={cityDestinity} />)
                ) 
              : cityOrigin !== originCurrent && cityDestinity === destinityCurrent
              ? (
                  console.log("Escuchó el cambio de origen")
                  //(<Routing origin={cityOrigin} destinity={cityDestinity} />)
                )
              : cityOrigin === originCurrent && cityDestinity !== destinityCurrent
              ? (
                  console.log("Escuchó el cambio de destino")
                  //(<Routing origin={cityOrigin} destinity={cityDestinity} />)
                )
              : console.log("No escuchó el cambio de datos")
          }
        )
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;
