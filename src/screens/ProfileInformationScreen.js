import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar,
  Image,
  Alert,
  Dimensions,
  PermissionsAndroid,
  LogBox,
} from "react-native";
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from "react-native-image-picker"
// import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import  Loader  from './../config/Loader';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

// const image = { uri: "./../../assets/safexray-logo.png" };
const initialState = {
  email: "",
  em: "empty",
  username: "",
  us: "",
  password: false,
  pa: "",
  birthYear: "dd/mm/yyyy",
  by: "",
  usersRole: "",
  id: "10",
  country: "Select Country",
  co: "",
  tellUs: "Tell us",
  tu: "",
  imageData: "",
  requester_rate_driver: 0,
  modalVisible_: false,
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

class ProfileInformationScreen extends Component {
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

  handleCountry = (country) => {  
    if(country != "Select Country"){
      this.setState({ country: country, co: "" });
    }else {
      this.setState({ country: country, co: "empty" });
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
    this.setState({ password: !this.state.password })
  };

  onStarRatingPress(rating) {
    this.setState({
        requester_rate_driver: rating
    });
  }

  onPressSignUp() {
    this.setState({ isLoading: true });

    const { email, username, password, birthYear, country, tellUs } = this.state;
    // {
    //   "email": "valid_email@domain.com",
    //   "username": "any_username",
    //   "country": "name",
    //   "birth_year": "YYYY-MM-DD",
    //   "why_here": "answer to why user wants to join BlackTrust",
    //   "password": "any_password"
    // }
    if(email == ""){
      this.setState({ isLoading: false, em: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(username == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Username field is empty')
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Last Name field is empty')
    }else if(birthYear == "dd/mm/yyyy"){
      this.setState({ isLoading: false, by: "empty" });
      // Alert.alert(null,'Middle Name field is empty')
    }else if(country == "Select Country"){
      this.setState({ isLoading: false, co: "empty" });
      // Alert.alert(null,'Please Select a Role ')
    }else if(tellUs == "Tell us"){
      this.setState({ isLoading: false, tu: "empty" });
      // Alert.alert(null,'Phone Number field is empty')
    }else{
      const why_here = tellUs
      const birth_year = moment(birthYear).format("YYYY-MM-DD")

      const payload = { 
        email, 
        username, 
        country,
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

    this.setState({ isLoading: true });

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
    this.categoryList();  
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

     selectFileFromCam = async () => {
        var options = {
          mediaType: 'photo',
          cameraType: 'front',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        //   storageOptions: { privateDirectory: true  },
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5, 
          includeBase64: true
        };

//        const res = await launchCamera(options);

ImagePicker.launchCamera(options, res => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            
          } else {
            this.setState({ isLoading: false });
            let source = res;
            console.log("The Fileeeeeeeeeee cam", source)
            var sourcee;
            // if (Platform.OS === 'android') {
            // sourcee = {uri: source.assets[0].uri, isStatic: true}
            // this.setState({ imageData: sourcee, modalVisible_: false, isLoading: false })
            // } else {
            // sourcee = {uri: source.assets[0].uri.replace('file://', ''), isStatic: true}
            // this.setState({ imageData: sourcee, modalVisible_: false, isLoading: false })
            // }
          //  this.setState({ imageData: source.assets[0].uri, modalVisible_: false, isLoading: false })
           if(source.uri){
                // AsyncStorage.setItem("userdetailsImage",JSON.stringify(obj))
              }    
          }
        });
      }

      selectFileFromLib = () => {
        var options = {
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        // storageOptions: { privateDirectory: true  },
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5, 
          includeBase64: true
        };
        // ImagePicker.openPicker({
        //   width: 300,
        //   height: 400,
        //   cropping: true
        // }).then(image => {
        //   console.log(image);
        // });
        
        ImagePicker.launchImageLibrary(options, res => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            
          } else {
            res.assets.map((asset) => {

              console.log('uri -> ', asset.uri);

              this.setState({
                imageData: asset.uri,
                modalVisible_: false, isLoading: false
              })

          });


          //  this.setState({ isLoading: false });
          //  let source = res;
          //  console.log("The Fileeeeeeeeeee lib", source.assets[0].uri.replace("file:///","file://"))
          //  this.setState({ imageData: source.assets[0].uri, modalVisible_: false, isLoading: false })
          //  if(source){
          //       // AsyncStorage.setItem("userdetailsImage",JSON.stringify(obj))
          //     }    
          }
        });
      }

       requestCameraPermission = async () => {
        try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
        }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        this.openCamera();
        } else {
        console.log("Camera permission denied");
        }
        } catch (err) {
        console.warn(err);
        }
        };
        
        openCamera = () => {
        //Alert.alert('asdasd');
        const options = {
          mediaType: 'photo',
          cameraType: 'front',
          storageOptions: {
            skipBackup: true,
            path: 'images/jpeg',
            
          },
          storageOptions: { skipBackup: true, path: 'images', cameraRoll: true, waitUntilSaved: true },
        //   storageOptions: { privateDirectory: true  },
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5, 
          includeBase64: true
        };
        
        // ImagePicker.openCamera({
        //   width: 300,
        //   height: 400,
        //   cropping: true,
        // }).then(image => {
        //   console.log(image.path);
        //   this.setState({ imageData: image.path, modalVisible_: false, isLoading: false })
        // });
        ImagePicker.launchCamera(options, response => {
          console.log('Response =', response);
          this.setState({ imageData: response.assets[0].uri, modalVisible_: false, isLoading: false })
        });
        };

  render() {
    LogBox.ignoreAllLogs(true);
    const { imageData } = this.state;
    console.log("Imageeeeeeeee", imageData)
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
            <StatusBar backgroundColor="#00000095" barStyle="dark-content"/>
                <TouchableOpacity onPress={()=> this.setState({ modalVisible_: false })}>
                <Text style={styles.modalText}>Close</Text>
                </TouchableOpacity>

                <View alignItems={"center"}>
                <Image source={require('../assets/samplepic.png')} resizeMode={'cover'} marginTop={24} alignSelf={"center"} height={20} width={20}/>
                <Text style={{color: "#045135", fontWeight: "500", fontSize: 12, lineHeight: 20.8, textAlign: "center", marginVertical: 20, lineSpacing: 1 }}>Please select image source</Text>  
                </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ lignSelf: "center", width: width * 0.395, height: 30, backgroundColor: "#FFF", borderColor: "#002A14", borderWidth: 1, borderRadius: 10, marginBottom: 5, opacity: 1 }}
                  onPress={()=> this.requestCameraPermission()}>
                    <Text style={styles.textStylee}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ lignSelf: "center", width: width * 0.395, height: 30, backgroundColor: "#FFF", borderColor: "#002A14", borderWidth: 1, borderRadius: 10, marginBottom: 5, opacity: 1, marginTop: 8 }}
                  onPress={()=> this.selectFileFromLib()}>
                    <Text style={styles.textStylee}>Galley</Text>
                </TouchableOpacity>   
                        
                </View>
              </View>
              </View>
              </Modal>
              
            <View>
            <View style={styles.emailTextStyleView_}>
            <TouchableOpacity onPress={()=> this.setState({ modalVisible_: true })}>
            {imageData == "" ? <Image source={require('../assets/profilepicc.png')} resizeMode={'cover'} alignSelf={"center"} height={20} width={20} marginTop={32}/> :
            <Image source={{uri: imageData }} resizeMode={'cover'} marginTop={32} alignSelf={"center"} height={200} width={200}/>} 
            </TouchableOpacity>
            <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "center", marginTop: 5, lineSpacing: 1 }}>John Doe</Text>  
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "center", marginTop: 5, lineSpacing: 1 }}>+234 815 567 8910</Text>
            </View>
              
              <View>

              <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 20.8, width: width, height: 33, textAlign: "left", marginTop: 25, lineSpacing: 1, backgroundColor: "#EFF5B0", padding: 5, paddingLeft: 24 }}>Basic Information</Text>  
              <View>
              <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 8, lineSpacing: 1, paddingLeft: 24 }}>First Name</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 3, lineSpacing: 1, paddingLeft: 24 }}>John</Text>  
              
              <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 16, lineSpacing: 1, paddingLeft: 24 }}>Last Name</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 3, lineSpacing: 1, paddingLeft: 24 }}>Doe</Text>  

              <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 16, lineSpacing: 1, paddingLeft: 24 }}>Full Name</Text>  
              <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 3, lineSpacing: 1, paddingLeft: 24 }}>John Doe</Text>  
              </View>
              </View>

            <View>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 20.8, width: width, height: 33, textAlign: "left", marginTop: 25, lineSpacing: 1, backgroundColor: "#EFF5B0", padding: 5, paddingLeft: 24 }}>Contact Information</Text>  
            <View>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 8, lineSpacing: 1, paddingLeft: 24 }}>Email</Text>  
            <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1, paddingLeft: 24 }}>Johndoeisaboy@cocktail.com</Text>  

            <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 16, lineSpacing: 1, paddingLeft: 24 }}>Phone Number</Text>  
            <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1, paddingLeft: 24 }}>+234 815 567 8910</Text>  
            </View>
            </View>

            <View marginBottom={50}>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 20.8, width: width, height: 33, textAlign: "left", marginTop: 25, lineSpacing: 1, backgroundColor: "#EFF5B0", padding: 5, paddingLeft: 24 }}>Security Information</Text>  
            <View>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1, paddingLeft: 24 }}>Bank Verification Number</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 0,  }}>
            {this.state.password ? <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", paddingLeft: 24 }}>*** *** *** **</Text> : 
            <Text style={{color: "#045135", fontWeight: "600", fontSize: 16, lineHeight: 20.8, width: width * 0.8, textAlign: "left", paddingLeft: 24 }}>245 307 899 12</Text>}
              <TouchableOpacity 
              onPress={this.updateSecureTextEntry.bind(this)}>
                {this.state.password ?
                <View
                style={{alignSelf: "flex-end", right: 33, bottom: 5, }}>
                <EyeOpenIcon/>
                </View>
                 :
                 <View
                 style={{alignSelf: "flex-end", right: 33, bottom: 5, }}>
                 <EyeCloseIcon/>
                 </View>
                }
              </TouchableOpacity>
              </View>  
            </View>

            <View marginBottom={50}>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 16, lineHeight: 20.8, width: width, height: 33, textAlign: "left", marginTop: 25, lineSpacing: 1, backgroundColor: "#EFF5B0", padding: 5, paddingLeft: 24 }}>Feedback</Text>  
            <View>
            <Text style={{color: "#045135", fontWeight: "400", fontSize: 12, lineHeight: 20.8, width: width * 0.8, textAlign: "left", marginTop: 5, lineSpacing: 1, paddingLeft: 24 }}>Rating</Text>
            <View style={{ flexDirection: "row", marginHorizontal: 10, justifyContent: "space-around" }}>
            <StarRating
              disabled={false}
              maxStars={5}
              starStyle={styles.star}
              rating={this.state.requester_rate_driver}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'#F6BB42'}
            />
              <TouchableOpacity
                onPress={()=> this.setState({ requester_rate_driver: 0 })}
                disabled={this.state.requester_rate_driver == 0 ? true : false}
                style={{ alignSelf: "center", width: width * 0.31, height: 40, backgroundColor: this.state.requester_rate_driver == 0 ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 0, opacity: 1  }}>
                <Text style={styles.loginButtonText}>RATE</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
            </View>
              </View>  

        </ScrollView>
    );
  }
}

export default ProfileInformationScreen;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  modalView: {
    margin: 40,
    width: 227,
    height: 289,
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
    color: "#002A14",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 20,
  },
  star:{
    margin: 3,
  },
  modalText: {
    marginTop: -15,
    width: width * 0.6,
    marginEnd: 15,
    fontFamily: "Nunito_400Regular",
    alignSelf: "flex-end",
    textAlign: "right",
    color: "#FF0000",
    fontSize: 12,
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
    backgroundColor:'#00000095'
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
