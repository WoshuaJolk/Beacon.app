import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, Color, Padding, Border, FontSize } from "../GlobalStyles";

const SampleFriend = ({ name }) => {
  return (
    <View style={[styles.frameParent1, styles.parentFlexBox]}>
      <View style={[styles.rectangleParent, styles.rectangleParentFlexBox]}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/rectangle-132.png")}
        />
        <View style={styles.danialAsariaWrapper}>
          <Text style={[styles.danialAsaria, styles.youMayKnowTypo]}>
            {name}
          </Text>
        </View>
      </View>
      <Image
        style={styles.useraddIcon}
        resizeMode="cover"
        source={require("../assets/useradd.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  youMayKnowTypo: {
    fontFamily: FontFamily.interSemibold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  rectangleParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameLayout: {
    padding: Padding.p_7xs,
    width: 339,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    flexDirection: "row",
  },
  addFriendsChild: {
    top: 125,
    left: 129,
    borderRadius: Border.br_8xs,
    width: 156,
    height: 45,
    position: "absolute",
  },
  addFriends1: {
    fontSize: FontSize.size_11xl,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    color: Color.black,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
  },
  arrowrightoutline: {
    width: 24,
    height: 24,
  },
  addFriendsParent: {
    alignSelf: "stretch",
  },
  youMayKnow: {
    fontSize: FontSize.size_5xl,
    lineHeight: 33,
  },
  frameChild: {
    borderRadius: Border.br_9xs,
    width: 36,
    height: 36,
  },
  danialAsaria: {
    fontSize: FontSize.size_lg,
    lineHeight: 25,
  },
  danialAsariaWrapper: {
    marginLeft: 14,
  },
  rectangleParent: {
    justifyContent: "center",
  },
  useraddIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  frameParent1: {
    width: 333,
  },
  frameWrapper1: {
    marginTop: 4,
  },
  frameContainer: {
    marginTop: 12,
    overflow: "hidden",
  },
  frameWrapper: {
    marginTop: 20,
  },
  frameParent: {
    top: 95,
    left: 37,
    position: "absolute",
  },
  homeIndicator: {
    marginLeft: -67,
    bottom: 8,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.black,
    width: 134,
    height: 5,
    position: "absolute",
  },
  systemLightHomeIndicato: {
    right: 0,
    bottom: 0,
    left: 0,
    height: 38,
    position: "absolute",
  },
  addFriends: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    flex: 1,
    height: 896,
    overflow: "hidden",
  },
});

export default SampleFriend;
