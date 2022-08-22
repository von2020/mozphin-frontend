import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Button,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import OTPInput from "../component/OTP/OTPInput";
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import blackTrustService, {
//   setClientToken,
// } from "../service/BlackTrustService";
import  Loader  from './../config/Loader';
// import { Checkbox } from 'react-native-paper';
import BellIcon from '../assets/svgs/bell';
import PhoneIcon from '../assets/svgs/phone';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import OTPTextInput from 'react-native-otp-textinput';

const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  otpCode: "",
  us: "",
  password: "", 
  pa: "",
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  token: "",
  phonenum: 0,
  one: "",
  two: "",
  three: "",
  four: "",
  five: "",
  six: "",
  pn: 0,
  text: "",
  showCountDown: false,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
  seconds: 30,
  time: {}, 
};

class OTPCodeScreen extends Component {
  state = initialState;

  constructor() {
    super();
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

    clearText = () => {
        this.otpInput.clear();
    }

    setText = () => {
        this.otpInput.setValue("1234");
    }

  handleOtpCode = (otpCode) => {
    if(otpCode != ""){
      this.setState({ otpCode: otpCode, us: "" });
    }else {
      this.setState({ otpCode: otpCode, us: "empty" });
    }
  };

  handlePassword = (password) => {  
    if(password != ""){
      if(password == "12345"){
        this.setState({ password: password, pa: "empty" });
      }else{
      this.setState({ password: password, pa: "" });
      }
    }else {
      this.setState({ password: password, pa: "empty" });
    } 
    // this.setState({ password: password, pa: "" });//good
  };

  onChangeTextHandler(len){
    const newPhone = len.replace(/(\d{3})(\d{3})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4');
    console.log(newPhone)
    this.setState({ text: newPhone })    
  };

  onPressLogin() {
    this.setState({ isLoading: true });

    const { otpCode, password, checked } = this.state;
    
    if(otpCode == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else{
    const payload = { otpCode, password };
    const checkedPayload = { otpCode, password, checked };
    this.setState({ isLoading: false, isAuthorized: true });

    this.props.navigation.push("Dashboard", {
      data: "data",
    });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // insert into db...
      // this._storeData(data, checkedPayload);
      
      setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      // {"birth_year": "1997-06-06", "country": "Nigeria", "email": "chibundomejimuda@gmail.com", "last_login_date": "2022-05-30T22:26:06.872604", "role": "3", "token": "8be7c952b1173b4bb4ac45bab27750b6ff60217c", "user_id": 2, "otpCode": "Chibubu"}
      if (data != null ) {
        this.props.navigation.push("PasswordScreen", {
          data: data,
          id: this.props.navigation.state.params.id,
        });
      }

      
    //   } else if (data.role == "General Manager") {
    //       this.props.navigation.push("GMDNavScreen")
    //   } else if (data.role == "Director") {
    //       this.props.navigation.push("DirectorNavScreen")
    //   } else if (data.role == "Supervisor") {
    //       this.props.navigation.push("SupervisorNavScreen", {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //       });
    //   } else if (data.role == "Staff") {
    //       this.props.navigation.push("StaffNavScreen", {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //       });
    //   } else if (data.role == "Driver Admin") {
    //       this.props.navigation.push("DriverAdminNavScreen", {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //       });
    //   } else if (data.role == "Driver") {
    //       this.props.navigation.push("DriverStaffNavScreen", {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //       });
    //   } else if (data.role == "Procurement") {
    //     this.props.navigation.push("pOfficerNavScreen", {
    //       first_name: data.first_name,
    //       last_name: data.last_name,
    //     });
    //   } else if (data.role == "Finance") {
    //       this.props.navigation.push("FinanceNavScreen", {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //       });
    //   } else if (data.role == "Facility Officer") {
    //     this.props.navigation.push("FacilityManagerNavScreen", {
    //       first_name: data.first_name,
    //       last_name: data.last_name,
    //     });
    //   } else if (data.role == "Auditor") {
    //       this.props.navigation.push("AuditorNavScreen", {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //       });
    //   }
      
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      this.setState({ isLoading: false });
      if(error.response == null){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Network Error')
      }
      if(error.response.status == 400){
        this.setState({ isLoading: false });
        Alert.alert('Info: ',error.response.data.non_field_errors[0])
      } else if(error.response.status == 500){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Ensure your Network is Stable')
      } else if(error.response.status == 401){
        this.setState({ isLoading: false });
        Alert.alert(null,'Incorrect Login Details')
        if(error.response.data.message == "Your account is not active. Please change your password and be activated!"){
        this.setState({ isLoading: false });
          this.props.navigation.replace("SignUp");
          Alert.alert(null,'Please change your password and be activated')
        }
      } else if(error.response.status == 404){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Not Found')
      }
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });
    // blackTrustService
    //   .post("/accounts/login", payload)
    //   .then(onSuccess)
    //   .catch(onFailure);
  }
  }

//   async removeItemValue(key) {
//     try {
//       await AsyncStorage.removeItem(key);
//       return true;
//     } catch (exception) {
//       return false;
//     }
//   }

  // _storeData = async (value, payload) => {
    // await this.removeItemValue("userDetails");
    // await this.removeItemValue("checkedBoxBoolean");

    // try {
    //   await AsyncStorage.setItem("userDetails", JSON.stringify(value));
    //   await AsyncStorage.setItem("checkedBoxBoolean", JSON.stringify(payload));

    // } catch (error) {
    // }
    // console.log("This is for storing data...", value);
    // console.log("This is for storing data...", payload);

  // };

  _retrieveData() {
    // this.setState({initialState})
        
    // AsyncStorage.getItem("userDetails").then((res) => {
    //   const response = JSON.parse(res);
    //   if (res !== null) {
    //     this.setState({
    //       role: response.role,
    //       first_name: response.first_name,
    //       last_name: response.last_name,
    //     });

    //     console.log("There is no role dey...", response);
    //     console.log("I role to make role o", this.state.role);
    //   } else {
    //     console.log("There is no role dey...", response);
    //   }
    // });
  
    // AsyncStorage.getItem("checkedBoxBoolean").then((res) => {
    //   const response = JSON.parse(res);
    //   if (res !== null) {
    //     if(response != null && response.checked == true){
    //       console.log("Reached.......----",this.state);
    //         this.setState({
    //         otpCode: response.otpCode,
    //         password: response.password,
    //         checked: response.checked,
    //         });       
    //     }
    //   } else {
    //     console.log("Check box response... Error...", response);
    //   }
    // });
  }

  componentWillMount = ()=> {
    console.log("I don mount o");
    // this._retrieveData();
  }

  startTimer() {
      this.setState({ seconds: 30, showCountDown: true })
      // if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      // }
    }
    
    updateSecureTextEntry(){
      this.setState({ secureTextEntry: !this.state.secureTextEntry})
    } 

    click(){
        Alert.alert("Good!","Your OTP is correct", [
            {
                text: "Ok",
                onPress: () => this.props.navigation.navigate("PasswordScreen", {
                  tier: this.props.navigation.state.params.tier,
                  id: this.props.navigation.state.params.id
                }),
            },
            ]);
      } 

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.timer);
        }
      }

      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
      }

      clear = () => {
        this.input1.clear();
      };
    
      updateOtpText = () => {
        // will automatically trigger handleOnTextChange callback passed
        this.input1.setValue(this.state.otpCode);
        console.log("codeeee oooooo", this.state.otpCode)
      };

      enable(text){
        const { one, two, three, four, five, six } = this.state;
        const otp = one+""+two+""+three+""+four+""+five+""+text
        if(otp.length == 6){
          this.setState({ otpCode: otp });
        }
      }
      // useEffect(() => {
      //   // update pin ready status
      //   setIsPinReady(code.length === maximumLength);
      //   // clean up function
      //   return () => {
      //     setIsPinReady(false);
      //   };
      // }, [code]);
      
  render() {
    LogBox.ignoreAllLogs(true);
    const { showCountDown, pn, otpCode, one, two, three, four, five, six } = this.state;
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          
            <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Enter OTP code</Text>
            {/* <OTPInput
            code={otpCode}
            setCode={otpCode}
            maximumLength={5}
            setIsPinReady={true}/> */}
                {this.props.navigation.state.params.means == "SMS" ? 
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
                    }}>A 6 digit verificaton code has been sent to {"\n"}{this.props.navigation.state.params.phone}</Text> 
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
                    }}>A 6 digit verificaton code has been sent to {this.props.navigation.state.params.email}
                    </Text>
                   }

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: width * 0.8, alignSelf: "center", }}>
                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={20}
                  fontWeight={"600"}
                  borderColor={this.state.one == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  marginEnd={5}
                  ref={(input) => { this.firstTextInput = input; }}
                  style={{ textAlign: "center" }}
                  value={this.state.one}
                  keyboardType={"numeric"}
                  paddingVertical={5}
                  onChangeText={(text) => {
                    if(text){
                      this.secondTextInput.focus()
                      this.setState({ one: text });
                    }else{
                      this.setState({ one: "" });
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={20}
                  fontWeight={"600"}
                  borderColor={this.state.two == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.secondTextInput = input; }}
                  value={this.state.two}
                  marginEnd={5}
                  paddingVertical={5}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    if(text){
                      this.thirdTextInput.focus()
                      this.setState({ two: text });
                    }else{
                      this.firstTextInput.focus()
                      this.setState({ two: "" });
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={20}
                  fontWeight={"600"}
                  borderColor={this.state.three == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.thirdTextInput = input; }}
                  value={this.state.three}
                  marginEnd={5}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  paddingVertical={5}
                  onChangeText={(text) => {
                      if(text){
                        this.fourTextInput.focus()
                        this.setState({ three: text });
                      }else{
                        this.secondTextInput.focus()
                        this.setState({ three: "" });
                      }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={20}
                  fontWeight={"600"}
                  borderColor={this.state.four == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.fourTextInput = input; }}
                  value={this.state.four}
                  style={{ textAlign: "center" }}
                  marginEnd={5}
                  paddingVertical={5}
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    if(text){
                      this.fiveTextInput.focus()
                      this.setState({ four: text });
                    }else{
                      this.thirdTextInput.focus()
                      this.setState({ four: "" });
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={20}
                  fontWeight={"600"}
                  borderColor={this.state.five == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.fiveTextInput = input; }}
                  value={this.state.five}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  marginEnd={5}
                  paddingVertical={5}
                  onChangeText={(text) => {
                    if(text){
                      this.sixTextInput.focus()
                      this.setState({ five: text });
                    }else{
                      this.fourTextInput.focus()
                      this.setState({ five: "" });
                    }
                  }}
                />

              <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={20}
                  fontWeight={"600"}
                  borderColor={this.state.six == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.sixTextInput = input; }}
                  value={this.state.six}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  paddingVertical={5}
                  onChangeText={(text) => {
                    if(text){
                      this.sixTextInput.focus()
                      this.setState({ six: text });
                      this.enable(text);
                    }else{
                      this.fiveTextInput.focus()
                      this.setState({ six: "" });
                    }
                  }}
                />
                </View>
                    {/* <OTPTextInput 
                        ref={e => (this.input1 = e)} 
                        inputCount={6}
                        color= {"#002A14"}
                        offTintColor={"#002A14"}
                        underlineColorAndroid={"transparent"}
                        textInputStyle={styles.roundedTextInput}
                        containerStyle={styles.textInputContainer}
                        tintColor={"#838E08"}
                        handleTextChange={(text) => this.handleOtpCode(text)}

                    /> */}
                    {/* <Button title="clear" onPress={this.clearText}/> Didn’t receive otp?*/}

                <View style={{ alignSelf: "center", marginTop: 47 }}>
                <TouchableOpacity disabled={otpCode.length != 6 ? true : false} onPress={()=> this.click()} style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: otpCode.length != 6 ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}>
                    <Text style={styles.getStarted}>VERIFY OTP</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.startTimer} disabled={this.state.time.s == 30 | this.state.time.s == 0 ? false : true} alignSelf={"center"}>
                <View flexDirection={"row"} alignSelf={"center"}>
                {showCountDown == true ? 
                <View flexDirection={"row"} alignSelf={"center"}>
                <Text style={{color: "grey", fontWeight: "600", fontSize: 17, marginLeft: 25, textAlign: "left", }}>{this.state.time.s} sec</Text>
                <SimpleLineIcons name="reload" style={styles.reloadIconStyle}/>
                </View> : null}
                <Text style={{color: "black", fontWeight: "600", fontSize: 12, marginLeft: 5, textAlign: "center", marginTop: 24, marginBottom: 20 }}>Didn’t receive otp?{"  "}
                <Text style={{color: "black", fontWeight: "600", fontSize: 16, marginLeft: 30, textAlign: "left", textDecorationLine: "underline", lineHeight: 15 }}>Resend OTP</Text>
                </Text>
                </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}


export default OTPCodeScreen;

const styles = StyleSheet.create({
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
    left: 5,
    alignSelf: "flex-start",
    marginEnd: 5,
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
    // this.state.us == "empty" ? 'pink' : 
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
});
