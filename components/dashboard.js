// components/dashboard.js
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import firebase from "../database/firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from "../pages/HomeScreen";
import LocationScreen from "../pages/LocationScreen";
import FriendsScreen from "../pages/FriendsScreen";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: "",
    };
  }
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: "#42f44b",
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settingstack"
            component={LocationScreen}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="settings"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="FriendsStack"
            component={FriendsScreen}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="settings"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
