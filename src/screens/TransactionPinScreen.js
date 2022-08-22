import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Modal,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from '../config/Loader';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LockIcon from '../assets/svgs/lock';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import mozfinOnboardingService, {
  setClientOnboardToken,
} from "../service/MozfinOnboardingService";
const { width, height } = Dimensions.get("window");

const initialState = {
  email: "",
  em: "",
  username: "",
  us: "",
  pin: "",
  pa: "",
  pinConfirm: "",
  pac: "",
  birthYear: "dd/mm/yyyy",
  by: "",
  usersRole: "",
  id: "10",
  city: "",
  co: "",
  tellUs: "",
  tu: "",
  click: false,
  isChecked: false,
  errors: {}, 
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
  secureConfirmTextEntry: true,
  modeDateOfBirth: "date",
  token: "",
  DateOfBirthShow: false,
};

class TransactionPinScreen extends Component {
  state = initialState;
  radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

  handlePinConfirm = (pinConfirm) => {
    if(pinConfirm != ""){
      this.setState({ pinConfirm: pinConfirm, pac: "" });
    }else {
      this.setState({ pinConfirm: pinConfirm, pac: "empty" });
    }
  };

  handlePin = (pin) => {
    if(pin != ""){
      this.setState({ pin: pin, pa: "" });
    }else {
      this.setState({ pin: pin, pa: "empty" });
    }
  };

  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  };

  updateConfirmSecureTextEntry(){
    this.setState({ secureConfirmTextEntry: !this.state.secureConfirmTextEntry})
  };

  onPressSignUp() {
    // this.setState({ isLoading: true });

    const { email, username, pin, pinConfirm, city, tellUs } = this.state;
    const user_id = this.props.navigation.state.params.id
    // {
    //   "email": "valid_email@domain.com",
    //   "username": "any_username",
    //   "city": "name",
    //   "birth_year": "YYYY-MM-DD",
    //   "why_here": "answer to why user wants to join BlackTrust",
    //   "pin": "any_pin"
    // }
    // if(username == ""){
    //   this.setState({ isLoading: false, us: "empty" });
    //   // Alert.alert(null,'Username field is empty')
    // }else if(email == ""){
    //     this.setState({ isLoading: false, em: "empty" });
    //     // Alert.alert(null,'Email field is empty')
    // }else if(birthYear == "dd/mm/yyyy"){
    //   this.setState({ isLoading: false, by: "empty" });
    //   // Alert.alert(null,'Middle Name field is empty')
    // }else 
    if(pin == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Please Select a Role ')
    }else if(pinConfirm == ""){
      this.setState({ isLoading: false, pac: "empty" });
      // Alert.alert(null,'Phone Number field is empty')
    } else if(pin != pinConfirm){
          this.setState({ isLoading: false, by: "empty", click: true });
          // Alert.alert(null,'Middle Name field is empty')
    }  else{
      
    const transaction_pin = pin 
      const payload = { 
        user_id, 
        transaction_pin
        };
    
    console.log(payload);

    const onSuccess = ({ data }) => {  
      // setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      
      if (data != null) {
        Alert.alert(null, "Your transaction pin has been set successfully.\n*Now you can now make transactions..*", [
          {
              text: "Ok",
              onPress: () => this.props.navigation.navigate("SignIn", {
                tier: this.props.navigation.state.params.tier
              }),
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

    // this.setState({ isLoading: true });

    mozfinOnboardingService
      .post("/api/v1/auth/createTransactionPin", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  }

  categoryList() {
    // this.setState({ isLoading: true });

    const categoryList = [];
    categoryList.push({
      value: "Tell us",
      label: "Tell us",
    });
    // blackTrustService
    //     .get(`/report/categories`)
    //     .then(data => {
    //       console.log("list: categoryList", data);

    //       data.data.forEach(element => {
    //         categoryList.push({
    //           value: `${element.id}`,
    //           label: `${element.name}`,
    //         }); 
    //         this.setState((state) => (state.categoryList = categoryList));
    //         this.setState({ isLoading: false });

    //     })
    //     this.setState({categoryList : categoryList});
    //       console.log("list: categoryList", categoryList);
    //     })  
    //     .catch((err) => {
    //       console.log(err)
    //       this.setState({ isLoading: false, isAuthorized: true });
  
    //     });
    }

  getNonFieldErrorMessage() {
    let message = null;
    const { errors } = this.state;
    if (errors.non_field_errors) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {errors.non_field_errors.map((item) =>
            Alert.alert(item, { cancelable: false })
          )}
        </View>
      );
    }
    return message;
  }

  getErrorMessageByField(field) {
    let message = null;
    if (this.state.errors[field]) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {this.state.errors[field].map((item) => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {"This field is blank"}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

//   async removeItemValue(key) {
//     try {
//       await AsyncStorage.removeItem(key);
//       return true;
//     } catch (exception) {
//       return false;
//     }
//   }

  _storeData = async (value, payload) => {
    // await this.removeItemValue("userDetails");
    // await this.removeItemValue("checkedBoxBoolean");

    // try {
    //   await AsyncStorage.setItem("userDetails", JSON.stringify(value));
    //   await AsyncStorage.setItem("checkedBoxBoolean", JSON.stringify(payload));

    // } catch (error) {
    // }
    // console.log("This is for storing data...", value);
    // console.log("This is for storing data...", payload);

  };

  _retrieveData() {
    this.setState({initialState})
        
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
    //         pin: response.pin,
    //         checked: response.checked,
    //         });       
    //     }
    //   } else {
    //     console.log("Check box response... Error...", response);
    //   }
    // });
  }

  onChangeDateOfBirth = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.birthYear;
    this.setState({ DateOfBirthShow: Platform.OS === 'ios'});
    this.setState({ birthYear: currentDate, by: "" });
    // if(selectedDate != new Date()){
    //   this.setState({ birthYear: selectedDate, by: "" });
    // }else {
    //   this.setState({ birthYear: selectedDate, by: "empty" });
    // }
  };

  showStartMode = (currentMode) => {
  this.setState({ DateOfBirthShow: true});
  this.setState({ modeDateOfBirth: currentMode });
  };

  showDateOfBirthPicker = () => {
    this.showStartMode('date');
    };

  componentWillMount = ()=> {
    console.log("I don mount o");
    this._retrieveData();
  }

  componentDidMount(){
    this.categoryList();  
    if(this.state.checked == false){
      this.clearAll()
    }
    }

    clearAll = async () => {
    //   try {
    //     await AsyncStorage.clear()
    //   } catch(e) {
    //     // clear error
    //   }
    
      console.log('Done.')
    }

  render() {
    LogBox.ignoreAllLogs(true);
    const { modeDateOfBirth, DateOfBirthShow, isChecked } = this.state;
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content"/>
        <Loader loading={this.state.isLoading} />

        <View>
            <View style={styles.cardStyleLong}>
            <Text style={styles.headerTextStyleView}>Set Pin</Text>
            <Text style={styles.infooTextStyle}>Set a 4-digit pin to complete account set up</Text>

            <View style={styles.emailTextStyleView_}>
              <Text style={{fontSize: 13,
                            color: this.state.pa == "empty" ? 'red' : "#002A14",
                            fontFamily: "JosefinSans-Bold",
                            textAlign: "left",
                            paddingBottom: 5,
                            paddingLeft: 5,
                            opacity: 1,
                            fontWeight: "400",}}>Pin</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
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
                returnKeyType="next"
                maxLength={4}
                keyboardType={"numeric"}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.pin}
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handlePin}
              />
                <View style={styles.iconViewStyle}>
                  <LockIcon />
                </View>
                </View>

                  {this.state.pin ? 
              <TouchableOpacity 
              onPress={this.updateSecureTextEntry.bind(this)}>
                {this.state.secureTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 25, top: -35, }}>
                <EyeOpenIcon/>
                </View> :
                <View
                style={{alignSelf: "flex-end", right: 25, top: -35, }}>
                <EyeCloseIcon/>
                </View>
                }
                
              </TouchableOpacity> : null} 
              {this.state.pa == "empty" && this.state.pin == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter your pin</Text>}
              {this.state.pin != this.state.pinConfirm && this.state.click && <Text style={styles.invalidPasswordTextStyle}>Pin doesn’t match</Text>}
            </View>
            
            <View style={styles.emailTextStyleView}>
            <Text style={{fontSize: 13,
                          color: this.state.pac == "empty" ? 'red' : "#002A14",
                          fontFamily: "JosefinSans-Bold",
                          textAlign: "left",
                          paddingBottom: 5,
                          paddingLeft: 5,
                          opacity: 1,
                          fontWeight: "400",}}>Confirm Pin</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.pac == "empty" ? 'red' : "#B2BE35"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={54}
                paddingEnd= {22}
                opacity= {1}
                maxLength={4}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType={"numeric"}
                ref={(input) => { this.secondTextInput = input; }}
                secureTextEntry={this.state.secureTextEntry?true:false}
                value={this.state.pinConfirm}
                onChangeText={this.handlePinConfirm}
              />
              <View style={styles.iconViewStyle}>
                <LockIcon/>
              </View>
              </View>
              {this.state.pac == "empty" && this.state.pinConfirm == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Pin is empty</Text>}
              {this.state.pin != this.state.pinConfirm && this.state.click && <Text style={styles.invalidPasswordTextStyle}>Pin doesn’t match</Text>}
              {this.state.pinConfirm ? 
              <TouchableOpacity 
              onPress={this.updateConfirmSecureTextEntry.bind(this)}>
                {this.state.secureConfirmTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 25, top: -35, }}>
                <EyeOpenIcon/>
                </View> :
                <View
                style={{alignSelf: "flex-end", right: 25, top: -35, }}>
                <EyeCloseIcon/>
                </View>
                }
                
              </TouchableOpacity> : null} 
            </View>
            <Text style={{ fontSize: 12, fontWeight: "400", lineHeight: 12, color: "#3E3E3E", marginTop: 20, paddingTop: 5, marginBottom: 32  }}>* Pin must be 4 digit numbers</Text>
            
            <TouchableOpacity
                onPress={this.onPressSignUp.bind(this)}
                style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: this.state.pin != this.state.pinConfirm ? "rgba(0,42,20,0.81)" : this.state.pin == "" && this.state.pinConfirm == "" ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}>
                <Text style={styles.loginButtonText}>SAVE</Text>
            </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    // {/* </ImageBackground> */}
    );
  }
}


export default TransactionPinScreen;

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
    marginTop: height * 0.15,
    marginBottom: 10,
    alignSelf: "center",
    width: width * 0.89,
    padding: 15,
    color: "#ffffff",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5
  },
  dropDownInput: {
    borderColor: "1px solid rgba(0, 0, 0, 0.13)",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
    height: 50,
    alignSelf: "center",
    width: width * 0.80,
  },
  invalidPasswordTextStyle: {
    fontSize: 13,
    color: "#FF0000",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingTop: 5,
    textAlign: "left",
    letterSpacing: -0.38,
    opacity: 1,
  },
  invalidPasswordTextStylee: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
    textAlign: "left",
    letterSpacing: -0.38,
    opacity: 1,
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
  infooTextStyle: {
    fontSize: 12,
    lineHeight: 15.6,
    color: "#838E08",
    marginTop: 8,
    opacity: 1,
    marginHorizontal: 25,
    fontWeight: "600",
    fontFamily: "JosefinSans-Bold",
    textAlign: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: 12,
    color: "#000",
    marginBottom: 1,
    fontWeight: "bold",
    opacity: 1,
    fontFamily: "JosefinSans-Bold",
    alignSelf: "center",
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
  emailTextStyleView_: {
    marginTop: 14,
    alignSelf: "center",
  },
  emailTextStyleView: {
    marginTop: 15,
    alignSelf: "center",
  },
  genderTextStyleView: {
    marginTop: 15,
    alignSelf: "flex-start",
  },
  headerTextStyleView: {
    fontSize: 20,
    lineHeight: 24,
    color: "#042504",
    fontFamily: "JosefinSans-Bold",
    textAlign: "center",
    fontWeight: "700",
    alignSelf: "center",
    paddingLeft: 5,
    opacity: 1,
    marginTop: 29
  },
  passwordTextStyleView: {
    marginTop: 20,
  },
  passwordTextStyle: {
    fontSize: 16,
    color: "#414D5B",
    fontFamily: "JosefinSans-Bold",
    paddingLeft: 10,
    paddingBottom: 5,
    textAlign: "left",
    letterSpacing: -0.38,
    opacity: 1,
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
    width: width * 0.7,
    marginTop: 5,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  forgetTextStyle: {
    fontSize: 11,
    color: "#414D5B",
    marginEnd: 10,
    marginTop: 5,
    marginBottom: 1,
    // fontWeight: "bold",
    opacity: 1,
    textAlign: "right",
  },
  buttonView: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    width: width * 0.8,
  },
  loginButton: {
    backgroundColor: "#414D5B",//"#414D5B",
    padding: 15,
    width: width * 0.8,
    height: 50,
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
