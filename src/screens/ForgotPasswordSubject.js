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
import mozfinOnboardingService, {
    setClientOnboardToken,
  } from "../service/MozfinOnboardingService";
  
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
  token: "",
  confirm_password: "",
  new_password: "",
  displayList: false,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  newSecureTextEntry: true,
  currentSecureTextEntry: true,
  confirmSecureTextEntry: true,
  contactList: [],
};

class ForgotPasswordSubject extends Component {
  state = initialState;

  handleNewPassword = (new_password) => {
      this.setState({ new_password: new_password });
  };

  handleToken = (token) => {  
      this.setState({ token: token });
  };

  handleConfirmPassword = (confirm_password) => {  
    this.setState({ confirm_password: confirm_password });
  };

  onPressSubmit() {
    this.setState({ isLoading: true });
    const { new_password, confirm_password, token } = this.state;
    
    if(token == ""){
        this.setState({ isLoading: false, to: "empty" });
        // Alert.alert(null,'Email field is empty')
    }else if(new_password == ""){
      this.setState({ isLoading: false, np: "empty" });
      // Alert.alert(null,'Email field is empty')
    } else if(confirm_password == ""){
      this.setState({ isLoading: false, pac: "empty" });
        // Alert.alert(null,'Phone Number field is empty')
    } else if(new_password != confirm_password){
        this.setState({ isLoading: false, by: "empty", click: true });
    } else{
    const password = new_password
    const payload = { password };
    this.setState({ isLoading: false, isAuthorized: true });

    console.log(payload);

    const onSuccess = ({ data }) => {
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);

      if (data != null) {
        Alert.alert(null, data.msg, [
          {
              text: "Ok",
              onPress: () => this.props.navigation.push("SignIn"),
          },
          ]);
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
        Alert.alert(null,'Incorrect Details')
      } else if(error.response.status == 404){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Not Found')
      }
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });
    mozfinOnboardingService
      .post(`/api/v1/auth/resetPassword?token=${token}`, payload)
      .then(onSuccess)
      .catch(onFailure);
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
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Token</Text>  
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
                        value={this.state.token}
                        paddingBottom={5}
                        onChangeText={this.handleToken}
                    />

                    </View>
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 20, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>New Password</Text>  
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
                        value={this.state.new_password}
                        secureTextEntry={this.state.newSecureTextEntry?true:false}
                        paddingBottom={5}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={this.handleNewPassword}
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
                    {this.state.pac == "empty" && this.state.new_password == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Password is empty</Text>}
                    {this.state.new_password != this.state.confirm_password && <Text style={styles.invalidPasswordTextStyle}>Password doesn’t match</Text>}
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 16, marginHorizontal: 28 }}>
                    
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Confirm Password</Text>  
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
                        onChangeText={this.handleConfirmPassword}
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
                    {this.state.pac == "empty" && this.state.new_password == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Password is empty</Text>}
                    {this.state.new_password != this.state.confirm_password && <Text style={styles.invalidPasswordTextStyle}>Password doesn’t match</Text>}
                    </View>

            <TouchableOpacity
                onPress={this.onPressSubmit.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1,  }}>
                <Text style={styles.loginButtonText}>SUBMIT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}


export default ForgotPasswordSubject;

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
