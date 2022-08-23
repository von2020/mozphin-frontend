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
  Modal,
} from "react-native";
import  Loader  from './../config/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from "react-native-material-dropdown";
import ArrowDropDownIcon from '../assets/svgs/arrowdropdown';
import { selectContactPhone } from 'react-native-select-contact';
import EyeCloseIcon from '../assets/svgs/eyeClose';
import EyeOpenIcon from '../assets/svgs/eyeOpen';
import mozfinOnboardingService, {
  setClientOnboardToken,
} from "../service/MozfinOnboardingService";
const { width, height } = Dimensions.get("window");

const initialState = {
  username: "",
  us: "",
  password: "", 
  np: "",
  cup: "",
  cop: "",
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
  userId: 0,
  accessToken: "",
  token: "",
  modalVisible_: false,
  msg: "",
  value: "",
  label: "",
  contact: "",
  current_password: "",
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
  isAvailable: false,
};

class ChangePassword extends Component {
  state = initialState;

  handleNewPassword = (new_password) => {
      if(new_password != ""){
        this.setState({ new_password: new_password, np: "" });
      }else{
      this.setState({ new_password: new_password, np: "empty" });
      }
      if(this.state.current_password != "" && new_password != "" && this.state.confirm_password != ""){
        this.setState({ isAvailable: true });
      }
  };

  handleCurrentPassword = (current_password) => {  
      if(current_password != ""){
        this.setState({ current_password: current_password, cup: "" });
      }else{
      this.setState({ current_password: current_password, cup: "empty" });
      }
      if(current_password != "" && this.state.new_password != "" && this.state.confirm_password != ""){
        this.setState({ isAvailable: true });
      }
  };

  handleConfirmPassword = (confirm_password) => {  
    this.setState({ confirm_password: confirm_password });
    if(confirm_password != ""){
      this.setState({ confirm_password: confirm_password, cop: "" });
    }else{
    this.setState({ confirm_password: confirm_password, cop: "empty" });
    }
    if(this.state.current_password != "" && this.state.new_password != "" && confirm_password != ""){
      this.setState({ isAvailable: true });
    }
    if(this.state.new_password != confirm_password){
      this.setState({ isAvailable: false });
    } 
  };

  onPressLogin() {
    this.setState({ isLoading: true });

    const { current_password, new_password, confirm_password, userId } = this.state;
    const user_id = userId

    if(current_password == ""){
      this.setState({ isLoading: false, cup: "empty" });
      // Alert.alert(null,'Please Select a Role ')
    }else if(new_password == ""){
      this.setState({ isLoading: false, np: "empty" });
      // Alert.alert(null,'Please Select a Role ')
    }else if(confirm_password == ""){
      this.setState({ isLoading: false, cop: "empty" });
      // Alert.alert(null,'Phone Number field is empty')
    } else if(new_password != confirm_password){
          this.setState({ isLoading: false, by: "empty", click: true });
    }  else{
      const password = new_password
      const payload = { 
        user_id, 
        password
        };
    
    console.log(payload);

    const onSuccess = ({ data }) => {  
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      
      if (data != null) {
        this.setState({
          modalVisible_: true,
          msg: data.msg
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
        Alert.alert('Info: ','Ensure you enter the details required')
      } else if(error.response.status == 500){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Ensure your Network is Stable')
      } else if(error.response.status == 404){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Not Found')
      }
      this.setState({ errors: error.response.data, isLoading: false });
    };

    this.setState({ isLoading: true });

    mozfinOnboardingService
      .post("/api/v1/auth/updatePassword", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  } 

  componentWillMount = ()=> {
    this._retrieveData();
  }

  _retrieveData() {    
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        this.setState({
          token: response.token,
          userId: response.id,
          accessToken: response.accessToken,
        });

        console.log("There is no role dey...", response);
        console.log("I role to make role o", this.state.role);
      } else {
        console.log("There is no role dey...", response);
      }
    });
  }

  visibleView(){
    this.setState({ view: true, modalVisible_: false });
    this.props.navigation.navigate("Settings")
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
    const { isAvailable, airtime, mtn, glo, airtel, nineMobile, displayList, msg } = this.state;
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />  
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible_}
                    onRequestClose={() => {
                      this.setState({ modalVisible_: false });
                    }}
                  >
                <View style={styles.modalBackground}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View>
                <StatusBar backgroundColor="#000000" barStyle="light-content"/>
                <Image source={require('../assets/circlemark.png')} resizeMode={'cover'} alignSelf={"center"} height={20} width={20}/>
                <View alignItems={"center"}>
                <Text style={styles.statusModalText}>SUCCESSFUL!</Text>
                <Text style={styles.modalText}>
                {" "}{msg}
                </Text>
                </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}
                  onPress={() => this.visibleView()}>
                    <Text style={styles.textStylee}>PROCEED</Text>
                </TouchableOpacity>   
                        
                </View>
              </View>
              </View>
              </Modal>

            <View style={{ marginTop: 32, marginHorizontal: 20, }}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Current Password</Text>  
            <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.cup == "empty" && this.state.current_password == "" ? "#FF0000" : "#B2BE35"}
                        paddingStart={2}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                        value={this.state.current_password}
                        secureTextEntry={this.state.currentSecureTextEntry?true:false}
                        paddingBottom={5}
                        onChangeText={this.handleCurrentPassword}
                    />

            <TouchableOpacity 
              onPress={this.currentUpdateSecureTextEntry.bind(this)}>
                {this.state.currentSecureTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                <EyeOpenIcon
                red={this.state.cup == "empty" && this.state.current_password == "" ? "#FF0000" : "#B2BE35"}/>
                </View>
                 :
                 <View
                 style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                 <EyeCloseIcon
                 red={this.state.cup == "empty" && this.state.current_password == "" ? "#FF0000" : "#B2BE35"}/>
                 </View>
                }
              </TouchableOpacity>
                    </View>
                    {this.state.cup == "empty" && this.state.current_password == "" && <Text style={styles.invalidPasswordTextStyle}>Current Password is empty</Text>}
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: 20, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>New Password</Text>  
                    <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.np == "empty" && this.state.new_password == "" ? "#FF0000" : "#B2BE35"}
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
                        autoCapitalize="none"
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={this.handleNewPassword}
                    />

                    <TouchableOpacity 
                        onPress={this.newUpdateSecureTextEntry.bind(this)}>
                            {this.state.newSecureTextEntry ?
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeOpenIcon 
                            red={this.state.np == "empty" && this.state.new_password == "" ? "#FF0000" : "#B2BE35"}/>
                            </View>
                            :
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeCloseIcon
                            red={this.state.np == "empty" && this.state.new_password == "" ? "#FF0000" : "#B2BE35"}/>
                            </View>
                            }
                            
                        </TouchableOpacity>
                    </View>
                    {this.state.np == "empty" && this.state.new_password == "" && <Text style={styles.invalidPasswordTextStyle}>New Password is empty</Text>}
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
                        underlineColorAndroid={this.state.cop == "empty" && this.state.confirm_password == "" ? "#FF0000" : "#B2BE35"}
                        paddingStart={2}
                        paddingVertical={10}
                        marginBottom={10}
                        autoCapitalize="none"
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
                            <EyeOpenIcon
                            red={this.state.cop == "empty" && this.state.confirm_password == "" ? "#FF0000" : "#B2BE35"}/>
                            </View>
                            :
                            <View
                            style={{alignSelf: "flex-end", right: 33, marginTop: 10, }}>
                            <EyeCloseIcon
                            red={this.state.cop == "empty" && this.state.confirm_password == "" ? "#FF0000" : "#B2BE35"}/>
                            </View>
                            }
                    </TouchableOpacity>
                    </View>
                    {this.state.cop == "empty" && this.state.confirm_password == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Password is empty</Text>}
                    {this.state.new_password != this.state.confirm_password && <Text style={styles.invalidPasswordTextStyle}>Password doesn’t match</Text>}
                    </View>

            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                disabled={isAvailable == true ? false : true}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: isAvailable == false ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1,  }}>
                <Text style={styles.loginButtonText}>NEXT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}


export default ChangePassword;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 40,
    width: 346,
    height: 320,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowopacity: 0.95,
    shadowRadius: 4,
    elevation: 5
  },
  textStylee: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    width: width * 0.6,
    marginHorizontal: 15,
    fontFamily: "Nunito_400Regular",
    alignSelf: "center",
    textAlign: "center",
    color: "#002A14DE"
  },
  statusModalText: {
    color: "#002A14",
    fontFamily: "Nunito_400Regular",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
  modalBackground:{
    flex:1,
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'space-around',
    backgroundColor:'#000000'
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
