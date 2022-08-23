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

// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import blackTrustService, {
//   setClientToken,
// } from "../service/BlackTrustService";
import  Loader  from './../config/Loader';
// import { Checkbox } from 'react-native-paper';
import SmsMarkIcon from '../assets/svgs/sms_mark';
import EmailIcon from '../assets/svgs/email_mark';
import EmailMarkIcon from "../assets/svgs/email_mark";

const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  otpCode: "",
  em: "",
  password: "", 
  sm: "",
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  token: "",
  phonenum: 0,
  pn: 0,
  text: "",
  enable: false,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
  seconds: 30,
  time: {}, 
};

class OTPCodeOptionScreen extends Component {
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
        Alert.alert(null,'Incorrect Details')
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
      if(this.state.sm == "clicked"){
        this.props.navigation.navigate("OTPCode", {
          tier: this.props.navigation.state.params.tier,
          id: this.props.navigation.state.params.id,
          means: "SMS",
          phone: this.props.navigation.state.params.phone,
          email: this.props.navigation.state.params.email
        })
      } else if(this.state.em == "clicked"){
        this.props.navigation.navigate("OTPCode", {
          tier: this.props.navigation.state.params.tier,
          id: this.props.navigation.state.params.id,
          means: "Email",
          phone: this.props.navigation.state.params.phone,
          email: this.props.navigation.state.params.email
        })
      }
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


      
  render() {
    LogBox.ignoreAllLogs(true);
    const { showCountDown, pn, otpCode } = this.state;
    // console.log("Hereeeeeeeeeeeeeeeeee otp code question", this.props.navigation.state.params.id)
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          
            <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>How Do You Want to Receive OTP Code</Text>
            
                <Text style={{
                    fontSize: 12,
                    fontFamily: "JosefinSans-Bold",
                    textAlign: "center",
                    paddingHorizontal: 5,
                    opacity: 1,
                    fontWeight: "600",
                    color: "#B2BE35",
                    width: 268,
                    alignSelf: "center",
                    marginTop: 13,
                    }}>Please select where we should send your OTP code to</Text>
                    
                    <View style={{ justifyContent: "space-around", paddingVertical: 20, paddingHorizontal: 15, flexDirection: "row" }}>
                    <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginLeft: 24, }}>SMS</Text>  
                    <TouchableOpacity onPress={()=> this.setState({ sm: "clicked", em: "", enable: true })} style={{ marginEnd: 24,}}>
                    <SmsMarkIcon color={this.state.sm == "clicked" ? "red": ""} />
                    </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "space-around", paddingVertical: 20, paddingHorizontal: 15, flexDirection: "row", marginBottom: 5 }}>
                    <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginLeft: 24, }}>E-mail</Text>  
                    <TouchableOpacity onPress={()=> this.setState({ em: "clicked", sm: "", enable: true })} style={{ marginEnd: 24,}}>
                    <EmailMarkIcon 
                    color={this.state.em == "clicked" ? "red": ""}
                     />
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity disabled={this.state.enable == true  ? false : true} onPress={()=> this.click()} style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: this.state.enable == false ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 10, opacity: 1  }}>
                        <Text style={styles.getStarted}>VERIFY OTP</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}


export default OTPCodeOptionScreen;

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
    // this.state.us == "empty" ? 'pink' : 
  },
  welcomeTextStyle: {
    fontSize: 20,
    color: "#002A14",
    alignSelf: "center",
    textAlign: "center",
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
