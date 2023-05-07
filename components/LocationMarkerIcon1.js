import * as React from "react";
import { Image, StyleSheet } from "react-native";

const LocationMarkerIcon1 = ({ style }) => {
  return (
    <Image
      style={[styles.locationmarkerIcon, style]}
      resizeMode="cover"
      source={require("../assets/locationmarker1.png")}
    />
  );
};

const styles = StyleSheet.create({
  locationmarkerIcon: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
});

export default LocationMarkerIcon1;
