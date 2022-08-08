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
import RightIcon from '../assets/svgs/rightarrow';
import LeftIcon from '../assets/svgs/leftarrow';
import Icon2 from '../assets/svgs/icon2';
import Icon3 from '../assets/svgs/icon3';
import Icon4 from '../assets/svgs/icon4';
import Icon5 from '../assets/svgs/icon5';
import Icon6 from '../assets/svgs/icon6';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

class TransactionHistory extends Component {
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
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", marginVertical: 23, justifyContent: "center" }}>
            <TouchableOpacity style={{ marginEnd: 53,}}>
            <LeftIcon/>
            </TouchableOpacity>
          <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>July</Text>
            <TouchableOpacity style={{ marginStart: 53,}}>
            <RightIcon/>
            </TouchableOpacity>
          </View>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>Thu July 2022 5:34am </Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>NGN (10000.34)</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 6 }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>MOB/TRAN/12345678910/22222222222/Johndoes</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to display or download receipt</Text>
                </View>

                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>Thu July 2022 5:34am </Text>
                <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "400" }}>NGN (10000.34)</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 6 }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>MOB/TRAN/12345678910/22222222222/Johndoes</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to display or download receipt</Text>
                </View>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>Thu July 2022 5:34am </Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>NGN (10000.34)</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 6 }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>MOB/TRAN/12345678910/22222222222/Johndoes</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to display or download receipt</Text>
                </View>

                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>Thu July 2022 5:34am </Text>
                <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "400" }}>NGN (10000.34)</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 6 }}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>MOB/TRAN/12345678910/22222222222/Johndoes</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to display or download receipt</Text>
                </View>

                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>Thu July 2022 5:34am </Text>
                <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "400" }}>NGN (10000.34)</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 6 }} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>MOB/TRAN/12345678910/22222222222/Johndoes</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to display or download receipt</Text>
                </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("TransactionReceipt")}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5, width: width * 0.85, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "400" }}>Thu July 2022 5:34am </Text>
                <Text style={{ fontSize: 14, color: "#002A14", fontWeight: "400" }}>NGN (10000.34)</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 6 }}>

                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>MOB/TRAN/12345678910/22222222222/Johndoes</Text>
                <Text style={{ fontSize: 12, color: "#929191", width: 250, fontWeight: "400" }}>Tap to display or download receipt</Text>
                </View>
                </View>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}


export default TransactionHistory;

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
      marginBottom: 16,
      paddingTop: 10,
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
    backgroundColor: "#FFFFFFF",
    // paddingHorizontal: 16 
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
