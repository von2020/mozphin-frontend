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
import  Loader  from './../config/Loader';
// import { Checkbox } from 'react-native-paper';
import BellIcon from '../assets/svgs/bell';
import PhoneIcon from '../assets/svgs/phone';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import mozfinService, {
    setClientToken,
  } from "../service/MozfinService";
  
const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  BVN_: "",
  bn: "",
  us: "",
  token: "94aa5c7b-feec-4f30-bd68-df1b405d40e1", 
  pa: "",
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  BVN_: "",
  pn: 0,
  text: "",
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
};

class BVN_Verification extends Component {
  state = initialState;

  onChangeTextHandler(len){
    if(len != ""){
    const newPhone = len.replace(/(\d{3})(\d{3})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4');
    console.log(newPhone)
    this.setState({ BVN_: newPhone, bn: "" })    
    }else{
        this.setState({BVN_: "", bn: "empty"})
    }
  };

  onPressVerifyBVN() {
    this.setState({ isLoading: true });
    setClientToken("94aa5c7b-feec-4f30-bd68-df1b405d40e1");

    const { BVN_, token, checked } = this.state;
    
    if(BVN_ == ""){
      this.setState({ isLoading: false, bn: "empty" });
    }else if(token == ""){
      this.setState({ isLoading: false, pa: "empty" });
    }else{
    const BVN = BVN_.replace( /-/g, "" )

    const payload = { BVN, token };
    
    console.log(payload);

    const onSuccess = ({ data }) => {
      if(data.ResponseMessage == "Invalid BVN" && !data.isBvnValid){
        this.setState({ isLoading: false, isAuthorized: true });
          Alert.alert(null, data.ResponseMessage)
      }else{
        
        this.setState({ isLoading: false, isAuthorized: true });
        console.log(data);
        Alert.alert(null, data.bvnDetails.FirstName+" "+data.bvnDetails.LastName+" "+data.bvnDetails.OtherNames+"\nPhone number:"+data.bvnDetails.phoneNumber+"\nYour BVN: "+data.bvnDetails.BVN+ " is valid", [
        {
            text: "Ok",
            onPress: () => this.props.navigation.navigate("UpdateUserDetails", {
              firstname: data.bvnDetails.FirstName,
              lastname: data.bvnDetails.LastName,
              othernames: data.bvnDetails.OtherNames,
              bvn: data.bvnDetails.BVN,
              phoneno: data.bvnDetails.phoneNumber,
              dob: data.bvnDetails.DOB,
              tier: "3", 
              screen: this.props.navigation.state.params.screen,
              customerID: this.props.navigation.state.params.customerID,
              id: this.props.navigation.state.params.id,
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
        Alert.alert('Info: ',error.response.data.non_field_errors[0])
      } else if(error.response.status == 500){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Ensure your Network is Stable')
      } else if(error.response.status == 401){
        this.setState({ isLoading: false });
        Alert.alert(null,'Incorrect Login Details')
        if(error.response.data.message == "Your account is not active. Please change your password and be activated!"){
        this.setState({ isLoading: false });
          Alert.alert(null,'Please change your password and be activated')
        }
      } else if(error.response.status == 404){
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Not Found')
      }
      this.setState({ errors: error.response.data, isLoading: false });
    };

    mozfinService
      .post(`/thirdpartyapiservice/apiservice/Account/BVN/GetBVNDetails?Authtoken=${"94aa5c7b-feec-4f30-bd68-df1b405d40e1"}`, payload)
      .then(onSuccess)
      .catch(onFailure);
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
    //         BVN_: response.BVN_,
    //         token: response.token,
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
    const { BVN_, bn, text } = this.state;

    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          
            <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Verify your BVN</Text>
            
                <Text style={{
                    fontSize: 12,
                    fontFamily: "JosefinSans-Bold",
                    textAlign: "center",
                    paddingHorizontal: 5,
                    opacity: 1,
                    fontWeight: "600",
                    color: "#002A14",
                    width: 268,
                    alignSelf: "center",
                    marginTop: 13,
                    }}>Please enter your valid bank verification number to continue</Text>
                    <TextInput
                        style={{
                        borderBottomColor: BVN_ == "" && bn == "empty" ? 'red':'#808080', // Add this to specify bottom border color
                        borderBottomWidth: 1,
                        width: width * 0.55,
                        alignSelf: "center"
                        }}
                        placeholder={'XXX-XXX-XXX-XX'}
                        maxLength={14}
                        placeholderTextColor={BVN_ == "" && bn == "empty" ? "#FF000080" : '#DDDDD'}
                        underlineColor={BVN_ == "" && bn == "empty" ? "#FF0000" : '#000000'}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        backgroundColor={BVN_ == "" && bn == "empty" ? "#FFC0CB80" : "transparent"}
                        top={5}
                        fontSize={20}
                        fontWeight={"400"}
                        textAlign={"center"}
                        value={this.state.BVN_}
                        paddingBottom={5}
                        onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                <View style={{ alignSelf: "center", marginTop: 47 }}>
                <TouchableOpacity onPress={()=> this.onPressVerifyBVN()} style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: BVN_.replace( /-/g, "" ).length != 11 ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}>
                    <Text style={styles.getStarted}>VERIFY</Text>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
    );
  }
}


export default BVN_Verification;

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
    height: 276,// height: height * 0.718,
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
