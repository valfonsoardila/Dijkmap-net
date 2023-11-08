import { resources } from "../../../assets/resources";
import L  from "leaflet";

const IconLocation = L.icon({
    iconUrl: resources.currentLocation,
    shadowUrl: resources.currentLocationShadow,
    iconSize: [55, 55],
    shadowSize: [58, 58],
    iconAnchor: [15, 30],
    shadowAnchor: [15, 32],
    popupAnchor: [0, -30],
});

export default IconLocation;