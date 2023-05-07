import React, { useState, useCallback, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from 'react-native'
import firebase from '../database/firebase'
import { useNavigation } from '@react-navigation/native'
import Globals from '../Globals'
import * as SMS from 'expo-sms'
import { Set } from 'immutable' // Import Immutable.js Set
import { Border, FontFamily, Color } from '../GlobalStyles'
import { extractLast10Digits } from '../helperFunctions'
import useContacts from '../hooks/useContacts'
import ProfileImageWithInitials from '../components/ProfileImageWithInitials'
import ConfettiCannon from 'react-native-confetti-cannon'

// Define the height of each item, including the separator length (if any)
const ITEM_HEIGHT = 81

const ContactItem = React.memo(({ item, onPress, isAdded, isInvited }) => (
  <View style={styles.contactItem}>
    <View style={styles.contactInfoContainer}>
      {item.imageAvailable ? (
        <Image source={{ uri: item.image.uri }} style={styles.contactImage} />
      ) : (
        <ProfileImageWithInitials
          fullName={item.name}
          customStyle={styles.contactImage}
        />
      )}
      <Text style={styles.contactName}>{item.name}</Text>
    </View>
    <TouchableOpacity style={styles.Button} onPress={onPress}>
      <Text style={styles.ButtonText}>
        {item.isRegistered
          ? isAdded
            ? 'Added'
            : 'Add Friend'
          : isInvited
          ? 'Invited'
          : 'Invite'}
      </Text>
    </TouchableOpacity>
  </View>
))

const Contacts = () => {
  const [searchText, setSearchText] = useState('')
  const [addedContacts, setAddedContacts] = useState(Set()) // Use Immutable.js Set
  const [invitedContacts, setInvitedContacts] = useState(Set()) // Use Immutable.js Set
  const [shouldFetchContacts, setShouldFetchContacts] = useState(false)
  // const [showConfetti, setShowConfetti] = useState(false) // State variable to control confetti display

  // Show the alert when the component is mounted
  useEffect(() => {
    const showAlert = async () => {
      await new Promise((resolve) =>
        Alert.alert(
          'Welcome to Beacon! 👋', // Title
          "Before we get started, we're going to ask for permission to access your contacts so you can add your friends on Beacon!", // Message
          [
            {
              text: 'OK',
              onPress: resolve, // Resolve the promise when "OK" is pressed
            },
          ],
          { cancelable: false }, // Prevents dismissing the alert by tapping outside of it
        ),
      )
      // Set shouldFetchContacts to true after user presses "OK"
      setShouldFetchContacts(true)
    }
    showAlert()
  }, [])

  const contacts = useContacts(shouldFetchContacts);

  const navigation = useNavigation()

  const addFriend = async (contact) => {
    // setShowConfetti(true)
    // setTimeout(() => {
    //   setShowConfetti(false)
    // }, 500) // Duration in milliseconds

    console.log(contact)

    const phoneNumber = contact.phoneNumber || ''
    const searchPhoneNumber = extractLast10Digits(phoneNumber)

    console.log(phoneNumber)
    const db = firebase.firestore()
    const usersRef = db.collection('users')

    // Search for users with the matching phone number in Firestore
    const querySnapshot = await usersRef
      .where('phoneNumber', '==', searchPhoneNumber)
      .get()

    // Check if a user with the same phone number is found
    if (querySnapshot.empty) {
      console.log(
        'User Not Found 🤔',
        'Please check the phone number and try again.',
      )
      return
    }

    // Get the friend user's document from Firestore
    const friendUserDoc = querySnapshot.docs[0]
    const friendUserId = friendUserDoc.id
    const friendUserRef = usersRef.doc(friendUserId)

    // Create a new friend request object for the friend user to receive
    const newFriendRequestReceived = {
      id: Globals.currentUserID,
      fullName: Globals.fullName,
    }

    // Add the new friend request object to the friendRequests array in the friend user's document
    await friendUserRef.update({
      friendRequests: firebase.firestore.FieldValue.arrayUnion(
        newFriendRequestReceived,
      ),
    })
  }

  const inviteContactToApp = useCallback(async (contact) => {
    // Get the contact's phone number
    const phoneNumber = contact.phoneNumbers?.[0]?.number || ''

    // Compose the invitation message
    const invitationMessage = 'Join Beacon! Download it from TestFlight.'

    // Check if the device has the capability to send SMS
    const isAvailable = await SMS.isAvailableAsync()
    if (isAvailable) {
      // Use the SMS API to send the invitation
      const { result } = await SMS.sendSMSAsync(phoneNumber, invitationMessage)
      if (result === 'sent') {
        // If the SMS was sent successfully, update the invitedContacts state
        setInvitedContacts((prevSet) => prevSet.add(contact.id)) // Use Immutable.js Set's add method
      } else {
        // Handle SMS not sent
        console.log('Failed to send SMS invitation.')
      }
    } else {
      // Handle the case when the device does not support SMS
      console.log('SMS is not available on this device.')
    }
  })

  // Use useCallback to memoize the renderItem function
  const renderItem = ({ item }) => (
    <ContactItem
      item={item}
      isAdded={addedContacts.has(item.id)}
      isInvited={invitedContacts.has(item.id)}
      onPress={() => {
        if (item.isRegistered) {
          // Update the addedContacts state immediately
          setAddedContacts((prevSet) => prevSet.add(item.id)) // Use Immutable.js Set's add method
          // Call the addFriend function
          addFriend(item)
        } else {
          inviteContactToApp(item)
        }
      }}
    />
  )

  // Use the useMemo hook to memoize the result of the filtering operation
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(searchText.toLowerCase()),
    )
  }, [searchText, contacts])

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT, // Length of the item, which is the height for vertical lists
    offset: ITEM_HEIGHT * index, // Calculated offset of the item based on its index
    index, // Index of the item
  })

  return (
    <SafeAreaView style={styles.container}>
      {/* {showConfetti && <ConfettiCannon count={200} origin={{ x: 200, y: 200 }} />} */}
      <View style={{ paddingTop: 16 }}>
        <Text style={styles.headerText}>Contacts</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search contacts..."
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.mapButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) =>
          `${item.id}-${item.phoneNumbers?.[0]?.number || ''}`
        }
        contentContainerStyle={styles.listContainer}
        getItemLayout={getItemLayout} // Use getItemLayout for fixed height items
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow the container to take up the available space
  },
  headerText: {
    fontSize: 24,
    fontFamily: FontFamily.epilogueBold,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    marginLeft: 16, // Add margin to the left of the search bar
    marginRight: 16, // Add margin to the right of the search bar
  },
  mapButton: {
    backgroundColor: Color.white, // Change the background color to white
    borderColor: '#ff6422', // Add border color of Color.papaya
    borderWidth: 1, // Add border width
    paddingHorizontal: 12,
    paddingVertical: 10, // Increase vertical padding for a taller button
    borderRadius: 25, // Increase border radius for a rounded appearance
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center', // Center the button horizontally
    width: '60%', // Reduce the width of the button to 60% of the container width
  },
  mapButtonText: {
    color: '#ff6422', // Change the text color to Color.papaya
    fontSize: 16,
    fontFamily: FontFamily.epilogueBold, // Use FontFamily.epilogueBold
  },
  listContainer: {
    paddingBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contactName: {
    fontSize: 18,
    marginLeft: 16, // Add margin to the right of the button
    flex: 1, // Allow the container to take up the available space
  },
  Button: {
    backgroundColor: '#ff6422', // Use the color code '#ff6422'
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Border.br_8xs, // Use Border.br_8xs
    marginRight: 16,
  },
  ButtonText: {
    color: Color.white, // Use Color.white
    fontSize: 16,
    fontFamily: FontFamily.epilogueBold, // Use FontFamily.epilogueBold
  },
})

export default React.memo(Contacts) // Use React.memo for the ContactsPage component
