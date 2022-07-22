import Icon from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import React, { useEffect, useRef, useState } from "react"
import { Alert, ImageBackground, SafeAreaView, StatusBar, Text, View } from "react-native"
import ReactNativePinView from "react-native-pin-view"

const TransactionPinnnScreen = ({navigation}) => {
  const pinView = useRef(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const [showConfirmRemoveButton, setShowConfirmRemoveButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")
  const [enteredConfirmChange, setEnteredConfirmChange] = useState(false)
  const [enteredConfirmPin, setEnteredConfirmPin] = useState("")
  const [showCompletedConfirmButton, setShowCompletedConfirmButton] = useState(false)
  const [showCompletedButton, setShowCompletedButton] = useState(false)
  const [showNotMatch, setShowNotMatch] = useState(false)

  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true)
    } else {
      setShowRemoveButton(false)
    }
    if (enteredPin.length === 4) {
      setShowCompletedButton(true)
    } else {
      setShowCompletedButton(false)
    }
    if (enteredConfirmPin.length > 0) {
      setShowConfirmRemoveButton(true)
    } else {
      setShowConfirmRemoveButton(false)
    }
    if (enteredConfirmPin.length === 4) {
      setShowCompletedConfirmButton(true)
    } else {
      setShowCompletedConfirmButton(false)
    }
    if (enteredPin === enteredConfirmPin) {
      setShowNotMatch(true)
    } else {
      setShowNotMatch(false)
    }
  }, [enteredPin, enteredConfirmPin])
  return (
    <>
      <StatusBar barStyle="light-content"/>
      {enteredConfirmChange && 
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "#FFFFFF",
              fontSize: 28,
            }}>
            Confirm Transaction Pin
          </Text>
          <ReactNativePinView
            inputSize={32}
            ref={pinView}
            pinLength={4}
            buttonSize={60}
            onValueChange={value => setEnteredConfirmPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 24,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#FFF",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#FFF",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right" && showNotMatch) {
                Alert.alert(null,"Your transaction pin has been set successfully.\nNow you can make transactions and login..", [
                  {
                      text: "Ok",
                      onPress: () => navigation.navigate("SignIn", {
                        token: "token"
                      }),
                  },
              ])
                // alert("Entered Pin: " + enteredPin)
              }else if (key === "custom_right" && !showNotMatch) {
                Alert.alert(null,"Your transaction pins don't match..")
              }
              // if (key === "three") {
              //   alert("You can't use 3")
              // }
            }}
            customLeftButton={showConfirmRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#FFF"} /> : undefined}
            customRightButton={showCompletedConfirmButton ? <MaterialCommunityIcons name={"eye-check"} size={36} color={"#FFF"} /> : undefined}
          />
        </SafeAreaView>}
        {!enteredConfirmChange && 
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "#045135",
              fontSize: 28,
            }}>
            Enter Transaction Pin
          </Text>
          <ReactNativePinView
            inputSize={32}
            ref={pinView}
            pinLength={4}
            buttonSize={60}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 24,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#045135",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#045135",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#045135",
            }}
            buttonTextStyle={{
              color: "#045135",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right") {
                setEnteredConfirmChange(true)
                // alert("Entered Pin: " + enteredPin)
              }
              // if (key === "three") {
              //   alert("You can't use 3")
              // }
            }}
            customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#045135"} /> : undefined}
            customRightButton={showCompletedButton ? <Icon name={"ios-checkmark"} size={36} color={"#045135"} /> : undefined}
          />
        </SafeAreaView>}
    </>
  )
}
export default TransactionPinnnScreen