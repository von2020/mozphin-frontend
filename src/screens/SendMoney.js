import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowDropDownIcon from '../assets/svgs/arrowdropdown';
import BankIcon from '../assets/svgs/bank';

const { width, height } = Dimensions.get("window");

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
  bankName: "",
  airtime: "tapped",
  airtel: "",
  nineMobile: "",
  glo: "tapped",
  value: "",
  label: "",
  displayList: false,
  isLoading: false, 
  secureTextEntry: true,
  data: [],
  tellUsList: [
    {
        value: "Access Bank",
        label: "Access Bank",
    },
    {
        value: "Citi Bank",
        label: "Citi Bank",
    },
    {
        value: "Ecobank",
        label: "Ecobank",
    },
    {
      value: "FCMB",
      label: "FCMB",
    },
    {
        value: "Fidelity Bank",
        label: "Fidelity Bank",
    },
    {
      value: "First Bank of Nigeria",
      label: "First Bank of Nigeria",
    },
    {
        value: "GTBank Plc",
        label: "GTBank Plc",
    },
    {
      value: "Globus Bank",
      label: "Globus Bank",
    },
    {
        value: "Haggai Mortgage Bank Limited",
        label: "Haggai Mortgage Bank Limited",
    },
    {
      value: "Heritage Bank",
      label: "Heritage Bank",
    },
    {
        value: "JAIZ Bank",
        label: "JAIZ Bank",
    },
    {
      value: "PARALLEX Bank",
      label: "PARALLEX Bank",
    },
    {
        value: "Polaris Bank",
        label: "Polaris Bank",
    },
    {
        value: "Premium Trust Bank",
        label: "Premium Trust Bank",
    },
    {
        value: "Providus Bank",
        label: "Providus Bank",
    },
    {
        value: "SUNTRUST Bank",
        label: "SUNTRUST Bank",
    },
    {
        value: "Standard Chatared Bank",
        label: "Standard Chatared Bank",
    },
    {
        value: "Sterling Bank",
        label: "Sterling Bank",
    },
    {
        value: "TITAN TRUST Bank",
        label: "TITAN TRUST Bank",
    },
    {
        value: "Taj Bank",
        label: "Taj Bank",
    },
    {
        value: "UNAAB MICROFINANCE BANK",
        label: "UNAAB MICROFINANCE BANK",
    },
    {
        value: "Union Bank",
        label: "Union Bank",
    },
    {
        value: "Unity Bank",
        label: "Unity Bank",
    },
    {
        value: "Wema Bank",
        label: "Wema Bank",
    },
    {
        value: "YOBE MICROFINANCE Bank",
        label: "YOBE MICROFINANCE Bank",
    },
    {
        value: "ZENITH BANK PLC",
        label: "ZENITH BANK PLC",
    },
  ],
};

class SendMoney extends Component {
  state = initialState;

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

  search = txt => {
    if(txt == ""){
      this.setState({ data: this.state.tellUsList })
    }
    let text = txt.toLowerCase()
    let tracks = this.state.tellUsList
    let filterTracks = tracks.filter(item => {
    if(item.label.toLowerCase().match(text)) {
      return item
    }
    })
    if(filterTracks.length != 0){
      this.setState({ data: filterTracks })
    }else{
      this.setState({ data: [] })
      Alert.alert(null,"Your Bank doesn't exist")
    }
  }

  selectBeneficiary(){
      this.props.navigation.navigate("AddBeneficiary")
  }
    
  render() {
    LogBox.ignoreAllLogs(true);
    const { data, bankName, mtn, glo, airtel, nineMobile, displayList } = this.state;
    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 16, marginTop: 28 }}>
            <TouchableOpacity style={{ padding: 10, borderColor: glo == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "", airtel: "", glo: "tapped", nineMobile: "" })}>
            <Image source={require('../assets/mozfinacc.png')} resizeMode={'cover'} alignSelf={"center"} width={200} height={100}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: mtn == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ mtn: "tapped", airtel: "", glo: "", nineMobile: "" })}>
            <BankIcon/>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 48, marginHorizontal: 28, }}>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 16, textAlign: "left", }}>Mozfin to Mozfin</Text>  
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 16, textAlign: "left",}}>Mozfin to Other banks</Text>  
            </View>
        
            {glo == "tapped" && 
            <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 0, marginHorizontal: 28, }}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Account Number</Text>  
            {airtel == "" && 
            <TouchableOpacity onPress={()=> this.selectBeneficiary()}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", textDecorationLine: "underline" }}>Select beneficiary</Text>  
            </TouchableOpacity>}
            </View>
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        maxLength={10}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    {airtel == "" && 
                    <TouchableOpacity
                        onPress={()=> this.setState({ airtel: "tapped" })}
                        style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 32 }}>
                        <Text style={styles.loginButtonText}>CONFIRM</Text>
                    </TouchableOpacity> }
                    </View>}

                    {airtel == "tapped" && 
                    <View>
                    <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Account Name</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"text"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        autoCapitalize={"sentences"}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", marginTop: 24 }}>Enter Amount</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingTop={10}
                        marginBottom={5}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    <Text style={{color: "#3E3E3E", fontWeight: "600", fontSize: 12, lineHeight: 12, textAlign: "left", marginTop: 0 }}>{" "}* Your daily withdrawal is N5, 000, 000</Text>  
                    </View>

                    <View style={{ marginTop: 24, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left" }}>Narration</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        paddingHorizontal={1}
                        paddingTop={10}
                        marginBottom={5}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    /> 
                    </View>
                    <TouchableOpacity
                        onPress={()=> this.setState({ airtel: "tapped" })}
                        style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 32, opacity: 1  }}>
                        <Text style={styles.loginButtonText}>SEND</Text>
                    </TouchableOpacity>
            </View>}
            </View>

            {mtn == "tapped" && <View>
                    {bankName != "" && <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Bank Name</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"text"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        autoCapitalize={"sentences"}
                        value={this.state.label}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    </View>}

                    <View style={{ marginTop: 24, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left" }}>Select Bank</Text>
                    <TouchableOpacity onPress={()=> this.setState({ displayList: true })} style={{ flexDirection: "row", alignSelf: "center"}}>
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingTop={10}
                        marginBottom={8}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        color={"#000"}
                        value={this.state.label}
                        editable={false}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    <View style={{ position: "absolute", right: 0, marginEnd: 8, bottom: 24 }}>
                    <ArrowDropDownIcon/>
                    </View>
                    </TouchableOpacity>  

                    {displayList && 
                    <View>
                        <TextInput
                            backgroundColor = "#EFEDED"
                            borderWidth = {1}
                            borderColor={"#B2BE35"}
                            width= {320}
                            height= {36}
                            borderRadius= {7}
                            top = {-14}
                            paddingVertical={5}
                            paddingStart ={5}
                            paddingEnd= {12}
                            opacity= {1}
                            alignSelf={"center"}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"                
                            placeholder={"Search bank..."}
                            placeholderTextColor={"#00000074"}
                            color={"#000"}
                            onChangeText={(value) => this.search(value)}
                            />
                    <FlatList
                      data={this.state.data.length != 0 ? this.state.data : this.state.tellUsList}
                      renderItem={({ item,index }) => (
                        <View style={{ marginBottom: 12 }}>
                          <TouchableOpacity onPress={()=> this.setState({ label: item.label, value: item.value, displayList: false })}>
                          <Text style={{ fontSize: 14, color: "#000", fontWeight: "400", }}>{item.label}</Text>    
                          </TouchableOpacity>
                        </View>
                      )}/>
                      </View>}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 0, marginTop: 10,}}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Account Number</Text>  
                    {nineMobile == "" && <TouchableOpacity onPress={()=> this.selectBeneficiary()}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", textDecorationLine: "underline" }}>Select beneficiary</Text>  
                    </TouchableOpacity>}
                    </View>
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        marginBottom={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        maxLength={11}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    
                    {nineMobile == "" && 
                    <TouchableOpacity
                        onPress={()=> this.setState({ nineMobile: "tapped", bankName: "hi" })}
                        style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 32 }}>
                        <Text style={styles.loginButtonText}>CONFIRM</Text>
                    </TouchableOpacity> }
                    </View>
                    </View>}

                    {nineMobile == "tapped" && 
                    <View>
                    <View style={{ marginTop: 24, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Account Name</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"text"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        autoCapitalize={"sentences"}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    </View>

                    <View style={{ marginTop: 24, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left",  }}>Enter Amount</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingTop={10}
                        marginBottom={5}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    <Text style={{color: "#3E3E3E", fontWeight: "600", fontSize: 12, lineHeight: 12, textAlign: "left", }}>{" "}* Your daily withdrawal is N5, 000, 000</Text>  
                    </View>

                    <View style={{ marginTop: 24, marginBottom: 10, marginHorizontal: 28, }}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Narration</Text>  
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={"#B2BE35"}
                        paddingHorizontal={1}
                        paddingTop={10}
                        marginBottom={5}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        // value={this.state.BVN_}
                        paddingBottom={5}
                        // onChangeText={(text) => this.onChangeTextHandler(text)}
                    />
                    </View>

            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 32, opacity: 1  }}>
                <Text style={styles.loginButtonText}>SEND</Text>
            </TouchableOpacity>
            </View>}
        </ScrollView>
    );
  }
}


export default SendMoney;

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
