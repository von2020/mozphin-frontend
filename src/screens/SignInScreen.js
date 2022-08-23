import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import LockIcon from '../assets/svgs/lock';
import PhoneIcon from '../assets/svgs/phone';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mozfinOnboardingService, {
  setClientOnboardToken,
} from "../service/MozfinOnboardingService";

const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  phone: "",
  us: "",
  password: "", 
  pa: "",
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  token: "",
  // requester: 0,
  // upline: 0,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
};

class SignInScreen extends Component {
  state = initialState;

  handlePhone = (phone) => {
    if(phone != ""){
      if(phone == "chibu@yahoo.com"){
        this.setState({ phone: phone, us: "good" });
      }else{
      this.setState({ phone: phone, us: "" });
      }
    }else {
      this.setState({ phone: phone, us: "empty" });
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

  onPressLogin() {
    this.setState({ isLoading: true });

    const { phone, password, checked } = this.state;
    
    if(phone == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else{
    const payload = { phone, password };
    // const checkedPayload = { phone, password, checked };
    this.setState({ isLoading: false, isAuthorized: true });

    console.log(payload);

    const onSuccess = ({ data }) => {
      // insert into db...
      this._storeData(data);
      
      setClientOnboardToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log("Dataaa",data);
      if (data != null ) {
        this.props.navigation.navigate("Dashboard", {
          tier: data.tier,
          firstname: data.firstname,
          lastname: data.lastname,
          accountNumber: data.accountNumber,
        });
      }
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
        Alert.alert(null,error.response.data)
      } else if(error.response.status == 404){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','User not found')
      }
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });
    mozfinOnboardingService
      .post("/api/v1/auth/login", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  } 

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  _storeData = async (value) => {
    await this.removeItemValue("userDetails");
    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(value));
      // await AsyncStorage.setItem("checkedBoxBoolean", JSON.stringify(payload));

    } catch (error) {
    }
    console.log("This is for storing data...", value);
    // console.log("This is for storing data...", payload);

  };

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
    //         phone: response.phone,
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

    updateSecureTextEntry(){
      this.setState({ secureTextEntry: !this.state.secureTextEntry})
    } 

  render() {
    LogBox.ignoreAllLogs(true);

    return (
    //   <ImageBackground
    //     source={require("./../../assets/download.jpeg")}
    //     style={styles.image}
    //   >
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          
            <View style={styles.cardStyleLong}>
            <Image source={require('../assets/main_icon.png')} resizeMode={'cover'} top={-1} alignSelf={"center"} height={20} width={20}/>
            <Text style={styles.welcomeTextStyle}>Welcome Back!</Text>
            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 3,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                color: this.state.us == "empty" ? 'red' : "#002A14"
                }}>Phone Number</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>  

              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.us == "empty" ? 'red' : "#B2BE35"}
                width = {width * 0.81}
                height= {56}
                borderRadius = {10}
                textAlign = "left"
                paddingTop = {8}
                paddingBottom ={8}
                paddingStart ={54}
                paddingEnd= {22}
                opacity= {1}
                fontSize={16}
                maxLength={11}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.phone}
                onChangeText={this.handlePhone}
              />
              
                <View      
                  style={styles.iconViewStyle}>
                <PhoneIcon/>
              </View>
              </View>
              {this.state.phone == "chibu@yahoo.com" && this.state.us == "good" && <Text style={styles.invalidPasswordTextStyle}>This phone number does not exist</Text>}
              {this.state.us == "empty" && this.state.phone == "" && <Text style={styles.invalidPasswordTextStyle}>This phone number does not exist</Text>}
            </View>
            {/* fontSize: 12,
              fontFamily: "JosefinSans-Bold",
              textAlign: "left",
              paddingBottom: 3,
              paddingLeft: 5,
              opacity: 1,
              fontWeight: "400",
              color: this.state.us == "empty" ? 'red' : "#002A14" */}

            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.pa == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Password</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.pa == "empty" ? 'red' : "#B2BE35"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={54}
                paddingEnd= {22}
                opacity= {1}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                ref={(input) => { this.secondTextInput = input; }}
                value={this.state.password}
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handlePassword}
              />
              {this.state.password ? 
              <TouchableOpacity 
              onPress={this.updateSecureTextEntry.bind(this)}>
                {this.state.secureTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 33, marginTop: 20, }}>
                <EyeOpenIcon/>
                </View>
                 :
                 <View
                 style={{alignSelf: "flex-end", right: 33, marginTop: 20, }}>
                 <EyeCloseIcon/>
                 </View>
                }
                
              </TouchableOpacity> : null} 
              </View>
              
              <View      
                  style={styles.iconViewStyle}>
                  <LockIcon/>
              </View>
                      {/* {!this.state.secureTextEntry ?
                      <TouchableOpacity 
                      onPress={this.updateSecureTextEntry.bind(this)}>
                        
                        <Feather
                          name="eye-off"
                          color="#000000"
                          size={15}
                          style={{alignSelf: "flex-end", marginEnd: 10, bottom: 50, }}
                          />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity 
                      onPress={this.updateTrueSecureTextEntry.bind(this)}>
                        <Feather
                          name="eye"
                          color="#000000"
                          size={15}
                          style={{alignSelf: "flex-end", marginEnd: 10, bottom: 50, }}
                        />
                       </TouchableOpacity>} */}

              </View>
              {this.state.password == "12345" && this.state.pa == "empty" && <Text style={styles.invalidPasswordTextStyle}>Invalid Password</Text>}
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ForgotPassword")
                }>             
              <Text style={styles.forgetTextStyle}>Forgot Password?</Text>
              </TouchableOpacity>
              
            </View>

            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1  }}>
                <Text style={styles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>

            
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.dontHaveAccountTextStyle}>Don{"'t"} have an account?{" "}</Text>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Register")
                }>
            <Text style={styles.dontHaveAccountMintTextStyle}>Sign up</Text>
            </TouchableOpacity>
            </View>

            </View>
        </ScrollView>
    // {/* </ImageBackground> */}
    );
  }
}


export default SignInScreen;

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
  cardStyleLong: {
    marginTop: height * 0.12,
    marginBottom: 10,
    alignSelf: "center",
    width: width * 0.92,
    // height: height * 0.718,
    padding: 15,
    color: "#ffffff",
    borderRadius: 6,
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
    marginTop: 18, 
    marginBottom: 22
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
