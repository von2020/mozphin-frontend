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
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';
import  Loader  from './../config/Loader';
// import { Checkbox, TextInput } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dropdown } from "react-native-material-dropdown";
// import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  email: "",
  em: "",
  username: "",
  us: "",
  phonenum: "",
  pn: "",
  birthYear: "dd/mm/yyyy",
  by: "",
  usersRole: "",
  id: "10",
  country: "",
  item: {},
  co: "",
  tellUs: "Tell us",
  tu: "",
  errors: {}, 
  data: [],
  checked: false,
  isChecked: false,
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
      value: "United Kingdom",
      label: "United Kingdom",
      code: "+44",
      flag: require("../assets/ukkflag.png")
    },
    {
        value: "United States",
        label: "United States",
        code: "+1",
        flag: require("../assets/usflag.png")
    },
    {
        value: "Canada",
        label: "Canada",
        code: "+1",
        flag: require("../assets/canadaflag.png")
    },
    {
        value: "Israel",
        label: "Israel",
        code: "+972",
        flag: require("../assets/israelflag.png")
    },
    {
      value: "Nigeria",
      label: "Nigeria",
      code: "+234",
      flag: require("../assets/naijaflag.png")
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

class SignUpScreen extends Component {
  state = initialState;

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

  handleNumber = (phonenum) => {  
    if( phonenum != ""){
      this.setState({ phonenum: phonenum, pn: "" });
    }else {
      this.setState({ phonenum: phonenum, pn: "empty" });
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

    const { phonenum, item,  } = this.state;
    // {
    //   "email": "valid_email@domain.com",
    //   "username": "any_username",
    //   "country": "name",
    //   "birth_year": "YYYY-MM-DD",
    //   "why_here": "answer to why user wants to join BlackTrust",
    //   "password": "any_password"
    // }
    if(phonenum == ""){
      this.setState({ isLoading: false, pn: "empty" });
      Alert.alert(null,'Phone number field is empty')
    }else{
      this.props.navigation.push("SecretQueScreen", {
        phonenum: item.code+phonenum
      })
      // const birth_year = moment(birthYear).format("YYYY-MM-DD")

      const payload = { 
        phonenum
        // email, 
        // username, 
        // country,
        // birth_year, 
        // why_here, 
        // password
        };
    
    console.log(payload,phonenum);

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

  selectCountry(item){
    // Alert.alert(item.label)
    this.setState({country: item.label, item: item})
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

  search = txt => {
    if(txt == ""){
      this.setState({ data: this.state.flagList })
    }
    let text = txt.toLowerCase()
    let tracks = this.state.flagList
    let filterTracks = tracks.filter(item => {
    if(item.label.toLowerCase().match(text)) {
      return item
    }
    })
    if(filterTracks.length != 0){
      this.setState({ data: filterTracks })
    }else{
      this.setState({ data: [] })
      Alert.alert(null,"Your Country doesn't exist")
    }
  }

  componentDidMount(){
    this.categoryList();  
    if(this.state.checked == false){
      this.clearAll()
    }
    }

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#808080",
          }}
        />
      );
    };

    clearAll = async () => {
    //   try {
    //     await AsyncStorage.clear()
    //   } catch(e) {
    //     // clear error
    //   }
    
      console.log('Done.')
    }

  render() {
    LogBox.ignoreAllLogs(true);
    const { country, isChecked, pn, phonenum } = this.state;
    return (
      <ImageBackground
        source={require("../assets/mozfin_logo.jpg")}
        style={styles.imageBgd}
      >
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#045135" barStyle="light-content"/>
        <Loader loading={this.state.isLoading} />

        {country == ""
        && <View>
        <View marginTop={15}>
                <Text style={{ color: '#111A30', fontSize: 16, marginLeft: 35, fontWeight: "700", marginTop: 10, }}>Select your Country</Text>
                <TextInput
                    style={{
                      borderRadius: 16,
                      marginHorizontal: 10,
                      color: '#000',
                      backgroundColor: '#FFF',
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.5,
                      height: 40,
                      marginBottom: 5,
                      marginTop: 5,
                      marginHorizontal: 30,
                      paddingStart: 60,
                      paddingVertical: 10,
                      paddingEnd: 10,
                      fontSize: 14,
                      alignContent: "center",
                      fontFamily: "Nunito_400Regular",
                      opacity: 1,
                      shadowColor: "#000000",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.2,
                      elevation: 5,
                    }}
                    placeholder={'Search'}
                    placeholderTextColor={'#DDDDD'}
                    // value={this.state.country}
                    onChangeText={(value) => this.search(value)}
                  />

                <Ionicons name="md-search" style={styles.iconStyle}/>
                </View>
                <FlatList
                    marginTop={0}
                    data={this.state.data.length != 0 ? this.state.data : this.state.flagList}
                    ref={(ref) => { this.flatListRef = ref; }}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    initialNumToRender={2}
                    initialScrollIndex={0}
                    refreshing={false}
                    pagingEnabled={true}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    style={{backgroundColor: "#FFF", alignSelf: "center", marginHorizontal: 10, width: width * 0.8,}}
                    marginBottom={0}
                    getItemLayout={(data, index) => (
                        {length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index}
                      )}
                    showsVerticalScrollIndicator = { false }
                    decelerationRate={0}
                    renderItem={({ item,index }) => (
                    <TouchableOpacity onPress={this.selectCountry.bind(this, item)} style={{height: 40, width: width * 0.81, flexDirection: "row", alignSelf: "center", justifyContent: "space-evenly", backgroundColor: "#252C571A", padding: 10 }}>
                    <Text style={{color: "#000", fontWeight: "100", fontSize: 14, width: width * 0.15, marginLeft: 10, textAlign: "left", }}>({item.code})</Text>
                    <Image
                      source={item.flag}
                      style={styles.image}/>
                    <Text style={{color: "#000", fontWeight: "100", textAlign: "left", fontSize: 14, width: width * 0.35, marginLeft: 10}}>{item.label}</Text>
                  </TouchableOpacity>
                  )}/>
            </View>}
            {country != "" && 
            <View width={width} height={height} flex={1} backgroundColor={"#FFF"}>
              <View padding={10}>
              <Text style={{ color: '#111A30', fontSize: 18, marginLeft: 15, fontWeight: "700", marginTop: 30, textAlign: "left",}}>Enter your Phone number</Text>
              <Text style={{color: "grey", fontWeight: "100", fontSize: 15, width: width * 0.8, marginLeft: 15, textAlign: "left", }}>We will send a verification code to this number</Text>

              <View flexDirection={"row"}>
              <View top={10} alignSelf={"center"}>
              <View alignSelf={"center"} flexDirection={"row"} paddingHorizontal={10} paddingTop={10}>
              <Image
                source={this.state.item.flag}
                style={styles.image}/>
              <Text style={{color: "#000", fontWeight: "100", fontSize: 15, width: width * 0.15, marginLeft: 10, textAlign: "left", }}>({this.state.item.code})</Text>
              </View>
              <View
                    style={{
                    backgroundColor: '#000',
                    height: 1,
                    width: width * 0.3,
                    alignSelf: "center", 
                    right: 10
                }} />
              </View>
              <TextInput
                    style={{
                      borderBottomColor: phonenum == "" && pn == "empty" ? 'red':'#808080', // Add this to specify bottom border color
                      borderBottomWidth: 1,
                      width: width * 0.55,
                    }}
                    placeholder={'Phone Number'}
                    placeholderTextColor={phonenum == "" && pn == "empty" ? "#FF000080" : '#DDDDD'}
                    underlineColor={'#000000'}
                    keyboardType={"phone-pad"}
                    marginHorizontal={5}
                    backgroundColor={phonenum == "" && pn == "empty" ? "#FFC0CB80" : "transparent"}
                    top={5}
                    onChangeText={(value) => this.handleNumber(value)}
                  />
                  </View>

                  <View flexDirection={"row"} marginTop={40}>
                  <CheckBox
                    checked={isChecked}
                    uncheckedColor={"#045135"}
                    checkedColor={"#045135"}
                    size={20}
                    onPress={() => {
                      this.setState({ isChecked: !isChecked })
                    }}
                    /> 
                    <Text style={{color: "#111A30", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", top: 5 }}>By Signing up you agree to our{" "}
                    <Text style={{color: "#045135", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>Terms & Conditions</Text>{" "}and{" "}
                    <Text style={{color: "#045135", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>Privacy Policy</Text>
                    </Text> 
                    </View>

                    {isChecked && <TouchableOpacity
                      onPress={this.onPressSignUp.bind(this)}>
                    <View style={styles.buttonView}>
                      <View style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Send OTP</Text>
                      </View>
                    </View>
                  </TouchableOpacity>}

                  <Text style={{color: "#111A30", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", alignSelf: "center", marginTop: 20 }}>Already a registered user? Please{" "}
                    <Text style={{color: "#045135", fontWeight: "100", fontSize: 15, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("SignIn")}>Sign in</Text>{" "}here
                  </Text>
              </View>
            </View>}
        </ScrollView>
     </ImageBackground> 
    );
  }
}


export default SignUpScreen;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
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
  iconStyle: {
    fontSize: 16,
    color: "#1e5228",
    left: 25,
    top: -35,
    alignSelf: "flex-start",
    marginStart: 20,
    elevation: 5,
  },
  iconViewStyle: {
    fontSize: 20,
    bottom: 38,
    marginLeft: 18,
    alignSelf: "flex-start",
  },
  imageBgd: {
    width: width,
    height: height,
    flex: 1,
    // backgroundColor: "#CCC", 
    // opacity: 0.7,
    resizeMode: 'cover'
  },
  image: {
    width: 50,
    height: 30,
    bottom: 5,
    // backgroundColor: "#CCC", 
    // opacity: 0.7,
    resizeMode: 'cover'
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
    // backgroundColor: "#FFFFFF",
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
    marginTop: 15,
    marginBottom: 10,
    width: width * 0.8,
  },
  loginButton: {
    backgroundColor: "#045135",//"#414D5B",
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
    backgroundColor: "#CCCCCC",
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
