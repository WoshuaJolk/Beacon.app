import React, { useEffect, useRef, useState } from 'react'
import {
  StyleProp,
  ViewStyle,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native'
import { FontFamily, FontSize, Border, Color, Padding } from '../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import StatusButton from './statusButton'
import { setUserStatus } from '../helperFunctions'
import { setUserStatusMessage } from '../helperFunctions'
import { turnOffBeacon } from '../helperFunctions'
import Globals from '../Globals'

var screenHeight = Dimensions.get('window').height

var screenWidth = Dimensions.get('window').width

const BeaconOn = (props) => {
  const inputRef = useRef(null)

  //const [text, setText] = useState("");
  const [editStatus, setEditStatus] = useState(false)
  const [amtyping, setAmTyping] = useState(false)

  const characterCount = props.writtenStatus?.length || 0

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const textInputStyle = isFocused
    ? styles.inputWhileTyping
    : styles.InputWhileNotTyping

  const handleChangeText = (newText) => {
    try {
      props.setWrittenStatus(newText)
    } catch (error) {
      console.error('Error in handleChangeText:', error)
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log('The seelected button is now')
    console.log(props.myStatus)
  }, [props.myStatus])

  useEffect(() => {
    // Update the document title using the browser API
    console.log('The selected button is now')
    console.log(props.myStatus)
  }, [props.myStatus])

  return (
    <View style={styles.onButtonContainer}>
      <View style={styles.instanceParent}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          <StatusButton
            selectedButton={props.myStatus}
            label={'getCoffee'}
            text={'Get coffee'}
            status={'☕️'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'study'}
            text={'Study'}
            status={'✏️'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'goOut'}
            text={'Go out'}
            status={'🕺'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'gym'}
            text={'Gym'}
            status={'💪'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'games'}
            text={'Play Games'}
            status={'🏀'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'walk'}
            text={'Go on a walk'}
            status={'🚶'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'grabABite'}
            text={'Grab a bite'}
            status={'🍽'}
            setSelectedButton={props.setmyStatus}
          />
          <StatusButton
            selectedButton={props.myStatus}
            label={'justHang'}
            text={'Just hang'}
            status={'🏄'}
            setSelectedButton={props.setmyStatus}
          />
        </ScrollView>
      </View>

      {editStatus ? (
        <LinearGradient
          colors={['#FF6422', '#FFE454']}
          style={[styles.inputTextGradient, textInputStyle]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.inputTextContainer]}>
            <TextInput
              ref={inputRef}
              onSubmitEditing={() => inputRef.current.blur()}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={40}
              onChangeText={handleChangeText}
              textAlignVertical={'center'}
              style={[styles.input, { zIndex: 1 }]}
              multiline={true}
              placeholder="Set your status"
              blurOnSubmit={true}
              value={props.writtenStatus}
            />
            <View style={styles.smallText}>
              <Text>{characterCount}/40</Text>
            </View>
          </View>
        </LinearGradient>
      ) : null}

      <View style={styles.column}>
        <LinearGradient
          // colors={['#FF6422', '#FFE454']}
          colors={['#FF6422', '#FFA266']}
          style={[styles.gradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Pressable
            onPress={() => {
              props.setBeacon(false),
                turnOffBeacon(Globals.currentUserID),
                setUserStatus('Offline'),
                props.setmyStatus('Offline')
            }}
          >
            <Text style={styles.becaonOnText}>Turn off</Text>
          </Pressable>
        </LinearGradient>

        <LinearGradient
          // colors={['#FF6422', '#FFE454']}
          colors={['#FF6422', '#FFA266']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Pressable
            onPress={() => {
              setEditStatus(!editStatus),
                setUserStatusMessage(props.writtenStatus)
            }}
          >
            {editStatus ? (
              <Text style={styles.becaonOnText}>Save</Text>
            ) : (
              <Text style={styles.becaonOnText}>Add Message</Text>
            )}
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
//<<<<<<< Nicole-branch
    // onButtonContainer:{
    //     flex: 1, 
    //     alignItems: 'center', 
    //     height: 30,
    //     justifyContent: 'flex-end', 
    //     marginBottom: screenHeight * .05,
    //     marginTop: screenHeight * .82
    //   },
    //   instanceParent: {
    //     flexDirection: "column",
    //   },
    //   row: {
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     marginTop: 10,
    //   },
    //   column: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: '100%',
    //     paddingHorizontal: 20,
    //             shadowColor: '#000',
    //     shadowOpacity: 0.5,
    //     shadowRadius: 5,
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     elevation: 5,
    //   },
    //   beaconOnText: {
    //     color: Color.white,
    //     textAlign: 'center',
    //     lineHeight: 60,
    //     fontSize: FontSize.size_lg,
    //   },
    //   gradient:{
    //     width: screenWidth * .43,
    //     height: 40,
    //     backgroundColor: "white",
    //     borderRadius: 20,
    //     shadowColor: '#000',
    //     shadowOpacity: 0.5,
    //     shadowRadius: 5,
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
          
    //   },
    // input:{
    //   width: 350,
    //   height: 150,
    //   textAlign: "left",
    //   fontSize: 20,
    // },
    // inputTextContainer:{
    //   backgroundColor: "white",
    //   borderRadius: 30,
    //   alignItems: 'center',
    //   width: 394,
    //   height: 144,
    //   paddingTop: 40,
    //   paddingLeft: 20,
    //   paddingRight: 20,
    //   borderRadius: 17,
    //   textAlignVertical: "center",
    //   transform: [{translateX: 3}, {translateY:3}],
    //   textAlignVertical: 'center'
  
//=======
  onButtonContainer: {
    flex: 1,
    alignItems: 'center',
    height: 30,
    justifyContent: 'flex-end',
    marginBottom: screenHeight * 0.05,
    marginTop: screenHeight * 0.82,
  },
  instanceParent: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
//>>>>>>> main
    },
    elevation: 5,
  },
  beaconOnText: {
    color: Color.white,
    textAlign: 'center',
    lineHeight: 60,
    fontSize: FontSize.size_lg,
  },
  gradient: {
    width: screenWidth * 0.43,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  input: {
    width: 350,
    height: 150,
    textAlign: 'left',
    fontSize: 20,
  },
  inputTextContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    width: 394,
    height: 144,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 17,
    textAlignVertical: 'center',
    transform: [{ translateX: 3 }, { translateY: 3 }],
    textAlignVertical: 'center',
  },
  inputWhileTyping: {
    marginBottom: 250,
  },
  InputWhileNotTyping: {
    marginBottom: 30,
  },
  inputTextGradient: {
    width: 400,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  smallText: {
    transform: [{ translateX: 165 }, { translateY: -75 }],
  },
  becaonOnText: {
    color: Color.white,
    textAlign: 'center',
    lineHeight: 40,
    fontSize: FontSize.size_lg,
  },
})

export default BeaconOn
