import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import Toast from 'react-native-tiny-toast';
import ReferralIcon from '../assets/svgs/referral';
import CopyIcon from '../assets/svgs/copy';
import Share from "react-native-share";
import Clipboard from '@react-native-community/clipboard';

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
  token: "",
};

const url = "TH66888dd";
const title = "Share Your Referral Code";
const message = "Please copy this referral code to earn points!\n\n";

const options = {
  title,
  url,
  message,
};

class ReferralsScreen extends Component {
  state = initialState;

  shareThis(){
    Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
  }
    
    copiedThis(){
      Clipboard.setString('TH66888dd');
      Toast.show('Copied!',{
        position: Toast.position.center,
        containerStyle:{ backgroundColor:"#045135", borderRadius: 10, padding: 10, margin: 10, width: 100 },
        duration: 1000,
        delay: 0,
        textStyle: {color: "#FFF", fontFamily: "Nunito_400Regular", fontSize: 13, fontWeight: "400", },
        imgStyle: {},
        mask: true,
        maskStyle:{},
      })
    }
    
  render() {
    LogBox.ignoreAllLogs(true);
    return (
    <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
        <Loader loading={this.state.isLoading} />

        <View style={{ alignSelf: "center", }}>
            <View style={{  alignSelf: "center", marginTop: 30,}}>
            <ReferralIcon/>
            </View>
            
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "center", marginTop: 25, lineSpacing: 1}}>Refer Mozfin, Get A Reward</Text>
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "center", marginTop: 5, lineSpacing: 1 }}>Share our app with friends and family  using your referral code to a reward of NGN2000</Text>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 20, lineHeight: 20.8, textAlign: "center", marginTop: 25, lineSpacing: 1 }}>TH66888dd</Text>  
              <TouchableOpacity onPress={() => {
                    this.copiedThis();
                }}
                style={{ top: 19, left: 7,}}>
                <CopyIcon/>
              </TouchableOpacity>
              </View>
            <TouchableOpacity
                onPress={() => {
                    this.shareThis();
                }}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 , marginTop: 24, }}>
                <Text style={styles.loginButtonText}>SHARE CODE</Text>
            </TouchableOpacity>
            </View>
            
        </ScrollView>
    );
  }
}


export default ReferralsScreen;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
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
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  });
