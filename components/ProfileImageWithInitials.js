import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProfileImageWithInitials = ({
  fullName,
  onProfileImageClick,
  customStyle,
}) => {
  // Extract initials from full name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(fullName);

  // Dynamically calculate the font size and border radius based on the custom width and height
  const dynamicFontSize =
    customStyle && customStyle.width ? customStyle.width / 2 : 48;
  const dynamicBorderRadius =
    customStyle && customStyle.width ? customStyle.width / 2 : 75;

  return (
    <View style={styles.profileImageContainer}>
      <TouchableOpacity onPress={onProfileImageClick}>
        {/* Apply both the default styles and the customStyle prop */}
        <View
          style={[
            styles.profileImage,
            customStyle,
            { backgroundColor: "#B0D4E6", borderRadius: dynamicBorderRadius },
          ]}
        >
          {/* Apply the dynamic font size */}
          <Text style={[styles.initials, { fontSize: dynamicFontSize }]}>
            {initials}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 150, // Default width of the image
    height: 150, // Default height of the image
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#ffffff", // Text color for the initials
    fontWeight: "bold",
    // Default font size; this value will be overridden if a custom width is provided
    fontSize: 48,
  },
});

export default ProfileImageWithInitials;
