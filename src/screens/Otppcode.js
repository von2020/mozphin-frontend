import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, Keyboard, StatusBar, TouchableOpacity, Dimensions, Alert } from "react-native";
import OTPInput from "../component/OTP/OTPInput";
import  Loader  from './../config/Loader';
import BellIcon from '../assets/svgs/bell';
import PhoneIcon from '../assets/svgs/phone';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const { width, height } = Dimensions.get("window");

export default function App(props) {
 const [isPinReady, setIsPinReady] = useState(false);
 const [timeLeftVar, setTimeLeftVar] = useState(0);
 const [time, setTime] = useState({});
 const [timer, setTimer] = useState(0);
 const [seconds, setSeconds] = useState(30);
 const [showCountDown, setShowCountDown] = useState(false);
 const [interval, setInterval] = useState(false);
 const [secureTextEntry, setSecureTextEntry] = useState(false);
 const [one, setOne] = useState("");
 const [two, setTwo] = useState("");
 const [three, setThree] = useState("");
 const [four, setFour] = useState("");
 const [five, setFive] = useState("");
 const [six, setSix] = useState("");
 const [otpCode, setOTPCode] = useState("");
 const maximumCodeLength = one+""+two+""+three+""+four+""+five+""+six;
 const inputRef = useRef();
 const ref = React.useRef(); 
 const oneRef = React.useRef(); 
 const twoRef = React.useRef();
 const threeRef = React.useRef();
 const fourRef = React.useRef();
 const fiveRef = React.useRef();

//  useEffect(() => {
//     let timeLeftVar = secondsToTime(seconds);
//     setTime(timeLeftVar)
//     // setTimer(0)
//     startTimer = startTimer()
//     countDown = countDown()
//  },)

//  const secondsToTime = (secs)=> {
//     let hours = Math.floor(secs / (60 * 60));

//     let divisor_for_minutes = secs % (60 * 60);
//     let minutes = Math.floor(divisor_for_minutes / 60);

//     let divisor_for_seconds = divisor_for_minutes % 60;
//     let seconds = Math.ceil(divisor_for_seconds);

//     let obj = {
//       "h": hours,
//       "m": minutes,
//       "s": seconds
//     };
//     return obj;
//   }

//   const startTimer = ()=> {
//     setSeconds(30)
//     setShowCountDown(true)
//     if (timer == 0 && seconds > 0) {
//       timer = setInterval(countDown, 1000);
//     }
//   }

//   const countDown = () => {
//     // Remove one second, set state so a re-render happens.
//     let second = seconds - 1;
//     setTime(secondsToTime(seconds))
//     setSeconds(second)    
//     // Check if we're at zero.
//     if (seconds == 0) { 
//       clearInterval(timer);
//     }
//   }

  const click = ()=>{
    Alert.alert("Good!","Your OTP is correct", [
        {
            text: "Ok",
            onPress: () => props.navigation.navigate("PasswordScreen", {
              // tier: props.navigation.state.params.tier,
              // id: props.navigation.state.params.id
            }),
        },
        ]);
  }

// console.log("props.navigation.state.params.phone",props.navigation.state.params.phone)
 return (
   <View style={styles.container} onPress={Keyboard.dismiss}>
       <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Enter OTP code</Text>
                {props.navigation.state.params.means == "SMS" ? 
                <Text style={{
                    fontSize: 12,
                    fontFamily: "JosefinSans-Bold",
                    textAlign: "center",
                    paddingHorizontal: 5,
                    opacity: 1,
                    fontWeight: "600",
                    color: "#002A14",
                    width: 268,
                    alignSelf: "center",
                    marginTop: 13,
                    marginBottom: 30,
                    }}>A 6 digit verificaton code has been sent to {"\n"}
                    {props.navigation.state.params.phone}
                    </Text> 
                    :
                    <Text style={{
                    fontSize: 12,
                    fontFamily: "JosefinSans-Bold",
                    textAlign: "center",
                    paddingHorizontal: 5,
                    opacity: 1,
                    fontWeight: "600",
                    color: "#002A14",
                    width: 268,
                    alignSelf: "center",
                    marginTop: 13,
                    marginBottom: 30,
                    }}>A 6 digit verificaton code has been sent to 
                    {props.navigation.state.params.email}
                    </Text>
                   }
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={one == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  marginEnd={5}
                  ref={oneRef}
                  style={{ textAlign: "center" }}
                  value={one}
                  keyboardType={"numeric"}
                  secureTextEntry={secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if (text.length === 1) {
                      ref.current.focus();
                    }
                    setOne(text);
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={two == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  ref={ref}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  value={two}
                  marginEnd={5}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      setTwo(text);
                      twoRef.current.focus();
                    }else{
                      setTwo("");
                      oneRef.current.focus();
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={three == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  ref={twoRef}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  value={three}
                  marginEnd={5}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      setThree(text);
                      threeRef.current.focus();
                    }else{
                      setThree("");
                      ref.current.focus();
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={four == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  ref={threeRef}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  value={four}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      setFour(text);
                      fourRef.current.focus();
                    }else{
                      setFour("");
                      twoRef.current.focus();
                    } 
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={five == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  ref={fourRef}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  value={five}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      setFive(text);
                      fiveRef.current.focus();
                    }else{
                      setFive("");
                      threeRef.current.focus();
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={six == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  ref={fiveRef}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  // ref={(input) => { this.secondTextInput = input; }}
                  value={six}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      setSix(text);
                      fiveRef.current.focus();
                    }else{
                      setSix("");
                      fourRef.current.focus();
                    }
                  }}
                />
                </View>
                    {/* <OTPInput
                        code={otpCode}
                        setCode={setOTPCode}
                        maximumLength={maximumCodeLength}
                        setIsPinReady={setIsPinReady}
                        /> */}
                    
                <View style={{ alignSelf: "center", marginTop: 47 }}>
                <TouchableOpacity disabled={maximumCodeLength.length != 6 ? true : false} onPress={()=> click()} style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: maximumCodeLength.length != 6 ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}>
                    <Text style={styles.getStarted}>VERIFY OTP</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity onPress={startTimer()} disabled={time.s == 30 | time.s == 0 ? false : true}> */}
                <View>
                {/* {showCountDown == true ? 
                <View flexDirection={"row"} alignSelf={"center"}>
                <Text style={{color: "grey", fontWeight: "600", fontSize: 17, marginLeft: 30, textAlign: "left", }}>{time.s} sec</Text>
                <SimpleLineIcons name="reload" style={styles.reloadIconStyle}/>
                </View> : null} */}
                <Text style={{color: "black", fontWeight: "600", fontSize: 12, marginLeft: 30, textAlign: "center", marginTop: 24, marginBottom: 20 }}>Didn’t receive otp?{"  "}
                <Text style={{color: "black", fontWeight: "600", fontSize: 16, marginLeft: 30, textAlign: "left", textDecorationLine: "underline", lineHeight: 15 }}>Resend OTP</Text>
                </Text>
                </View>
                {/* </TouchableOpacity> */}
            </View>
     
     <StatusBar style="auto" />
   </View>
 );

 
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DDD",
      alignItems: "center",
      justifyContent: "center",
    },
    spinnerTextStyle: {
        color: "#FFF",
      },
      container: {
        flex: 1,
        alignItems: "center",
      },
      image: {
        flex: 1,
        width: width,
      },
      textInputContainer: {
        marginBottom: 0,
        marginTop: 10
      },
      roundedTextInput: {
        borderWidth: 1,
        borderColor: "#002A14", 
        marginHorizontal: 2, 
        borderRadius: 7, 
        height: 37, 
        width: 38, 
        alignSelf: "center", 
        fontSize: 16,
      },
      reloadIconStyle: {
        fontSize: 20,
        color: "#045135",
        left: 20,
        alignSelf: "flex-start",
        marginStart: 10,
        // elevation: 5,
      },
      emailInput: {
        borderColor: "#EEF4FE",
        backgroundColor: "#EEF4FE",
        borderWidth: 1,
        width: width * 0.85,
        height: 55,
        borderRadius: 20,
        textAlign: "left",
        paddingTop: 15,
        paddingBottom: 17,
        paddingStart: 30,
        paddingEnd: 40,
      },
      iconViewStyle: {
          fontSize: 20,
          bottom: 56,
          marginLeft: 0,
          alignSelf: "flex-start",
          backgroundColor: "#507C543D",
          borderColor: "#507C543D",
          height: 56,
          width: 52,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          paddingHorizontal: 15,
          paddingVertical: 16,
      },
      textBgdIconViewStyle: {
        marginLeft: 18,
        alignSelf: "flex-start",
        backgroundColor: "#507C543D",
        height: 56
      },
      passwordInput: {
        borderColor: "#EEF4FE",
        backgroundColor: "#EEF4FE",
        borderWidth: 1,
        width: width * 0.85,
        height: 55,
        borderRadius: 20,
        textAlign: "left",
        paddingTop: 20,
        paddingBottom: 17,
        paddingStart: 30,
        paddingEnd: 22,
        opacity: 1,
      },
      getStarted: {
        color:'#FFF',
        fontSize: 20,
        fontWeight: "500",
        padding: 5, 
        textAlign: "center",
        alignSelf: "center"
        },
        getStarted_: {
        color:'#002A14',
        fontSize: 20,
        fontWeight: "500",
        padding: 5, 
        textAlign: "center",
        alignSelf: "center"
        },
      cardStyleLong: {
        marginTop: height * 0.2,
        marginBottom: 10,
        alignSelf: "center",
        width: 326,
        height: 317,// height: height * 0.718,
        padding: 15,
        color: "#ffffff",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 5
      },
      textStyle: {
        fontSize: 25,
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: -0.35,
      },
      textStyle_: {
        fontSize: 25,
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: -0.35,
      },
      textStyleView: {
        justifyContent: "center",
        top: 20,
        borderColor: "white",
        borderWidth: 2,
        padding: 7,
      },
      emailTextStyle: {
        fontSize: 12,
        color: "#002A14",
        fontFamily: "JosefinSans-Bold",
        textAlign: "left",
        paddingBottom: 5,
        paddingLeft: 5,
        opacity: 1,
        fontWeight: "400",
        // us == "empty" ? 'pink' : 
      },
      welcomeTextStyle: {
        fontSize: 20,
        color: "#002A14",
        alignSelf: "center",
        paddingLeft: 5,
        marginTop: 15,
        fontWeight: "700",
        opacity: 1,
      },
      emailTextStyleView: {
        marginTop: 20,
        alignSelf: "center",
      },
      passwordTextStyleView: {
        marginTop: 15,
        alignSelf: "center",
      },
      passwordTextStyle: {
        fontSize: 12,
        color: "#002A14",
        fontFamily: "JosefinSans-Bold",
        textAlign: "left",
        paddingBottom: 5,
        paddingLeft: 5,
        opacity: 1,
        fontWeight: "400",
      },
      invalidPasswordTextStyle: {
        fontSize: 12,
        color: "#FF0000",
        fontFamily: "JosefinSans-Bold",
        alignSelf: "flex-start",
        paddingLeft: 5,
        textAlign: "left",
        opacity: 1,
        top: 5,
        // marginBottom: 10
      },
      linearGradient: {
        flex: 1,
        height: 88,
        width: width,
      },
      checkBoxStyle: {
        borderColor: "#fff",
      },
      footer: {
        width: width * 0.6,
        marginTop: 5,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
      },
      forgetTextStyle: {
        fontSize: 16,
        color: "#002A14",
        right: 10,
        fontFamily: "Nunito-Black",
        textAlign: "right",
        top: 18, 
      },
      dontHaveAccountTextStyle: {
        fontSize: 12,
        color: "#000000",
        marginBottom: 1,
        opacity: 1,
        marginStart: 5,
        fontWeight: "400",
        fontFamily: "JosefinSans-Bold",
        alignSelf: "center",
      },
      dontHaveAccountMintTextStyle: {
        fontSize: 16,
        color: "#000000",
        marginBottom: 1,
        fontWeight: "600",
        opacity: 1,
        fontFamily: "JosefinSans-Bold",
        alignSelf: "center",
        textDecorationLine: "underline"
      },
      buttonView: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        alignSelf: "center",
        flexDirection: "row",
        marginBottom: 5,
        height: 40,
        width: width * 0.81,
      },
      loginButton: {
        backgroundColor: "#002A14",
        padding: 8,
        width: width * 0.8,
        alignItems: "center",
        borderColor: "white",
        borderRadius: 8,
      },
      signUpButton: {
        backgroundColor: "#ffffff",
        padding: 15,
        width: width * 0.35,
        left: 15,
        borderColor: "#ffffff",
        borderRadius: 1,
        opacity: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 5,
      },
      loginButtonText: {
        color: "white",
        textAlign: "center",
        alignItems: "center",
        fontFamily: "JosefinSans-Bold",
        padding: 5,
        fontWeight: "400",
        fontSize: 20,
      },
      signUpButtonText: {
        color: "#4848FF",
        textAlign: "center",
        fontFamily: "JosefinSans-Bold",
      },
      scrollView: {
        flex: 1,
        backgroundColor: "#E5E5E5",
      },
      errorMessageContainerStyle: {
        backgroundColor: "#fee8e6",
        borderRadius: 4,
        left: 150,
        bottom: 75,
        alignContent: "flex-start",
        width: 170,
      },
      errorMessageTextStyle: {
        color: "#db2828",
        textAlign: "center",
        fontSize: 12,
      },
    })
