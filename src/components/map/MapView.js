import React, { useEffect, useState } from "react";
import "./MapView.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Markers from "./markers/Markers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom"; // Asegúrate de tener el archivo Awns.json en la misma ubicación que tu componente
import { motion } from "framer-motion";

const MapView = ({ onExpandedData, cityOrigin, cityDestinity, transport }) => {
  const [originCurrent, setOriginCurrent] = useState({ lat: "", lon: "" });
  const [destinityCurrent, setDestinityCurrent] = useState({
    lat: "",
    lon: "",
  });

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
  const onSaveLocation = () => {
    console.log(cityOrigin);
    setOriginCurrent(cityOrigin);
    console.log(cityDestinity);
    setDestinityCurrent(cityDestinity);
  };

  function Routing({ origin, destinity }) {
    const map = useMap();
    //Guarda los datos de origen y destino
    useEffect(() => {
      onSaveLocation();
    }, [origin, destinity]);
    //Se ejecuta cuando cambia el origen
    useEffect(() => {
      if (origin !== originCurrent && destinity === destinityCurrent) {
        map.eachLayer(function (layer) {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer);
          }
        });
        L.Routing.control({
          waypoints: [
            L.latLng(origin.lat, origin.lon),
            L.latLng(destinityCurrent.lat, destinityCurrent.lon),
          ],
          routeWhileDragging: true,
          autoRoute: true,
          //showAlternatives: true,
          altLineOptions: {
            styles: [
              { color: "black", opacity: 0.15, weight: 9 },
              { color: "white", opacity: 0.8, weight: 6 },
              { color: "blue", opacity: 0.5, weight: 2 },
            ],
          },
          createMarker: function () {
            return null;
          },
        }).addTo(map);
      }
    }, [origin, destinity, map]);
    //Se ejecuta cuando cambia el destino
    useEffect(() => {
      if (origin === originCurrent && destinity !== destinityCurrent) {
        map.eachLayer(function (layer) {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer);
          }
        });
        L.Routing.control({
          waypoints: [
            L.latLng(originCurrent.lat, originCurrent.lon),
            L.latLng(destinity.lat, destinity.lon),
          ],
          routeWhileDragging: true,
          autoRoute: true,
          //showAlternatives: true,
          altLineOptions: {
            styles: [
              { color: "black", opacity: 0.15, weight: 9 },
              { color: "white", opacity: 0.8, weight: 6 },
              { color: "blue", opacity: 0.5, weight: 2 },
            ],
          },
          createMarker: function () {
            return null;
          },
        }).addTo(map);
      }
    }, [origin, destinity, map]);
    //Se ejecuta cuando cambian ambos
    useEffect(() => {
      if (origin !== originCurrent && destinity !== destinityCurrent) {
        map.eachLayer(function (layer) {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer);
          }
        });
        L.Routing.control({
          waypoints: [
            L.latLng(origin.lat, origin.lon),
            L.latLng(destinity.lat, destinity.lon),
          ],
          routeWhileDragging: true,
          autoRoute: true,
          //showAlternatives: true,
          altLineOptions: {
            styles: [
              { color: "black", opacity: 0.15, weight: 9 },
              { color: "white", opacity: 0.8, weight: 6 },
              { color: "blue", opacity: 0.5, weight: 2 },
            ],
          },
          createMarker: function () {
            return null;
          },
          
        }).addTo(map);
      }
    }, [origin, destinity, map]);
    //Se ejecuta para usar flyto
    useEffect(() => {
      if (origin !== originCurrent && destinity !== destinityCurrent) {
        map.flyTo([origin.lat, origin.lon], 7);
      }else{
        map.flyTo([originCurrent.lat, originCurrent.lon], 6);
      }
    }, [origin, destinity, map]);
    return null;
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
          {cityOrigin !== "" &&
          cityDestinity !== "" &&
          cityOrigin !== originCurrent &&
          cityDestinity !== destinityCurrent
            ? (console.log("Escuchó el cambio de datos"),
              (<Routing origin={cityOrigin} destinity={cityDestinity} />))
            : cityOrigin !== originCurrent && cityDestinity === destinityCurrent
            ? (console.log("Escuchó el cambio de origen"),
              (<ClearRouting />),
              (<Routing origin={cityOrigin} destinity={destinityCurrent} />))
            : cityOrigin === originCurrent && cityDestinity !== destinityCurrent
            ? (console.log("Escuchó el cambio de destino"),
              (<ClearRouting />),
              (<Routing origin={originCurrent} destinity={cityDestinity} />))
            : console.log("Terminó de escuchar")}
          )
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;
