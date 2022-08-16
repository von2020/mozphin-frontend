import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from "react-native-material-dropdown";
import ArrowDropDownIcon from '../assets/svgs/arrowdropdown';
import { selectContactPhone } from 'react-native-select-contact';
// import Contacts from 'react-native-contacts';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
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
  data: "",
  mtn: "",
  airtime: "tapped",
  nineMobile: "",
  glo: "",
  value: "",
  label: "",
  contact: "",
  current_password: "",
  confirm_pin: "",
  new_pin: "",
  displayList: false,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  newSecureTextEntry: true,
  currentSecureTextEntry: true,
  confirmSecureTextEntry: true,
};

class ChangePin extends Component {
  state = initialState;

  handleNewPin = (new_pin) => {
      this.setState({ new_pin: new_pin });
  };

  handleCurrentPin = (current_password) => {  
      this.setState({ current_password: current_password });
  };

  handleConfirmPin = (confirm_pin) => {  
    this.setState({ confirm_pin: confirm_pin });
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
        this.props.navigation.push("SideMenuScreen", {
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

  newUpdateSecureTextEntry(){
      this.setState({ newSecureTextEntry: !this.state.newSecureTextEntry})
    }
    
    currentUpdateSecureTextEntry(){
        this.setState({ currentSecureTextEntry: !this.state.currentSecureTextEntry})
    }

    confirmUpdateSecureTextEntry(){
    this.setState({ confirmSecureTextEntry: !this.state.confirmSecureTextEntry})
    }

  render() {
    LogBox.ignoreAllLogs(true);
    const { data, airtime, mtn, glo, airtel, nineMobile, displayList } = this.state;
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />  
            <View style={{ marginTop: 32, marginHorizontal: 20, }}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Current Pin</Text>  
            <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        paddingStart={2}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                        value={this.state.current_password}
                        secureTextEntry={this.state.currentSecureTextEntry?true:false}
                        paddingBottom={5}
                        onChangeText={this.handleCurrentPin}
                    />

            <TouchableOpacity 
              onPress={this.currentUpdateSecureTextEntry.bind(this)}>
                {this.state.currentSecureTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                <EyeOpenIcon/>
                </View>
                 :
                 <View
                 style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                 <EyeCloseIcon/>
                 </View>
                }
              </TouchableOpacity>
                    </View>
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 20, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>New Pin</Text>  
                    <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        paddingStart={2}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        value={this.state.new_pin}
                        secureTextEntry={this.state.newSecureTextEntry?true:false}
                        paddingBottom={5}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={this.handleNewPin}
                    />

                    <TouchableOpacity 
                        onPress={this.newUpdateSecureTextEntry.bind(this)}>
                            {this.state.newSecureTextEntry ?
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeOpenIcon/>
                            </View>
                            :
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeCloseIcon/>
                            </View>
                            }
                            
                        </TouchableOpacity>
                    </View>
                    {this.state.pac == "empty" && this.state.new_pin == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Pin is empty</Text>}
                    {this.state.new_pin != this.state.confirm_pin && <Text style={styles.invalidPasswordTextStyle}>Pin doesn’t match</Text>}
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 16, marginHorizontal: 28 }}>
                    
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Confirm Pin</Text>  
                    <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        paddingStart={2}
                        paddingVertical={10}
                        marginBottom={10}
                        // paddingEnd={90}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        ref={(input) => { this.thirdTextInput = input; }}
                        value={this.state.confirm_password}
                        secureTextEntry={this.state.confirmSecureTextEntry?true:false}
                        paddingBottom={5}
                        onChangeText={this.handleConfirmPin}
                    />
                    <TouchableOpacity 
                        onPress={this.confirmUpdateSecureTextEntry.bind(this)}>
                            {this.state.confirmSecureTextEntry ?
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeOpenIcon/>
                            </View>
                            :
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeCloseIcon/>
                            </View>
                            }
                    </TouchableOpacity>
                    </View>
                    {this.state.pac == "empty" && this.state.new_pin == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Pin is empty</Text>}
                    {this.state.new_pin != this.state.confirm_pin && <Text style={styles.invalidPasswordTextStyle}>Pin doesn’t match</Text>}
                    </View>
                    
            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1,  }}>
                <Text style={styles.loginButtonText}>NEXT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}


export default ChangePin;

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
    marginVertical: 15,
    fontWeight: "700",
    opacity: 1,
    borderBottomWidth: 1,
    borderColor: "#000"
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
    top: -10,
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
    backgroundColor: "#FFFFFFF",
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
