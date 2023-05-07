import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image, TouchableOpacity
} from 'react-native'
import { Color, FontFamily, FontSize, Border, Padding } from '../GlobalStyles'
import { acceptFriendRequest, declineFriendRequest } from '../helperFunctions'
import Globals from '../Globals'

const FriendRequest = ({ name, id }) => {
  const handleAcceptFriendRequest = () => {
    // Call the acceptFriendRequest function with appropriate parameters
    acceptFriendRequest(Globals.currentUserID, id)
  }

  const handleDeclineFriendRequest = () => {
    // Call the acceptFriendRequest function with appropriate parameters
    declineFriendRequest(Globals.currentUserID, id)
  }

  return (
    <View style={[styles.frameParent1, styles.parentFrameFlexBox]}>
      <View style={styles.rectangleParent}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require('../assets/rectangle-132.png')}
        />
        <View style={styles.danialAsariaWrapper}>
          <Text style={styles.danialAsaria}>{name}</Text>
        </View>
      </View>
      <View style={styles.checkParent}>
        <TouchableOpacity onPress={handleAcceptFriendRequest}>
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require('../assets/check.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeclineFriendRequest}>
          <Image
            style={[styles.xIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require('../assets/x.png')}
          />
        </TouchableOpacity>
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
  },
  friendsTypo: {
    textAlign: 'left',
    color: Color.black,
    fontFamily: FontFamily.epilogueBold,
    fontWeight: '700',
    lineHeight: 41,
    fontSize: FontSize.size_11xl,
  },
  iconLayout: {
    height: 20,
    width: 20,
    overflow: 'hidden',
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
  homeParentPosition: {
    left: 6,
    position: 'absolute',
  },
  image3: {
    top: 896,
    width: 896,
    backgroundColor: Color.papaya,
  },
  image2: {
    top: 858,
    width: 858,
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
  },
  hiJoshuaParent: {
    width: 336,
  },
  friends: {
    width: 159,
  },
  friendsWrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameChild: {
    borderRadius: Border.br_9xs,
    width: 36,
    height: 36,
  },
  danialAsaria: {
    fontFamily: FontFamily.interSemibold,
    fontWeight: '600',
    lineHeight: 22,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.black,
  },
  danialAsariaWrapper: {
    marginLeft: 14,
  },
  rectangleParent: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  xIcon: {
    marginLeft: 20,
  },
  checkParent: {
    flexDirection: 'row',
  },
  frameParent1: {
    padding: Padding.p_5xs,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameWrapper: {
    alignSelf: 'stretch',
  },
  closeFriends: {
    alignSelf: 'stretch',
  },
  frameParent4: {
    marginTop: 1,
    alignSelf: 'stretch',
  },
  frameParent3: {
    display: 'none',
  },
  frameParent11: {
    alignItems: 'center',
    flex: 1,
  },
  frameWrapper10: {
    padding: Padding.p_7xs,
    alignSelf: 'stretch',
    borderRadius: Border.br_3xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameContainer: {
    width: 378,
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
  homeIcon: {
    width: 40,
    height: 40,
    overflow: 'hidden',
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
  vectorIcon: {
    top: 0,
    width: 445,
    height: 1,
  },
  frameParent13: {
    top: 799,
    left: -6,
    width: 423,
    height: 97,
    position: 'absolute',
    backgroundColor: Color.white,
  },
  settings: {
    borderRadius: Border.br_11xl,
    height: 896,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    backgroundColor: Color.white,
  },
})

export default FriendRequest
