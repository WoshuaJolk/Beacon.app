import * as React from "react";
import { Image, StyleSheet } from "react-native";

const UserGroupIcon1 = ({ style }) => {
  return (
    <Image
      style={[styles.usergroupIcon, style]}
      resizeMode="cover"
      source={require("../assets/usergroup1.png")}
    />
  );
};

const styles = StyleSheet.create({
  usergroupIcon: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
});

export default UserGroupIcon1;
