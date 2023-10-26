import React, { useEffect, useState } from "react";
import "./MapView.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Markers from "../markers/Markers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom"; // Asegúrate de tener el archivo Awns.json en la misma ubicación que tu componente
import { motion } from "framer-motion";
import Position from "../../../assets/positions/Positions.json";

const MapView = (route) => {
  const [originCurrent, setOriginCurrent] = useState({ lat: "", lon: "" });
  const [destinityCurrent, setDestinityCurrent] = useState({
    lat: "",
    lon: "",
  });

  const [state, setState] = useState({
    currentLocation: { lat: "4.570868", lng: "-74.297333" },
    zoom: 6,
  });

  // function ClearRouting() {
  //   const map = useMap();
  //   map.eachLayer(function (layer) {
  //     if (layer instanceof L.Routing.Control) {
  //       map.removeControl(layer);
  //     }
  //   });
  // }
  // const onSaveLocation = () => {
  //   console.log(cityOrigin);
  //   setOriginCurrent(cityOrigin);
  //   console.log(cityDestinity);
  //   setDestinityCurrent(cityDestinity);
  // };
  function buscarRuta(route) {
    const latitudes = [];
    const longitudes = [];
    if (route.route.length > 0) {
      const rutaCompleta = route.route;
      const ciudades = rutaCompleta.split("->").map((ciudad) => ciudad.trim());
      for (let i = 0; i < ciudades.length; i++) {
        const ciudad = ciudades[i];
        if (Position[ciudad]) {
          latitudes.push(Position[ciudad].lat);
          longitudes.push(Position[ciudad].lon);
        }
      }
    }
    return { longitudes, latitudes };
  }
  function Routing({ route }) {
    const ubicaciones = buscarRuta(route);
    const map = useMap();
    //necesito recorrer la lista de latitudes y longitudes y pintarlas en el mapa
    useEffect(() => {
      if (
        ubicaciones.longitudes.length > 1 &&
        ubicaciones.latitudes.length > 1
      ) {
        // Crea una matriz de puntos de ruta con las latitudes y longitudes
        const waypoints = [];
        for (let i = 0; i < ubicaciones.longitudes.length; i++) {
          waypoints.push(
            L.latLng(ubicaciones.latitudes[i], ubicaciones.longitudes[i])
          );
        }

        // Limpia cualquier enrutamiento anterior
        map.eachLayer(function (layer) {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer);
          }
        });

        // Agrega una nueva capa de enrutamiento
        L.Routing.control({
          waypoints,
          routeWhileDragging: true,
          autoRoute: true,
          show: false, // Esto muestra la ruta en el mapa
          lineOptions: {
            styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
          },
          createMarker: function (i, waypoint, n) {
            // Crea marcadores para los puntos de ruta (opcional)
            return null;
          },
        }).addTo(map);
      }
    }, [ubicaciones, map]);
    //console.log(ubicaciones);
    //Guarda los datos de origen y destino
    // useEffect(() => {
    //   onSaveLocation();
    // }, [origin, destinity]);
    // useEffect(() => {
    //   if (origin !== originCurrent && destinity === destinityCurrent) {
    //     map.eachLayer(function (layer) {
    //       if (layer instanceof L.Routing.Control) {
    //         map.removeControl(layer);
    //       }
    //     });
    //     L.Routing.control({
    //       waypoints: [
    //         L.latLng(origin.lat, origin.lon),
    //         L.latLng(destinityCurrent.lat, destinityCurrent.lon),
    //       ],
    //       routeWhileDragging: true,
    //       autoRoute: true,
    //       show: false,
    //       //showAlternatives: true,
    //       altLineOptions: {
    //         styles: [
    //           { color: "black", opacity: 0.15, weight: 9 },
    //           { color: "white", opacity: 0.8, weight: 6 },
    //           { color: "blue", opacity: 0.5, weight: 2 },
    //         ],
    //       },
    //       createMarker: function () {
    //         return null;
    //       },
    //     }).addTo(map);
    //   }
    // }, [origin, destinity, map]);
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
          <Routing route={route} />
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;
