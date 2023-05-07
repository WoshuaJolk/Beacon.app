import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontFamily, Border, Color } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { setUserStatus } from "../helperFunctions";

const StatusButton = (props) => {
  const handleButtonPress = (buttonIndex) => {
    props.setSelectedButton(buttonIndex);
    setUserStatus(buttonIndex);

    //change it in the firebase also
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF6422", "#FFE454"]}
        style={styles.parentLayout}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable onPress={() => handleButtonPress(props.label)}>
          <View
            style={[
              props.selectedButton === props.label
                ? styles.selectedbox
                : styles.groupShadowBox,
            ]}
          >
            <Text
              style={[
                styles.text,
                props.selectedButton === props.label ? styles.boldText : {},
              ]}
            >
              {props.status}
            </Text>
            <Text
              style={[
                styles.grabACoffee,
                props.selectedButton === props.label ? styles.boldText : {},
              ]}
            >
              {props.text}
            </Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontFamily: FontFamily.epilogueSemibold,
  },
  parentLayout: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Border.br_3xs,
  },
  selectedbox: {
    height: 74,
    width: 74,
    borderRadius: 7,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    fontFamily: FontFamily.epilogueBold,
  },
  groupShadowBox: {
    height: 74,
    width: 74,
    borderRadius: 7,
    alignItems: "center",
    backgroundColor: Color.white,
  },

  text: {
    fontSize: 40,
    lineHeight: 0,
    fontFamily: FontFamily.epilogueSemibold,
    fontWeight: "600",
  },
  grabACoffee: {
    marginTop: 3,
    fontFamily: FontFamily.epilogueRegular,
    lineHeight: 0,
    fontSize: 11,
    textAlign: "left",
  },
  container: {
    marginLeft: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default StatusButton;
