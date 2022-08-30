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
  Modal,
  LogBox,
} from "react-native";
import  Loader  from './../config/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowDropDownIcon from '../assets/svgs/arrowdropdown';
import BankIcon from '../assets/svgs/bank';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import NumberFormat from 'react-number-format';
import mozfinOnboardingService, {
  setClientOnboardToken,
} from "../service/MozfinOnboardingService";
import mozfinService, {
  setClientToken,
} from "../service/MozfinService";

const { width, height } = Dimensions.get("window");

const initialState = {
  username: "",
  an: "",
  password: "", 
  pa: "",
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  token: "",
  accessToken: "94aa5c7b-feec-4f30-bd68-df1b405d40e1",
  data: "",
  interBank: "",
  bankName: "",
  accountNumber: "",
  AccountNumber: "",
  BankCode: "035",
  airtime: "tapped",
  localConfirm: "",
  interBankConfirm: "",
  checkingName: false,
  local: "tapped",
  value: "",
  label: "",
  hi: "",
  one: "",
  two: "",
  three: "",
  four: "",
  pin: "",
  modalVisible_: false,
  modalPinVisible_: false,
  modalErrorVisible_: false,
  displayList: false,
  isLoading: false, 
  secureTextEntry: true,
  data: [],
  accountName: "",
  tellUsList: [],
  tellUsList_: [
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

  componentWillMount = ()=> {
    this._retrieveData();
    this.bankList();
  }
  
  _retrieveData() {    
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        this.setState({
          token: response.token,
          userId: response.id,
          // accessToken: response.accessToken,
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

  bankList() {
    this.setState({ isLoading: true });

    const tellUsList = [];
    // categoryList.push({
    //   value: "Select Bank",
    //   label: "Select Bank",
    // });
    mozfinService
        .get(`/thirdpartyapiservice/apiservice/BillsPayment/GetCommercialBanks/94aa5c7b-feec-4f30-bd68-df1b405d40e1`)
        .then(data => {
          console.log("list: tellUsList", data);

          data.data.forEach(element => {
            tellUsList.push({
              value: `${element.ID}`,
              label: `${element.Name}`,
            }); 
            this.setState((state) => (state.tellUsList = tellUsList));
            this.setState({ isLoading: false });

        })
        this.setState({tellUsList : tellUsList});
          console.log("list: tellUsList", tellUsList);
        })  
        .catch((err) => {
          console.log(err)
          this.setState({ isLoading: false, isAuthorized: true });
  
        });
    }
  
  handleAccountNumber = (AccountNumber) => {
    if(AccountNumber != ""){
        this.setState({ AccountNumber: AccountNumber, an: "" });
      }else{
      this.setState({ AccountNumber: AccountNumber, an: "empty" });
      }
      // if(this.state.mtn == "tapped"){
      //   this.setState({ selected: "true" });
      // } else if(this.state.glo == "tapped"){
      //   this.setState({ selected: "true" });
      // } else if(this.state.airtel == "tapped"){
      //   this.setState({ selected: "true" });
      // } else if(this.state.nineMobile == "tapped"){
      //   this.setState({ selected: "true" });
      // }
      // console.log("Valueeeee-------->", "this.state.AccountNumber: "+this.state.AccountNumber, "Data: "+this.state.data, "Selected: "+this.state.selected)
      // if(AccountNumber != "" && this.state.amount != "" && this.state.airtime == "tapped" && this.state.selected == "true"){
      //   this.setState({ isAirtimeChecked: true });
      // }
      // if(AccountNumber != "" && this.state.value != "" && this.state.data == "tapped" && this.state.selected == "true"){
      //   this.setState({ isDataChecked: true });
      // }
  }

  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  }

  handleAmount = (amount) => {  
    if(amount != ""){
      this.setState({ amount: amount, am: "" });
    }else {
      this.setState({ amount: amount, am: "empty" });
    } 
    // if(this.state.mtn == "tapped"){
    //   this.setState({ selected: "true" });
    // } else if(this.state.glo == "tapped"){
    //   this.setState({ selected: "true" });
    // } else if(this.state.airtel == "tapped"){
    //   this.setState({ selected: "true" });
    // } else if(this.state.nineMobile == "tapped"){
    //   this.setState({ selected: "true" });
    // }
    // console.log("Valueeeee----÷---->", "this.state.contact: "+this.state.contact, "Data: "+this.state.data, "Selected: "+this.state.selected)
    // if(this.state.contact != "" && amount != "" && this.state.airtime == "tapped" && this.state.selected == "true"){
    //   this.setState({ isAirtimeChecked: true });
    // }
    // if(this.state.contact != "" && this.state.value != "" && this.state.data == "tapped" && this.state.selected == "true"){
    //   this.setState({ isDataChecked: true });
    // }
  };

  handleNarration = (narration) => {  
    if(narration != ""){
      this.setState({ narration: narration, na: "" });
    }else {
      this.setState({ narration: narration, na: "empty" });
    }
  }

  enable(text){
    const { one, two, three, four } = this.state;
    const pin = one+""+two+""+three+""+text
    if(pin.length == 4){
      this.setState({ pin: pin });
      console.log("hiiiiiiiiiii", pin)
    }
  }

  onPressSendMoney() {
    this.setState({ isLoading: true });

    const { amount, narration, checkingName, local, interBank, BankCode, token, accessToken, accountNumber, AccountNumber, accountName, } = this.state;
    
    if(local  == "tapped"){
    if(amount == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(narration == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'narration field is empty')
    }else{
    const Amount = amount
    const FromAccountNumber = accountNumber
    const ToAccountNumber = AccountNumber
    const Narration = narration
    const AuthenticationKey = accessToken
    const RetrievalReference = "abcdefgh"

    const payload = { Amount, FromAccountNumber, ToAccountNumber, Narration,  AuthenticationKey, RetrievalReference};
    this.setState({ isLoading: false, isAuthorized: true });

    // this.props.navigation.push("Dashboard", {
    //   data: "data",
    // });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // insert into db...
      if(data.IsSuccessful == false){//
        if(local){
          this.setState({ modalPinVisible_: true })
          Alert.alert(null,data.ResponseMessage)
        } else if(interBank) {
          this.setState({ modalPinVisible_: true, bankName: "hi", accountName: "Chibundom U. Ejimuda"  })
        }
      }else{
      Alert.alert(null,data.ResponseMessage)
      }
      // setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      // if (data != null ) {
      //   this.props.navigation.push("SideMenuScreen", {
      //     data: data,
      //   });
      // }
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
    mozfinService
      .post("/thirdpartyapiservice/apiservice/CoreTransactions/LocalFundsTransfer", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  } else if(interBank == "tapped") {
    if(amount == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(narration == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'narration field is empty')
    }else{
      const Amount = amount
      const PayerAccountNumber = accountNumber
      const Payer = accountName
      const ReceiverAccountNumber = accountNumber
      const Narration = narration
      const AuthenticationKey = accessToken
      const TransactionReference = "abcdefgh"
      const ReceiverAccountType = "savings"
      const ReceiverName = "Chima"
      const Token = accessToken
      const ChannelType = "7"
      const Identifer = "qwerty"
      const NTPSessionID = "808806"
      const AppzoneAccount = "23456718901234567"
  
      const payload = { Amount, ReceiverName, Identifer, NTPSessionID, AppzoneAccount, ChannelType, Payer, PayerAccountNumber, ReceiverAccountNumber, ReceiverAccountType, Token, Narration,  AuthenticationKey, TransactionReference};
    this.setState({ isLoading: false, isAuthorized: true });

    // this.props.navigation.push("Dashboard", {
    //   data: "data",
    // });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // insert into db...
      if(data.IsSuccessFul == true){//
        if(local){
          this.setState({ modalPinVisible_: true })
          Alert.alert(null,data.ResponseMessage)
        } else if(interBank) {
          this.setState({ modalPinVisible_: true, bankName: "hi", accountName: "Chibundom U. Ejimuda"  })
        }
      }else{
      Alert.alert(null,data.ResponseMessage)
      }
      // setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      // if (data != null ) {
      //   this.props.navigation.push("SideMenuScreen", {
      //     data: data,
      //   });
      // }
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
    mozfinService
      .post("/thirdpartyapiservice/apiservice/Transfer/InterbankTransfer", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  }
  } 

  nameEnquiry(){
    const { checkingName, local, interBank, BankCode, token, accessToken, accountNumber, AccountNumber } = this.state;
    // if(interBank){
    if(AccountNumber == ""){
      this.setState({ isLoading: false, an: "empty" });
    }else{
    // const AccountNumber = accountNumber
    const Token = accessToken
    const payload = { AccountNumber, Token, BankCode };
    this.setState({ isLoading: false, isAuthorized: true });

    // this.props.navigation.push("Dashboard", {
    //   data: "data",
    // });
    console.log(payload);

    const onSuccess = ({ data }) => {
      // insert into db...   LOG  {"BVN": null, "DefaultGateWay": null, "InstitutionCode": null, "IsSuccessful": false, "KYC": null, "Name": null, "ResponseMessage": "Invalid Token", "SessionID": null}

      if(data.IsSuccessful == true){
        if(local){
          this.setState({ localConfirm: "tapped", accountName: data.Name })
        } else if(interBank) {
          this.setState({ interBankConfirm: "tapped", bankName: "hi", accountName: data.Name  })
        }
      }else{
      Alert.alert(null,data.ResponseMessage)
      }
      // setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorized: true });
      console.log(data);
      // if (data != null ) {
      //   this.props.navigation.push("SideMenuScreen", {
      //     data: data,
      //   });
      // }
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
    mozfinService
      .post("/thirdpartyapiservice/apiservice/Transfer/NameEnquiry", payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  // } else if(local){
  //   if(AccountNumber == ""){
  //     this.setState({ isLoading: false, us: "empty" });
  //   }else{
  //   // const AccountNumber = accountNumber
  //   const Token = accessToken
  //   const payload = { AccountNumber, Token, BankCode };
  //   this.setState({ isLoading: false, isAuthorized: true });

  //   // this.props.navigation.push("Dashboard", {
  //   //   data: "data",
  //   // });
  //   console.log(payload);

  //   const onSuccess = ({ data }) => {
  //     // insert into db...   LOG  {"BVN": null, "DefaultGateWay": null, "InstitutionCode": null, "IsSuccessful": false, "KYC": null, "Name": null, "ResponseMessage": "Invalid Token", "SessionID": null}

  //     if(data.IsSuccessful == true){
  //       if(local){
  //         this.setState({ localConfirm: "tapped", accountName: data.Name })
  //       } else if(interBank) {
  //         this.setState({ interBankConfirm: "tapped", bankName: "hi", accountName: data.Name  })
  //       }
  //     }else{
  //     Alert.alert(null,data.ResponseMessage)
  //     }
  //     // setClientToken(data.token);
  //     this.setState({ isLoading: false, isAuthorized: true });
  //     console.log(data);
  //     // if (data != null ) {
  //     //   this.props.navigation.push("SideMenuScreen", {
  //     //     data: data,
  //     //   });
  //     // }
  //   };

  //   const onFailure = (error) => {
  //     console.log(error && error.response);
  //     this.setState({ isLoading: false });
  //     if(error.response == null){
  //       this.setState({ isLoading: false });
  //       Alert.alert('Info: ','Network Error')
  //     }
  //     if(error.response.status == 400){
  //       this.setState({ isLoading: false });
  //       Alert.alert('Info: ',error.response.data.non_field_errors[0])
  //     } else if(error.response.status == 500){
  //       this.setState({ isLoading: false });
  //       Alert.alert('Info: ','Ensure your Network is Stable')
  //     } else if(error.response.status == 401){
  //       this.setState({ isLoading: false });
  //       Alert.alert(null,'Incorrect Details')
  //     } else if(error.response.status == 404){
  //       this.setState({ isLoading: false });
  //       Alert.alert('Info: ','Not Found')
  //     }
  //     this.setState({ errors: error.response.data, isLoading: false });
  //   };

  //   this.setState({ isLoading: true });
  //   mozfinService
  //     .post("/thirdpartyapiservice/apiservice/Transfer/NameEnquiry", payload)
  //     .then(onSuccess)
  //     .catch(onFailure);
  // }
  // }
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
    
  render() {
    LogBox.ignoreAllLogs(true);
    const { data, bankName, interBank, local, localConfirm, interBankConfirm, displayList } = this.state;
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
                  onPress={() => {
                    this.props.navigation.navigate("Dashboard", {
                      // data: data,
                    });
                    this.setState({ modalVisible_: false, interBank: "", localConfirm: "", local: "tapped", interBankConfirm: "", displayList: false, label: "", one: "", two: "", three: "", four: "", AccountNumber: "", amount: "", narration: "", })}}
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
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 16, marginTop: 28 }}>
            <TouchableOpacity style={{ padding: 10, borderColor: local == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ interBank: "", localConfirm: "", local: "tapped", interBankConfirm: "", displayList: false, label: "", one: "", two: "", three: "", four: "", AccountNumber: "", amount: "", narration: "", bankName: "" })}>
            <Image source={require('../assets/mozfinacc.png')} resizeMode={'cover'} alignSelf={"center"} width={200} height={100}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: 10, borderColor: interBank == "tapped" ? "#B2BE35" : "transparent", borderWidth: 1, borderRadius: 4 }} onPress={()=> this.setState({ interBank: "tapped", localConfirm: "", local: "", interBankConfirm: "", displayList: false, label: "", one: "", two: "", three: "", four: "", AccountNumber: "", amount: "", narration: "", bankName: "" })}>
            <BankIcon/>
            </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 48, marginHorizontal: 28, }}>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 16, textAlign: "left", }}>Mozfin to Mozfin</Text>  
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 16, textAlign: "left",}}>Mozfin to Other banks</Text>  
            </View>
        
            {local == "tapped" && 
            <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 0, marginHorizontal: 28, }}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", }}>Account Number</Text>  
            {localConfirm == "" && 
            <TouchableOpacity onPress={()=> this.selectBeneficiary()}>
            <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", textDecorationLine: "underline" }}>Select beneficiary</Text>  
            </TouchableOpacity>}
            </View>
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.an != "empty" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        maxLength={10}
                        value={this.state.AccountNumber}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleAccountNumber(text)}
                    />
                    <Text style={{color: this.state.an != "empty" ? "transparent" : "#FF0000", fontWeight: "600", fontSize: 12, lineHeight: 12, textAlign: "left", marginHorizontal: 28, }}>{" "}Account number doesn’t exist</Text>  
                    {localConfirm == "" && 
                    <TouchableOpacity
                        onPress={()=> this.nameEnquiry()}
                        style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 32 }}>
                        <Text style={styles.loginButtonText}>CONFIRM</Text>
                    </TouchableOpacity> }
                    </View>}

                    {localConfirm == "tapped" && 
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
                        value={this.state.accountName}
                        editable={false}
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
                        value={this.state.amount}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleAmount(text)}
                    />
                    <Text style={{color: "#3E3E3E", fontWeight: "600", fontSize: 12, lineHeight: 12, textAlign: "left", marginTop: 0 }}>{" "}* Your daily withdrawal is N5,000,000</Text>  
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
                        value={this.state.narration}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleNarration(text)}
                    /> 
                    </View>
                    <TouchableOpacity
                        onPress={this.onPressSendMoney.bind(this)}
                        style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 32, opacity: 1  }}>
                        <Text style={styles.loginButtonText}>SEND</Text>
                    </TouchableOpacity>
            </View>}
            </View>

            {interBank == "tapped" && <View>
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
                        editable={false}
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
                    {interBankConfirm == "" && 
                    <TouchableOpacity onPress={()=> this.selectBeneficiary()}>
                    <Text style={{color: "#045135", fontWeight: "700", fontSize: 14, lineHeight: 20.8, textAlign: "left", textDecorationLine: "underline" }}>Select beneficiary</Text>  
                    </TouchableOpacity>}
                    </View>
                    <TextInput
                        style={{
                        width: width * 0.85,
                        alignSelf: "center"
                        }}
                        underlineColorAndroid={this.state.an != "empty" ? "#B2BE35" : "#FF0000"}
                        keyboardType={"phone-pad"}
                        paddingHorizontal={1}
                        paddingVertical={10}
                        fontSize={16}
                        fontWeight={"400"}
                        textAlign={"left"}
                        maxLength={10}
                        value={this.state.AccountNumber}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleAccountNumber(text)}
                    />
                    <Text style={{color: this.state.an != "empty" ? "transparent" : "#FF0000", fontWeight: "600", fontSize: 12, lineHeight: 12, textAlign: "left", marginHorizontal: 28, }}>{" "}Account number doesn’t exist</Text>  
                    
                    {interBankConfirm == "" && 
                    <TouchableOpacity
                        onPress={()=> this.nameEnquiry()}
                        style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 32 }}>
                        <Text style={styles.loginButtonText}>CONFIRM</Text>
                    </TouchableOpacity> }
                    </View>
                    </View>}

                    {interBankConfirm == "tapped" && 
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
                        value={this.state.accountName}
                        editable={false}
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
                        value={this.state.amount}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleAmount(text)}
                    />
                    <Text style={{color: "#3E3E3E", fontWeight: "600", fontSize: 12, lineHeight: 12, textAlign: "left", }}>{" "}* Your daily withdrawal is N5,000,000</Text>  
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
                        value={this.state.narration}
                        paddingBottom={5}
                        onChangeText={(text) => this.handleNarration(text)}
                    />
                    </View>

            <TouchableOpacity
                onPress={this.onPressSendMoney.bind(this)}
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
