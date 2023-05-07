import * as React from "react";
import { Image, StyleSheet } from "react-native";

const HomeIcon = ({ style }) => {
  return (
    <Image
      style={[styles.homeIcon, style]}
      resizeMode="cover"
      source={require("../assets/home.png")}
    />
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
});

export default HomeIcon;
