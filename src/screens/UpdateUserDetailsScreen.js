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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import ImgToBase64 from 'react-native-image-base64';
import * as RNFS from 'react-native-fs';
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
import HouseIcon from '../assets/svgs/house';
import RelationIcon from '../assets/svgs/relation';
import PhoneIcon from '../assets/svgs/phone';
import UserIcon from '../assets/svgs/user';
import EmailIcon from '../assets/svgs/email';
import DobIcon from '../assets/svgs/dob';
import AddressIcon from '../assets/svgs/address';
import LgaIcon from '../assets/svgs/lga';
import LockSmallIcon from '../assets/svgs/locksmall';
import CompanyIcon from '../assets/svgs/company';
import LocationIcon from '../assets/svgs/location';
import OccupationIcon from '../assets/svgs/occupation';
import RoleIcon from '../assets/svgs/role';
import MoneyIcon from '../assets/svgs/money';
import mozfinService, {
  setClientToken,
} from "../service/MozfinService";
import mozfinOnboardingService, {
  setClientOnboardToken,
} from "../service/MozfinOnboardingService";
import NumberFormat from 'react-number-format';

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
  state: "Select State",
  id: "Select Identification type",
  bill: "Select bill type",
  idd: "",
  bi: "",
  lga: "Select LGA",
  lg: "",
  tu: "",
  ch: "",
  status: "",
  stu: "",
  ge: "",
  fileNameId: "",
  idFile: "",
  fileNameUtility: "",
  utilityFile: "",
  fileNamePassport: "",
  passportFile: "",
  fileNameSign: "",
  signFile: "",
  display: "",
  isPersonal: false,
  personal: true,
  isNextOfKin: false,
  nextOfKin: false,
  isEmployeeInfo: false,
  employeeInfo: false,
  isFileUpload: false,
  fileUpload: false,
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
  OtherNames: "",
  Company: "",
  co: "",
  CompanyAddress: "",
  Occupation: "",
  oc: "",
  Money: "",
  mo: "",  
  Role: "",
  ro: "",
  Address: "",
  add: "",
  si: "",
  pass: "",
  PlaceOfBirth: "",
  NationalIdentityNo: "",
  NextOfKinFirstName: "",
  nfn: "",
  NextOfKinLastName: "",
  nln: "",
  NextOfKinPhoneNumber: "",
  npn: "",
  NextOfKinEmail: "",
  nem: "",
  NextOfKinGender: "",
  nge: "",
  NextOfKinAddress: "",
  nadd: "",
  Relationship: "",
  re: "",
  ReferralName: "",
  ReferralPhoneNO: "",
  AccountNumber: "",
  CustomerType: 1,
  Gender: "",
  AccountOfficerCode: "123",
  categoryList: [],
  lgaList: [
    {
      value: "Select LGA",
      label: "Select your LGA",
    },
    {
        value: "1",
        label: "Lga 1",
    },
    {
        value: "2",
        label: "Lga 2",
    },
    {
        value: "3",
        label: "Lga 3",
    },
    {
      value: "4",
      label: "Lga 4",
  }
],
stateList: [
  {
    value: "Select State",
    label: "Select your State",
  },
  {
      value: "1",
      label: "Abia",
  },
  {
      value: "2",
      label: "Adamawa",
  },
  {
      value: "3",
      label: "Akwa Ibom",
  },
  {
    value: "4",
    label: "Anambra",
}
],
idList: [
  {
    value: "Select Identification type",
    label: "Select Identification type",
  },
  {
      value: "1",
      label: "Driver’s Licence",
  },
  {
      value: "2",
      label: "International Passport",
  },
  {
      value: "3",
      label: "National ID Card",
  },
  {
    value: "4",
    label: "Voter’s Card",
}
],
billList: [
  {
    value: "Select bill type",
    label: "Select bill type",
  },
  {
      value: "1",
      label: "Electricity Bill",
  },
  {
      value: "2",
      label: "Waste Bill",
  },
  {
      value: "3",
      label: "Water Bill",
  }
],
};

class UpdateUserDetailsScreen extends Component {
  state = initialState;
  radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

status_props = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
];

handleFirstname = (FirstName) => {
  if(FirstName != ""){
    this.setState({ FirstName: FirstName, fn: "" });
  }else {
    this.setState({ FirstName: this.props.navigation.state.params.firstname, fn: "empty" });
  }
};

  handleEmail = (Email) => {
    if(Email != ""){
      this.setState({ Email: Email, em: "" });
    }else {
      this.setState({ Email: Email, em: "empty", isPersonal: false });
    }
    const {
      lga, 
      state, 
      status, 
      Address,
      AccountNumber,
      Gender
     } = this.state;
    
      if(Email && AccountNumber && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({isPersonal: true})
      }
  };

  handleFirstname = (FirstName) => {
    if(FirstName != ""){
      this.setState({ FirstName: FirstName, fn: "" });
    }else {
      this.setState({ FirstName: this.props.navigation.state.params.firstname, fn: "empty" });
    }
  };

  handleLastname = (LastName) => {
    if(LastName != ""){
      this.setState({ LastName: LastName, ln: "" });
    }else {
      this.setState({ LastName: this.props.navigation.state.params.lastname, ln: "empty" });
    }
  };

  handleOthername = (OtherNames) => {
    if(OtherNames != ""){
      this.setState({ OtherNames: OtherNames, ln: "" });
    }else {
      this.setState({ OtherNames: this.props.navigation.state.params.othernames, ln: "empty" });
    }
  };

  handlePhoneNo = (PhoneNo) => {  
    if(PhoneNo != ""){
      this.setState({ PhoneNo: PhoneNo, pn: "" });
    }else {
      this.setState({ PhoneNo: this.props.navigation.state.params.phoneno, pn: "empty" });
    } 
  };

  handleDateOfBirth = (DateOfBirth_) => {  
    if(DateOfBirth_ != new Date()){
      this.setState({ DateOfBirth_: DateOfBirth_, by: "" });
    }else {
      this.setState({ DateOfBirth_: this.props.navigation.state.params.dob, by: "empty" });
    }
  };

  handleMaritalStatus = (status) => {  
    if(status != ""){
      this.setState({ status: status, stu: "" });
    }else {
      this.setState({ status: status, stu: "empty", isPersonal: false });
    }
    const {
      Email,
      lga, 
      state, 
      AccountNumber,
      Address,
      Gender } = this.state;
    
      if(AccountNumber && Email && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({isPersonal: true})
      }
  };

  handleState = (state) => {  
    if(state != "Select State"){
      this.setState({ state: state, tu: "" });
    }else {
      this.setState({ state: state, tu: "empty", isPersonal: false });
    }
    const {
      Email, 
      lga, 
      status, 
      Address,
      AccountNumber,
      Gender } = this.state;
    
      if(AccountNumber && Email && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({isPersonal: true})
      }
  };

  handleLga = (lga) => {  
    if(lga != "Select LGA"){
      this.setState({ lga: lga, lg: "" });
    }else {
      this.setState({ lga: lga, lg: "empty", isPersonal: false });
    }

    const {
      Email, 
      state, status, 
      Address,
      AccountNumber,
      Gender } = this.state;
    
      if(AccountNumber && Email && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({isPersonal: true})
      }
  };

  handleAddress = (Address) => {  
    if(Address != ""){
      this.setState({ Address: Address, add: "" });
    }else {
      this.setState({ Address: Address, add: "empty", isPersonal: false });
    }

    const {
      Email,
      lga, 
      state, status, 
      AccountNumber,
      Gender } = this.state;
    
      if(Email && AccountNumber && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({isPersonal: true})
      }
  };

  handleAccountNumber = (AccountNumber) => {  
    if(AccountNumber != ""){
      this.setState({ AccountNumber: AccountNumber, an: "" });
    }else {
      this.setState({ AccountNumber: AccountNumber, an: "empty", isPersonal: false });
    }
    const {
      Email,
      Address, 
      lga, 
      state, status,
      Gender } = this.state;
    
      if(Email && AccountNumber && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({ isPersonal: true })
      }
  };

  handleGender = (Gender) => {  
    if(Gender != ""){
      this.setState({ Gender: Gender, ge: "" });
    }else {
      this.setState({ Gender: Gender, ge: "empty", isPersonal: false });
    }
    const {
      Email, 
      lga, 
      state, status, 
      Address,
      AccountNumber,
      } = this.state;
    
      if(Email && AccountNumber && state != "Select State" && lga != "Select LGA" && Address && Gender && status){
      this.setState({isPersonal: true})
      }
  };

  handleNextOfKinFirstname = (NextOfKinFirstName) => {
    if(NextOfKinFirstName != ""){
      this.setState({ NextOfKinFirstName: NextOfKinFirstName, nfn: "" });
    }else {
      this.setState({ NextOfKinFirstName: NextOfKinFirstName, nfn: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinEmail, 
      NextOfKinLastName, 
      NextOfKinGender, 
      NextOfKinPhoneNumber, 
      NextOfKinAddress,
      Relationship
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };
  
  handleNextOfKinLastname = (NextOfKinLastName) => {
    if(NextOfKinLastName != ""){
      this.setState({ NextOfKinLastName: NextOfKinLastName, nln: "" });
    }else {
      this.setState({ NextOfKinLastName: NextOfKinLastName, nln: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinEmail, 
      NextOfKinFirstName, 
      NextOfKinGender, 
      NextOfKinPhoneNumber, 
      NextOfKinAddress,
      Relationship
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };
  
  handleNextOfKinEmail = (NextOfKinEmail) => {
    if(NextOfKinEmail != ""){
      this.setState({ NextOfKinEmail: NextOfKinEmail, nem: "" });
    }else {
      this.setState({ NextOfKinEmail: NextOfKinEmail, nem: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinFirstName, 
      NextOfKinLastName, 
      NextOfKinGender, 
      NextOfKinPhoneNumber, 
      NextOfKinAddress,
      Relationship
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };

  handleRelationship = (Relationship) => {
    if(Relationship != ""){
      this.setState({ Relationship: Relationship, re: "" });
    }else {
      this.setState({ Relationship: Relationship, re: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinEmail, 
      NextOfKinLastName, 
      NextOfKinGender, 
      NextOfKinPhoneNumber, 
      NextOfKinAddress,
      NextOfKinFirstName
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };

  handleNextOfKinPhoneNo = (NextOfKinPhoneNumber) => {  
    if(NextOfKinPhoneNumber != ""){
      this.setState({ NextOfKinPhoneNumber: NextOfKinPhoneNumber, npn: "" });
    }else {
      this.setState({ NextOfKinPhoneNumber: NextOfKinPhoneNumber, npn: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinEmail, 
      NextOfKinLastName, 
      NextOfKinGender, 
      NextOfKinFirstName, 
      NextOfKinAddress,
      Relationship
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };

  handleNextOfKinGender = (NextOfKinGender) => {  
    if(NextOfKinGender != ""){
      this.setState({ NextOfKinGender: NextOfKinGender, nge: "" });
    }else {
      this.setState({ NextOfKinGender: NextOfKinGender, nge: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinEmail, 
      NextOfKinLastName, 
      NextOfKinFirstName, 
      NextOfKinPhoneNumber, 
      NextOfKinAddress,
      Relationship
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };

  handleNextOfKinAddress = (NextOfKinAddress) => {  
    if(NextOfKinAddress != ""){
      this.setState({ NextOfKinAddress: NextOfKinAddress, nadd: "" });
    }else {
      this.setState({ NextOfKinAddress: NextOfKinAddress, nadd: "empty", isNextOfKin: false });
    }
    const {
      NextOfKinEmail, 
      NextOfKinLastName, 
      NextOfKinGender, 
      NextOfKinPhoneNumber, 
      NextOfKinFirstName,
      Relationship
     } = this.state;
    
      if(NextOfKinFirstName && NextOfKinEmail && NextOfKinLastName && NextOfKinGender && NextOfKinPhoneNumber && NextOfKinAddress && Relationship){
      this.setState({isNextOfKin: true})
      }
  };

  handleCompany = (Company) => {
    if(Company != ""){
      this.setState({ Company: Company, co: "" });
    }else {
      this.setState({ Company: Company, co: "empty", isEmployeeInfo: false });
    }
    const {
      CompanyAddress, 
      Role, 
      Money, 
      Occupation
     } = this.state;
    
      if(Company && CompanyAddress && Role && Money && Occupation){
      this.setState({isEmployeeInfo: true})
      }
  };
  
  handleCompanyAddress = (CompanyAddress) => {
    if(CompanyAddress != ""){
      this.setState({ CompanyAddress: CompanyAddress, ca: "" });
    }else {
      this.setState({ CompanyAddress: CompanyAddress, ca: "empty", isEmployeeInfo: false });
    }
    const {
      Company, 
      Role, 
      Money, 
      Occupation
     } = this.state;
    
      if(Company && CompanyAddress && Role && Money && Occupation){
      this.setState({isEmployeeInfo: true})
      }
  };
  
  handleRole = (Role) => {
    if(Role != ""){
      this.setState({ Role: Role, ro: "" });
    }else {
      this.setState({ Role: Role, ro: "empty", isEmployeeInfo: false });
    }
    const {
      CompanyAddress, 
      Company, 
      Money, 
      Occupation
     } = this.state;
    
      if(Company && CompanyAddress && Role && Money && Occupation){
      this.setState({isEmployeeInfo: true})
      }
  };
  
  handleMoney = (Money) => {
    if(Money != ""){
      this.setState({ Money: Money, mo: "" });
    }else {
      this.setState({ Money: Money, mo: "empty", isEmployeeInfo: false });
    }
    const {
      CompanyAddress, 
      Role, 
      Company, 
      Occupation
     } = this.state;
    
      if(Company && CompanyAddress && Role && Money && Occupation){
      this.setState({isEmployeeInfo: true})
      }
  };
  
  handleOccupation = (Occupation) => {
    if(Occupation != ""){
      this.setState({ Occupation: Occupation, oc: "" });
    }else {
      this.setState({ Occupation: Occupation, oc: "empty", isEmployeeInfo: false });
    }
    const {
      CompanyAddress, 
      Role, 
      Money, 
      Company
     } = this.state;
    
      if(Company && CompanyAddress && Role && Money && Occupation){
      this.setState({isEmployeeInfo: true})
      }
  };
  
  handleBill = (bill) => {  
    if(bill != "Select bill type"){
      this.setState({ bill: bill, bi: "" });
    }else {
      this.setState({ bill: bill, bi: "empty" });
    }
  };

  handleId = (id) => {  
    if(id != "Select Identification type"){
      this.setState({ id: id, idd: "" });
    }else {
      this.setState({ id: id, idd: "empty" });
    }
  };

  async selectFileId(){
    // Pick a single file
    if(this.state.id == "Select Identification type"){
      this.setState({ idd: "empty", idFile: "", fileNameId: "", isFileUpload: false });
    }else{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res[0])
      console.log(res[0].uri)
      this.setState({ display: res[0].uri})
      if(res[0].type != "application/pdf"){
      ImgToBase64.getBase64String(res[0].uri)
      .then(data => {
        const {
          fileNameId, 
          fileNameUtility, 
          fileNamePassport, 
          fileNameSign
         } = this.state;
        
          if(fileNameId && fileNameUtility && fileNamePassport && fileNameSign){
          this.setState({isFileUpload: true})
          }
        console.log(
          'data:image/jpeg;base64,' + data
        );
        this.setState({ idFile: 'data:image/jpeg;base64,' + data })
        this.setState({ idFile: data })
        }
        )
        
      .catch(err => console.log(err));
      
      this.setState({ fileNameId: res[0].name})
      }else if(res[0].type == "application/pdf"){
        this.setState({ fileNameId: res[0].name})
        const {
          fileNameId, 
          fileNameUtility, 
          fileNamePassport, 
          fileNameSign
         } = this.state;
        
          if(fileNameId && fileNameUtility && fileNamePassport && fileNameSign){
          this.setState({isFileUpload: true})
          }
        RNFS.readFile(res[0].uri, 'base64').then(data => {
          this.setState({ idFile: 'data:application/pdf;base64,' + data })
          this.setState({ idFile: data })
      })
      .catch(err => {
          console.log(err.message, err.code);
      });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  }

  async selectFileUtility(){
    if(this.state.bill == "Select bill type"){
      this.setState({ bi: "empty", utilityFile: "", fileNameUtility: "", isFileUpload: false });
    }else{
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res[0])
      console.log(res[0].uri)
      this.setState({ display: res[0].uri})

      ImgToBase64.getBase64String(res[0].uri)
      .then(data => {
        const {
          fileNameId, 
          fileNameUtility, 
          fileNamePassport, 
          fileNameSign
         } = this.state;
        
          if(fileNameId && fileNameUtility && fileNamePassport && fileNameSign){
          this.setState({isFileUpload: true})
          }
        console.log(
          'data:image/jpeg;base64,' + data
        );
        this.setState({ utilityFile: 'data:image/jpeg;base64,' + data })
        this.setState({ utilityFile: data })
        }
        )
        
      .catch(err => console.log(err));
      
      this.setState({ fileNameUtility: res[0].name})

      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  }

  async selectFilePassport(){
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res[0])
      console.log(res[0].uri)
      this.setState({ display: res[0].uri})

      ImgToBase64.getBase64String(res[0].uri)
      .then(data => {
        const {
          fileNameId, 
          fileNameUtility, 
          fileNamePassport, 
          fileNameSign
         } = this.state;
        
          if(fileNameId && fileNameUtility && fileNamePassport && fileNameSign){
          this.setState({isFileUpload: true})
          }
        console.log(
          'data:image/jpeg;base64,' + data
        );
        this.setState({ passportFile: 'data:image/jpeg;base64,' + data })
        this.setState({ passportFile: data })
        }
        )
        
      .catch(err => console.log(err));
      
      this.setState({ fileNamePassport: res[0].name})

      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    const {
      fileNameId, 
      fileNameUtility, 
      fileNamePassport, 
      fileNameSign
     } = this.state;
    
      if(fileNameId && fileNameUtility && fileNamePassport && fileNameSign){
      this.setState({isFileUpload: true})
      }
  }

  async selectFileSign(){
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res[0])
      console.log(res[0].uri)
      this.setState({ display: res[0].uri})

      ImgToBase64.getBase64String(res[0].uri)
      .then(data => {
        console.log(
          'data:image/jpeg;base64,' + data
        );
        this.setState({ signFile: 'data:image/jpeg;base64,' + data })
        this.setState({ signFile: data })
        const {
          fileNameId, 
          fileNameUtility, 
          fileNamePassport, 
          fileNameSign
         } = this.state;
        
          if(fileNameId && fileNameUtility && fileNamePassport && fileNameSign){
          this.setState({ isFileUpload: true})
          }
        }
        )

      .catch(err => console.log(err));
      
      this.setState({ fileNameSign: res[0].name})

      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    
  }

  personalUpdate(){
    const { Email, FirstName, LastName, PhoneNo, DateOfBirth_, state,
      Address,
      AccountNumber,
      Gender,
      lga,
      status, } = this.state;
      
      if(AccountNumber == ""){
          this.setState({ isLoading: false, an: "empty" });
      }else if(Email == ""){
        this.setState({ isLoading: false, em: "empty" });
      }else if(state == "Select State"){
        this.setState({ isLoading: false, tu: "empty" });
      }else if(lga == "Select LGA"){
        this.setState({ isLoading: false, lg: "empty" });
      }else if(Address == ""){
        this.setState({ isLoading: false, add: "empty" });
      }else if(status == ""){
        this.setState({ isLoading: false, stu: "empty" });
      }else if(Gender == ""){
        this.setState({ isLoading: false, ge: "empty" });
      }else{
        this.setState({  personal: false, nextOfKin: true, employeeInfo: false, fileUpload: false })
        this.scrollView.scrollTo({});
        console.log(Email, FirstName, LastName, PhoneNo, DateOfBirth_, state, lga, Address,Gender, status)
      }  
  }

  nextOfKinUpdate(){
    const { 
      NextOfKinAddress,
      NextOfKinEmail,
      NextOfKinFirstName,
      NextOfKinLastName,
      NextOfKinPhoneNumber,
      Relationship,
      NextOfKinGender,
     } = this.state;
       
      if(NextOfKinFirstName == ""){
        this.setState({ isLoading: false, nfn: "empty" });
      }else if(NextOfKinLastName == ""){
        this.setState({ isLoading: false, nln: "empty" });
      }else if(NextOfKinEmail == ""){
        this.setState({ isLoading: false, nem: "empty" });
      }else if(NextOfKinPhoneNumber == ""){
        this.setState({ isLoading: false, npn: "empty" });
      }else if(NextOfKinAddress == ""){
        this.setState({ isLoading: false, nadd: "empty" });
      }else if(NextOfKinGender == ""){
        this.setState({ isLoading: false, nge: "empty" });
      }else if(Relationship == ""){
        this.setState({ isLoading: false, re: "empty" });
      }else{
        this.setState({ personal: false, nextOfKin: false, employeeInfo: true, fileUpload: false })
        this.scrollView.scrollTo({});
      }  
  }

  employeUpdate(){
    const { 
      CompanyAddress, 
      Role, 
      Money, 
      Occupation,
      Company
     } = this.state;
       
      if(Company == ""){
        this.setState({ isLoading: false, co: "empty" });
      }else if(CompanyAddress == ""){
        this.setState({ isLoading: false, ca: "empty" });
      }else if(Occupation == ""){
        this.setState({ isLoading: false, oc: "empty" });
      }else if(Role == ""){
        this.setState({ isLoading: false, ro: "empty" });
      }else if(Money == ""){
        this.setState({ isLoading: false, mo: "empty" });
      }else{
        this.setState({ personal: false, nextOfKin: false, employeeInfo: false, fileUpload: true })
        this.scrollView.scrollTo({});
      }  

  }
  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  };

  onPressSignUp() {
    this.setState({ isLoading: true });
    setClientToken("94aa5c7b-feec-4f30-bd68-df1b405d40e1");

    // {
    //   "TransactionTrackingRef": "012220",
    //   "CustomerID": "006474",
    //   "AccountReferenceNumber": "",
    //   "AccountOpeningTrackingRef": "00000",
    //   "ProductCode": "101",
    //   "LastName": "Lunde",
    //   "FirstName": "Falana",
    //   "OtherNames": "Suleimon",
    //   "AccountName": "Falana Lunde",
    //   "BVN": "23199077754",
    //   "FullName": "string",
    //   "PhoneNo": "09022670086",
    //   "Gender": 0,
    //   "PlaceOfBirth": "Lagos",
    //   "DateOfBirth": "1990-2-13",
    //   "Address": "60, ejigbo road, Lagos",
    //   "NationalIdentityNo": "4155679803",
    //   "NextOfKinPhoneNo": "09038896675",
    //   "NextOfKinName": "Mr Sammy",
    //   "ReferralPhoneNo": "09038896675",
    //   "ReferralName": "Kenny",
    //   "HasSufficientInfoOnAccountInfo": true,
    //   "AccountInformationSource": 0,
    //   "OtherAccountInformationSource": "string",
    //   "AccountOfficerCode": "123",
    //   "AccountNumber": "109986345",
    //   "Email": "orumwensey@gmail.com",
    //   "CustomerImage": "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",
    //   "IdentificationImage": "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",
    //   "IdentificationImageType": 0,
    //   "CustomerSignature": "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",
    //   "NotificationPreference": 0,
    //   "TransactionPermission": 0,
    //   "AccountTier": 3
    // }

    const { 
      Email,
      AccountNumber,
      Address,
      state,
      lga,
      CustomerType,
      AccountOfficerCode,
      Gender, 
      status,
      PlaceOfBirth,
      NationalIdentityNo,
      NextOfKinAddress,
      NextOfKinEmail,
      NextOfKinFirstName,
      NextOfKinLastName,
      NextOfKinPhoneNumber,
      Relationship,
      NextOfKinGender,
      CompanyAddress, 
      idFile,
      utilityFile,
      passportFile,
      signFile,
      Role, 
      Money, 
      Occupation,
      Company,
       } = this.state;

      if(AccountNumber == ""){
        this.setState({ isLoading: false, an: "empty" });
      }else if(Email == ""){
        this.setState({ isLoading: false, em: "empty" });
      }else if(state == "Select State"){
        this.setState({ isLoading: false, tu: "empty" });
      }else if(lga == "Select LGA"){
        this.setState({ isLoading: false, lg: "empty" });
      }else if(Address == ""){
        this.setState({ isLoading: false, add: "empty" });
      }else if(status == ""){
        this.setState({ isLoading: false, stu: "empty" });
      }else if(Gender == ""){
        this.setState({ isLoading: false, ge: "empty" });
      }else if(NextOfKinFirstName == ""){
        this.setState({ isLoading: false, nfn: "empty" });
      }else if(NextOfKinLastName == ""){
        this.setState({ isLoading: false, nln: "empty" });
      }else if(NextOfKinEmail == ""){
        this.setState({ isLoading: false, nem: "empty" });
      }else if(NextOfKinPhoneNumber == ""){
        this.setState({ isLoading: false, npn: "empty" });
      }else if(NextOfKinAddress == ""){
        this.setState({ isLoading: false, nadd: "empty" });
      }else if(NextOfKinGender == ""){
        this.setState({ isLoading: false, nge: "empty" });
      }else if(Relationship == ""){
        this.setState({ isLoading: false, re: "empty" });
      }else if(Company == ""){
        this.setState({ isLoading: false, co: "empty" });
      }else if(CompanyAddress == ""){
        this.setState({ isLoading: false, ca: "empty" });
      }else if(Occupation == ""){
        this.setState({ isLoading: false, oc: "empty" });
      }else if(Role == ""){
        this.setState({ isLoading: false, ro: "empty" });
      }else if(Money == ""){
        this.setState({ isLoading: false, re: "empty" });
      }else if(idFile == ""){
        this.setState({ isLoading: false, idd: "empty" });
      }else if(utilityFile == ""){
        this.setState({ isLoading: false, bi: "empty" });
      }else if(passportFile == ""){
        this.setState({ isLoading: false, pass: "empty" });
      }else if(signFile == ""){
        this.setState({ isLoading: false, si: "empty" });
      }else{
        const FirstName = this.props.navigation.state.params.firstname
        const BVN = this.props.navigation.state.params.bvn
        const LastName = this.props.navigation.state.params.lastname
        const AccountName = ""
        const PhoneNo = this.props.navigation.state.params.phoneno
        const DateOfBirth_ = this.props.navigation.state.params.dob
        const OtherNames = this.props.navigation.state.params.othernames
        const IdentificationImage = idFile
        const CustomerSignature = signFile
        const AccountTier = 3
        const DateOfBirth = moment(DateOfBirth_).format("YYYY-MM-DD")
        const TransactionTrackingRef = "012220"
        const CustomerID = this.props.navigation.state.params.customerID
        const AccountReferenceNumber = ""
        const AccountOpeningTrackingRef = "00000"
        const ProductCode = "101"
        const IdentificationImageType = 0   
      //   Alert.alert("Info: ", this.props.navigation.state.params.phonenum+' Your sign up was successful..', [
      //     {
      //         text: "Ok",
      //         onPress: () => this.props.navigation.push("SignIn", {
      //           token: "token"
      //         }),
      //     },
      // ]);
      
        const payload = { 
          TransactionTrackingRef,
          CustomerID,
          AccountReferenceNumber,
          AccountOpeningTrackingRef,
          ProductCode,
          FirstName,
          LastName,
          AccountName,
          Email,
          PhoneNo,
          AccountNumber,
          Address,
          state,
          lga,
          BVN,
          OtherNames,
          IdentificationImage,
          CustomerSignature,
          DateOfBirth,
          CustomerType,
          AccountOfficerCode,
          Gender, 
          status,
          PlaceOfBirth,
          NationalIdentityNo,
          NextOfKinAddress,
          NextOfKinEmail,
          NextOfKinFirstName,
          NextOfKinLastName,
          NextOfKinPhoneNumber,
          Relationship,
          NextOfKinGender,
          CompanyAddress, 
          idFile,
          utilityFile,
          passportFile,
          signFile,
          Role,  
          Occupation,
          Company,
          AccountOfficerCode,
          Gender,
          AccountTier, 
          IdentificationImageType
          };
      
      console.log(payload);
  
      const onSuccess = ({ data }) => {  
        // this.setState({ isLoading: false, isAuthorized: true });
        console.log(data);
        if (data != null) {
            var that = this;
          setTimeout(function(){  
            that.onPressOnboardSignUp(data)
            }, 1000);
          // this.setState({
          //   item: data,
          //   modalVisible_: true
          // });
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
          Alert.alert('Info: ','Ensure you enter the details required')
        } else if(error.response.status == 500){
          this.setState({ isLoading: false });
          Alert.alert('Info: ','Ensure your Network is Stable')
        } else if(error.response.status == 404){
          this.setState({ isLoading: false });
          Alert.alert('Info: ','Not Found')
        }
        this.setState({ errors: error.response.data, isLoading: false });
      };

    mozfinService
      .post(`/BankOneWebAPI/api/Account/CreateAccountQuick/2?authtoken=94aa5c7b-feec-4f30-bd68-df1b405d40e1`, payload)
      .then(onSuccess)
      .catch(onFailure);
  }
  }

  onPressOnboardSignUp(data) {
    this.setState({ isLoading: true });
    // setClientOnboardToken("94aa5c7b-feec-4f30-bd68-df1b405d40e1");

    const { 
      Email,
      AccountNumber,
      Address,
      state,
      lga,
      CustomerType,
      AccountOfficerCode,
      Gender, 
      status,
      PlaceOfBirth,
      NationalIdentityNo,
      NextOfKinAddress,
      NextOfKinEmail,
      NextOfKinFirstName,
      NextOfKinLastName,
      NextOfKinPhoneNumber,
      Relationship,
      NextOfKinGender,
      CompanyAddress, 
      idFile,
      utilityFile,
      passportFile,
      signFile,
      Role, 
      Money, 
      Occupation,
      Company,
       } = this.state;

      if(AccountNumber == ""){
        this.setState({ isLoading: false, an: "empty" });
      }else if(Email == ""){
        this.setState({ isLoading: false, em: "empty" });
      }else if(state == "Select State"){
        this.setState({ isLoading: false, tu: "empty" });
      }else if(lga == "Select LGA"){
        this.setState({ isLoading: false, lg: "empty" });
      }else if(Address == ""){
        this.setState({ isLoading: false, add: "empty" });
      }else if(status == ""){
        this.setState({ isLoading: false, stu: "empty" });
      }else if(Gender == ""){
        this.setState({ isLoading: false, ge: "empty" });
      }else if(NextOfKinFirstName == ""){
        this.setState({ isLoading: false, nfn: "empty" });
      }else if(NextOfKinLastName == ""){
        this.setState({ isLoading: false, nln: "empty" });
      }else if(NextOfKinEmail == ""){
        this.setState({ isLoading: false, nem: "empty" });
      }else if(NextOfKinPhoneNumber == ""){
        this.setState({ isLoading: false, npn: "empty" });
      }else if(NextOfKinAddress == ""){
        this.setState({ isLoading: false, nadd: "empty" });
      }else if(NextOfKinGender == ""){
        this.setState({ isLoading: false, nge: "empty" });
      }else if(Relationship == ""){
        this.setState({ isLoading: false, re: "empty" });
      }else if(Company == ""){
        this.setState({ isLoading: false, co: "empty" });
      }else if(CompanyAddress == ""){
        this.setState({ isLoading: false, ca: "empty" });
      }else if(Occupation == ""){
        this.setState({ isLoading: false, oc: "empty" });
      }else if(Role == ""){
        this.setState({ isLoading: false, ro: "empty" });
      }else if(Money == ""){
        this.setState({ isLoading: false, re: "empty" });
      }else if(idFile == ""){
        this.setState({ isLoading: false, idd: "empty" });
      }else if(utilityFile == ""){
        this.setState({ isLoading: false, bi: "empty" });
      }else if(passportFile == ""){
        this.setState({ isLoading: false, pass: "empty" });
      }else if(signFile == ""){
        this.setState({ isLoading: false, si: "empty" });
      }else{
        const FirstName = this.props.navigation.state.params.firstname
        const BVN = this.props.navigation.state.params.bvn
        const LastName = this.props.navigation.state.params.lastname
        const AccountName = ""
        const PhoneNo = this.props.navigation.state.params.phoneno
        const DateOfBirth_ = this.props.navigation.state.params.dob
        const OtherNames = this.props.navigation.state.params.othernames
        const IdentificationImage = idFile
        const CustomerSignature = signFile
        const AccountTier = 3
        const DateOfBirth = moment(DateOfBirth_).format("YYYY-MM-DD")
        const TransactionTrackingRef = "012220"
        const AccountReferenceNumber = ""
        const AccountOpeningTrackingRef = "00000"
        const ProductCode = "101"
        const IdentificationImageType = 0   
      //   Alert.alert("Info: ", this.props.navigation.state.params.phonenum+' Your sign up was successful..', [
      //     {
      //         text: "Ok",
      //         onPress: () => this.props.navigation.push("SignIn", {
      //           token: "token"
      //         }),
      //     },
      // ]);


    //   {
    //     "tier": "1",
    //     "password": "password123",
    //     "isAdmin": false,
    //     "isSuperAdmin": false,
    //     "isActive": false,
    //     "isApproved": false,
    //     "token": "",
    //     "transactionPIN": "",
    //     "id": 8,
    //     "firstname": "Chika",
    //     "lastname": "Okoye",
    //     "phone": "08123456789",
    //     "email": "chikao@gmail.com",
    //     "customerID": "006491",
    //     "updatedAt": "2022-08-18T11:34:16.921Z",
    //     "createdAt": "2022-08-18T11:34:16.921Z"
    // }
        
        const tier = 3
        const accountNumber = AccountNumber
        const customerID = this.props.navigation.state.params.customerID

        const payload = { 
          accountNumber,
          customerID,
          tier
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
          Alert.alert('Info: ','Ensure you enter the details required')
        } else if(error.response.status == 500){
          this.setState({ isLoading: false });
          Alert.alert('Info: ','Ensure your Network is Stable')
        } else if(error.response.status == 404){
          this.setState({ isLoading: false });
          Alert.alert('Info: ','Not Found')
        }
        this.setState({ errors: error.response.data, isLoading: false });
      }; 
      console.log("Meeeeesesffcvbvbnbnbjnjhhffx", `/api/v1/auth/updateUser/${this.props.navigation.state.params.id}`)
    mozfinOnboardingService
      .put(`/api/v1/auth/updateUser/${this.props.navigation.state.params.id}`, payload)
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
    // this.showStartMode('date');
    };

  componentWillMount = ()=> {
    console.log("I don mount o");
  }

  componentDidMount(){
   }

    visibleView(){
      this.setState({ view: true, modalVisible_: false });
      if(this.props.navigation.state.params.screen == ""){
      this.props.navigation.push("OTPCodeOption", {
                  tier: "3",
                  id: this.props.navigation.state.params.id,
                  phone: this.props.navigation.state.params.phoneno,
                  email: this.state.Email
                });
      }else{
        this.props.navigation.push("AccountInfo", {
          tier: "3"
        });
      }
    } 
    
  render() {
    LogBox.ignoreAllLogs(true);
    const { modeDateOfBirth, DateOfBirthShow, isPersonal, personal, nextOfKin, employeeInfo, fileUpload, Email, isNextOfKin, isFileUpload, isEmployeeInfo,
      lga, 
      state, status, 
      Address,Gender } = this.state;
      
    return (
        <ScrollView
          style={styles.scrollView}
          ref={scrollView => this.scrollView = scrollView} keyboardShouldPersistTaps="always">
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
                {" "}Your set up was successful..{" "}Click to "Proceed"{" \n** Few steps remaining **"}
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

            {personal && 
            <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Personal Information</Text>
            <Text style={styles.infooTextStyle}>Please update your personal Information to proceed</Text>

            <View style={styles.emailTextStyleView_}>
              <Text style={{
                fontSize: 12,
                color: this.state.fn == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>First Name</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor= "#C4C4C450"
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
                color={"#000"}
                underlineColorAndroid="transparent"
                autoCapitalize="sentences"
                returnKeyType="next"
                keyboardType="text"
                editable={false}
                onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
                blurOnSubmit={false}        
                value={this.state.FirstName == "" ? this.props.navigation.state.params.firstname : this.state.FirstName}        
                onChangeText={(value) => this.handleFirstname(value)}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
                </View>
                  <View 
                    style={{ alignSelf: "flex-end", right: 15, top: 20, opacity: 0.7, position: "absolute" }}>
                    <LockSmallIcon/>
                  </View>
              </View>
              
              {this.state.fn == "empty" && this.state.FirstName == "" && <Text style={styles.invalidPasswordTextStyle}>First name is empty</Text>}

            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.ln == "empty" ? 'red' : "#002A14",
                fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Last Name</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor= "#C4C4C450"
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
                editable={false}
                color={"#000"}
                underlineColorAndroid="transparent"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() => { this.otherNameTextInput.focus(); }}
                blurOnSubmit={false}                
                ref={(input) => { this.lastNameTextInput = input; }}
                value={this.state.LastName == "" ? this.props.navigation.state.params.lastname : this.state.LastName}        
                onChangeText={this.handleLastname}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
                </View>
                <View 
                  style={{ alignSelf: "flex-end", right: 15, top: 20, opacity: 0.7, position: "absolute" }}>
                  <LockSmallIcon/>
                </View>
              </View>
              
              {this.state.ln == "empty" && this.state.LastName == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter your last name</Text>}

            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.on == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Other Names</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor= "#C4C4C450"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.on == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                color={"#000"}
                editable={false}
                onSubmitEditing={() => { this.emailTextInput.focus(); }}
                blurOnSubmit={false}                
                ref={(input) => { this.otherNameTextInput = input; }}
                value={this.state.OtherNames == "" ? this.props.navigation.state.params.othernames : this.state.OtherNames}
                onChangeText={this.handleOthername}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
                </View>
                <View 
                    style={{ alignSelf: "flex-end", right: 15, top: 20, opacity: 0.7, position: "absolute" }}>
                    <LockSmallIcon/>
                </View>
              </View>
              
              {this.state.on == "empty" && this.state.OtherNames == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter your other names</Text>}

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
                fontWeight: "600",
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
                backgroundColor= "#C4C4C450"
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
                color={"#000"}
                underlineColorAndroid="transparent"
                autoCapitalize="sentences"
                keyboardType="number-pad"
                returnKeyType="next"
                editable={false}
                maxLength={11}
                onSubmitEditing={() => { this.dobTextInput.focus(); }}
                blurOnSubmit={false}
                ref={(input) => { this.PhoneNoTextInput = input; }}
                value={this.state.PhoneNo == "" ? this.props.navigation.state.params.phoneno : this.state.PhoneNo}
                onChangeText={this.handlePhoneNo}
              />
              </View>              
              <View      
                  style={styles.iconViewStyle}>
                <PhoneIcon/>
              </View>
              <View 
                style={{ alignSelf: "flex-end", right: 15, top: 20, opacity: 0.7, position: "absolute" }}>
                <LockSmallIcon/>
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
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,
              }}>Date of Birth</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
                <View onPress={this.showDateOfBirthPicker.bind(this)}>
                <TextInput
                  backgroundColor= "#C4C4C450"
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
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() => { this.AddressTextInput.focus(); }}
                  blurOnSubmit={false}                
                  // placeholder={this.props.navigation.state.params.dob != "dd/mm/yyyy" ? this.props.navigation.state.params.dob : "Choose year"}
                  placeholderTextColor={"#000"}
                  color={"#000"}
                  editable={false}
                  ref={(input) => { this.dobTextInput = input; }}
                  value={this.state.DateOfBirth_ == "dd/mm/yyyy" ? this.props.navigation.state.params.dob : this.state.DateOfBirth_}
                  onChangeText={this.handleDateOfBirth}
                />
              <View      
                  style={styles.iconViewStyle}>
                <DobIcon/>
              </View>
              <View 
                style={{ alignSelf: "flex-end", right: 15, top: 20, opacity: 0.7, position: "absolute" }}>
                <LockSmallIcon/>
              </View>
                </View>
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
              <Text style={{
                fontSize: 12,
                color: this.state.an == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Account Number</Text>
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
                borderColor={this.state.an == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                onSubmitEditing={() => { this.PhoneNoTextInput.focus(); }}
                blurOnSubmit={false}                
                keyboardType="numeric"
                maxLength={10}
                ref={(input) => { this.emailTextInput = input; }}
                value={this.state.AccountNumber}
                onChangeText={this.handleAccountNumber}
              />
              <MaterialCommunityIcons
                  name={"numeric"}  
                  color={"#B2BE35"}    
                  style={styles.numIconViewStyle}/>
              </View>
              {this.state.an == "empty" && this.state.AccountNumber == "" && <Text style={styles.invalidPasswordTextStyle}>Account Number is empty</Text>}
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
                fontWeight: "600",
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
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() => { this.AddressTextInput.focus(); }}
                blurOnSubmit={false}                
                keyboardType="email-address"
                ref={(input) => { this.PhoneNoTextInput = input; }}
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
            <Text style={{fontSize: 12,
                color: this.state.tu == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Select State</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <Dropdown
                  value={this.state.state}
                  data={this.state.stateList}
                  baseColor={"transparent"}
                  textColor={"#000"}
                  fontSize={15}
                  selectedItemColor={"grey"}
                  itemPadding={8}
                  itemTextStyle={{ marginLeft: 20, }}
                  dropdownMargins={{ min:8, max:6 }}
                  overlayStyle={{bottom: 10, alignSelf: "center"}}
                  dropdownOffset={{top: 12, left: 0}}
                  containerStyle={{
                  borderColor: this.state.tu == "empty" ? 'red' : "#B2BE35",
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  paddingLeft: 53,
                  height: 56,
                  alignSelf: "center",
                  width: width * 0.81,}}
                  onChangeText={(value) => this.handleState(value)}
                />
                <View
                  style={styles.dropDownIconViewStyle}>
                    <AddressIcon/>
                  </View>
                  <AntDesign
                    name="down"
                    color="grey"
                    style={{ alignSelf: "flex-end", right: 20, top: 24, opacity: 0.7, position: "absolute" }}
                    size={16}/>
                  {/* <View 
                    style={{ alignSelf: "flex-end", right: 0, top: 24, opacity: 0.7, position: "absolute" }}>
                  <ADIcon/>
                  </View> */}
                </View>
                {this.state.tu == "empty" && this.state.state == "Select State" && <Text style={styles.invalidPasswordTextStyle}>Please select a State..</Text>}
              </View>

              <View style={styles.emailTextStyleView}>
            <Text style={{fontSize: 12,
                color: this.state.lg == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Select Local Government</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <Dropdown
                  value={this.state.lga}
                  data={this.state.lgaList}
                  baseColor={"transparent"}
                  textColor={"#000"}
                  fontSize={15}
                  selectedItemColor={"grey"}
                  itemPadding={8}
                  itemTextStyle={{ marginLeft: 20, }}
                  dropdownMargins={{ min:8, max:6 }}
                  overlayStyle={{bottom: 10, alignSelf: "center"}}
                  dropdownOffset={{top: 12, left: 0}}
                  containerStyle={{
                    borderColor: this.state.lg == "empty" ? 'red' : "#B2BE35",
                    backgroundColor: "#FFF",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    paddingLeft: 53,
                    height: 56,
                    alignSelf: "center",
                    width: width * 0.81,}}
                  onChangeText={(value) => this.handleLga(value)}
                />
                <View
                  style={styles.dropDownIconViewStyle}>
                    <LgaIcon/>
                  </View>
                  <AntDesign
                  name="down"
                  color="grey"
                  style={{ alignSelf: "flex-end", right: 20, top: 24, opacity: 0.7, position: "absolute" }}
                  size={16}/>
                </View>
                {this.state.lg == "empty" && this.state.lga == "Select LGA" && <Text style={styles.invalidPasswordTextStyle}>Please select an LGA..</Text>}
              </View>

              <View style={styles.emailTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.add == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Residential Address</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.add == "empty" ? 'red' : "#B2BE35"}
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
                ref={(input) => { this.AddressTextInput = input; }}
                value={this.state.Address}
                onChangeText={this.handleAddress}
              />
              <View      
                  style={styles.iconViewStyle}>
                <HouseIcon/>
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
              {this.state.add == "empty" && this.state.Address == "" && <Text style={styles.invalidPasswordTextStyle}>Address field is empty</Text>}
            </View>

            <View style={styles.genderTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.stu == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Marital status</Text>
              <View style={{ alignSelf: "flex-start", marginStart: 10, }}>
                <RadioForm
                  formHorizontal={true}
                  animation={true}
                  radio_props={this.status_props}
                  buttonColor={'#002A14'}
                  selectedButtonColor={'#002A14'}
                  buttonSize={10}
                  labelColor={'#002A14'}
                  labelHorizontal={true}
                  labelStyle={{fontSize: 12, color: '#000', fontFamily: "Nunito_400Regular", left: -3, marginEnd: 5 }}
                  initial={null}
                  value={this.state.status}
                  buttonStyle={{ borderWidth: 1, borderColor: "#002A14", backgroundColor: "#002A14" }}
                  onPress={(value) => {
                      this.handleMaritalStatus(value)
                  }}>
                    <RadioButtonInput
                      borderWidth={0.5}
                      buttonStyle={{ borderWidth: 0.5, borderColor: "grey", backgroundColor: "#002A14" }}/>
         
                  </RadioForm>

                </View>
              {this.state.stu == "empty" && this.state.status == "" && <Text style={styles.invalidPasswordTextStyle}>Please select an option</Text>}
            </View>

              <View style={styles.genderTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.ge == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Gender</Text>
              <View style={{ alignSelf: "flex-start", marginStart: 10, }}>
                <RadioForm
                  formHorizontal={true}
                  animation={true}
                  radio_props={this.radio_props}
                  style={styles.radioStyle}
                  buttonColor={'#002A14'}
                  selectedButtonColor={'#002A14'}
                  buttonSize={10}
                  labelColor={'#002A14'}
                  labelHorizontal={true}
                  labelStyle={{fontSize: 12, color: '#000', fontFamily: "Nunito_400Regular", left: -3, marginEnd: 5 }}
                  initial={this.state.Gender}
                  // value={this.state.status}
                  buttonStyle={{ borderWidth: 1, borderColor: "#002A14", backgroundColor: "#002A14" }}
                  onPress={(value) => {
                      this.handleGender(value)
                  }}>
                    <RadioButtonInput
                      borderWidth={0.5}
                      buttonStyle={{ borderWidth: 0.5, borderColor: "#002A14", backgroundColor: "#002A14" }}/>
         
                  </RadioForm>

                </View>
              {this.state.ge == "empty" && this.state.Gender == "" && <Text style={styles.invalidPasswordTextStyle}>Please select an option</Text>}
            </View>

            {/* <View flexDirection={"row"} marginTop={8} left={-15}>
              <CheckBox
                checkedIcon={<CheckOpenIcon />}
                uncheckedIcon={<CheckCloseIcon
                                  red={this.state.ch == "empty" ? "red": ""} />}
                checked={isChecked}
                onPress={() =>this.setState({ isChecked: !isChecked })}
                />
                <Text style={{color: "#002A14", fontWeight: "100", fontSize: 12, width: width * 0.65, textAlign: "left", top: 20, left: -10 }}>I agree to the{" "}
                <Text style={{color: "#002A14", fontWeight: "100", fontSize: 12, width: width * 0.8, textAlign: "left", textDecorationLine: "underline", textDecorationColor: "#111A30"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>Terms and Conditions</Text>
                </Text> 
              </View> */}
            <View flexDirection={"row"} marginTop={8}>
            <View style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: "transparent", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
            </View> 
            <TouchableOpacity
                onPress={()=> { this.personalUpdate()}}
                style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: !isPersonal ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
                <Text style={styles.loginButtonText}>NEXT</Text>
            </TouchableOpacity>
            </View>
            </View>}



            {nextOfKin && <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Next Of Kin Information</Text>
            <Text style={styles.infooTextStyle}>Please update your next of kin details  to proceed</Text>

            <View style={styles.emailTextStyleView_}>
              <Text style={{
                fontSize: 12,
                color: this.state.nfn == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Next Of Kin First Name</Text>

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
                borderColor={this.state.nfn == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                keyboardType="text"
                onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
                blurOnSubmit={false}                
                value={this.state.NextOfKinFirstName}
                onChangeText={this.handleNextOfKinFirstname}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
              </View>
              </View>
              
              {this.state.nfn == "empty" && this.state.NextOfKinFirstName == "" && <Text style={styles.invalidPasswordTextStyle}>Next of Kin First name is empty</Text>}

            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.nln == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Next Of Kin Last Name</Text>

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
                borderColor={this.state.nln == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                onSubmitEditing={() => { this.emailTextInput.focus(); }}
                blurOnSubmit={false}                
                ref={(input) => { this.lastNameTextInput = input; }}
                value={this.state.NextOfKinLastName}
                onChangeText={this.handleNextOfKinLastname}
              />
                <View      
                  style={styles.iconViewStyle}>
                <UserIcon/>
              </View>
              </View>
              
              {this.state.nln == "empty" && this.state.NextOfKinLastName == "" && <Text style={styles.invalidPasswordTextStyle}>Please enter Next of Kin's last name</Text>}

            </View>

            <View style={{
                fontSize: 12,
                color: this.state.nem == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>
              <Text style={{
                fontSize: 12,
                color: this.state.nem == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Next Of Kin Email</Text>
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
                borderColor={this.state.nem == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                onSubmitEditing={() => { this.PhoneNoTextInput.focus(); }}
                blurOnSubmit={false}                
                keyboardType="email-address"
                ref={(input) => { this.emailTextInput = input; }}
                value={this.state.NextOfKinEmail}
                onChangeText={this.handleNextOfKinEmail}
              />
              <View      
                  style={styles.iconViewStyle}>
                <EmailIcon/>
              </View>
              </View>
              {this.state.nem == "empty" && this.state.NextOfKinEmail == "" && <Text style={styles.invalidPasswordTextStyle}>Next of Kin Email is empty</Text>}
            </View>
            
            <View style={{
                fontSize: 12,
                color: this.state.npn == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>
              <Text style={{
                fontSize: 12,
                color: this.state.npn == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Next Of Kin Phone Number</Text>
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
                borderColor={this.state.npn == "empty" ? 'red' : "#B2BE35"}
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
                autoCapitalize="sentences"
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => { this.AddressTextInput.focus(); }}
                blurOnSubmit={false}
                maxLength={11}
                ref={(input) => { this.PhoneNoTextInput = input; }}
                value={this.state.NextOfKinPhoneNumber}
                onChangeText={this.handleNextOfKinPhoneNo}
              />
              </View>              
              <View      
                  style={styles.iconViewStyle}>
                <PhoneIcon/>
              </View>
              </View>
              {this.state.npn == "empty" && this.state.NextOfKinPhoneNumber == "" && <Text style={styles.invalidPasswordTextStyle}>Next of Kin's phone number does not exist</Text>}
            </View>

    
              <View style={styles.emailTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.nadd == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Next Of Kin Address</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.nadd == "empty" ? 'red' : "#B2BE35"}
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
                ref={(input) => { this.AddressTextInput = input; }}
                value={this.state.NextOfKinAddress}
                onChangeText={this.handleNextOfKinAddress}
              />
              <View      
                  style={styles.iconViewStyle}>
                <HouseIcon/>
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
              {this.state.nadd == "empty" && this.state.NextOfKinAddress == "" && <Text style={styles.invalidPasswordTextStyle}>Next of kin Address field is empty</Text>}
            </View>

              <View style={styles.genderTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.nge == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Next Of Kin Gender</Text>
              <View style={{ alignSelf: "flex-start", marginStart: 10, top: 5}}>
                <RadioForm
                  formHorizontal={true}
                  animation={true}
                  radio_props={this.radio_props}
                  style={styles.radioStyle}
                  buttonColor={'#002A14'}
                  selectedButtonColor={'#002A14'}
                  buttonSize={10}
                  labelColor={'#002A14'}
                  labelHorizontal={true}
                  labelStyle={{fontSize: 12, color: '#000', fontFamily: "Nunito_400Regular", left: -3, marginEnd: 5 }}
                  initial={null}
                  buttonStyle={{ borderWidth: 1, borderColor: "#002A14", backgroundColor: "#002A14" }}
                  onPress={(value) => {
                      this.handleNextOfKinGender(value);
                  }}>
                    <RadioButtonInput
                      borderWidth={0.5}
                      buttonStyle={{ borderWidth: 0.5, borderColor: "#002A14", backgroundColor: "#002A14" }}/>
         
                  </RadioForm>

                </View>
              {this.state.nge == "empty" && this.state.NextOfKinGender == "" && <Text style={styles.invalidPasswordTextStyle}>Please select an option</Text>}
            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.re == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Relationship with Next Of Kin</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.re == "empty" ? 'red' : "#B2BE35"}
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
                value={this.state.Relationship}
                onChangeText={this.handleRelationship}
              />
              <View      
                  style={styles.iconViewStyle}>
                <RelationIcon/>
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
              {this.state.re == "empty" && this.state.Relationship == "" && <Text style={styles.invalidPasswordTextStyle}>Relationship field is empty</Text>}
            </View>
           
            <View flexDirection={"row"} marginTop={8}>
            <TouchableOpacity onPress={()=> { this.setState({ personal: true, nextOfKin: false, employeeInfo: false, fileUpload: false })
                this.scrollView.scrollTo({});}} style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: "transparent", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
            <Text style={styles.backLoginButtonText}>BACK</Text>
            </TouchableOpacity> 
            <TouchableOpacity
                onPress={()=> this.nextOfKinUpdate()}
                style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: !isNextOfKin ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
                <Text style={styles.loginButtonText}>NEXT</Text>
            </TouchableOpacity>
            </View>
            </View>}



            {employeeInfo && <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>Employment Information</Text>
            <Text style={styles.infooTextStyle}>Please update your employment details  to proceed</Text>

            <View style={styles.emailTextStyleView_}>
              <Text style={{
                fontSize: 12,
                color: this.state.co == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Name of Company</Text>

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
                borderColor={this.state.co == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                keyboardType="text"
                onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
                blurOnSubmit={false}                
                value={this.state.Company}
                onChangeText={this.handleCompany}
              />
                <View      
                  style={styles.iconViewStyle}>
                <CompanyIcon />
              </View>
              </View>
              
              {this.state.co == "empty" && this.state.Company == "" && <Text style={styles.invalidPasswordTextStyle}>Company is empty</Text>}

            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.ca == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Company Address</Text>

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
                borderColor={this.state.ca == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                onSubmitEditing={() => { this.emailTextInput.focus(); }}
                blurOnSubmit={false}                
                ref={(input) => { this.lastNameTextInput = input; }}
                value={this.state.CompanyAddress}
                onChangeText={this.handleCompanyAddress}
              />
                <View      
                  style={styles.iconViewStyle}>
                <LocationIcon />
              </View>
              </View>
              
              {this.state.ca == "empty" && this.state.CompanyAddress == "" && <Text style={styles.invalidPasswordTextStyle}>Company Address is empty</Text>}
            </View>

            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.oc == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Occupation</Text>
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
                borderColor={this.state.oc == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                onSubmitEditing={() => { this.PhoneNoTextInput.focus(); }}
                blurOnSubmit={false}                
                ref={(input) => { this.emailTextInput = input; }}
                value={this.state.Occupation}
                onChangeText={this.handleOccupation}
              />
              <View      
                  style={styles.iconViewStyle}>
                <OccupationIcon />
              </View>
              </View>
              {this.state.oc == "empty" && this.state.Occupation == "" && <Text style={styles.invalidPasswordTextStyle}>Occupation is empty</Text>}
            </View>
            
            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.ro == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Role</Text>
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
                borderColor={this.state.ro == "empty" ? 'red' : "#B2BE35"}
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
                returnKeyType="next"
                autoCapitalize="sentences"
                onSubmitEditing={() => { this.moneyTextInput.focus() }}
                blurOnSubmit={false}
                ref={(input) => { this.PhoneNoTextInput = input; }}
                value={this.state.Role}
                onChangeText={this.handleRole}
              />
              </View>              
              <View      
                  style={styles.iconViewStyle}>
                <RoleIcon />
              </View>
              </View>
              {this.state.ro == "empty" && this.state.Role == "" && <Text style={styles.invalidPasswordTextStyle}>Role is empty</Text>}
            </View>

    
              <View style={styles.emailTextStyleView}>
              <Text style={{fontSize: 12,
                color: this.state.mo == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Monthly Net Income</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
                <NumberFormat
                value={this.state.Money}
                displayType={'text'}
                thousandSeparator={true}
                // prefix={'₦'}
                renderText={formattedValue => <TextInput
                  backgroundColor = "#FFF"
                  borderWidth = {1}
                  borderColor={this.state.mo == "empty" ? 'red' : "#B2BE35"}
                  width= {width * 0.81}
                  height= {56}
                  borderRadius= {10}
                  paddingTop = {8}
                  paddingBottom = {8}
                  paddingStart ={54}
                  paddingEnd= {22}
                  opacity= {1}
                  underlineColorAndroid="transparent"
                  keyboardType="number-pad"
                  ref={(input) => { this.moneyTextInput = input; }}
                  value={formattedValue}
                  onChangeText={this.handleMoney}
                />} // <--- e.g. N1,000...
                            />
              
              <View      
                  style={styles.iconViewStyle}>
                <MoneyIcon />
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
              {this.state.mo == "empty" && this.state.Money == "" && <Text style={styles.invalidPasswordTextStyle}>Money Net Income is empty</Text>}
            </View>

            <View flexDirection={"row"} marginTop={8}>
            <TouchableOpacity onPress={()=> { this.setState({ personal: false, nextOfKin: true, employeeInfo: false, fileUpload: false })
                this.scrollView.scrollTo({});}} style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: "transparent", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
            <Text style={styles.backLoginButtonText}>BACK</Text>
            </TouchableOpacity> 
            <TouchableOpacity
                onPress={this.employeUpdate.bind(this)}
                style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: !isEmployeeInfo ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
                <Text style={styles.loginButtonText}>NEXT</Text>
            </TouchableOpacity>
            </View>
            </View>}


            {fileUpload && <View style={styles.cardStyleLong}>
            <Text style={styles.welcomeTextStyle}>One More To Go!</Text>
            <Text style={styles.infooTextStyle_}>Please provide the following details to finalize registration</Text>
              
            <View style={styles.uploadTextStyleView_}>
              <View style={{
                  borderColor: this.state.idd == "empty" ? 'red' : "transparent",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: width * 0.88,
                  paddingBottom: 10}}>
              <Text style={{
                fontSize: 12,
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingLeft: 15,
                color: "#002A14",
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,
                marginTop: 10,}}>Upload A Governement Issued Identity</Text>
                <View
                    style={{
                    backgroundColor: '#B2BE35',
                    height: 1,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center",
                }} />

              <View style={{
                padding: 1,
                alignSelf: "center",
              }}>
                <Text style={{
                fontSize: 12,
                color: this.state.idd == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 10,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,}}>Select Identification type</Text>

                <Dropdown
                  value={this.state.id}
                  data={this.state.idList}
                  baseColor={"transparent"}
                  textColor={"#C4C4C4"}
                  fontSize={15}
                  selectedItemColor={"grey"}
                  itemPadding={8}
                  itemTextStyle={{ marginLeft: 20, fontSize: 10, }}
                  dropdownMargins={{ min:8, max:6 }}
                  overlayStyle={{bottom: 10, alignSelf: "center"}}
                  dropdownOffset={{top: 10, left: 0}}
                  containerStyle={{
                  borderColor: this.state.idd == "empty" ? 'red' : "#B2BE35",
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                  borderRadius: 6,
                  marginHorizontal: 10,
                  paddingLeft: 10,
                  height: 30,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: width * 0.80,}}
                  onChangeText={(value) => this.handleId(value)}
                />
                  <AntDesign
                    name="down"
                    color="grey"
                    style={{ alignSelf: "flex-end", right: 20, top: 28, opacity: 0.7, position: "absolute" }}
                    size={16}/>
                    <View style={{ flexDirection: "row", marginTop: 10, }}>
                    <TouchableOpacity onPress={this.selectFileId.bind(this)} style={{ borderWidth: 1, borderRadius: 8, borderColor: "#002A14", width: 117, height: 24, marginLeft: 15 }}>
                    <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, padding: 5, }}>Choose file</Text>
                    </TouchableOpacity>

                    {this.state.fileNameId == "" ? <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5 }}>No file selected yet</Text> : <Text style={{ color:"#002A14", fontSize: 10, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5, width: 130, marginEnd: 20 }}>{this.state.fileNameId}</Text>}
                    </View>
                    <View style={{ alignSelf: "flex-start" }}>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 10 }}>*File format supported: pdf, jpg, png</Text>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 6 }}>*Maximum file size: 2Mb</Text>
                    </View>
              </View>

              
              {this.state.idd == "empty" && this.state.id == "Select Identification type" && <Text style={styles.uploadInvalidPasswordTextStyle}>Select an Identification type</Text>}
              </View>
            </View>

            <View style={styles.uploadTextStyleView}>
            <View style={{
                  borderColor: this.state.bi == "empty" ? 'red' : "transparent",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: width * 0.88,
                  paddingVertical: 10}}>
            <Text style={{
                fontSize: 12,
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingLeft: 15,
                opacity: 1,
                color: "#002A14",
                fontWeight: "600",
                lineHeight: 14.4,}}>Upload Most Recent Utility Bill</Text>
                <View
                    style={{
                    backgroundColor: '#B2BE35',
                    height: 1,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center",
                }} />

              <View style={{
                padding: 1,
                alignSelf: "center",
              }}>
                <Text style={{
                fontSize: 12,
                color: this.state.bi == "empty" ? 'red' : "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 10,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,}}>Select Utility bill type</Text>

                <Dropdown
                  value={this.state.bill}
                  data={this.state.billList}
                  baseColor={"transparent"}
                  textColor={"#C4C4C4"}
                  fontSize={15}
                  selectedItemColor={"grey"}
                  itemPadding={8}
                  itemTextStyle={{ marginLeft: 20, fontSize: 10, }}
                  dropdownMargins={{ min:8, max:6 }}
                  overlayStyle={{bottom: 10, alignSelf: "center"}}
                  dropdownOffset={{top: 10, left: 0}}
                  containerStyle={{
                  borderColor: this.state.bi == "empty" ? 'red' : "#B2BE35",
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                  borderRadius: 6,
                  marginHorizontal: 10,
                  paddingLeft: 10,
                  height: 30,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: width * 0.80,}}
                  onChangeText={(value) => this.handleBill(value)}
                />
                  <AntDesign
                    name="down"
                    color="grey"
                    style={{ alignSelf: "flex-end", right: 20, top: 28, opacity: 0.7, position: "absolute" }}
                    size={16}/>
                    <View style={{ flexDirection: "row", marginTop: 10, }}>
                    <TouchableOpacity onPress={this.selectFileUtility.bind(this)} style={{ borderWidth: 1, borderRadius: 8, borderColor: "#002A14", width: 117, height: 24, marginLeft: 15 }}>
                    <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, padding: 5, }}>Choose file</Text>
                    </TouchableOpacity>

                    {this.state.fileNameUtility == "" ? <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5 }}>No file selected yet</Text> : <Text style={{ color:"#002A14", fontSize: 10, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5, width: 130, marginEnd: 20 }}>{this.state.fileNameUtility}</Text>}
                    </View>
                    <View style={{ alignSelf: "flex-start" }}>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 10 }}>*File format supported: pdf, jpg, png</Text>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 6 }}>*Maximum file size: 2Mb</Text>
                    </View>
              </View>

              
              {/* {this.state.bi == "empty" && this.state.bill == "Select bill type" && <Text style={styles.invalidPasswordTextStyle}>Please select a bill type</Text>} */}
              </View>
            </View>

            <View style={styles.uploadTextStyleView}>
            <View style={{
                  borderColor: this.state.pass == "empty" ? 'red' : "transparent",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: width * 0.88,
                  paddingVertical: 10}}>
              <Text style={{
                fontSize: 12,
                color: "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingLeft: 15,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,}}>Upload Your Passport</Text>
                <View
                    style={{
                    backgroundColor: '#B2BE35',
                    height: 1,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center",
                }} />

              <View style={{
                padding: 1,
                alignSelf: "flex-start",
              }}>
                    <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={this.selectFilePassport.bind(this)} style={{ borderWidth: 1, borderRadius: 8, borderColor: "#002A14", width: 117, height: 24, marginLeft: 20 }}>
                    <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, padding: 5, }}>Choose file</Text>
                    </TouchableOpacity>

                    {this.state.fileNamePassport == "" ? <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5 }}>No file selected yet</Text> : <Text style={{ color:"#002A14", fontSize: 10, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5, width: 130, marginEnd: 20 }}>{this.state.fileNamePassport}</Text>}
                    </View>
                    <View style={{ alignSelf: "flex-start", marginLeft: 10  }}>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 10 }}>*File format supported: pdf, jpg, png</Text>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 6 }}>*Maximum file size: 2Mb</Text>
                    </View>
              </View>

              
              {/* {this.state.fn == "empty" && this.state.FirstName == "" && <Text style={styles.invalidPasswordTextStyle}>First name is empty</Text>} */}
              </View>
            </View>
            
            <View style={styles.uploadTextStyleVieww_}>
            <View style={{
                  borderColor: this.state.si == "empty" ? 'red' : "transparent",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: width * 0.88,
                  paddingVertical: 10}}>
            <Text style={{
                fontSize: 12,
                color: "#002A14",
                // fontFamily: "JosefinSans-Bold",
                textAlign: "left",
                paddingLeft: 15,
                opacity: 1,
                fontWeight: "600",
                lineHeight: 14.4,}}>Upload Your Signature</Text>
                <View
                    style={{
                    backgroundColor: '#B2BE35',
                    height: 1,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center",
                }} />

              <View style={{
                padding: 1,
                alignSelf: "flex-start",
              }}>
                    <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={this.selectFileSign.bind(this)} style={{ borderWidth: 1, borderRadius: 8, borderColor: "#002A14", width: 117, height: 24, marginLeft: 20 }}>
                    <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, padding: 5, }}>Choose file</Text>
                    </TouchableOpacity>

                    {this.state.fileNameSign == "" ? <Text style={{ color:"#002A14", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5 }}>No file selected yet</Text> : <Text style={{ color:"#002A14", fontSize: 10, textAlign: "center", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, margin: 5, width: 130, marginEnd: 20 }}>{this.state.fileNameSign}</Text>}
                    </View>
                    <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 10 }}>*File format supported: pdf, jpg, png</Text>
                    <Text style={{ color:"#8C8C8C", fontSize: 12, textAlign: "left", fontWeight: "400", lineHeight: 14.4, marginLeft: 10, marginTop: 6 }}>*Maximum file size: 2Mb</Text>
                    </View>
              </View>
              </View>
            </View>
            
            <View flexDirection={"row"} marginTop={8}>
            <TouchableOpacity onPress={()=> { this.setState({ personal: false, nextOfKin: false, employeeInfo: true, fileUpload: false })
                this.scrollView.scrollTo({});}} style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: "transparent", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
            <Text style={styles.backLoginButtonText}>BACK</Text>
            </TouchableOpacity> 
            <TouchableOpacity
                onPress={this.onPressSignUp.bind(this)}
                style={{alignSelf: "flex-end", width: width * 0.41, height: 40, backgroundColor: !isFileUpload ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 30 }}>
                <Text style={styles.loginButtonText}>SUBMIT</Text>
            </TouchableOpacity>
            </View>
            </View>}
            </View>
        </ScrollView>
    );
  }
}


export default UpdateUserDetailsScreen;

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
  infooTextStyle: {
    fontSize: 12,
    lineHeight: 15.6,
    color: "#838E08",
    marginTop: 8,
    opacity: 1,
    marginHorizontal: 30,
    fontWeight: "600",
    fontFamily: "JosefinSans-Bold",
    textAlign: "center",
  },
  infooTextStyle_: {
    fontSize: 12,
    lineHeight: 15.6,
    color: "#838E08",
    marginTop: 8,
    opacity: 1,
    marginHorizontal: 20,
    fontWeight: "600",
    fontFamily: "JosefinSans-Bold",
    textAlign: "center",
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
  detailsHeaderTextStyle: {
    fontSize: 18,
    color: "#FFF",
    backgroundColor: "#B2BE35",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 25,
    fontWeight: "700",
    opacity: 1,
    width: width * 0.80
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
  numIconViewStyle: {
    fontSize: 24,
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
  dropDownIconViewStyle: {
    fontSize: 20,
    bottom: 56,
    right: 0.5,
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
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 27,
    alignSelf: "center",
    width: width * 0.9,
    padding: 15,
    color: "#ffffff",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowopacity: 0.2,
    elevation: 3
  },
  dropDownInput: {
    borderColor: "#B2BE35",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingLeft: 53,
    height: 56,
    alignSelf: "center",
    width: width * 0.81,
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
  uploadInvalidPasswordTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    fontFamily: "JosefinSans-Bold",
    alignSelf: "flex-start",
    paddingLeft: 20,
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
  dontHaveAccountMintTextStyle: {
    fontSize: 12,
    color: "#000",
    marginBottom: 1,
    fontWeight: "500",
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
    marginTop: 15,
    alignSelf: "center",
  },
  emailTextStyleView: {
    marginTop: 15,
    alignSelf: "center",
  },
  uploadTextStyleView: {
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 18
  },
  uploadTextStyleView_: {
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 18
  },
  uploadTextStyleVieww_: {
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 10
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
  backLoginButtonText: {
    color: "#002A14",
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
  radioStyle: {
    borderRadius: 1
  }
});
