import React from "react";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

const EmptyMarker = (props) => {
  state = {
    latitude: props.lat,
    longitude: props.lon,
  };

  return (
    <Marker
      style={styles.marker}
      coordinate={{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      }}
    >
      <View style={styles.circle}></View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 2.5,
    borderStyle: "dashed",
    borderColor: "#FF6422",
    backgroundColor: "transparent",
  },
});

export default EmptyMarker;
