import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const initialState = {
  username: "",
  us: "",
  password: "", 
  tier: "",
  errors: {}, 
  accountNumber: "",
  firstname: "",
  lastname: "",
  token: "",
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
};

class AccountInformation extends Component {
  state = initialState;

  componentWillMount = ()=> {
    this._retrieveData();
  }
  // {"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjEyMjA2NDIsImV4cCI6MTY2MTQ3OTg0Mn0.qt8Lb4Gx40-lXdDV6L1XUT4QznI8jdULtXHob1Kw8Ro", "createdAt": "2022-08-19T10:58:36.000Z", "customerID": "006513", "email": "cejimuda@telnetng.com", "firstname": "Chibuo", "id": 30, "isActive": false, "isAdmin": false, "isApproved": false, "isSuperAdmin": false, "lastname": "Ejimuda", "phone": "08144444445", "tier": "3", "token": "", "transactionPIN": "1004", "updatedAt": "2022-08-23T01:45:55.000Z"}
  _retrieveData() {    
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        this.setState({
          token: response.token,
          userId: response.id,
          accessToken: response.accessToken,
          email: response.email,
          customerID: response.customerID,
          firstname: response.firstname,
          lastname: response.lastname,
          id: response.id,
          phone: response.phone,
          tier: response.tier,
          bvn: response.bvn,
          accountNumber: response.accountNumber
        });

        console.log("There is no role dey...", response);
        console.log("I role to make role o", this.state.role);
      } else {
        console.log("There is no role dey...", response);
      }
    });
  }

  render() {
    LogBox.ignoreAllLogs(true);
    const { accountNumber, firstname, lastname, tier } = this.state;
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          <View style={{ marginTop: 20 }}>
            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 16, width: width * 0.85, justifyContent: "space-between" }}>    
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>Account Balance</Text>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>NGN 112,322.03</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 16 }}>
                <View>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>available balance</Text>
                </View>

                </View>
            </View>

            <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 16, width: width * 0.85, justifyContent: "space-between" }}>    
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>Account Number</Text>
                {accountNumber ? <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>{accountNumber}</Text> : <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>No Account Number</Text>}
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 16 }}>
                <View>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>your account number</Text>
                </View>

                </View>
                </View>
            
                <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 16, width: width * 0.85, justifyContent: "space-between" }}>    
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>Account Name</Text>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>{firstname} {lastname}</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 16 }}>
                <View>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "600", marginBottom: 5 }}>your account name</Text>
                </View>

                </View>
                </View>
            
                <View style={styles.optionContainer}>
                <View style={{ flexDirection: "row", marginHorizontal: 16, width: width * 0.85, justifyContent: "space-between" }}>    
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", marginBottom: 10, }}>Account Type</Text>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "600", marginBottom: 0 }}>your account type</Text>
                </View>

                <View style={{ left: 20, }}>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600", textAlign: "right" }}>Tier-{tier}</Text>
                <TouchableOpacity
                onPress={()=> { 
                  this.props.navigation.navigate("BVNQuestion",{
                    screen: "AccountUpgrade",
                    customerID: "006414",//this.state.customerID
                    id: 0
                  })
                  this.setState({ tier: "3" })}}
                disabled={this.state.tier == "3" ? true : false}
                style={{ alignSelf: "flex-end", width: 164, height: 30, backgroundColor: tier == "3" ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1  }}>
                <Text style={styles.loginButtonText}>UPGRADE</Text>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            
                <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 16, width: width * 0.85, justifyContent: "space-between" }}>    
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>Withdrawal Limit</Text>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>NGN5,000,000,000</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 16 }}>
                <View>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "600", marginBottom: 5, width: 120 }}>highest amount you can withdraw in a day</Text>
                </View>

                </View>
                </View>

              <View style={styles.optionContainer}>
                <View>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 16, width: width * 0.85, justifyContent: "space-between" }}>    
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>Liened Amount</Text>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "600" }}>NGN500,000</Text>
                </View>
                </View>
                
                <View style={{ flexDirection: "row", marginStart: 16 }}>
                <View>
                <Text style={{ fontSize: 12, color: "#002A14", fontWeight: "600", marginBottom: 5, width: 120 }}>Money yet to be deducted from your account</Text>
                </View>

                </View>
                </View>
            </View>
        </ScrollView>
    );
  }
}


export default AccountInformation;

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
      width: width,
      marginHorizontal: 0,
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
    // padding: 5,
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
