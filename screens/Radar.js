import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const Radar = () => {
  return (
    <View style={styles.radar}>
      <LinearGradient
        style={styles.fullScreenGradient}
        locations={[0, 1]}
        colors={['rgba(255, 100, 34, 0.15)', 'rgba(255, 100, 34, 0)']}
      />
      <View style={[styles.image2, styles.imagePosition]} />
      <View style={styles.systemLightHomeIndicato}>
        <View style={styles.homeIndicator} />
      </View>
      <View style={styles.radarInner}>
        <View>
          <Text style={styles.radar1}>Radar</Text>
          <View style={styles.frameParent}>
            <View style={styles.frameGroup}>
              <View style={styles.vectorParent}>
                <Image
                  style={styles.vectorIcon}
                  resizeMode="cover"
                  source={require("../assets/vector.png")}
                />
                <Text style={[styles.closeFriends, styles.friendsTypo]}>
                  Close friends
                </Text>
              </View>
              <View style={styles.frameContainer}>
                <View style={[styles.frameView, styles.frameParentFlexBox1]}>
                  <View style={styles.rectangleParent}>
                    <Image
                      style={styles.frameChild}
                      resizeMode="cover"
                      source={require("../assets/rectangle-133.png")}
                    />
                    <View style={styles.danialWantsToGrabABiteParent}>
                      <Text style={[styles.danialWantsTo, styles.wantsTypo1]}>
                        Danial wants to grab a bite
                      </Text>
                      <Text style={[styles.whosDownFor, styles.mTypo]}>
                        Who’s down for Wingstop?
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>2m</Text>
                </View>
                <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
                  <View style={styles.rectangleParent}>
                    <Image
                      style={styles.frameChild}
                      resizeMode="cover"
                      source={require("../assets/rectangle-132.png")}
                    />
                    <View style={styles.danialWantsToGrabABiteParent}>
                      <Text style={[styles.danialWantsTo, styles.wantsTypo1]}>
                        Sana wants to workout
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>12m</Text>
                </View>
                <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
                  <View style={styles.rectangleParent}>
                    <Image
                      style={styles.frameChild}
                      resizeMode="cover"
                      source={require("../assets/rectangle-132.png")}
                    />
                    <Text style={[styles.nicoleWantsTo, styles.wantsTypo1]}>
                      Nicole wants to study
                    </Text>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>12m</Text>
                </View>
                <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
                  <View style={styles.rectangleParent}>
                    <Image
                      style={styles.frameChild}
                      resizeMode="cover"
                      source={require("../assets/rectangle-132.png")}
                    />
                    <Text style={[styles.nicoleWantsTo, styles.wantsTypo1]}>
                      Phoebe wants to just hang
                    </Text>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>16m</Text>
                </View>
              </View>
            </View>
            <View style={styles.friendsParent}>
              <Text style={styles.friendsTypo}>Friends</Text>
              <View style={styles.frameContainer}>
                <View style={[styles.frameParent5, styles.frameParentFlexBox1]}>
                  <View
                    style={[
                      styles.rectangleParent2,
                      styles.rectangleParentSpaceBlock,
                    ]}
                  >
                    <Image
                      style={styles.frameChild1}
                      resizeMode="cover"
                      source={require("../assets/rectangle-134.png")}
                    />
                    <View style={styles.danialWantsToGrabABiteParent}>
                      <Text style={styles.wantsTypo}>
                        Joanna wants to grab a bite
                      </Text>
                      <Text style={[styles.whosDownFor, styles.mTypo]}>
                        Getting Chipotle in 15!
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>2:14 pm</Text>
                </View>
                <View style={[styles.frameParent5, styles.frameParentFlexBox1]}>
                  <View style={styles.rectangleParentSpaceBlock}>
                    <Image
                      style={styles.frameChild1}
                      resizeMode="cover"
                      source={require("../assets/rectangle-135.png")}
                    />
                    <Text style={[styles.colinWantsTo, styles.wantsTypo]}>
                      Colin wants to just hang
                    </Text>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>2:12 pm</Text>
                </View>
                <View style={[styles.frameParent5, styles.frameParentFlexBox1]}>
                  <View style={styles.rectangleParentSpaceBlock}>
                    <Image
                      style={styles.frameChild1}
                      resizeMode="cover"
                      source={require("../assets/rectangle-135.png")}
                    />
                    <Text style={[styles.colinWantsTo, styles.wantsTypo]}>
                      Scott wants to grab coffee
                    </Text>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>2:00 pm</Text>
                </View>
                <View style={[styles.frameParent5, styles.frameParentFlexBox1]}>
                  <View style={styles.rectangleParentSpaceBlock}>
                    <Image
                      style={styles.frameChild1}
                      resizeMode="cover"
                      source={require("../assets/rectangle-135.png")}
                    />
                    <Text style={[styles.colinWantsTo, styles.wantsTypo]}>
                      Mitchell wants to just hang
                    </Text>
                  </View>
                  <Text style={[styles.m, styles.mTypo]}>1:54 pm</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.frameParent9, styles.frameLayout]}>
        <View style={[styles.homeParent, styles.frameParentFlexBox1]}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require("../assets/usergroup.png")}
          />
        </View>
        <Image
          style={[styles.frameChild5, styles.frameLayout]}
          resizeMode="cover"
          source={require("../assets/vector-14.png")}
        />
      </View>
      <View style={styles.systemLightHomeIndicato}>
        <View style={styles.homeIndicator} />
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
  imagePosition: {
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    height: 414,
    left: 0,
    position: "absolute",
  },
  friendsTypo: {
    fontFamily: FontFamily.epilogueSemibold,
    fontWeight: "600",
    lineHeight: 33,
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.black,
  },
  frameParentFlexBox1: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  wantsTypo1: {
    lineHeight: 25,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.black,
  },
  mTypo: {
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  frameParentFlexBox: {
    marginTop: 8,
    justifyContent: "space-between",
    width: 339,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    flexDirection: "row",
  },
  rectangleParentSpaceBlock: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  wantsTypo: {
    lineHeight: 22,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.black,
  },
  frameLayout: {
    width: 445,
    position: "absolute",
  },
  image3: {
    top: 896,
    width: 896,
    backgroundColor: Color.papaya,
  },
  image2: {
    top: 858,
    width: 858,
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
    left: 0,
    position: "absolute",
  },
  radar1: {
    fontSize: FontSize.size_11xl,
    lineHeight: 41,
    fontWeight: "700",
    fontFamily: FontFamily.epilogueBold,
    textAlign: "left",
    color: Color.black,
  },
  vectorIcon: {
    width: 19,
    height: 18,
  },
  closeFriends: {
    marginLeft: 12,
  },
  vectorParent: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameChild: {
    borderRadius: Border.br_9xs,
    width: 36,
    height: 36,
  },
  danialWantsTo: {
    fontFamily: FontFamily.interRegular,
  },
  whosDownFor: {
    color: Color.gray_100,
    fontFamily: FontFamily.interRegular,
  },
  danialWantsToGrabABiteParent: {
    marginLeft: 8,
  },
  rectangleParent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  m: {
    fontFamily: FontFamily.epilogueRegular,
    color: Color.gray_200,
  },
  frameView: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_5xs,
    width: 339,
    justifyContent: "space-between",
    borderRadius: Border.br_3xs,
  },
  frameParent1: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_5xs,
  },
  nicoleWantsTo: {
    fontFamily: FontFamily.interRegular,
    marginLeft: 8,
  },
  frameParent2: {
    padding: Padding.p_7xs,
  },
  frameContainer: {
    marginTop: 12,
    overflow: "hidden",
  },
  frameGroup: {
    display: "none",
  },
  frameChild1: {
    borderRadius: Border.br_7xs,
    width: 25,
    height: 25,
  },
  rectangleParent2: {
    alignItems: "center",
  },
  frameParent5: {
    padding: Padding.p_9xs,
    width: 339,
    justifyContent: "space-between",
  },
  colinWantsTo: {
    marginLeft: 8,
  },
  friendsParent: {
    marginTop: 19,
  },
  frameParent: {
    marginTop: 20,
  },
  radarInner: {
    top: 108,
    left: 30,
    alignItems: "flex-end",
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
    position: "absolute",
  },
  frameChild5: {
    top: 0,
    left: 3,
    height: 1,
  },
  frameParent9: {
    top: 799,
    left: -3,
    height: 97,
    backgroundColor: Color.white,
  },
  radar: {
    borderRadius: Border.br_11xl,
    flex: 1,
    width: "100%",
    height: 896,
    overflow: "hidden",
    backgroundColor: Color.white,
  },
});

export default Radar;
