import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyA4o6V_rzILTr08OdU1WE2new6visUlcTg"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;