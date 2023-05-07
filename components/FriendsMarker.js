import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable
} from 'react-native'
import { Marker } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'
import ProfileImageWithInitials from './ProfileImageWithInitials'
import firebase from '../database/firebase'

const FriendsMarker = (props) => {
  //till take in props.showStatus and props.setShowStatus status and id

  //initalize firebase info
  const [data, setData] = useState(null)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [status, setStatus] = useState(null)
  const [image, setImage] = useState(null)
  const [name, setname] = useState(null)
  const [writtenStatus, setWrittenStatus] = useState(null)
  const [beaconOn, setBeaconOn] = useState(false)

  state = {
    latitude: lat,
    longitude: lon,
  }

  if (props.myMarker) {
    state = {
      latitude: props.myLat,
      longitude: props.myLon,
    }
  }

  const inputRef = useRef(null)
  const [statusText, setstatusText] = useState('')

  const changeStatus = () => {
    //if it is already clicked set it as off
    if (
      props.showStatus == props.id ||
      writtenStatus == '' ||
      writtenStatus == null
    ) {
      props.setShowStatus(null)
    } else {
      props.setShowStatus(props.id)
    }
  }

  useEffect(() => {
    // Construct the path to the user's data
    const userDocRef = firebase.firestore().collection('users').doc(props.id)

    // Listen for changes to the user's document
    const unsubscribe = userDocRef.onSnapshot((doc) => {
      setData(doc.data())
    })

    // Unsubscribe from events when no longer in use
    return () => unsubscribe()
  }, [props.id])

  useEffect(() => {
    // console.log(data);
    if (data) {
      setLat(data.location.latitude)
      setLon(data.location.longitude)
      setStatus(data.status)
      setname(data.fullName)
      setWrittenStatus(data.statusMessage)
      setBeaconOn(data.beaconOn)
      setImage(data.profileImageUrl)
    }
  }, [data])

  useEffect(() => {
    if (status == 'getCoffee') {
      setstatusText('☕️')
    }
    if (status == 'study') {
      setstatusText('✏️')
    }
    if (status == 'walk') {
      setstatusText('🚶')
    }
    if (status == 'games') {
      setstatusText('🏀')
    }
    if (status == 'goOut') {
      setstatusText('🕺')
    }
    if (status == 'gym') {
      setstatusText('💪')
    }
    if (status == 'grabABite') {
      setstatusText('🍽')
    }
    if (status == 'justHang') {
      setstatusText('🏄')
    }
  }, [status])

  return (
    <>
      {beaconOn ? (
        <Marker
          style={styles.marker}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        >
          <Pressable onPress={() => changeStatus()}>
            {props.showStatus == props.id ? (
              <Pressable
                style={{ backgroundColor: 'red' }}
                onPress={() => (changeStatus(), console.log('closed'))}
              >
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusText}>{writtenStatus}</Text>
                </View>
              </Pressable>
            ) : null}

            <View style={styles.circle}>
              <LinearGradient
                colors={['#FF6422', '#FFE454']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={styles.markerImageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.markerImage} />
                ) : (
                  <ProfileImageWithInitials
                    fullName={name}
                    customStyle={{
                      width: 52,
                      height: 52,
                      marginLeft: -1.5,
                      marginTop: -1.5,
                    }}
                    onProfileImageClick={() => navigation.navigate('Settings')}
                  />
                )}
              </View>
            </View>

            {props.showStatus != props.id && writtenStatus != '' ? (
              <View style={styles.typingImageContainer}>
                <Text style={styles.text}>💬</Text>
              </View>
            ) : null}

            <View style={styles.statusImageContainer}>
              <Text style={styles.text}>{statusText}</Text>
            </View>
          </Pressable>
        </Marker>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  marker: {
    overflow: 'visible',
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
    overflow: 'visible',
  },
  markerImageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'transparent',
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
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: 'transparent',
    transform: [{ translateX: -13 }, { translateY: -10 }],
  },
  statusTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: 250,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    transform: [{ translateX: 40 }, { translateY: -25 }],
    padding: 10,
    paddingLeft: 17,
  },
  statusText: {
    borderRadius: 30,
    fontSize: 16,
  },
  typingImageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: 'transparent',
    transform: [{ translateX: -5 }, { translateY: -65 }],
  },
  inputTextContainer: {
    //position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: 250,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    transform: [{ translateX: 40 }, { translateY: -70 }],
    padding: 20,
    zIndex: 400,
  },
  smallText: {
    transform: [{ translateX: 95 }, { translateY: 2 }],
  },
  input: {
    width: 250,
    textAlign: 'center',
  },
})

export default FriendsMarker
