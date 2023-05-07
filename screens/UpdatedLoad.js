import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";

const UpdatedLoad = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.updatedLoad}>
      <LinearGradient
        style={styles.fullScreenGradient}
        locations={[0, 1]}
        colors={['rgba(255, 100, 34, 0.15)', 'rgba(255, 100, 34, 0)']}
      />
      <View style={[styles.frameParent, styles.frameLayout]}>
        <View style={[styles.homeParent, styles.wrapperFlexBox]}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/home2.png")}
          />
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/locationmarker2.png")}
          />
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/usergroup.png")}
          />
        </View>
        <Image
          style={[styles.frameChild, styles.frameLayout]}
          resizeMode="cover"
          source={require("../assets/vector-14.png")}
        />
      </View>
      <View style={[styles.image2, styles.image2Position]} />
      <View style={[styles.systemLightHomeIndicato, styles.image2Position]}>
        <View style={styles.homeIndicator} />
      </View>
      <View style={styles.updatedLoadInner}>
        <View>
          <View style={styles.frameGroup}>
            <View style={styles.frameGroup}>
              <View style={styles.ellipseParent}>
                <Image
                  style={[styles.frameItem, styles.image2Position]}
                  resizeMode="cover"
                  source={require("../assets/ellipse-21.png")}
                />
                <Image
                  style={styles.frameInner}
                  resizeMode="cover"
                  source={require("../assets/rectangle-136.png")}
                />
              </View>
              <Text style={styles.danialIsDown}>{`Danial is down to
grab a bite!`}</Text>
            </View>
            <View style={styles.reachHimAtParent}>
              <Text style={styles.reachHimAt}>Reach him at</Text>
              <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.text, styles.textTypo]}>314-555-8708</Text>
              </View>
            </View>
            <Pressable
              style={styles.groupWrapper}
              onPress={() =>
                navigation.navigate("BottomTabsRoot", {
                  screen: "UpdatedChoose",
                })
              }
            >
              <View style={styles.iveLeftWrapper}>
                <Text style={[styles.iveLeft, styles.textTypo]}>I’ve left</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  imageTransform: {
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 414,
  },
  frameLayout: {
    width: 445,
    position: "absolute",
  },
  wrapperFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  image2Position: {
    left: 0,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.epilogueRegular,
    lineHeight: 25,
    fontSize: FontSize.size_lg,
  },
  image3: {
    top: 911,
    left: 1,
    width: 923,
    backgroundColor: Color.papaya,
    position: "absolute",
  },
  homeIcon: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  homeParent: {
    top: 27,
    left: 6,
    width: 414,
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: 0,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
  },
  frameChild: {
    left: 3,
    height: 1,
    top: 0,
  },
  frameParent: {
    top: 799,
    left: -3,
    height: 97,
    backgroundColor: Color.white,
  },
  image2: {
    top: 858,
    width: 858,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 414,
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
    height: 38,
  },
  frameItem: {
    width: 176,
    height: 174,
    display: "none",
    zIndex: 0,
    top: 0,
  },
  frameInner: {
    top: 13,
    left: 13,
    borderRadius: 83,
    width: 148,
    height: 148,
    zIndex: 1,
    marginTop: 8,
    position: "absolute",
  },
  ellipseParent: {
    width: 175,
    height: 175,
    alignItems: "center",
  },
  danialIsDown: {
    fontSize: FontSize.size_11xl,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.epilogueBold,
    width: 264,
    marginTop: 16,
    textAlign: "center",
    color: Color.black,
  },
  frameGroup: {
    alignItems: "center",
  },
  reachHimAt: {
    fontFamily: FontFamily.epilogueRegular,
    lineHeight: 25,
    fontSize: FontSize.size_lg,
    textAlign: "center",
    color: Color.black,
  },
  text: {
    color: Color.black,
    textAlign: "left",
  },
  wrapper: {
    borderRadius: Border.br_8xs,
    width: 339,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
    justifyContent: "center",
    marginTop: 6,
    alignItems: "center",
  },
  reachHimAtParent: {
    marginTop: 30,
    alignItems: "center",
  },
  iveLeft: {
    color: Color.gray_200,
    left: 0,
    position: "absolute",
    top: 0,
  },
  iveLeftWrapper: {
    width: 65,
    height: 25,
  },
  groupWrapper: {
    marginTop: 30,
  },
  updatedLoadInner: {
    top: 199,
    left: 26,
    width: 361,
    alignItems: "center",
    position: "absolute",
  },
  updatedLoad: {
    borderRadius: Border.br_11xl,
    flex: 1,
    width: "100%",
    height: 896,
    overflow: "hidden",
    backgroundColor: Color.white,
  },
});

export default UpdatedLoad;
