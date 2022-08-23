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
  Modal,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from "react-native-material-dropdown";
import ArrowDropDownIcon from '../assets/svgs/arrowdropdown';
import { selectContactPhone } from 'react-native-select-contact';
// import Contacts from 'react-native-contacts';
import OTPInput from "../component/OTP/OTPInput";
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import NumberFormat from 'react-number-format';
import mozfinOnboardingService, {
  setClientOnboardToken,
} from "../service/MozfinOnboardingService";

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
  hi: "",
  one: "",
  two: "",
  three: "",
  four: "",
  pin: "",
  accessToken: "",
  token: "",
  userId: "",
  msg: "",
  amount: "",
  am: "", 
  co: "",
  bu: "",
  bundle: "",
  displayList: false,
  modalVisible_: false,
  modalPinVisible_: false,
  modalErrorVisible_: false,
  isDataChecked: false,
  isAirtimeChecked: false,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
  selected: "",
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

class AirtimeNData extends Component {
  state = initialState;

  handleBundle = (value) => {
    if(value != ""){
      this.setState({ value: value, bu: "" });
    }else {
      this.setState({ value: value, bu: "empty" });
    }
    if(this.state.mtn == "tapped"){
      this.setState({ selected: "true" });
    } else if(this.state.glo == "tapped"){
      this.setState({ selected: "true" });
    } else if(this.state.airtel == "tapped"){
      this.setState({ selected: "true" });
    } else if(this.state.nineMobile == "tapped"){
      this.setState({ selected: "true" });
    }
    console.log("Valueeeee", this.state.contact != "" && value != "" && this.state.data == "tapped" && this.state.selected == "true")
    console.log("Valueeeee-------->", "this.state.contact: "+this.state.contact, "Value: "+value, "Data: "+this.state.data, "Selected: "+this.state.selected)
    
    if(this.state.contact != "" && this.state.amount != "" && this.state.airtime == "tapped" && this.state.selected == "true"){
      this.setState({ isAirtimeChecked: true });
    }
    if(this.state.contact != "" && value != "" && this.state.data == "tapped" && this.state.selected == "true"){
      this.setState({ isDataChecked: true });
    }
  };

  handleContact = (contact) => {
    if(contact != ""){
        this.setState({ contact: contact, co: "" });
      }else{
      this.setState({ contact: contact, co: "empty" });
      }
      if(this.state.mtn == "tapped"){
        this.setState({ selected: "true" });
      } else if(this.state.glo == "tapped"){
        this.setState({ selected: "true" });
      } else if(this.state.airtel == "tapped"){
        this.setState({ selected: "true" });
      } else if(this.state.nineMobile == "tapped"){
        this.setState({ selected: "true" });
      }
      console.log("Valueeeee-------->", "this.state.contact: "+this.state.contact, "Data: "+this.state.data, "Selected: "+this.state.selected)
      if(contact != "" && this.state.amount != "" && this.state.airtime == "tapped" && this.state.selected == "true"){
        this.setState({ isAirtimeChecked: true });
      }
      if(contact != "" && this.state.value != "" && this.state.data == "tapped" && this.state.selected == "true"){
        this.setState({ isDataChecked: true });
      }
  }

  handleAmount = (amount) => {  
    if(amount != ""){
      this.setState({ amount: amount, am: "" });
    }else {
      this.setState({ amount: amount, am: "empty" });
    } 
    if(this.state.mtn == "tapped"){
      this.setState({ selected: "true" });
    } else if(this.state.glo == "tapped"){
      this.setState({ selected: "true" });
    } else if(this.state.airtel == "tapped"){
      this.setState({ selected: "true" });
    } else if(this.state.nineMobile == "tapped"){
      this.setState({ selected: "true" });
    }
    console.log("Valueeeee-------->", "this.state.contact: "+this.state.contact, "Data: "+this.state.data, "Selected: "+this.state.selected)
    if(this.state.contact != "" && amount != "" && this.state.airtime == "tapped" && this.state.selected == "true"){
      this.setState({ isAirtimeChecked: true });
    }
    if(this.state.contact != "" && this.state.value != "" && this.state.data == "tapped" && this.state.selected == "true"){
      this.setState({ isDataChecked: true });
    }
  };

  onPressValidatePin() {
    this.setState({ isLoading: true });

    const { username, password, userId, pin } = this.state;
    const user_id = userId
    const transaction_pin = pin

    if(transaction_pin == ""){
      this.setState({ isLoading: false, us: "empty" });
      Alert.alert(null,'Enter pin')
    } else{
    const payload = { user_id, transaction_pin }
    this.setState({ isLoading: false, isAuthorized: true });

    console.log(payload);

    const onSuccess = ({ data }) => {
      console.log(data);
      if (data != null ) {
        if(data.success == true){
        this.setState({ msg: data.msg, modalPinVisible_: false, isLoading: false, isAuthorized: true, modalVisible_: true, modalErrorVisible_: false })
        }else{
          this.setState({ msg: data.msg, modalPinVisible_: false, isLoading: false, isAuthorized: true, modalErrorVisible_: true, modalVisible_: false })
        }
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
    mozfinOnboardingService
      .post("/api/v1/auth/validateTransactionPin", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  } 

  async getPhoneNumber() {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Accept'
      }
    )
    if(permission === PermissionsAndroid.RESULTS.GRANTED){
      return selectContactPhone()
      .then(selection => {
          if (!selection) {
              return null;
          }
          
          let { contact, selectedPhone } = selection;
          console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
          this.setState({ contact: selectedPhone.number })
          return selectedPhone.number;
      })
            }else{
             Alert.alert(null,"You just denied selecting contacts\rClick to Accept")
              console.log("Denied");
            }
    
        // PermissionsAndroid.request(
        //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        //   {
        //     'title': 'Contacts',
        //     'message': 'This app would like to view your contacts.'
        //   }
        // ).then(() => {
        //    // do something in this 
        // })  
  }

    airtimeCheck(){
      const { contact, amount } = this.state;
    if(contact != "" && amount != ""){
      this.setState({ isAirtimeChecked: true });
    }else{
      this.setState({ isAirtimeChecked: false });
    }
    }

    dataCheck(){
      const { contact, amount, value } = this.state;
    if(contact != "" && amount != "" && value != ""){
      this.setState({ isDataChecked: true });
    }else{
      this.setState({ isDataChecked: false });
    }
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

  enable(text){
    const { one, two, three, four } = this.state;
    const pin = one+""+two+""+three+""+text
    if(pin.length == 4){
      this.setState({ pin: pin });
      console.log("hiiiiiiiiiii", pin)
    }
  }

  componentWillMount = ()=> {
    console.log("I don mount o");
    this._retrieveData();
  }

  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  } 

  render() {
    LogBox.ignoreAllLogs(true);
    const { data, airtime, mtn, glo, airtel, nineMobile, displayList, pin, isAirtimeChecked, isDataChecked, co, am, bu } = this.state;
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
                {" "}{this.state.msg}
                </Text>
                </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}
                  onPress={() => this.setState({ modalVisible_: false })}
                  >
                    <Text style={styles.textStylee}>BACK TO HOME</Text>
                </TouchableOpacity>
                        
                </View>
              </View>
              </View>
              </Modal>

              <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalErrorVisible_}
                    onRequestClose={() => {
                      this.setState({ modalErrorVisible_: false });
                    }}
                  >
                <View style={styles.modalBackground}>
                <View style={styles.centeredView}>
                <View style={styles.modalErrorView}>
                <View>
                <StatusBar backgroundColor="#000000" barStyle="light-content"/>
                <Image source={require('../assets/fail.png')} resizeMode={'cover'} alignSelf={"center"} height={20} width={20}/>
                <View alignItems={"center"}>
                <Text style={styles.statusModalTextError}>Failed!</Text>
                <Text style={styles.modalTextError}>
                {" "}{this.state.msg}
                </Text>
                </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 12 }}
                  onPress={() => this.setState({ modalErrorVisible_: false, modalPinVisible_: true, one: "", two: "", three: "", four: "" })}
                  >
                    <Text style={styles.textStylee}>RETRY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#FFFFFF", borderRadius: 10, marginBottom: 5, opacity: 1, borderColor: "#002A14", borderWidth: 1 }}
                  onPress={() => this.setState({ modalErrorVisible_: false })}
                  >
                    <Text style={styles.textStyleeCancel}>CANCEL</Text>
                </TouchableOpacity>
                </View>
              </View>
              </View>
              </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalPinVisible_}
                    onRequestClose={() => {
                      this.setState({ modalPinVisible_: false });
                    }}>
                <View style={styles.modalBackground}>
                <View style={styles.centeredView}>
                <View style={styles.modalPinView}>
                <View>
                <StatusBar backgroundColor="#000000" barStyle="light-content"/>
                {/* <Image source={require('../assets/circlemark.png')} resizeMode={'cover'} alignSelf={"center"} height={20} width={20}/> */}
                <View alignItems={"center"}>
                <Text style={{ fontSize: 20, lineHeight: 24, fontWeight: "700", textAlign: "center", color: "#002A14" }}>Enter Pin</Text>
                <Text style={{ fontSize: 12, lineHeight: 14.4, marginTop: 13, fontWeight: "600", textAlign: "center", color: "#B2BE35", }}>Please enter your 4-digit pin </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 26 }}>
                {/* <OTPInput/> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginEnd: 21 }}>
                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={this.state.one == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  marginEnd={5}
                  paddingVertical={5}
                  ref={(input) => { this.firstTextInput = input; }}
                  style={{ textAlign: "center" }}
                  value={this.state.one}
                  keyboardType={"numeric"}
                  secureTextEntry={this.state.secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      this.secondTextInput.focus()
                      this.setState({ one: text });
                    }else{
                      this.setState({ one: "" });
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={this.state.two == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.secondTextInput = input; }}
                  value={this.state.two}
                  marginEnd={5}
                  paddingVertical={5}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={this.state.secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      this.thirdTextInput.focus()
                      this.setState({ two: text });
                    }else{
                      this.firstTextInput.focus()
                      this.setState({ two: "" });
                    }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={this.state.three == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  ref={(input) => { this.thirdTextInput = input; }}
                  value={this.state.three}
                  marginEnd={5}
                  paddingVertical={5}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={this.state.secureTextEntry?true:false}
                  onChangeText={(text) => {
                      if(text){
                        this.fourTextInput.focus()
                        this.setState({ three: text });
                      }else{
                        this.secondTextInput.focus()
                        this.setState({ three: "" });
                      }
                  }}
                />

                <TextInput
                  backgroundColor= "#FFF"
                  borderWidth = {1}
                  fontSize={16}
                  borderColor={this.state.four == "" ? "#002A14" : "#B2BE35"}
                  width= {38}
                  height= {37}
                  borderRadius= {7}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  maxLength={1}
                  paddingVertical={5}
                  ref={(input) => { this.fourTextInput = input; }}
                  value={this.state.four}
                  style={{ textAlign: "center" }}
                  keyboardType={"numeric"}
                  secureTextEntry={this.state.secureTextEntry?true:false}
                  onChangeText={(text) => {
                    if(text){
                      this.fourTextInput.focus()
                      this.setState({ four: text });
                      this.enable(text);
                    }else{
                      this.thirdTextInput.focus()
                      this.setState({ four: "" });
                    }
                  }}
                />
                </View>
                <TouchableOpacity 
                    onPress={this.updateSecureTextEntry.bind(this)}>
                      {this.state.secureTextEntry ?
                      <View
                      style={{alignSelf: "flex-end", right: 3, marginTop: 10, }}>
                      <EyeOpenIcon/>
                      </View>
                      :
                      <View
                      style={{alignSelf: "flex-end", right: 3, marginTop: 10, }}>
                      <EyeCloseIcon/>
                      </View>
                      }
                      
                    </TouchableOpacity>
                </View>
                </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ alignSelf: "center", width: 296, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 21, marginTop: 26, opacity: 1 }}
                  onPress={() => this.onPressValidatePin()}>
                    <Text style={styles.textStylee}>PROCEED</Text>
                </TouchableOpacity>  

                <TouchableOpacity
                  onPress={() =>
                    this.setState({ modalPinVisible_: false })
                      }>
                  <Text style={styles.dontHaveAccountMintTextStyle}>Cancel</Text>
                </TouchableOpacity>   
                </View>
              </View>
              </View>
              </Modal>
              
          {airtime == "tapped" && <View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", width: width * 0.91, alignSelf: "center", marginTop: 32, marginBottom: 31 }}>
            <TouchableOpacity onPress={()=> this.setState({ airtime: "tapped", data: "", mtn: "", airtel: "", glo: "", nineMobile: "", label: "", value: "", contact: "", amount: "", selected: "" })}>
            <Text style={{
                    fontSize: 20,
                    color: "#002A14",
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    marginHorizontal: 50,
                    fontWeight: "700",
                    opacity: 1,
                    borderBottomWidth: 3,
                    width: 163,
                    textAlign: "center",
                    borderColor: airtime == "" ? "#B2BE3550" : "#B2BE35"
                  }}>Airtime</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.setState({ data: "tapped", airtime: "", mtn: "", airtel: "", glo: "", nineMobile: "", label: "", value: "", contact: "", amount: "", selected: "" })}>
            <Text style={{
                    fontSize: 20,
                    color: "#002A14",
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    marginHorizontal: 50,
                    fontWeight: "700",
                    opacity: 1,
                    borderBottomWidth: 3,
                    width: 163,
                    textAlign: "center",
                    borderColor: data == "" ? "#B2BE3550" : "#B2BE35"
                  }}>Data</Text>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 48 }}>
            <TouchableOpacity style={{ padding: 10, borderColor: mtn == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "tapped", airtel: "", glo: "", nineMobile: "", selected: "true" })}>
            <Image source={require('../assets/mtn.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: glo == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "", glo: "tapped", nineMobile: "", selected: "true" })}>
            <Image source={require('../assets/glo.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: airtel == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "tapped", glo: "", nineMobile: "", selected: "true" })}>
            <Image source={require('../assets/airtime.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: nineMobile == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "", glo: "", nineMobile: "tapped", selected: "true" })}>
            <Image source={require('../assets/9mobile.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 0, marginHorizontal: 20, }}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Phone Number</Text>  
            <TouchableOpacity onPress={()=> this.getPhoneNumber()}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", textDecorationLine: "underline" }}>Select from contact</Text>  
            </TouchableOpacity>
            </View>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.co == "" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        value={this.state.contact.trim()}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleContact(text)}
                    />
                    <View style={{ marginTop: 10, marginBottom: 56, marginHorizontal: 20, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Recharge Amount</Text>  
                    <NumberFormat
                      value={this.state.amount}
                      displayType={'text'}
                      thousandSeparator={true}
                      // prefix={'₦'}
                      renderText={formattedValue => 
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.am == "" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        value={formattedValue}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleAmount(text)}
                    />}
                    />
                    </View>

            <TouchableOpacity
                disabled={isAirtimeChecked != true ? true : false}
                onPress={()=> this.setState({ modalPinVisible_: true, one: 0, two: 0, three: 0, four: 0, selected: "" })}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: isAirtimeChecked != true ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1  }}>
                <Text style={styles.loginButtonText}>PAY</Text>
            </TouchableOpacity>
            </View>}

            {data == "tapped" && <View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", width: width * 0.91, alignSelf: "center", marginTop: 32, marginBottom: 31 }}>
            <TouchableOpacity onPress={()=> this.setState({ airtime: "tapped", data: "", mtn: "", airtel: "", glo: "", nineMobile: "", contact: "", amount: "", selected: "" })}>
            <Text style={{
                    fontSize: 20,
                    color: "#002A14",
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    marginHorizontal: 50,
                    fontWeight: "700",
                    opacity: 1,
                    borderBottomWidth: 3,
                    width: 163,
                    textAlign: "center",
                    borderColor: airtime == "" ? "#B2BE3550" : "#B2BE35"
                  }}>Airtime</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.setState({ data: "tapped", airtime: "", mtn: "", airtel: "", glo: "", nineMobile: "", contact: "", amount: "", selected: "" })}>
            <Text style={{
                    fontSize: 20,
                    color: "#002A14",
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    marginHorizontal: 50,
                    fontWeight: "700",
                    opacity: 1,
                    borderBottomWidth: 3,
                    width: 163,
                    textAlign: "center",
                    borderColor: data == "" ? "#B2BE3550" : "#B2BE35"
                  }}>Data</Text>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 48 }}>
            <TouchableOpacity style={{ padding: 10, borderColor: mtn == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "tapped", airtel: "", glo: "", nineMobile: "", selected: "true" })}>
            <Image source={require('../assets/mtn.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: glo == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "", glo: "tapped", nineMobile: "", selected: "true" })}>
            <Image source={require('../assets/glo.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: airtel == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "tapped", glo: "", nineMobile: "", selected: "true" })}>
            <Image source={require('../assets/airtime.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: nineMobile == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "", glo: "", nineMobile: "tapped", selected: "true" })}>
            <Image source={require('../assets/9mobile.png')} resizeMode={'cover'} alignSelf={"center"}/>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 0, marginHorizontal: 20, }}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Phone Number</Text>  
            <TouchableOpacity onPress={()=> this.getPhoneNumber()}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", textDecorationLine: "underline" }}>Select from contact</Text>  
            </TouchableOpacity>
            </View>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.co == "" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        // maxLength={11}
                        value={this.state.contact.trim()}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleContact(text)}
                    />
                    <View style={{ marginTop: 10, marginHorizontal: 20, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Select Data Bundle</Text>
                    <TouchableOpacity onPress={()=> this.setState({ displayList: true })} style={{ flexDirection: "row", alignSelf: "center"}}>
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.bu == "" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingTop={10}
                        marginBottom={8}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        color={"#000"}
                        value={this.state.value}
                        editable={false}
                        onChangeText={(text) => this.handleBundle(text)}
                    />
                    <View style={{ position: "absolute", right: 0, marginEnd: 8, bottom: 24 }}>
                    <ArrowDropDownIcon/>
                    </View>
                    </TouchableOpacity>  

                    {displayList && <FlatList
                      data={this.state.tellUsList}
                      renderItem={({ item,index }) => (
                        <View style={{ marginBottom: 12 }}>
                          <TouchableOpacity onPress={()=> { 
                            this.handleBundle(item.value)
                            this.setState({ label: item.label, value: item.value, displayList: false })}}>
                          <Text style={{ fontSize: 14, color: "#000", fontWeight: "400", }}>{item.label}</Text>    
                          </TouchableOpacity>
                        </View>
                      )}/>}
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 56, marginHorizontal: 20, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Cost</Text>  
                    <NumberFormat
                      value={this.state.value}
                      displayType={'text'}
                      thousandSeparator={true}
                      // prefix={'₦'}
                      renderText={formattedValue => 
                    <TextInput
                        style={{
                        width: width * 0.9,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.am == "" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        color={"#000"}
                        editable={false}
                        fontWeight={"400"}
                        textAlign={"left"}
                        value={formattedValue}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleAmount(text)}
                    />}
                    />
                    </View>

            <TouchableOpacity
                disabled={isDataChecked != true ? true : false} onPress={()=> this.setState({ modalPinVisible_: true, one: 0, two: 0, three: 0, four: 0, selected: "" })}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: isDataChecked != true ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1  }}>
                <Text style={styles.loginButtonText}>PAY</Text>
            </TouchableOpacity>
            </View>}
        </ScrollView>
    );
  }
}


export default AirtimeNData;

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
    top: 5,
    // marginBottom: 10
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
  modalErrorView: {
    margin: 40,
    width: 326,
    height: 393,
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
  modalPinView: {
    margin: 40,
    width: 326,
    height: 281,
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
  textStyleeCancel: {
    color: "#002A14",
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
  modalTextError: {
    marginBottom: 23,
    marginTop: 6,
    width: width * 0.6,
    fontFamily: "Nunito_400Regular",
    alignSelf: "center",
    textAlign: "center",
    color: "#002A14DE"
  },
  statusModalTextError: {
    color: "#002A14",
    fontFamily: "Nunito_400Regular",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 11,
    marginTop: 5,
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
  dontHaveAccountMintTextStyle: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 1,
    fontWeight: "600",
    opacity: 1,
    lineHeight: 19.2,
    fontFamily: "JosefinSans-Bold",
    alignSelf: "center",
    textDecorationLine: "underline"
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
