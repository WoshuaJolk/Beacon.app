import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Button,
  Text,
  AsyncStorage,
} from 'react-native'
import MapView from 'react-native-maps'
import MyMarker from '../components/MyMarker'
import EmptyMarker from '../components/EmptyMarker'
import friendsImage from '../assets/usergroup1.png'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import BeaconOff from '../components/BeaconOff'
import BeaconOn from '../components/BeaconOn'
import * as Location from 'expo-location'
import { setUserLocation } from '../helperFunctions'
import firebase from '../database/firebase'
import Globals from '../Globals'
import { setUserStatus } from '../helperFunctions'
import FriendsMarker from '../components/FriendsMarker'

/*
To do:
- get name / image to work 
- figure out the write update part 
- button on hover thing
*/

const UpdatedChoose = () => {
  const [data, setData] = useState(null)
  const [heading, setHeading] = useState(0)
  const [becon, setBeacon] = useState(false)
  const [myStatus, setmyStatus] = useState('justHang')
  const [myLat, setmyLat] = useState(34.0224)
  const [myLon, setmyLon] = useState(-118.2851)
  const [currentFriends, setCurrentFriends] = useState([])
  const [myWrittenStatus, setWrittenStatus] = useState('')
  const [showStatus, setShowStatus] = useState(null)
  const userDocRef = firebase
    .firestore()
    .collection('users')
    .doc(Globals.currentUserID)

  useEffect(() => {
    // Construct the path to the user's data
    const userDocRef = firebase
      .firestore()
      .collection('users')
      .doc(Globals.currentUserID)

    // Listen for changes to the user's document
    const unsubscribe = userDocRef.onSnapshot((doc) => {
      setData(doc.data())
    })

    // Unsubscribe from events when no longer in use
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (data) {
      setBeacon(data.beaconOn)
      setCurrentFriends(data.friends)
      setWrittenStatus(data.statusMessage)
      setmyStatus(data.status)
    }
  }, [data])

  useEffect(() => {
    ;(async () => {
      // check if user has allowed us to use their location while app is in the foreground

      let permissions = await Location.requestForegroundPermissionsAsync({
        reason:
          'Beacon App needs your precise location to share with your current friends on the map. You can choose who these friends are and remove them through the friends page. You can also turn your location off via the map screen.',
      })

      // user has not allowed us to use their location
      if (true) {
        console.log('Permissions not granted. Asking now...')

        const newPermissions = await Location.requestForegroundPermissionsAsync(
          {
            reason:
              'Beacon App needs your precise location to share with your current friends on the map. You can choose who these friends are and remove them through the friends page. You can also turn your location off via the map screen.',
          },
        )
        //console.log("new permission ", newPermissions)

        if (!newPermissions.granted) {
          // console.log("Permissions still denied! Returning...");
          return
        } else {
          //console.log("it woreked!!!!!!");
        }
      }

      Location.watchHeadingAsync((data) => {
        const { trueHeading } = data
        setHeading(trueHeading)
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest,
        })
          .then((location) => {
            //this updates a lotttttt so idk how that affects how fast the app is but yeah
            const latitude = location.coords.latitude
            const longitude = location.coords.longitude
            setmyLat(latitude)
            setmyLon(longitude)
          })
          .catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    })()
  }, [])

  useEffect(() => {
    // Run this code every 30 seconds
    const interval = setInterval(() => {
      console.log('added to fire base')
      setUserLocation(myLat, myLon)
    }, 600000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.friendsButtonContainer}>
        <Pressable
          style={styles.dontHaveAnContainer}
          onPress={() => navigation.navigate('FriendsPage')}
        >
          <Image source={friendsImage} style={styles.friendsButton} />
        </Pressable>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: myLat,
          longitude: myLon,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {/* This marker is my marker WITH my current location*/}
        {becon ? (
          <FriendsMarker
            index={0}
            id={Globals.currentUserID}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
            myMarker={true}
            myLat={myLat}
            myLon={myLon}
          />
        ) : (
          <EmptyMarker lat={myLat} lon={myLon} />
        )}

        {/* This marker is the other users markers
         For every frind in frineds need to set this
         Also need to figure out when to update */}

        {currentFriends.map((friend, index) => (
          <FriendsMarker
            index={index + 1}
            id={friend.id}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
            myMarker={false}
          />
        ))}
      </MapView>

      {becon ? (
        <BeaconOn
          setBeacon={setBeacon}
          setmyStatus={setmyStatus}
          myStatus={myStatus}
          writtenStatus={myWrittenStatus}
          setWrittenStatus={setWrittenStatus}
        />
      ) : (
        <BeaconOff setBeacon={setBeacon} setmyStatus={setmyStatus} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  friendsButtonContainer: {
    width: 55,
    height: 55,
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 23,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  friendsButton: {
    width: 34,
    height: 34,
    transform: [{ translateX: 10 }, { translateY: 9 }],
  },
  bottomSheet: {
    zIndex: 1,
  },
})

export default UpdatedChoose
