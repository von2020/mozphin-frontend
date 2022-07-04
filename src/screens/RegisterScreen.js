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

const { width, height } = Dimensions.get("window");

const initialState = {
  email: "",
  em: "",
  username: "",
  us: "",
  password: "",
  pa: "",
  birthYear: "dd/mm/yyyy",
  by: "",
  usersRole: "",
  id: "10",
  city: "",
  co: "",
  tellUs: "",
  tu: "",
  ch: "",
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
  categoryList: [],
  flagList: [
    {
      value: "Select city",
      label: "Select city",
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

  handleEmail = (email) => {
    if(email != ""){
      if(email == "chibu@yahoo.com"){
        this.setState({ email: email, em: "good" });
      }else{
      this.setState({ email: email, em: "" });
      }
    }else {
      this.setState({ email: email, em: "empty" });
    }
  };

  handleUsername = (username) => {
    if(username != ""){
      if(username == "iamchibu"){
        this.setState({ username: username, us: "good" });
      }else if(username == "chibu"){
        this.setState({ username: username, us: "empty" });
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

  handleBirthYear = (birthYear) => {  
    if(birthYear != new Date()){
      this.setState({ birthYear: birthYear, by: "" });
    }else {
      this.setState({ birthYear: birthYear, by: "empty" });
    }
  };

  handleCity = (city) => {  
    if(city != ""){
      this.setState({ city: city, co: "" });
    }else {
      this.setState({ city: city, co: "empty" });
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
    // this.setState({ isLoading: true });

    const { email, username, password, birthYear, city, tellUs, isChecked } = this.state;
    // {
    //   "email": "valid_email@domain.com",
    //   "username": "any_username",
    //   "city": "name",
    //   "birth_year": "YYYY-MM-DD",
    //   "why_here": "answer to why user wants to join BlackTrust",
    //   "password": "any_password"
    // }
    if(username == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Username field is empty')
    }else if(email == ""){
        this.setState({ isLoading: false, em: "empty" });
        // Alert.alert(null,'Email field is empty')
    }else if(birthYear == "dd/mm/yyyy"){
      this.setState({ isLoading: false, by: "empty" });
      // Alert.alert(null,'Middle Name field is empty')
    }else if(city == ""){
      this.setState({ isLoading: false, co: "empty" });
      // Alert.alert(null,'Please Select a Role ')
    }else if(tellUs == ""){
      this.setState({ isLoading: false, tu: "empty" });
      // Alert.alert(null,'Phone Number field is empty')
    }else if(isChecked == false){
      this.setState({ isLoading: false, ch: "empty" });
      // Alert.alert(null,'Phone Number field is empty')
    }else{
      const why_here = tellUs
      const birth_year = moment(birthYear).format("YYYY-MM-DD")
    //   Alert.alert("Info: ", this.props.navigation.state.params.phonenum+' Your sign up was successful..', [
    //     {
    //         text: "Ok",
    //         onPress: () => this.props.navigation.push("SignIn", {
    //           token: "token"
    //         }),
    //     },
    // ]);
    this.setState({
      modalVisible_: true
    });
      const payload = { 
        email, 
        username, 
        city,
        birth_year, 
        why_here, 
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
      this.props.navigation.push("PasswordScreen", {
                  token: "token"
                });
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
                    <AntDesign
                      name="checkcircle"
                      color="green"
                      alignSelf="center"
                      style={{ alignSelf: "center", marginBottom: 10 }}
                      size={60}/>

                <View flexDirection={"row"} alignItems={"center"}>
                <Text style={styles.modalText}>Yaaaay!!!{" "}
                <Text style={styles.statusModalText}>{this.props.navigation.state.params.phonenum}</Text>
                {" "}Your sign up was successful..{" "}Click "Continue" to enter your password{" \n** Few steps remaining **"}
                </Text>
                </View>
                </View>
                
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ marginStart: 10, position: "absolute", marginTop: 13, bottom: 12, alignSelf: "center" }}
                  onPress={() => this.visibleView()}>
                  <LinearGradient
                      colors={['#FFF','green', '#808080']} style={{ width: 90, height: 40, alignSelf: "center", borderRadius: 12 }}>
                    <Text style={styles.textStylee}>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={this.visibleView.bind(this)}>
                  <Text style={styles.textStylee}>View Center</Text>
                </TouchableOpacity> */}
           
                </View>
              </View>
              </View>
              </Modal>
        <View>
            <View style={styles.cardStyleLong}>
            <Text style={styles.headerTextStyleView}>Before we start...</Text>
            <Text style={styles.infooTextStyle}>A couple of details</Text>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SignIn")
                }>
            <View flexDirection="row" alignSelf="flex-start">
            <Text style={styles.dontHaveAccountTextStyle}>Already have an account?</Text>
            <Text style={styles.dontHaveAccountMintTextStyle}>{" "}Login</Text>
            </View>
            </TouchableOpacity>

            <View style={styles.emailTextStyleView_}>
              <Text style={styles.emailTextStyle}>Your full name</Text>
              <View style={{
                borderColor: this.state.us == "empty" ? 'pink' : this.state.us == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.us == "empty" ? 'pink' : this.state.us == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <TextInput
                // style={{ borderColor: this.state.username == '' ? 'red' : '#EEF4FE' }}
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.us == "empty" ? 'red' : "#DDD"}
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
                placeholder="Enter your full name"
                placeholderTextColor="#CCC"
                autoCapitalize="sentences"
                value={this.state.username}
                onChangeText={this.handleUsername}
              />
                <MaterialIcons      
                  name="person"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
              </View>
              {this.state.username == "chibu" && this.state.us == "empty" && <Text style={styles.invalidPasswordTextStyle}>{this.state.username} has already been taken</Text>}
              {this.state.username == "iamchibu" && this.state.us == "good" && <Text style={styles.invalidPasswordTextStyle}>{this.state.username} is available</Text>}

              {this.state.us == "empty" && this.state.username == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter your name</Text>}

            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={styles.emailTextStyle}>Phone Number</Text>
              <View style={{
                borderColor: this.state.pa == "empty" ? 'pink' : this.state.pa == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.pa == "empty" ? 'pink' : this.state.pa == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <Text
                style={{ 
                    borderColor: '#DDD', 
                    height: 50, 
                    width: width * 0.80, 
                    backgroundColor: "#C4F4CD", 
                    borderRadius: 10, 
                    borderWidth: 1, 
                    paddingTop: 14, 
                    paddingBottom: 10, 
                    paddingStart: 50, 
                    paddingEnd: 22
                      }}>{this.props.navigation.state.params.phonenum}
                    </Text>
              </View>
              
              <FontAwesome     
                  name="phone"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
              </View>

            </View>
            
            <View style={styles.emailTextStyleView}>
              <Text style={styles.emailTextStyle}>Email</Text>
              <View style={{
                borderColor: this.state.em == "empty" ? 'pink' : this.state.em == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.em == "empty" ? 'pink' : this.state.em == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <TextInput
                // style={{ borderColor: this.state.username == '' ? 'red' : '#EEF4FE' }}
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.em == "empty" ? 'red' : "#DDD"}
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
                placeholder="Johndoe@gmail.com"
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              <MaterialIcons      
                  name="email"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
              </View>
              {this.state.em == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>Email is empty</Text>}
            </View>
            
              <View style={styles.emailTextStyleView}>
              <Text style={styles.emailTextStyle}>Select Date of Birth</Text>
              <View style={{
                borderColor: this.state.by == "empty" ? 'pink' : this.state.by == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.by == "empty" ? 'pink' : this.state.by == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
                <TouchableOpacity onPress={this.showDateOfBirthPicker.bind(this)}>
                <TextInput
                  backgroundColor = "#FFF"
                  borderWidth = {1}
                  borderColor={this.state.by == "empty" ? 'red' : "#DDD"}
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
                  placeholder={this.state.birthYear != "dd/mm/yyyy" ? this.state.birthYear.toDateString() : "Choose year"}
                  placeholderTextColor="grey"
                  autoCapitalize="none"
                  keyboardType="text"
                  editable={false}
                  value={this.state.birthYear}
                  onChangeText={this.handleBirthYear}
                />
              <MaterialIcons      
                  name="date-range"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
                </TouchableOpacity>
                {DateOfBirthShow && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.birthYear ? new Date() : this.state.birthYear}
                        mode={modeDateOfBirth}
                        is24Hour={true}
                        maximumDate={new Date()}
                        display="spinner"
                        onChange={this.onChangeDateOfBirth.bind(this)}
                        />
                    )}

                </View>
                {this.state.by == "empty" && this.state.birthYear == "dd/mm/yyyy" && <Text style={styles.invalidPasswordTextStyle}>Birth year is empty. Click to select..</Text>}
            </View>

              <View style={styles.emailTextStyleView}>
              <Text style={styles.emailTextStyle}>Address</Text>
              <View style={{
                borderColor: this.state.co == "empty" ? 'pink' : this.state.co == "good" ? 'lime' : "transparent",
                borderWidth: 1,
                width: width * 0.81,
                height: 54,
                padding: 1,
                backgroundColor: this.state.co == "empty" ? 'pink' : this.state.co == "good" ? 'green' : "transparent",
                borderRadius: 10
              }}>
              <TextInput
                // style={{ borderColor: this.state.username == '' ? 'red' : '#EEF4FE' }}
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.co == "empty" ? 'red' : "#DDD"}
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
                placeholder="Enter your Address"
                placeholderTextColor="#CCC"
                autoCapitalize="sentences"
                value={this.state.city}
                onChangeText={this.handleCity}
              />
              <Entypo      
                  name="location"
                  color="#000000"
                  style={styles.iconViewStyle}
                  size={22}/>
        <View style={{
          height: 45,
          width: 45,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: this.state.city == "Select city" ? "black": "transparent",
          backgroundColor: this.state.city == "Select city" ? "black": "transparent",
          position: "absolute",
          marginLeft: 10,
          top: 2,
        }}>
        </View>
              </View>
              {this.state.co == "empty" && this.state.city == "" && <Text style={styles.invalidPasswordTextStyle}>Address field is empty</Text>}
            </View>

              <View style={styles.genderTextStyleView}>
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
            </View>
            <View flexDirection={"row"} marginTop={20} backgroundColor={this.state.ch == "empty" && this.state.isChecked == false ? "pink" : "transparent"}>
                  <CheckBox
                    checked={isChecked}
                    uncheckedColor={this.state.ch == "empty" && this.state.isChecked == false ? "red" : "#045135"} 
                    checkedColor={"#045135"}
                    size={20}
                    onPress={() => {
                      this.setState({ isChecked: !isChecked })
                    }}
                    /> 
                    <Text style={{color: "#111A30", fontWeight: "100", fontSize: 15, width: width * 0.65, textAlign: "left", top: 5 }}>By Signing up you agree to our{" "}
                    <Text style={{color: "#045135", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>Terms & Conditions</Text>{" "}and{" "}
                    <Text style={{color: "#045135", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>Privacy Policy</Text>
                    </Text> 
                    {/* {this.state.ch == "empty" && this.state.isChecked == false && <Text style={styles.invalidPasswordTextStyle}>Please check our Terms and Conditions..</Text>} */}
              </View>

            <TouchableOpacity
                onPress={this.onPressSignUp.bind(this)}
              >
            <View style={styles.buttonView}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Submit</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 40,
    width: width * 0.8,
    height: height * 0.35,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.95,
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
    textAlign: "justify"
  },
  statusModalText: {
    color: "green",
    fontFamily: "Nunito_400Regular",
  },
  modalBackground:{
    flex:1,
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'space-around',
    backgroundColor:'#00000040'
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
