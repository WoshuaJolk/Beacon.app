import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import Settings from './screens/Settings'
import UpdatedLoad from './screens/UpdatedLoad'
import Map from './screens/Map'
import Signups from './screens/Signups'
import Logins from './screens/Logins'
import FriendsPage from './screens/FriendsPage'
import Splash from './screens/Splash'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { MenuProvider } from 'react-native-popup-menu'
import ForgotPassword from './screens/ForgotPassword'
import Contacts from './screens/Contacts'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false)
  const [fontsLoaded, error] = useFonts({
    Epilogue_regular: require('./assets/fonts/Epilogue_regular.ttf'),
    Epilogue_medium: require('./assets/fonts/Epilogue_medium.ttf'),
    Epilogue_semibold: require('./assets/fonts/Epilogue_semibold.ttf'),
    Epilogue_bold: require('./assets/fonts/Epilogue_bold.ttf'),
    Inter_regular: require('./assets/fonts/Inter_regular.ttf'),
    Inter_semibold: require('./assets/fonts/Inter_semibold.ttf'),
    Inter_bold: require('./assets/fonts/Inter_bold.ttf'),
  })

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true)
    }, 2000)
  }, [])

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style)
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    )
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  })

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name)
        },
      },
    )
  }
  const MaterialIconsPack = {
    name: 'material',
    icons: createIconsMap(),
  }

  if (!fontsLoaded && !error) {
    return null
  }

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MenuProvider>
          <NavigationContainer>
            {hideSplashScreen ? (
              <Stack.Navigator
                initialRouteName="Logins"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FriendsPage"
                  component={FriendsPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Signups"
                  component={Signups}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Logins"
                  component={Logins}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                  options={{ headerShown: false }}
                />

<Stack.Screen
                  name="Contacts"
                  component={Contacts}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Splash"
                  component={Splash}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UpdatedLoad"
                  component={UpdatedLoad}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Map"
                  component={Map}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <Splash />
            )}
          </NavigationContainer>
        </MenuProvider>
      </ApplicationProvider>
    </>
  )
}
export default App
