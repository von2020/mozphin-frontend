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
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-tiny-toast';
import { openInbox } from "react-native-email-link";
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
  confirm_password: "",
  DateFrom: new Date(),
  DateTo: new Date(),
  modeDateFrom: "date",
  DateFromShow: false,
  modeDateTo: "date",
  DateToShow: false,
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
  tellUsList: [
    {
        value: "200",
        label: "1gig (7days)  N200",
    },
    {
        value: "200",
        label: "350mb (7days)  N200",
    },
    {
        value: "350",
        label: "750mb (7days)  N350",
    },
    {
      value: "600",
      label: "1.5gig (7days)  N600",
    },
    {
        value: "1000",
        label: "3gig  (7days)  N1000",
    },
    {
      value: "1500",
      label: "6gig  (7days)  N1500",
    },
    {
        value: "500",
        label: "1gig  (30days)  N500",
    },
    {
      value: "1000",
      label: "1.5gig  (30days)  N1000",
    },
    {
        value: "1500",
        label: "2gig  (30days)  N1500",
    },
    {
      value: "1800",
      label: "2.5gig  (30days)  N1800",
    },
    {
        value: "2000",
        label: "4.5gig  (30days)  N2000",
    },
    {
      value: "2500",
      label: "6.5gig  (30days)  N2500",
    },
    {
        value: "3000",
        label: "9gig  (30days)  N3000",
    },
  ],
};

class StatementAccountScreen extends Component {
  state = initialState;

  handleNewPassword = (new_password) => {
      this.setState({ new_password: new_password });
  };

  handleCurrentPassword = (current_password) => {  
      this.setState({ current_password: current_password });
  };

  handleConfirmPassword = (confirm_password) => {  
    this.setState({ confirm_password: confirm_password });
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

    newUpdateSecureTextEntry(){
      this.setState({ newSecureTextEntry: !this.state.newSecureTextEntry})
    }
    
    currentUpdateSecureTextEntry(){
        this.setState({ currentSecureTextEntry: !this.state.currentSecureTextEntry})
    }

    openEmail(){
        Toast.show('Sent!',{
            position: Toast.position.center,
            containerStyle:{ backgroundColor:"#045135", borderRadius: 10, padding: 10, margin: 10, width: 100 },
            duration: 1000,
            delay: 0,
            textStyle: {color: "#FFF", fontFamily: "Nunito_400Regular", fontSize: 13, fontWeight: "400", },
            imgStyle: {},
            mask: true,
            maskStyle:{},
          })

        setTimeout(function(){  
            openInbox({
                message: "View Mail",
                cancelLabel: "Go back!",
              });
        }, 1500);
    }

    onChangeDateFrom = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.DateFrom;
        this.setState({ DateFromShow: Platform.OS === 'ios'});
        this.setState({ DateFrom: currentDate, by: "" });
        // if(selectedDate != new Date()){
        //   this.setState({ DateOfBirth: selectedDate, by: "" });
        // }else {
        //   this.setState({ DateOfBirth: selectedDate, by: "empty" });
        // }
      };

      onChangeDateTo = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.DateTo;
        this.setState({ DateToShow: Platform.OS === 'ios'});
        this.setState({ DateTo: currentDate, by: "" });
        // if(selectedDate != new Date()){
        //   this.setState({ DateOfBirth: selectedDate, by: "" });
        // }else {
        //   this.setState({ DateOfBirth: selectedDate, by: "empty" });
        // }
      };
    
      showFromMode = (currentMode) => {
      this.setState({ DateFromShow: true});
      this.setState({ modeDateFrom: currentMode });
      };

      showToMode = (currentMode) => {
        this.setState({ DateToShow: true});
        this.setState({ modeDateTo: currentMode });
      };
    
      showDateFromPicker = () => {
        this.showFromMode('date');
      };

      showDateToPicker = () => {
        this.showToMode('date');
      };
        
    confirmUpdateSecureTextEntry(){
    this.setState({ confirmSecureTextEntry: !this.state.confirmSecureTextEntry})
    }

  render() {
    LogBox.ignoreAllLogs(true);
    const { data, airtime, mtn, glo, airtel, nineMobile, displayList, modeDateFrom, DateFromShow, DateFrom, DateToShow, modeDateTo, DateTo  } = this.state;
    var day = new Date().getDate(); 
    var month = new Date().getMonth(); 
    var year = new Date().getFullYear()-1; 
        
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />  

                    <View style={{ marginTop: 10, marginHorizontal: 20, }}>
                    <Text style={{color: "#000", fontWeight: "500", fontSize: 16, lineHeight: 16, textAlign: "left", marginTop: 24 }}>Date</Text>  
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: width * 0.9, }}>
                    <TouchableOpacity onPress={this.showDateFromPicker.bind(this)}>
                        <TextInput
                        style={{
                        width: 155,
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: "#B2BE35",
                        borderRadius: 5,
                        height: 31
                        }}
                        underlineColorAndroid={"transparent"}
                        paddingStart={5}
                        paddingVertical={5}
                        marginBottom={10}
                        placeholder={this.state.DateFrom == new Date() ? `From: ${moment(new Date()).format("YYYY-MM-DD")}` : `From: ${moment(this.state.DateFrom).format("YYYY-MM-DD")}`}
                        placeholderTextColor="#000"        
                        fontSize={12}
                        fontWeight={"400"}
                        textAlign={"left"}
                        // value={this.state.new_password}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType="next"
                        editable={false}
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={this.handleNewPassword}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showDateToPicker.bind(this)}>
                    <TextInput
                        style={{
                        width: 155,
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: "#B2BE35",
                        borderRadius: 5,
                        height: 31, 

                        }}
                        underlineColorAndroid={"transparent"}
                        paddingStart={5}
                        paddingVertical={5}
                        marginBottom={10}
                        // paddingEnd={90}
                        placeholder={this.state.DateTo == new Date() ? `From: ${moment(new Date()).format("YYYY-MM-DD")}` : `From: ${moment(this.state.DateTo).format("YYYY-MM-DD")}`}
                        placeholderTextColor="#000"        
                        fontSize={12}
                        fontWeight={"400"}
                        textAlign={"left"}
                        editable={false}
                        ref={(input) => { this.thirdTextInput = input; }}
                        value={this.state.confirm_password}
                        onChangeText={this.handleConfirmPassword}
                    />
                    </TouchableOpacity>
                    </View>
                    {DateFromShow && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.DateFrom}
                        mode={modeDateFrom}
                        is24Hour={true}
                        maximumDate={new Date()}
                        minimumDate={new Date(year, month, day)}
                        onChange={this.onChangeDateFrom.bind(this)}
                        display="default"
                        />
                    )}

                    {DateToShow && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.DateTo}
                        mode={modeDateTo}
                        is24Hour={true}
                        maximumDate={new Date()}
                        minimumDate={new Date(year, month, day)}
                        display="default"
                        onChange={this.onChangeDateTo.bind(this)}
                        />
                    )}


                    </View>
                    <Text style={{color: "#4A4A4A", fontWeight: "400", fontSize: 12, lineHeight: 20.8, textAlign: "left", marginTop: 24, marginBottom: 32, width: width * 0.9, marginLeft: 24,}}>*The statement is available only up to one year back from today</Text>  
            <TouchableOpacity
                onPress={this.openEmail.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1,  }}>
                <Text style={styles.loginButtonText}>SEND STATEMENT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}


export default StatementAccountScreen;

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
