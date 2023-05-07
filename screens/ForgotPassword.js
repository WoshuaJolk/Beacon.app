// ForgotPassword.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Input as RNKTextInput } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import firebase from '../database/firebase';
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    const lowerCaseEmail = email.toLowerCase();
    if (!lowerCaseEmail) {
      Alert.alert('Forgot Password', 'Please enter your email address.');
      return;
    }

    // Send a password reset email
    firebase
      .auth()
      .sendPasswordResetEmail(lowerCaseEmail)
      .then(() => {
        // Successfully sent password reset email
        Alert.alert(
          'Password Reset',
          'A password reset email has been sent to your email address.'
        );
      })
      .catch((error) => {
        // Handle password reset error
        const errorMessage = error.message;
        Alert.alert('Password Reset Failed', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email to change your password.
      </Text>
      <RNKTextInput
        style={styles.emailInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#000"
        textStyle={styles.inputText}
      />
      {/* Add Submit Button */}
      <TouchableOpacity
        onPress={handleResetPassword}
        style={styles.submitButton}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Padding.p_xl,
    backgroundColor: Color.white,
  },
  title: {
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.epilogueBold,
    color: Color.black,
    marginBottom: Padding.p_sm,
  },
  subtitle: {
    marginTop: 30,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.epilogueRegular,
    color: Color.black,
    marginBottom: Padding.p_lg,
    textAlign: 'center',
  },
  emailInput: {
    width: '100%',
    marginTop: 20,
    marginBottom: Padding.p_lg, // Add space between the input field and the button
    borderRadius: Border.br_8xs,
  },
  inputText: {
    color: '#000',
  },
  submitButton: {
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.black, // Set the background color to black
    borderRadius: Border.br_8xs,
    alignItems: 'center',
    marginBottom: Padding.p_sm,
    marginTop: 20,
  },
  buttonText: {
    color: Color.white, // Set the text color to white for contrast against the black background
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.epilogueBold,
  },
  goBackButton: {
    alignItems: 'center',
    marginTop: Padding.p_sm,
  },
  goBackText: {
    color: Color.black,
    marginTop: 20,

    fontSize: FontSize.size_base,
    fontFamily: FontFamily.epilogueMedium,
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
