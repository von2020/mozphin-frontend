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
  Image,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
};

class FaqScreen extends Component {
  state = initialState;

  render() {
    LogBox.ignoreAllLogs(true);
    return (
    <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
        <Loader loading={this.state.isLoading} />

        <View>
            <View style={styles.emailTextStyleView_}>
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "justify", marginTop: 25, lineSpacing: 1}}>Mozfin Microfinance Bank is an arm of Mozfin Microfinance Bank Limited, “MFS” which is wholly a  Nigerian company established in 2012 to provide total financial and administrative solutions to low-end financial market players in Nigeria. Her mandate includes but not limited to Financial arbitraging; Portfolio Management; Micro-lending; Leasing; Resourcing; Coaching and Business Development. 
              {"\n\n"}The company’s management and board of directors comprises of seasoned financial experts with minimum of 15 years of banking and financial experiences in human resources, risk management, banking operations and investments/portfolio management</Text>  

              <Text style={{color: "#045135", fontWeight: "600", fontSize: 20, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 25, lineSpacing: 1 }}>Our Vision</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1 }}>To become a global leader in the provision of retail financial services across Africa.</Text>

              <Text style={{color: "#045135", fontWeight: "600", fontSize: 20, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 25, lineSpacing: 1 }}>Our Mission</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1 }}>To engage the best-in-pratice Human and scientific methods, through a conducive working environment at all levels.</Text>

              <Text style={{color: "#045135", fontWeight: "600", fontSize: 20, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 25, lineSpacing: 1 }}>Objectives</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1 }}>To attain the highest standard in retail banking in Nigeria{"\n\n"}
              To provide simplest solution{"\n\n"}
              To raise professionals{"\n\n"}
              To prove to everyone around us that greatness is not by birth</Text>  
              
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 20, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 25, lineSpacing: 1 }}>Core Values</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1 }}>Synergy{"\n\n"}
              Integrity{"\n\n"}
              Motivation{"\n\n"}
              Purpose{"\n\n"}
              Leadership{"\n\n"}
              Empathy</Text>

              <Text style={{color: "#045135", fontWeight: "600", fontSize: 20, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 25, lineSpacing: 1 }}>Featured Partners</Text>
              </View>  

            <View marginTop={18} alignSelf={"center"}>
            <View style={{ marginBottom: 10, alignSelf: "center", flexDirection: "row" }}>
            <Image source={require('../assets/zenith.png')} resizeMode={'cover'} alignSelf={"center"}/>
            <Image source={require('../assets/sterling.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </View>

            <View style={{ marginBottom: 10, alignSelf: "center", flexDirection: "row" }}>
            <Image source={require('../assets/fidelity.png')} resizeMode={'cover'} alignSelf={"center"}/>
            <Image source={require('../assets/stanbic.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </View>

            <View style={{ marginBottom: 5, alignSelf: "center", flexDirection: "row" }}>
            <Image source={require('../assets/paycom.png')} resizeMode={'cover'} alignSelf={"center"}/>
            <Image source={require('../assets/ndic.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </View>

            <View style={{ marginBottom: 10, alignSelf: "center", flexDirection: "row" }}>
            <Image source={require('../assets/appzone.png')} resizeMode={'cover'} alignSelf={"center"}/>
            {/* <Image source={require('../assets/kaara.png')} resizeMode={'cover'} alignSelf={"center"}/> */}
            </View>

            </View>
            </View>
            <View style={{ marginTop: 70, bottom: 0, alignSelf: "center", marginBottom: 20, }}>
            <Image source={require('../assets/cbnn.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </View>
        </ScrollView>
    );
  }
}


export default FaqScreen;

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
    marginLeft: 5,
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
  imageBgd: {
    width: width,
    flex: 1,
    // backgroundColor: "#FFF", 
    // opacity: 0.7,
    resizeMode: 'cover'
  },
  cardStyleLong: {
    marginTop: 60,
    marginBottom: 10,
    alignSelf: "center",
    width: width * 0.9,
    padding: 15,
    color: "#ffffff",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5,
    height: height * 0.85,
  },
  iconViewStyle_: {
    fontSize: 20,
    bottom: 38,
    marginLeft: 18,
    alignSelf: "flex-start",
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
    marginTop: 20,
    alignSelf: "center",
    paddingHorizontal: 24,
    // marginBottom: 30
  },
  emailTextStyleView: {
    marginTop: 15,
    alignSelf: "center",
  },
  headerTextStyleView: {
    fontSize: 18,
    color: "#042504",
    fontFamily: "JosefinSans-Bold",
    textAlign: "left",
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingBottom: 5,
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
    backgroundColor: "#000000",//"#414D5B",
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
    backgroundColor: "#FFFFFF",
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
