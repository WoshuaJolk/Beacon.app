import * as React from "react";
import { Image, StyleSheet } from "react-native";

const UserGroupIcon = ({ style }) => {
  return (
    <Image
      style={[styles.usergroupIcon, style]}
      resizeMode="cover"
      source={require("../assets/usergroup.png")}
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

export default UserGroupIcon;
