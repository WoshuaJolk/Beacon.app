import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import ProfileImageWithInitials from "./ProfileImageWithInitials";

const MyMarker = (props) => {
  state = {
    latitude: props.lat,
    longitude: props.lon,
  };

  const [statusText, setstatusText] = useState("");

  //const [showStatus, setShowStatus] = useState(false);
  //showStatus = {showStatus}  setShowStatus = {setShowStatus}

  const changeStatus = () => {
    //if my maker is thsoul pop up to edit

    console.log(props.showStatus, " ", props.status);
    //if it is already clicked set it as off
    if (props.showStatus == props.id || props.writtenStatus == "") {
      props.setShowStatus(null);
    } else {
      props.setShowStatus(props.id);
    }
  };

  //showStatus = {showStatus}  setShowStatus = {setShowStatus}

  useEffect(() => {
    console.log("doing status");
    console.log(props.status);
    if (props.status == "getCoffee") {
      console.log("changed text");
      setstatusText("☕️");
    }
    if (props.status == "study") {
      setstatusText("✏️");
    }
    if (props.status == "walk") {
      setstatusText("🚶");
    }
    if (props.status == "games") {
      setstatusText("🏀");
    }
    if (props.status == "goOut") {
      setstatusText("🕺");
    }
    if (props.status == "gym") {
      setstatusText("💪");
    }
    if (props.status == "grabABite") {
      setstatusText("🍽");
    }
    if (props.status == "justHang") {
      setstatusText("🏄");
    }
  }, [props.status]);

  return (
    <Marker
      style={styles.marker}
      coordinate={{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      }}
    >
      <Pressable onPress={() => changeStatus()}>
        {props.showStatus == props.id ? (
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusText}>{props.writtenStatus}</Text>
          </View>
        ) : null}

        <View style={styles.circle}>
          <LinearGradient
            colors={["#FF6422", "#FFE454"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.markerImageContainer}>
            {props.image ? (
              <Image source={{ uri: props.image }} style={styles.markerImage} />
            ) : (
              <ProfileImageWithInitials
                fullName={props.name}
                customStyle={{
                  width: 52,
                  height: 52,
                  marginLeft: -1.5,
                  marginTop: -1.5,
                }}
                onProfileImageClick={() => navigation.navigate("Settings")}
              />
            )}
          </View>
        </View>

        {props.showStatus != props.id && props.writtenStatus != "" ? (
          <View style={styles.typingImageContainer}>
            <Text style={styles.text}>💬</Text>
          </View>
        ) : null}

        <View style={styles.statusImageContainer}>
          <Text style={styles.text}>{statusText}</Text>
        </View>
      </Pressable>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    overflow: "visible",
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 35,
    overflow: "hidden",
  },
  gradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  markerImageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "transparent",
    transform: [{ translateX: -2 }, { translateY: -2 }],
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  text: {
    borderRadius: 30,
    fontSize: 40,
  },
  statusImageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: "transparent",
    transform: [{ translateX: -13 }, { translateY: -10 }],
  },
  statusTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    width: 250,
    height: 60,
    borderRadius: 20,
    backgroundColor: "transparent",
    transform: [{ translateX: 40 }, { translateY: -25 }],
    backgroundColor: "white",
    padding: 10,
  },
  statusText: {
    borderRadius: 30,
    fontSize: 16,
  },
  typingImageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: "transparent",
    transform: [{ translateX: -5 }, { translateY: -65 }],
  },
  inputTextContainer: {
    //position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    width: 250,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    backgroundColor: "white",
    transform: [{ translateX: 40 }, { translateY: -70 }],
    padding: 20,
    zIndex: 400,
  },
  smallText: {
    transform: [{ translateX: 95 }, { translateY: 2 }],
  },
  input: {
    width: 250,
    textAlign: "center",
  },
});

export default MyMarker;
