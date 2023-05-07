import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { Input as RNKTextInput } from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize, Border, Padding } from '../GlobalStyles'
import FriendRequest from '../components/SampleFriendRequest'
import FriendCard from '../components/FriendCard'
import firebase from '../database/firebase'
import { getFirstName } from '../helperFunctions'
import Globals from '../Globals'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ProfileImageWithInitials from '../components/ProfileImageWithInitials'
import { handleSearchPhoneNumber } from '../helperFunctions'

const FriendsPage = () => {
  const [searchPhoneNumber, setSearchPhoneNumber] = useState('')
  const [uploading, setUploading] = useState(false)
  const [userData, setUserData] = useState({
    friendRequests: [],
    friends: [],
    profileImageUrl: '',
    fullName: '',
  })

  const navigation = useNavigation()

  useEffect(() => {
    if (!Globals.currentUserID || Globals.currentUserID.trim() === '') {
      return
    }
    const userDocRef = firebase
      .firestore()
      .collection('users')
      .doc(Globals.currentUserID)

    const fetchData = async () => {
      try {
        const doc = await userDocRef.get()

        if (doc.exists) {
          const data = doc.data()
          // Fetch profileImageUrl for each friend
          const friendsWithProfileImagePromises = (data.friends || []).map(
            async (friend) => {
              const friendDoc = await firebase
                .firestore()
                .collection('users')
                .doc(friend.id)
                .get()
              const friendData = friendDoc.data()
              return {
                ...friend,
                profileImageUrl: friendData.profileImageUrl || '',
              }
            },
          )
          // Wait for all fetches to complete
          const friendsWithProfileImage = await Promise.all(
            friendsWithProfileImagePromises,
          )

          // Set the userData state with the retrieved data and default values
          setUserData({
            friendRequests: data.friendRequests || [],
            friends: friendsWithProfileImage,
            profileImageUrl: data.profileImageUrl || '',
            fullName: data.fullName || '',
          })
        }
      } catch (error) {
        console.error('Error retrieving user data:', error)
      }
    }

    fetchData()

    // Clean up the listener when the component is unmounted
    const unsubscribe = userDocRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          // Update the userData state with the retrieved data and default values
          setUserData((currentUserData) => ({
            ...currentUserData,
            ...doc.data(),
          }))
        }
      },
      (error) => {
        console.error('Error retrieving user data:', error)
      },
    )

    return () => unsubscribe()
  }, [])

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            {
              position: 'absolute', // Position the overlay on top of the image
              backgroundColor: 'rgba(0,0,0,0.4)', // Keep the semi-transparent background color
              ...styles.icon, // Add the styles.icon (should have the same width, height, and border radius as the image)
              alignItems: 'center',
              justifyContent: 'center',
            },
            styles.wrapper, // Use the same style as the profile image wrapper to align the overlay
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )
    }
  }

  const onSearchPhoneNumber = () => {
    const currentUserId = Globals.currentUserID
    const currentUserName = userData.fullName
    handleSearchPhoneNumber(searchPhoneNumber, currentUserId, currentUserName)
  }

  return (
    <View style={styles.friendsPage}>
      <LinearGradient
        style={styles.fullScreenGradient}
        locations={[0, 1]}
        colors={['rgba(255, 100, 34, 0.15)', 'rgba(255, 100, 34, 0)']}
      />
      <View style={[styles.imagePosition]} />
      <View
        style={[styles.systemLightHomeIndicato, styles.frameParentPosition]}
      >
        <View style={styles.homeIndicator} />
      </View>
      <View style={[styles.frameParent, styles.frameParentPosition]}>
        <View style={[styles.hiJoshuaParent, styles.parentFrameFlexBox]}>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate('Map')}
          >
            <Icon name="arrow-back-ios" size={24} color="black" />
          </Pressable>
          <Text style={styles.friendsTypo}>
            {'Hi ' + getFirstName(Globals.fullName)}!
          </Text>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate('Settings')}
          >
            {Globals.profileImageUrl ? (
              <Image
                style={styles.icon}
                source={{ uri: Globals.profileImageUrl }}
                onLoadStart={() => setUploading(true)}
                onLoadEnd={() => setUploading(false)}
              />
            ) : (
              <ProfileImageWithInitials
                fullName={userData.fullName}
                customStyle={{ width: 40, height: 40, marginLeft: 40 }}
                onProfileImageClick={() => navigation.navigate('Settings')}
              />
            )}
            {_maybeRenderUploadingOverlay()}
          </Pressable>
        </View>
        <View style={styles.frameGroup}>
          <View style={styles.frameContainer}>
            <View style={styles.friendsWrapper}>
              <Text style={[styles.friends, styles.friendsTypo]}>Friends</Text>
            </View>
            <View style={styles.frameSpaceBlock}>
              <View>
                <Text style={styles.requestsTypo}>Requests</Text>
              </View>
              {userData.friendRequests.length === 0 ? (
                <View style={styles.noRequestsMessageContainer}>
                  <Text style={styles.noRequestsMessageText}>
                    Currently no requests
                  </Text>
                </View>
              ) : (
                userData.friendRequests.map((request, index) => (
                  <View key={index} style={styles.frameWrapper}>
                    <FriendRequest
                      key={request.id}
                      name={request.fullName}
                      id={request.id}
                    />
                  </View>
                ))
              )}
            </View>

            <View style={styles.frameSpaceBlock}>
              <View style={styles.frameWrapper}>
                <Text style={[styles.closeFriends, styles.requestsTypo]}>
                  Friends
                </Text>
              </View>
              <View style={styles.frameParent4}>
                {userData.friends.length === 0 ? (
                  <View style={styles.noFriendsMessageContainer}>
                    <Text style={styles.noFriendsMessageText}>
                      Looks like you haven't added any friends. Search below to
                      invite them!
                    </Text>
                  </View>
                ) : (
                  userData.friends.map((friend, index) => (
                    // <Text>{friend.fullName}</Text>
                    <FriendCard
                      key={index}
                      name={friend.fullName}
                      friendId={friend.id}
                      profilePhoto={friend.profileImageUrl} // Pass profileImageUrl to the profilePhoto prop
                    />
                  ))
                )}
              </View>
            </View>

            {/* Search bar */}
            <View style={styles.searchBarContainer}>
              <View style={styles.frameSpaceBlock}>
                <RNKTextInput
                  style={styles.frameItem}
                  placeholder="Search for friends via phone number" // Search input field
                  value={searchPhoneNumber}
                  onChangeText={setSearchPhoneNumber}
                  placeholderTextColor="#000"
                  textStyle={styles.frameTextInput1Text}
                />
              </View>
            </View>
            <View style={styles.searchButtonContainer}>
              <Pressable
                onPress={onSearchPhoneNumber}
                style={({ pressed }) => [
                  styles.searchButton,
                  { opacity: pressed ? 0.6 : 1 }, // Change opacity when pressed
                ]}
              >
                <LinearGradient
                  style={[styles.searchButtonGradient, styles.parentFlexBox]}
                  locations={[0, 1]}
                  colors={['#ff6422', '#ffa266']}
                >
                  {/* Update the text to "Search" */}
                  <Text style={[styles.searchButtonText, styles.saveTypo]}>
                    Search
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
            <View style={styles.addContactsButtonContainer}>
              <Pressable
                onPress={() => navigation.navigate('Contacts')}
                style={({ pressed }) => [
                  styles.addContactsButton,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <LinearGradient
                  style={[
                    styles.addContactsButtonGradient,
                    styles.parentFlexBox,
                  ]}
                  locations={[0, 1]}
                  colors={['#ff6422', '#ffa266']}
                >
                  <Text style={[styles.addContactsButtonText, styles.saveTypo]}>
                    Add Contacts
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
          <View style={styles.frameChild5} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchButtonContainer: {
    marginTop: 16, // Add margin to position the button a bit below the search input field
    alignItems: 'center', // Center the button horizontally
  },
  searchButton: {
    borderRadius: 24, // Add border radius for rounded shape
    overflow: 'hidden', // Hide content that goes beyond the border
  },
  searchButtonGradient: {
    paddingHorizontal: 20, // Add padding to the button
    paddingVertical: 10,
  },
  searchButtonText: {
    // Add styles for the "Search" text
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
        rotate: '-90deg',
      },
    ],
    height: 414,
    left: 0,
    position: 'absolute',
  },
  frameParentPosition: {
    left: 0,
    position: 'absolute',
  },
  parentFrameFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16, // Add padding to prevent the image from being too close to the screen edges
  },
  friendsTypo: {
    textAlign: 'left',
    color: Color.black,
    fontFamily: FontFamily.epilogueBold,
    fontWeight: '700',
    lineHeight: 41,
    fontSize: FontSize.size_11xl,
  },
  frameSpaceBlock: {
    marginTop: 12,
    alignSelf: 'stretch',
  },
  requestsTypo: {
    fontFamily: FontFamily.epilogueSemibold,
    fontWeight: '600',
    lineHeight: 22,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.black,
  },
  homeIndicator: {
    marginLeft: -67,
    bottom: 8,
    left: '50%',
    borderRadius: Border.br_81xl,
    backgroundColor: Color.black,
    width: 134,
    height: 5,
    position: 'absolute',
  },
  systemLightHomeIndicato: {
    right: 0,
    bottom: 0,
    height: 38,
  },
  icon: {
    height: '100%',
    borderRadius: Border.br_3xs,
    width: '100%',
  },
  wrapper: {
    width: 45,
    height: 45,
    alignSelf: 'flex-end', // Add alignSelf to position the image at the end of the parent container
  },
  hiJoshuaParent: {
    width: 336,
    marginRight: 20,
  },
  friends: {
    width: 159,
  },
  friendsWrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameWrapper: {
    alignSelf: 'stretch',
  },
  closeFriends: {
    alignSelf: 'stretch',
  },
  frameParent4: {
    marginTop: 1, // Increase this value as needed to create more space at the top
    alignSelf: 'stretch',
  },
  frameContainer: {
    width: 340, // Add padding to center elements within the containerfsda
  },
  searchBarContainer: {
    alignItems: 'center', // Center the search bar horizontally
  },
  frameChild5: {
    marginTop: 8,
    width: 414,
  },
  frameGroup: {
    marginTop: 20,
    alignItems: 'center',
  },
  frameParent: {
    top: 62,
    alignItems: 'center',
  },
  homeParent: {
    top: 27,
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: 0,
    width: 414,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settings: {
    borderRadius: Border.br_11xl,
    height: 896,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    backgroundColor: Color.white,
  },
  addContactsButtonContainer: {
    marginTop: 10, // Add margin to position the button below the Search button
    alignItems: 'center', // Center the button horizontally
  },
  addContactsButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  addContactsButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addContactsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default FriendsPage
