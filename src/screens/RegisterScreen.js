import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
  } from "react-native-simple-radio-button";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CheckCloseIcon from '../assets/svgs/checkclose';
import CheckOpenIcon from '../assets/svgs/checkopen';
import PhoneIcon from '../assets/svgs/phone';
import UserIcon from '../assets/svgs/user';
import EmailIcon from '../assets/svgs/email';
import DobIcon from '../assets/svgs/dob';
import LinkIcon from '../assets/svgs/link';
import mozfinService, {
  setClientToken,
} from "../service/MozfinService";


const { width, height } = Dimensions.get("window");

const initialState = {
  Email: "",
  em: "",
  FirstName: "",
  fn: "",
  LastName: "",
  ln: "",
  PhoneNo: "",
  pn: "",
  password: "",
  pa: "",
  DateOfBirth_: "dd/mm/yyyy",
  by: "",
  usersRole: "",
  id: "10",
  referralCode: "",
  rc: "",
  tellUs: "",
  tu: "",
  ch: "",
  item: {},
  modalVisible_: false,
  minutes: 0,
  isChecked: false,
  errors: {}, 
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
  modeDateOfBirth: "date",
  token: "",
  DateOfBirthShow: false,
  OtherNames: "-",
  City: "City",
  Address: "Address",
  PlaceOfBirth: "-",
  NationalIdentityNo: "-",
  NextOfKinName: "-",
  NextOfKinPhoneNumber: "-",
  ReferralName: "",
  ReferralPhoneNO: "-",
  CustomerType: 1,
  Gender: 1,
  AccountOfficerCode: "123",
  categoryList: [],
  flagList: [
    {
      value: "Select Country",
      label: "Select Country",
    },
    {
        value: "United States",
        label: "United States",
    },
    {
        value: "Canada",
        label: "Canada",
    },
    {
        value: "Israel",
        label: "Israel",
    },
    {
      value: "Nigeria",
      label: "Nigeria",
  }
],
tellUsList: [
  {
    value: "Tell us",
    label: "Tell us",
  },
  {
      value: "Search engine",
      label: "Search engine",
  },
  {
      value: "Social media",
      label: "Social media",
  },
  {
      value: "Website referral",
      label: "Website referral",
  },
  {
    value: "From a friend",
    label: "From a friend",
}
],
};

class RegisterScreen extends Component {
  state = initialState;
  radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

  handleEmail = (Email) => {
    if(Email != ""){
      if(Email == "chibu@yahoo.com"){
        this.setState({ Email: Email, em: "good" });
      }else{
      this.setState({ Email: Email, em: "" });
      }
    }else {
      this.setState({ Email: Email, em: "empty" });
    }
  };

  handleFirstname = (FirstName) => {
    if(FirstName != ""){
      this.setState({ FirstName: FirstName, fn: "" });
    }else {
      this.setState({ FirstName: FirstName, fn: "empty" });
    }
  };

  handleLastname = (LastName) => {
    if(LastName != ""){
      this.setState({ LastName: LastName, ln: "" });
    }else {
      this.setState({ LastName: LastName, ln: "empty" });
    }
  };

  handlePassword = (password) => {  
    if(password != ""){
      this.setState({ password: password, pa: "" });
    }else {
      this.setState({ password: password, pa: "empty" });
    } 
  };

  handlePhoneNo = (PhoneNo) => {  
    if(PhoneNo != ""){
      this.setState({ PhoneNo: PhoneNo, pn: "" });
    }else {
      this.setState({ PhoneNo: PhoneNo, pn: "empty" });
    } 
  };

  handleDateOfBirth = (DateOfBirth_) => {  
    if(DateOfBirth_ != new Date()){
      this.setState({ DateOfBirth_: DateOfBirth_, by: "" });
    }else {
      this.setState({ DateOfBirth_: DateOfBirth_, by: "empty" });
    }
  };

  handleReferral = (ReferralName) => {  
    if(ReferralName != ""){
      this.setState({ ReferralName: ReferralName, rc: "" });
    }else {
      this.setState({ ReferralName: ReferralName, rc: "empty" });
    }
  };

  handleTellUs = (tellUs) => {  
    if(tellUs != "Tell us"){
      this.setState({ tellUs: tellUs, tu: "" });
    }else {
      this.setState({ tellUs: tellUs, tu: "empty" });
    }
  };

  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  };

  onPressSignUp() {
    this.setState({ isLoading: true });
    setClientToken("94aa5c7b-feec-4f30-bd68-df1b405d40e1");

    const { Email, FirstName, LastName, PhoneNo, DateOfBirth_, referralCode, tellUs, isChecked, 
    OtherNames,City,
    Address,
    PlaceOfBirth,
    NationalIdentityNo,
    NextOfKinName,
    NextOfKinPhoneNumber,
    ReferralName,
    ReferralPhoneNO,
    CustomerType,
    AccountOfficerCode,
    Gender } = this.state;
    
    if(FirstName == ""){
      this.setState({ isLoading: false, fn: "empty" });
    }else if(LastName == ""){
      this.setState({ isLoading: false, ln: "empty" });
    }else if(Email == ""){
        this.setState({ isLoading: false, em: "empty" });
    }else if(PhoneNo == ""){
      this.setState({ isLoading: false, pn: "empty" });
    }else if(DateOfBirth_ == "dd/mm/yyyy"){
      this.setState({ isLoading: false, by: "empty" });
    }else if(ReferralName == ""){
      this.setState({ isLoading: false, rc: "empty" });
    }else if(isChecked == false){
      this.setState({ isLoading: false, ch: "empty" });
    }else{
      // const why_here = tellUs
      const DateOfBirth = moment(DateOfBirth_).format("YYYY-MM-DD")
    //   Alert.alert("Info: ", this.props.navigation.state.params.phonenum+' Your sign up was successful..', [
    //     {
    //         text: "Ok",
    //         onPress: () => this.props.navigation.push("SignIn", {
    //           token: "token"
    //         }),
    //     },
    // ]);
    
      const payload = { 
        Email, 
        FirstName, 
        LastName,
        DateOfBirth, 
        PhoneNo,
        OtherNames,City,
        Address,
        PlaceOfBirth,
        NationalIdentityNo,
        NextOfKinName,
        NextOfKinPhoneNumber,
        ReferralName,
        ReferralPhoneNO,
        CustomerType,
        AccountOfficerCode,
        Gender
        };
    
    console.log(payload);

    const onSuccess = ({ data }) => {  
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      if (data != null) {
        this.setState({
          item: data,
          modalVisible_: true
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

    mozfinService
      .post(`/BankOneWebAPI/api/Customer/CreateCustomer/2?authtoken=${"94aa5c7b-feec-4f30-bd68-df1b405d40e1"}`, payload)
      .then(onSuccess)
      .catch(onFailure);
  }
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

  onChangeDateOfBirth = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.DateOfBirth_;
    this.setState({ DateOfBirthShow: Platform.OS === 'ios'});
    this.setState({ DateOfBirth_: currentDate, by: "" });
    // if(selectedDate != new Date()){
    //   this.setState({ DateOfBirth: selectedDate, by: "" });
    // }else {
    //   this.setState({ DateOfBirth: selectedDate, by: "empty" });
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
  }

  componentDidMount(){
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

    visibleView(){
      this.setState({ view: true, modalVisible_: false });
      this.props.navigation.push("UpgradeContinue", {
                  token: "token"
                });
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
                {" "}Your sign up was successful..{" "}Click to "Proceed"{" \n** Few steps remaining **"}
                </Text>
                </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ lignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}
                  onPress={() => this.visibleView()}>
                    <Text style={styles.textStylee}>PROCEED</Text>
                </TouchableOpacity>   
                        
                </View>
              </View>
              </View>
              </Modal>
            <View>

            <View style={styles.cardStyleLong}>
            <Image source={require('../assets/main_icon.png')} resizeMode={'cover'} top={-1} alignSelf={"center"} height={20} width={20}/>
            <Text style={styles.welcomeTextStyle}>Getting Started!</Text>

            <View style={styles.emailTextStyleView_}>
              <Text style={{
                fontSize: 12,
                color: this.state.fn == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                lineHeight: 14.4,
                marginTop: 10,}}>First Name</Text>

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
                borderColor={this.state.fn == "empty" ? 'red' : "#B2BE35"}
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
                keyboardType="text"
                onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
                blurOnSubmit={false}                
                value={this.state.FirstName}
                onChangeText={this.handleFirstname}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
              </View>
              </View>
              
              {this.state.fn == "empty" && this.state.FirstName == "" && <Text style={styles.invalidPasswordTextStyle}>First name is empty</Text>}

            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.ln == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                lineHeight: 14.4,
                marginTop: 10,}}>Last Name</Text>

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
                borderColor={this.state.ln == "empty" ? 'red' : "#B2BE35"}
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
                onSubmitEditing={() => { this.emailTextInput.focus(); }}
                blurOnSubmit={false}                
                ref={(input) => { this.lastNameTextInput = input; }}
                value={this.state.LastName}
                onChangeText={this.handleLastname}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
              </View>
              </View>
              
              {this.state.ln == "empty" && this.state.LastName == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter your last name</Text>}

            </View>
            
            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.em == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                lineHeight: 14.4,
                marginTop: 10,}}>Email</Text>
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
                borderColor={this.state.em == "empty" ? 'red' : "#B2BE35"}
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
                onSubmitEditing={() => { this.PhoneNoTextInput.focus(); }}
                blurOnSubmit={false}                
                keyboardType="email-address"
                ref={(input) => { this.emailTextInput = input; }}
                value={this.state.Email}
                onChangeText={this.handleEmail}
              />
              <View      
                  style={styles.iconViewStyle}>
                <EmailIcon/>
              </View>
              </View>
              {this.state.em == "empty" && this.state.Email == "" && <Text style={styles.invalidPasswordTextStyle}>Email is empty</Text>}
            </View>
            
            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.pn == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                lineHeight: 14.4,
                marginTop: 10,}}>Phone Number</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.pn == "empty" ? 'red' : "#B2BE35"}
                width = {width * 0.81}
                height= {56}
                borderRadius = {10}
                textAlign = "left"
                paddingTop = {8}
                paddingBottom ={8}
                paddingStart ={54}
                paddingEnd= {22}
                opacity= {1}
                fontSize={16}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => { this.dobTextInput.focus(); }}
                blurOnSubmit={false}
                ref={(input) => { this.PhoneNoTextInput = input; }}
                value={this.state.PhoneNo}
                onChangeText={this.handlePhoneNo}
              />
              </View>              
              <View      
                  style={styles.iconViewStyle}>
                <PhoneIcon/>
              </View>
              </View>
              {this.state.pn == "empty" && this.state.PhoneNo == "" && <Text style={styles.invalidPasswordTextStyle}>This phone number does not exist</Text>}
            </View>

              <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.by == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                lineHeight: 14.4,
                marginTop: 10,
              }}>Date of Birth</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
                <TouchableOpacity onPress={this.showDateOfBirthPicker.bind(this)}>
                <TextInput
                  backgroundColor = "#FFF"
                  borderWidth = {1}
                  borderColor={this.state.by == "empty" ? 'red' : "#B2BE35"}
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
                  onSubmitEditing={() => { this.ReferralNameTextInput.focus(); }}
                  blurOnSubmit={false}                
                  placeholder={this.state.DateOfBirth_ != "dd/mm/yyyy" ? this.state.DateOfBirth_.toDateString() : "Choose year"}
                  placeholderTextColor={"grey"}
                  editable={false}
                  color={"#000"}
                  ref={(input) => { this.dobTextInput = input; }}
                  value={this.state.DateOfBirth_}
                  onChangeText={this.handleDateOfBirth}
                />
              <View      
                  style={styles.iconViewStyle}>
                <DobIcon/>
              </View>
                </TouchableOpacity>
                {DateOfBirthShow && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.DateOfBirth_ ? new Date() : this.state.DateOfBirth_}
                        mode={modeDateOfBirth}
                        is24Hour={true}
                        maximumDate={new Date()}
                        display="spinner"
                        onChange={this.onChangeDateOfBirth.bind(this)}
                        />
                    )}

                </View>
                {this.state.by == "empty" && this.state.DateOfBirth_ == "dd/mm/yyyy" && <Text style={styles.invalidPasswordTextStyle}>Date of Birth is empty. Click to select..</Text>}
            </View>
            
              <View style={styles.emailTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.rc == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                lineHeight: 14.4,
                marginTop: 10,}}>Referral Name</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.rc == "empty" ? 'red' : "#B2BE35"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={54}
                paddingEnd= {22}
                opacity= {1}
                underlineColorAndroid="transparent"
                autoCapitalize="sentences"
                ref={(input) => { this.ReferralNameTextInput = input; }}
                value={this.state.ReferralName}
                onChangeText={this.handleReferral}
              />
              <View      
                  style={styles.iconViewStyle}>
                <LinkIcon/>
              </View>
            <View style={{
              height: 45,
              width: 45,
              borderRadius: 50,
              position: "absolute",
              marginLeft: 10,
              top: 2,
            }}>
            </View>
              </View>
              {this.state.rc == "empty" && this.state.ReferralName == "" && <Text style={styles.invalidPasswordTextStyle}>Referral Code field is empty</Text>}
            </View>

              {/* <View style={styles.genderTextStyleView}>
              <Text style={styles.emailTextStyle}>Gender</Text>
              <View style={{ alignSelf: "flex-start", marginStart: 10, }}>
                <RadioForm
                  formHorizontal={true}
                  animation={true}
                  radio_props={this.radio_props}
                  style={styles.radioStyle}
                  buttonColor={'grey'}
                  selectedButtonColor={'#1e5228'}
                  buttonSize={7}
                  labelColor={'#000'}
                  labelHorizontal={true}
                  labelStyle={{fontSize: 12, color: '#000', fontFamily: "Nunito_400Regular", marginStart: 0, marginEnd: 5 }}
                  initial={null}
                  buttonStyle={{ borderWidth: 0.5, borderColor: "grey", backgroundColor: "#1e5228" }}
                  onPress={(value) => {
                    //   alert(value)
                      this.setState({ tellUs: value })
                    // this.submitQuestions(item,index,value)
                  }}>
                    <RadioButtonInput
                      borderWidth={0.5}
                      buttonStyle={{ borderWidth: 0.5, borderColor: "grey", backgroundColor: "#1e5228" }}/>
         
                  </RadioForm>

                </View>
              {this.state.tu == "empty" && this.state.tellUs == "" && <Text style={styles.invalidPasswordTextStyle}>Please select an option</Text>}
            </View> */}
            <View flexDirection={"row"} marginTop={8} left={-15}>
              {/* backgroundColor={this.state.ch == "empty" && this.state.isChecked == false ? "pink" : "transparent"} */}
              <CheckBox
                checkedIcon={<CheckOpenIcon />}
                uncheckedIcon={<CheckCloseIcon
                                  red={this.state.ch == "empty" ? "red": ""} />}
                checked={isChecked}
                onPress={() =>this.setState({ isChecked: !isChecked })}
                />
                  {/* <CheckBox
                    checked={isChecked}
                    uncheckedColor={this.state.ch == "empty" && this.state.isChecked == false ? "red" : "#045135"} 
                    checkedColor={"#045135"}
                    size={20}
                    onPress={() => {
                      this.setState({ isChecked: !isChecked })
                    }}
                    />  */}
                    <Text style={{color: "#002A14", fontWeight: "100", fontSize: 12, width: width * 0.65, textAlign: "left", top: 20, left: -10 }}>I agree to the{" "}
                    <Text style={{color: "#002A14", fontWeight: "100", fontSize: 12, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>Terms and Conditions</Text>
                    </Text> 
              </View>

            <TouchableOpacity
                onPress={this.onPressSignUp.bind(this)}
                style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: !isChecked ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}>
                <Text style={styles.loginButtonText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SignIn")
                }>
            <View flexDirection="row" alignSelf="center" marginTop={20} marginBottom={5}>
            <Text style={styles.dontHaveAccountTextStyle}>Already have account?{" "}</Text>
            <Text style={styles.dontHaveAccountMintTextStyle}>Log in</Text>
            </View>
            </TouchableOpacity>

            </View>
            </View>
        </ScrollView>
    // {/* </ImageBackground> */}
    );
  }
}


export default RegisterScreen;

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
  welcomeTextStyle: {
    fontSize: 20,
    color: "#002A14",
    alignSelf: "center",
    paddingLeft: 5,
    marginTop: 15,
    fontWeight: "700",
    opacity: 1,
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
  textStylee: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
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
  modalBackground:{
    flex:1,
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'space-around',
    backgroundColor:'#000000'
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
    shadowopacity: 0.2,
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
    fontSize: 12,
    color: "#FF0000",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "flex-start",
    paddingLeft: 5,
    textAlign: "left",
    opacity: 1,
    top: 5,
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
    color: "#002A14",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "400",
    fontFamily: "JosefinSans-Bold",
    textAlign: "center",
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
    fontSize: 16,
    color: "#000",
    marginBottom: 1,
    fontWeight: "600",
    opacity: 1,
    fontFamily: "JosefinSans-Bold",
    alignSelf: "center",
    textDecorationLine: "underline"
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
    shadowopacity: 0.2,
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
    shadowopacity: 0.2,
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
