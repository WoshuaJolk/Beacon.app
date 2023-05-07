import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StatusBar,
  View,
  LogBox,
  TouchableOpacity,
  Button,
} from "react-native";
// import * as Clipboard from "expo-clipboard";
import uuid from "uuid";
import Globals from "../Globals";
import ProfileImageWithInitials from "./ProfileImageWithInitials";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
// if (!getApps().length) {
//   initializeApp(firebaseConfig)
// }

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

async function uploadImageAsync(uri) {
  try {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error("XMLHttpRequest error:", e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // Generate unique file reference
    const fileRef = ref(
      getStorage(),
      `profile_images/${Globals.currentUserID}/${uuid.v4()}`
    );

    // Upload blob to Firebase Storage
    const result = await uploadBytes(fileRef, blob).catch((error) => {
      console.error("Error uploading to Firebase Storage:", error);
      if (error.serverResponse) {
        // Log the server response if available
        console.error("Server response:", error.serverResponse);
      }
      throw error;
    });

    // We're done with the blob, close and release it
    blob.close();

    // Get download URL of uploaded image
    const downloadUrl = await getDownloadURL(fileRef).catch((error) => {
      console.error("Error getting download URL:", error);
      if (error.serverResponse) {
        // Log the server response if available
        console.error("Server response:", error.serverResponse);
      }
      throw error;
    });

    return downloadUrl;
  } catch (error) {
    console.error("Error in uploadImageAsync:", error);
    if (error.serverResponse) {
      // Log the server response if available
      console.error("Server response:", error.serverResponse);
    }
    throw error;
  }
}

const ExpoImagePickerPrev = ({ userData, setUserData, onImagePicked }) => {
  const [image, setImage] = useState(
    userData && userData.profileImageUrl ? userData.profileImageUrl : ""
  );
  const [uploading, setUploading] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();


  useEffect(() => {
    setImage(
      userData && userData.profileImageUrl ? userData.profileImageUrl : ""
    );
  }, [userData.profileImageUrl]);

  //   const _share = () => {
  //     Share.share({
  //       message: image,
  //       title: 'Check out this photo',
  //       url: image,
  //     })
  //   }

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        // Upload the selected image to Firebase Storage and get the download URL
        const downloadUrl = await uploadImageAsync(pickerResult.uri);

        // Set the local state 'image' to the download URL of the uploaded image
        setImage(downloadUrl);

        // Pass the download URL to the parent component
        if (onImagePicked) {
          onImagePicked(downloadUrl);
        }
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

    const _takePhoto = async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      _handleImagePicked(pickerResult)
    }

  // const handleImageClick = async () => {
  //   // Check if the permissions are already granted
  //   const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  //   if (status === "granted") {
  //     // If permissions are granted, call _handleImagePicked directly
  //     _pickImage();
  //   } else {
  //     // If permissions are not granted, request permissions
  //     requestPermissions();
  //   }
  // };

  const handleImageClick = async () => {
    // Define the options for the action sheet
    const options = ['Take Photo', 'Choose from Library', 'Cancel'];
    const cancelButtonIndex = 2;

    // Show the action sheet
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // Take photo
          await _takePhoto();
        } else if (buttonIndex === 1) {
          // Choose from library
          await _pickImage();
        }
      }
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // If permissions are granted, call _handleImagePicked directly
      requestPermissions();
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    _handleImagePicked(pickerResult);
  };

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={{
            position: "absolute",
            width: 150, // Same width as the image
            height: 150, // Same height as the image
            borderRadius: 75, // Half of the width/height to make it a circle
            backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent background
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* {!!image && (
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15,
          }}
        >
          Example: Upload ImagePicker result
        </Text>
      )} */}

      {/* <Button onPress={_pickImage} title="Pick an image from camera roll" /> */}
      {/* <Button onPress={_takePhoto} title="Take a photo" /> */}

      <View
        style={{
          // marginTop: 30,
          width: 160,
          borderRadius: 3,
          elevation: 2,
          marginLeft: -10,
        }}
      >
        <TouchableOpacity onPress={handleImageClick}>
          <View
            style={{
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              shadowColor: "rgba(0,0,0,1)",
              shadowOpacity: 0.2,
              shadowOffset: { width: 4, height: 4 },
              shadowRadius: 5,
              paddingBottom: 4,
              overflow: "hidden",
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150, borderRadius: 75 }}
                onLoadStart={() => setUploading(true)}
                onLoadEnd={() => setUploading(false)}
              />
            ) : (
              <ProfileImageWithInitials
                fullName={userData.fullName}
                onProfileImageClick={handleImageClick}
              />
            )}
            {/* Plus icon with absolute positioning */}
            <View
              style={{
                position: "absolute", // Set absolute positioning for icon
                bottom: 8, // Set position from bottom
                right: 8, // Set position from right
                width: 40, // Width of the circular background
                height: 40, // Height of the circular background
                borderRadius: 20, // Half of the width/height to make it a circle
                backgroundColor: "#fff", // Background color of the circle
                alignItems: "center", // Center the icon horizontally
                justifyContent: "center", // Center the icon vertically
              }}
            >
              <Icon name="add" size={24} color="#000" />
            </View>
            {_maybeRenderUploadingOverlay()}
          </View>
        </TouchableOpacity>

        {/* Uncomment the following Text component if you want to display the image URL or enable sharing */}

        {/* <Text
            onPress={() => {
              console.log(image) // Output the image URL to the console
              _share()
            }}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
            {image}
          </Text> */}
      </View>

      <StatusBar barStyle="default" />
    </View>
  );
};

// Wrap the exported component with ActionSheetProvider
const ExpoImagePicker = (props) => (
  <ActionSheetProvider>
    <ExpoImagePickerPrev {...props} />
  </ActionSheetProvider>
);

export default ExpoImagePicker;
