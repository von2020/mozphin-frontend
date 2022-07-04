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
import moment from 'moment';
import  Loader  from './../config/Loader';
import { CheckBox } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
  } from "react-native-simple-radio-button";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");

const initialState = {
  email: "",
  em: "",
  username: "",
  us: "",
  password: "",
  pa: "",
  passwordConfirm: "",
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

class PasswordScreen extends Component {
  state = initialState;
  radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

  handlePasswordConfirm = (passwordConfirm) => {
    if(passwordConfirm != ""){
      this.setState({ passwordConfirm: passwordConfirm, pac: "" });
    }else {
      this.setState({ passwordConfirm: passwordConfirm, pac: "empty" });
    }
  };

  handlePassword = (password) => {
    if(password != ""){
      this.setState({ password: password, pa: "" });
    }else {
      this.setState({ password: password, pa: "empty" });
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

    const { email, username, password, passwordConfirm, city, tellUs } = this.state;
    // {
    //   "email": "valid_email@domain.com",
    //   "username": "any_username",
    //   "city": "name",
    //   "birth_year": "YYYY-MM-DD",
    //   "why_here": "answer to why user wants to join BlackTrust",
    //   "password": "any_password"
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
    if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Please Select a Role ')
    }else if(passwordConfirm == ""){
      this.setState({ isLoading: false, pac: "empty" });
      // Alert.alert(null,'Phone Number field is empty')
    } else if(password != passwordConfirm){
          this.setState({ isLoading: false, by: "empty", click: true });
          // Alert.alert(null,'Middle Name field is empty')
    }  else{
      // const why_here = tellUs
      // const birth_year = moment(birthYear).format("YYYY-MM-DD")
      Alert.alert(null, ' Your password set up was successful..', [
        {
            text: "Ok",
            onPress: () => this.props.navigation.navigate("TransactionPin", {
              token: "token"
            }),
        },
    ]);
      const payload = { 
        email, 
        username, 
        city,
        // birth_year, 
        // why_here, 
        password
        };
    
    console.log(payload);

    const onSuccess = ({ data }) => {  
      setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      
      if (data != null) {
        Alert.alert("Info: ", data.response+"😁", [
          {
              text: "Ok",
              onPress: () => this.props.navigation.push("SignIn", {
                token: "token"
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
        Alert.alert('Info: ','Ensure you enter the details required😩')
      } else if(error.response.status == 500){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Ensure your Network is Stable😩')
      } else if(error.response.status == 404){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Not Found')
      }
      this.setState({ errors: error.response.data, isLoading: false });
    };

    // this.setState({ isLoading: true });

    // blackTrustService
    //   .post("/accounts/register", payload)
    //   .then(onSuccess)
    //   .catch(onFailure);
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
    //         password: response.password,
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
    //   <ImageBackground
    //     source={require("./../../assets/download.jpeg")}
    //     style={styles.image}
    //   >
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#045135" barStyle="light-content"/>
        <Loader loading={this.state.isLoading} />

        <View>
            <View style={styles.cardStyleLong}>
            <Text style={styles.headerTextStyleView}>Password Confirmation...</Text>
            <Text style={styles.infooTextStyle}>Enter password to Sign in into Mozfin</Text>

            <View style={styles.emailTextStyleView_}>
              <Text style={styles.emailTextStyle}>Password</Text>
              <View style={{
                borderColor: this.state.pa == "empty" ? 'pink' : this.state.pa == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.pa == "empty" ? 'pink' : this.state.pa == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <TextInput
                // style={{ borderColor: this.state.username == '' ? 'red' : '#EEF4FE' }}
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.pa == "empty" ? 'red' : "#DDD"}
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
                placeholder="Enter your password"
                placeholderTextColor="#CCC"
                value={this.state.password}
                autoCapitalize="none"
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handlePassword}
              />
                <Entypo      
                  name="lock"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
                </View>

                  {this.state.password ? 
              <TouchableOpacity 
              onPress={this.updateSecureTextEntry.bind(this)}>
                {this.state.secureTextEntry ?
                <Feather
                name="eye-off"
                color="#000000"
                size={15}
                style={{alignSelf: "flex-end", right: 25, top: -35, }}
                />:
                <Feather
                name="eye"
                color="#000000"
                size={15}
                style={{alignSelf: "flex-end", right: 25, top: -35, }}
                />
                }
                
              </TouchableOpacity> : null} 
              {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter your password</Text>}

            </View>
            
            <View style={styles.emailTextStyleView}>
            <Text style={styles.emailTextStyle}>Confirm Password</Text>
              <View style={{
                borderColor: this.state.pac == "empty" ? 'pink' : this.state.pac == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.pac == "empty" ? 'pink' : this.state.pac == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <TextInput
                // style={{ borderColor: this.state.username == '' ? 'red' : '#EEF4FE' }}
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.pac == "empty" ? 'red' : "#DDD"}
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
                placeholder="Confirm password"
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                secureTextEntry={this.state.secureConfirmTextEntry?true:false}
                value={this.state.passwordConfirm}
                onChangeText={this.handlePasswordConfirm}
              />
              <Entypo      
                  name="lock-open"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
              </View>
              {this.state.pac == "empty" && this.state.passwordConfirm == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Password is empty</Text>}
              {this.state.password != this.state.passwordConfirm && this.state.click && <Text style={styles.invalidPasswordTextStyle}>Passwords don't match</Text>}
              {this.state.passwordConfirm ? 
              <TouchableOpacity 
              onPress={this.updateConfirmSecureTextEntry.bind(this)}>
                {this.state.secureConfirmTextEntry ?
                <Feather
                name="eye-off"
                color="#000000"
                size={15}
                style={{alignSelf: "flex-end", right: 25, top: -35, }}
                />:
                <Feather
                name="eye"
                color="#000000"
                size={15}
                style={{alignSelf: "flex-end", right: 25, top: -35, }}
                />
                }
                
              </TouchableOpacity> : null} 
            </View>
            
              <TouchableOpacity
                onPress={this.onPressSignUp.bind(this)}
              >
            <View style={styles.buttonView}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Let's do this</Text>
              </View>
            </View>
            </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    // {/* </ImageBackground> */}
    );
  }
}


export default PasswordScreen;

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
    marginTop: 60,
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
    color: "#000000",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
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
    fontSize: 13,
    color: "#FAD46C",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
    paddingBottom: 5,
    bottom: 3
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
    marginTop: 30,
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
    fontSize: 18,
    color: "#042504",
    fontFamily: "JosefinSans-Bold",
    textAlign: "left",
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 5,
    opacity: 1,
    marginTop: 15
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
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
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
