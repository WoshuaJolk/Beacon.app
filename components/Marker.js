import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import markerImage from '../assets/rectangle-132.png';


const MarkerComp = (props) =>  {
    state = {
      latitude: props.lat,
      longitude:props.lon,
  };

  const [statusText, setstatusText] = useState("");


useEffect(() => {
  console.log("doing status")
  console.log(props.status)
  if(props.status == "coffee"){
    setstatusText("☕️");
  }
  if(props.status == "food"){
    console.log("changed text")
    setstatusText("🍽");
  }
  if(props.status == "study"){
    setstatusText("✏️");
  }
  if(props.status == "goOut"){
    setstatusText("🕺");
  }
  if(props.status == "gym"){
    setstatusText("💪");
  }
  if(props.status == "sports"){
    setstatusText("🏀");
  }
  if(props.status == "stroll"){
    setstatusText("🚶‍♀️");
  }
  if(props.status == "justHang"){
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
<View style={styles.circle}>
      <LinearGradient
        colors={['#FF6422', '#FFE454']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}

      />
      <View style={styles.markerImageContainer}>
        <Image source={markerImage} style={styles.markerImage} />
      </View>
      
  </View>
      <View style={styles.statusImageContainer}>
          <Text style={styles.text}>{statusText}</Text>
      </View>
</Marker>

    )};




const styles = StyleSheet.create({
  marker: {
    overflow: 'visible'
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 35,
    overflow: 'hidden',
  },
  gradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  },
  markerImageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'transparent',
    transform: [{translateX: -2}, {translateY: -2}],

  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  text:{
    borderRadius: 30,
    fontSize: 40
  },
  statusImageContainer:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: 'transparent',
    transform: [{translateX: -13}, {translateY: -10}],
  }
});

export default MarkerComp