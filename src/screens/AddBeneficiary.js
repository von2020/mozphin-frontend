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
import AlarmIcon from '../assets/svgs/alarm';
import BinIcon from '../assets/svgs/bin';
import NoBeneficiaryIcon from '../assets/svgs/nobeneficiary';

import Contacts from 'react-native-contacts';
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
  view: "",
  airtime: "",
  mtn: "",
  nineMobile: "",
  glo: "",
  value: "",
  label: "",
  displayList: false,
  checked: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
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

class AddBeneficiary extends Component {
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
      // setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      if (data != null ) {
        this.props.navigation.push("SideMenuScreen", {
          data: data,
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

  componentDidMount(){ 
        var that = this;  
        setTimeout(function(){  
            that.setState({ view: "yaaay"});  
        }, 3000);  
    }

  async selectContact(){
      try{
        
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.',
            'buttonPositive': 'Please accept bare mortal'
          }
          
        );
        if(permission === PermissionsAndroid.RESULTS.GRANTED){
          const contactis = await Contacts.getAll();
          console.log('contactis');
          // setMycontacts(contactis);
        }else{
          console.log("Permission Denied");
          
        }
      }catch(error){
        console.log(error);
      }
    }

  render() {
    LogBox.ignoreAllLogs(true);
    const { view, airtime, mtn, glo, airtel, nineMobile, displayList } = this.state;
    return (
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          {view == "" ? 
          <View style={styles.scrollView}>
          <View alignSelf={"center"}>
          <NoBeneficiaryIcon/> 
          </View>
          <Text style={{ fontSize: 20, color: "#CFCFCF", width: width * 0.9, fontWeight: "600", alignSelf: "center", textAlign: "center", marginTop: 10, }}>You don’t have any beneficiary list</Text>
          <TouchableOpacity
            onPress={()=> this.setState({ airtel: "tapped" })}
            style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginVertical: 32, opacity: 1  }}>
            <Text style={styles.loginButtonText}>Add Beneficiary</Text>
          </TouchableOpacity>

          </View>:
          <View style={styles.scrollView_}>
          <View style={{ marginVertical: 30 }}>
          <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>0234568822</Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>Mozfin</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>John Snow</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to Select</Text>
                </View>

                </View>
            </View>

            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>0234568822</Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>GT Bank</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row",}}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>John Snow</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to Select</Text>
                </View>
                </View>
            </View>
            
            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>0234568822</Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>First Bank</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>John Snow</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to Select</Text>
                </View>

                </View>
            </View>
            
            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>0234568822</Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>GT Bank</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>John Snow</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to Select</Text>
                </View>

                </View>
            </View>

            
            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>0234568822</Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>Mozfin</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>John Snow</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to Select</Text>
                </View>
                </View>
            </View>
            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>0234568822</Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>GT Bank</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", }}>

                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>John Snow</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to Select</Text>
                </View>
                </View>
            </View>
            </View>
          </View>}
        </ScrollView>
    );
  }
}


export default AddBeneficiary;

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
  optionContainer: {
    width: 327,
    //   height: 80,
    //   flexDirection: "row",
      marginHorizontal: 16,
      marginBottom: 8,
      paddingBottom: 2,
      borderBottomWidth: 1.5,
      borderBottomColor: "#B2BE35",
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
    margin: 110,
    alignContent: "center",
  },
  scrollView_: {
    // margin: 100,
    alignSelf: "center"
  },
  scroll:{
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
