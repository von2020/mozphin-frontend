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

const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  username: "",
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

  handleEmail = (username) => {
    if(username != ""){
      if(username == "chibu@yahoo.com"){
        this.setState({ username: username, us: "good" });
      }else{
      this.setState({ username: username, us: "" });
      }
    }else {
      this.setState({ username: username, us: "empty" });
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

    const { username, password, checked } = this.state;
    
    if(username == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else{
    const payload = { username, password };
    const checkedPayload = { username, password, checked };
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
      // {"birth_year": "1997-06-06", "country": "Nigeria", "email": "chibundomejimuda@gmail.com", "last_login_date": "2022-05-30T22:26:06.872604", "role": "3", "token": "8be7c952b1173b4bb4ac45bab27750b6ff60217c", "user_id": 2, "username": "Chibubu"}
      if (data != null ) {
        this.props.navigation.push("Dashboard", {
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
    //         username: response.username,
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
          
          <Loader loading={this.state.isLoading} />
          <StatusBar backgroundColor="#045135" barStyle="light-content"/>
          
            <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Sign In</Text>
            <View style={styles.emailTextStyleView}>
              <Text style={styles.emailTextStyle}>Email</Text>
              <View style={{
                borderColor: this.state.us == "empty" ? 'pink' : this.state.us == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.us == "empty" ? 'pink' : this.state.us == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>  
              <TextInput
                // style={{ borderColor: this.state.username == '' ? 'red' : '#EEF4FE' }}
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.us == "empty" ? 'red' : "#DDD"}
                width = {width * 0.80}
                height= {50}
                borderRadius = {10}
                textAlign = "left"
                paddingTop = {10}
                paddingBottom ={17}
                paddingStart ={50}
                paddingEnd= {22}
                opacity= {1}
                underlineColorAndroid="transparent"
                placeholder="Johndoe@gmail.com"
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                keyboardType="email-address"
                value={this.state.username}
                onChangeText={this.handleEmail}
              />
              {/* {this.getErrorMessageByField("username")} */}

              <MaterialIcons      
                  name="email"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
              {this.state.username == "chibu@yahoo.com" && this.state.us == "good" && <Text style={styles.invalidPasswordTextStyle}>Valid Email</Text>}
              {this.state.us == "empty" && this.state.username == "" && <Text style={styles.invalidPasswordTextStyle}>Email is empty</Text>}
              </View>
            </View>

            <View style={styles.passwordTextStyleView}>
              <Text style={styles.passwordTextStyle}>Password</Text>
              <View style={{
                borderColor: this.state.pa == "empty" ? 'pink' : this.state.pa == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.pa == "empty" ? 'pink' : this.state.pa == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                // style={{ borderColor: this.state.password == '' ? 'red' : '#EEF4FE' }}
                backgroundColor= "#FFF"
                borderWidth = {1}
                borderColor={this.state.pa == "empty" ? 'red' : "#DDD"}
                width= {width * 0.80}
                height= {50}
                borderRadius= {10}
                paddingTop = {10}
                paddingBottom = {17}
                paddingStart ={50}
                paddingEnd= {22}
                opacity= {1}
                underlineColorAndroid="transparent"
                placeholder="Enter Password"
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                value={this.state.password}
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handlePassword}
              />
              {this.state.password ? 
              <TouchableOpacity 
              onPress={this.updateSecureTextEntry.bind(this)}>
                {this.state.secureTextEntry ?
                <Feather
                name="eye-off"
                color="#000000"
                size={15}
                style={{alignSelf: "flex-end", right: 25, marginTop: 20, }}
                />:
                <Feather
                name="eye"
                color="#000000"
                size={15}
                style={{alignSelf: "flex-end", right: 25, marginTop: 20, }}
                />
                }
                
              </TouchableOpacity> : null} 
              </View>
              
              <FontAwesome      
                  name="lock"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
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
                                              
                                             
            {this.state.password == "12345" && this.state.pa == "empty" && <Text style={styles.invalidPasswordTextStyle}>Invalid Password</Text>}
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ForgotPasswordScreen")
                }>             
              <Text style={styles.forgetTextStyle}>Forgot your password?</Text>
              </TouchableOpacity>
              </View>
            </View>

            
              
            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                style={{ marginTop: 80 }}
              >
            <View style={styles.buttonView}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </View>
            </View>
            </TouchableOpacity>

            
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={20}>
            <Text style={styles.dontHaveAccountTextStyle}>Don{"'t"} have an account?</Text>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SignUp")
                }>
            <Text style={styles.dontHaveAccountMintTextStyle}>{" "}Register</Text>
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
      bottom: 38,
      marginLeft: 18,
      alignSelf: "flex-start",
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
    marginTop: height * 0.1,
    marginBottom: 10,
    alignSelf: "center",
    width: width * 0.92,
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
    fontSize: 13,
    color: "#000000",
    fontFamily: "JosefinSans-Bold",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
  },
  welcomeTextStyle: {
    fontSize: 19,
    color: "#000",
    alignSelf: "flex-start",
    paddingLeft: 5,
    marginTop: 10,
    fontWeight: "bold",
    opacity: 1,
  },
  emailTextStyleView: {
    marginTop: 30,
    alignSelf: "center",
  },
  passwordTextStyleView: {
    marginTop: 15,
    alignSelf: "center",
  },
  passwordTextStyle: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "JosefinSans-Bold",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
  },
  invalidPasswordTextStyle: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
    textAlign: "left",
    letterSpacing: -0.38,
    opacity: 1,
    bottom: 20
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
    fontSize: 14,
    color: "#000000",
    marginStart: 10,
    fontFamily: "Nunito-Black",
    // opacity: 1,
    textAlign: "left",
    // bottom: 10
  },
  dontHaveAccountTextStyle: {
    fontSize: 12,
    color: "#CCCCCC",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: 12,
    color: "#414D5B",
    marginBottom: 1,
    fontWeight: "bold",
    opacity: 1,
    fontFamily: "JosefinSans-Bold",
    alignSelf: "center",
  },
  buttonView: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 5,
    height: 50,
    // padding: 5,
    width: width * 0.8,
  },
  loginButton: {
    backgroundColor: "#414D5B",
    padding: 15,
    width: width * 0.8,
    alignItems: "center",
    borderColor: "white",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5,
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
    // padding: 1,
    fontWeight: "bold"
  },
  signUpButtonText: {
    color: "#4848FF",
    textAlign: "center",
    fontFamily: "JosefinSans-Bold",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#045135",
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
