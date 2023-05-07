import * as React from "react";
import { StyleProp, ViewStyle, Image, StyleSheet,View,Text,Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color, Padding} from '../GlobalStyles'
import {LinearGradient} from 'expo-linear-gradient';
import { PropsService } from "@ui-kitten/components/devsupport";
import { turnOnBeacon } from '../helperFunctions'
import Globals from '../Globals'
import { setUserStatusMessage } from '../helperFunctions'
import { setUserStatus } from '../helperFunctions'


const BeaconOff = (props) => {
  return (
    <View style={styles.onButtonContainer}>
    <LinearGradient
      // colors={['#FF6422', '#FFE454']}
      colors={['#FF6422', '#FFA266']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
    <View style={styles.pressableStyle}>
      <Pressable onPress={() => {
        props.setBeacon(true);
        turnOnBeacon(Globals.currentUserID);
        setUserStatus("justHang");
        props.setmyStatus("justHang");
      }}>
        <Text style={styles.becaonOnText}>Turn your beacon on!</Text>
      </Pressable>
    </View>
  </LinearGradient>
  </View>
  );
};

const styles = StyleSheet.create({
    onButtonContainer:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        marginBottom: 50,
        marginTop: 770,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 5,
      },
      onButton: {
        width: 375,
        height: 140,
        borderRadius: 20,
      },
      gradient: {
        width: 380,
        height: 145, // changed from 65 to 145
        backgroundColor: "white",
        borderRadius: 100,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 5,
      },
      pressableStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // added this line
      },      
      becaonOnText:{
        color: Color.white,
        textAlign: 'center',
        lineHeight: 140,
        fontSize: FontSize.size_lg,
    
      },
     
});

export default BeaconOff;
