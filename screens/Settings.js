import * as React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import { Input as RNKTextInput } from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import firebase from '../database/firebase'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import Globals from '../Globals'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ExpoImagePicker from '../components/ExpoImagePicker'
import { handleDeleteAccount } from '../helperFunctions'

const Settings = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    profileImageUrl: '',
  })
  const [newImageUrl, setNewImageUrl] = useState(null)
  const [oldImageUrl, setOldImageUrl] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    // Get user data from the Globals object
    const fullName = Globals.fullName || ''
    const email = Globals.email || ''
    const phoneNumber = Globals.phoneNumber || ''
    const profileImageUrl = Globals.profileImageUrl || ''

    // Set the state with user data from Globals
    setUserData({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      profileImageUrl: profileImageUrl,
    })

    // No need to make a request to Firestore to retrieve user data
  }, [])

  const handleSave = () => {
    // Get the currently signed-in user
    const currentUser = firebase.auth().currentUser
    if (currentUser) {
      const uid = currentUser.uid

      // If there is a new image URL, update the user's document in Firestore
      if (newImageUrl !== oldImageUrl) {
        // Create an object to hold the updated user data
        const updatedUserData = {
          fullName: userData.fullName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          profileImageUrl: newImageUrl, // Set the new image URL
        }

        // Update the user's document in Firestore
        firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .update(updatedUserData)
          .then(async () => {
            console.log('Document successfully updated!')
            // Update the Globals object with the user data
            Globals.fullName = userData.fullName
            Globals.email = userData.email
            Globals.phoneNumber = userData.phoneNumber
            Globals.profileImageUrl = newImageUrl

            // Delete the old image from Firebase Cloud Storage, if it exists
            if (oldImageUrl) {
              const storageRef = ref(getStorage(), oldImageUrl)
              try {
                await deleteObject(storageRef)
              } catch (error) {
                console.error(
                  'Error deleting old image from Firebase Storage:',
                  error,
                )
              }
            }
            // Display confirmation alert
            Alert.alert('Success', 'Settings saved successfully!')
          })
          .catch((error) => {
            console.error('Error updating document: ', error)
            // Display error alert
            Alert.alert('Error', 'Failed to save settings.')
          })
      }
    }
  }

  const deleteAccount = () => {
    // Call handleDeleteAccount, which returns a promise
    handleDeleteAccount().then(() => {
      // After the promise resolves, display the success alert and navigate to the login screen
      Alert.alert(
        'Success', // Alert title
        'Your account has been successfully deleted.', // Alert message
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Logins'), // Navigate to the login screen when "OK" is pressed
          },
        ],
        { cancelable: false }, // Prevent dismissal by tapping outside the alert
      )
    })
  }

  // Handle back button press
  const handleBack = () => {
    // Check if the profile image has been updated
    if (newImageUrl !== oldImageUrl) {
      handleSave()
    }
    navigation.goBack() // Navigate back
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Successfully signed out
        Globals.currentUserID = ''
        Globals.fullName = ''
        Globals.email = ''
        Globals.profileImageUrl = ''
        Globals.phoneNumber = ''
        navigation.navigate('Logins') // Navigate to the login screen
      })
      .catch((error) => {
        // Handle logout error
        console.error('Error signing out: ', error)
        // Show an alert to the user with the error message
        Alert.alert('Logout Failed', error.message)
      })
  }

  return (
    <View style={styles.settings}>
      <LinearGradient
        style={styles.fullScreenGradient}
        locations={[0, 1]}
        colors={['rgba(255, 100, 34, 0.15)', 'rgba(255, 100, 34, 0)']}
      />
      <View style={[styles.frameContainer, styles.frameContainerPosition]}>
        <View style={[styles.hiJoshuaParent, styles.parentFlexBox]}>
          <Pressable
            style={styles.wrapper}
            onPress={handleBack} // Call handleBack when pressed
          >
            <Icon name="arrow-back-ios" size={24} color="black" />
          </Pressable>
        </View>
        <View style={[styles.frameView]}>
          <View>
            <View style={[styles.userWrapper, styles.wrapperLayout]}>
              <Text style={[styles.hiJoshua, styles.saveTypo]}>
                Edit Profile
              </Text>
            </View>
            <View style={styles.wrapperLayout}>
              <View style={styles.rectangleWrapper}>
                <ExpoImagePicker
                  userData={userData}
                  setUserData={setUserData}
                  onImagePicked={(newUrl) => {
                    setNewImageUrl(newUrl)
                    setOldImageUrl(userData.profileImageUrl)
                  }}
                />
              </View>
            </View>
            <View style={[styles.nameParent, styles.wrapperLayout]}>
              <Text style={[styles.onlyMatchWith, styles.joshuaWolkTypo]}>
                Name
              </Text>
              <RNKTextInput
                style={[styles.joshuaWolkWrapper, styles.wrapperBorder]}
                placeholder="Full name"
                value={userData.fullName}
                onChangeText={(text) =>
                  setUserData({ ...userData, fullName: text })
                }
                placeholderTextColor="#000"
                autoCorrect={false} // Disable auto-correction
                autoCapitalize="none" // Disable auto-capitalization
              />
            </View>
            <View style={[styles.nameParent, styles.wrapperLayout]}>
              <Text style={[styles.onlyMatchWith, styles.joshuaWolkTypo]}>
                Email
              </Text>
              <RNKTextInput
                style={[styles.joshuaWolkWrapper, styles.wrapperBorder]}
                placeholder="Email address"
                value={userData.email}
                onChangeText={(text) =>
                  setUserData({ ...userData, email: text })
                }
                placeholderTextColor="#000"
                keyboardType="email-address"
                autoCorrect={false} // Disable auto-correction
                autoCapitalize="none" // Disable auto-capitalization
              />
            </View>
            <View style={[styles.nameParent, styles.wrapperLayout]}>
              <Text style={[styles.onlyMatchWith, styles.joshuaWolkTypo]}>
                Phone number
              </Text>
              <RNKTextInput
                style={[styles.joshuaWolkWrapper, styles.wrapperBorder]}
                placeholder="Phone number"
                value={userData.phoneNumber}
                onChangeText={(text) =>
                  setUserData({ ...userData, phoneNumber: text })
                }
                placeholderTextColor="#000"
                keyboardType="phone-pad"
                autoCorrect={false} // Disable auto-correction
                autoCapitalize="none" // Disable auto-capitalization
              />
            </View>
          </View>
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} // Change opacity when pressed
          >
            <LinearGradient
              style={[styles.saveWrapper, styles.parentFlexBox]}
              locations={[0, 1]}
              colors={['#ff6422', '#ffa266']}
            >
              <Text style={[styles.save, styles.saveTypo]}>Save</Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} // Change opacity when pressed
          >
            <LinearGradient
              style={[styles.logoutWrapper, styles.parentFlexBox]}
              locations={[0, 1]}
              colors={['#ff6422', '#ffa266']}
            >
              <Text style={[styles.save, styles.saveTypo]}>Logout</Text>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={deleteAccount}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} // Change opacity when pressed
          >
            <LinearGradient
              style={[styles.logoutWrapper, styles.parentFlexBox]}
              locations={[0, 1]}
              colors={['#ff6422', '#ffa266']}
            >
              <Text style={[styles.save, styles.saveTypo]}>Delete Account</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreenGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.epilogueBold,
    fontWeight: '700',
  },
  joshuaWolkTypo: {
    lineHeight: 22,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.black,
  },
  wrapperBorder: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  wrapperLayout: {
    width: 373,
    marginTop: 20,
    flexDirection: 'row',
  },
  hiJoshua: {
    fontSize: FontSize.size_11xl,
    lineHeight: 41,
    color: Color.black,
    textAlign: 'left',
  },
  hiJoshuaParent: {
    width: 336,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlyMatchWith: {
    fontFamily: FontFamily.epilogueBold,
    fontWeight: '700',
    fontSize: FontSize.size_base,
    marginLeft: 5,
  },
  userWrapper: {
    alignItems: 'center',
  },
  rectangleWrapper: {
    justifyContent: 'center',
    marginLeft: 5,
    height: 150, // Set the height to 150 pixels
  },
  joshuaWolkWrapper: {
    borderRadius: Border.br_11xs,
    width: 228,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_8xs,
  },
  nameParent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  save: {
    fontSize: FontSize.size_lg,
    lineHeight: 25,
    color: Color.white,
  },
  saveWrapper: {
    borderRadius: 15,
    paddingLeft: 61,
    paddingTop: Padding.p_3xs,
    paddingRight: 60,
    paddingBottom: Padding.p_3xs,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: Color.papaya,
  },
  logoutWrapper: {
    borderRadius: 15,
    paddingLeft: 61,
    paddingTop: Padding.p_3xs,
    paddingRight: 60,
    paddingBottom: Padding.p_3xs,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: Color.papaya,
  },
  frameView: {
    paddingHorizontal: Padding.p_xl,
    marginTop: 20,
  },
  frameContainer: {
    top: 62,
    alignItems: 'center',
  },
  settings: {
    borderRadius: Border.br_11xl,
    flex: 1,
    width: '100%',
    height: 896,
    overflow: 'hidden',
    backgroundColor: Color.white,
  },
})

export default Settings
