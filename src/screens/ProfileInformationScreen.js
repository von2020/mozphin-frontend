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
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
  LogBox,
} from "react-native";
// import ImagePicker from 'react-native-image-crop-picker';
// import * as ImagePicker from "react-native-image-picker"//^2.3.4
// import ImagePicker, { openPicker } from 'react-native-new-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-tiny-toast';
import moment from 'moment';
import * as RNFS from 'react-native-fs';
import  Loader  from './../config/Loader';
import EyeCloseIcon from '../assets/svgs/eye_close';
import EyeOpenIcon from '../assets/svgs/eye_open';

const { width, height } = Dimensions.get("window");

const initialState = {
  imageData: "",
  rate: 0,
  modalVisible_: false, 
  isLoading: false, 
};

class ProfileInformationScreen extends Component {
  state = initialState;

  updateSecureTextEntry(){
    this.setState({ password: !this.state.password })
  };

  onStarRatingPress(rating) {
    this.setState({
        rate: rating
    });
  }

     selectFileFromCam = async () => {
        var options = {
          mediaType: 'photo',
          cameraType: 'front',
          // storageOptions: {
          //   skipBackup: true,
          //   path: 'images',
          // },

        //   storageOptions: { privateDirectory: true  },
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5, 
          includeBase64: true,
          includeExtra: false,
        };

//        const res = await launchCamera(options);

      launchCamera(options, res => {
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
            let imageSizeInKb = source.fileSize / 1024
            let imageSizeInMb = imageSizeInKb / 1024
            if (imageSizeInMb < 10) {
              // this.setState({ imageData: "data:image/jpeg;base64,"+source.assets[0].base64, modalVisible_: false, isLoading: false })
              this.setState({ imageData: response.assets[0].uri, modalVisible_: false, isLoading: false })
            }
          }
        });
      }

      selectFileFromLib = () => {
        var options = {
          selectionLimit: 1,
          mediaType: 'photo',
          // includeBase64: false,
        // storageOptions: { privateDirectory: true  },
          includeBase64: true,
          includeExtra: false,
          // selectionLimit: 0,
      
          // saveToPhotos: false,
          // durationLimit: 10
        };
        // ImagePicker.openPicker({
        //   width: 300,
        //   height: 400,
        //   cropping: true
        // }).then(image => {
        //   console.log(image);
        // });
        
        launchImageLibrary(options, res => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            
          } else {
          //   res.assets.map((asset) => {

          //     console.log('uri -> ', asset.uri);

          //     this.setState({
          //       imageData: asset.uri,
          //       modalVisible_: false, isLoading: false
          //     })

          // });


          //  this.setState({ isLoading: false });
          //  let source = res;
          //  console.log("The Fileeeeeeeeeee lib", source.assets[0].uri.replace("file:///","file://"))


          //  this.setState({ imageData: "data:image/jpeg;base64,"+res.assets[0].base64, modalVisible_: false, isLoading: false })
          //  this.setState({ imageData: response.assets[0].uri, modalVisible_: false, isLoading: false })



          let uri = res.assets && res.assets[0].uri;
          console.log('Uri uri uri uri uri =', uri);
          if(uri){
          
            const path=uri.split("/")
            let values = Object.values(path)
            const fileName=values[values.length - 1]
            const androidPath = RNFS.DocumentDirectoryPath 
            uri = "file://"+androidPath+"/"+fileName;
            this.setState({ imageData: uri, modalVisible_: false, isLoading: false })
          }

          let source = res;
            console.log("The Fileeeeeeeeeee cam", source)
            let imageSizeInKb = source.fileSize / 1024
            let imageSizeInMb = imageSizeInKb / 1024
            if (imageSizeInMb < 10) {
              this.setState({ imageData: "data:image/jpeg;base64,"+source.assets[0].base64, modalVisible_: false, isLoading: false })
            }
          }
        });
      }

       requestCameraPermission = async () => {
        try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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
        await this.openCamera();
        } else {
        console.log("Camera permission denied");
        }
        } catch (err) {
        console.warn(err);
        }
        };
        
        // testCamera = () => {
        //  ImagePicker.openPicker({
        //    isCamera: true,
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        //     multiple: false
        //   }).then(image => {
        //     console.log(image);
        //     this.setState({ imageData: image, modalVisible_: false, isLoading: false })
        //   });
        // }

        openCamera = async () => {
        //Alert.alert('asdasd');
        // var RNFS = require('react-native-fs');
        
        const options = {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
          // storageOptions: { privateDirectory: true },
        };
        
        // ImagePicker.openCamera({
        //   width: 300,
        //   height: 400,
        //   cropping: true,
        // }).then(image => {
        //   console.log(image.path);
        //   this.setState({ imageData: image.path, modalVisible_: false, isLoading: false })
        // });
        await launchCamera(options, response => {
          console.log('Response =', response);
          let uri = response?.assets && response.assets[0].uri;
          console.log('Uri uri uri uri uri =', uri);
          if(uri){
          
            const path=uri.split("/")
            let values = Object.values(path)
            const fileName=values[values.length - 1]
            const androidPath = RNFS.DocumentDirectoryPath 
            uri = "file://"+androidPath+"/"+fileName;
            this.setState({ imageData: uri, modalVisible_: false, isLoading: false })
          }
        
          if(response.assets){
            // let source = response;
            // console.log("The Fileeeeeeeeeee cam", source)
            // let imageSizeInKb = source.fileSize / 1024
            // let imageSizeInMb = imageSizeInKb / 1024
            // if (imageSizeInMb < 10) {
            //   this.setState({ imageData: "data:image/jpeg;base64,"+source.assets[0].base64, modalVisible_: false, isLoading: false })
            // }
          // this.setState({ imageData: "data:image/jpeg;base64,"+response.assets[0].base64, modalVisible_: false, isLoading: false })
          // this.setState({ imageData: response.assets[0].uri, modalVisible_: false, isLoading: false })

          }
        });
        };

        rateThis(){
          this.setState({ rate: 0 }) 
          Toast.show('You gave a '+this.state.rate+' star rating!',{
            position: Toast.position.center,
            containerStyle:{ backgroundColor:"#045135", borderRadius: 10, padding: 10, margin: 10,  },
            duration: 2000,
            delay: 0,
            textStyle: {color: "#FFF", fontFamily: "Nunito_400Regular", fontSize: 13, fontWeight: "400", },
            imgStyle: {},
            mask: true,
            maskStyle:{},
          })
        }

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
                {/* {imageData == "" ?  */}
                <Image source={require('../assets/samplepic.png')} resizeMode={'cover'} marginTop={24} alignSelf={"center"} height={20} width={20}/> 
                {/* : */}
                {/* <Image source={{ uri: imageData }} resizeMode={'cover'} marginTop={24} alignSelf={"center"} height={20} width={20}/>}  */}
                
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
            {this.state.imageData == "" ? <Image source={require('../assets/profilepicc.png')} resizeMode={'cover'} alignSelf={"center"} height={20} width={20} marginTop={32}/> :
            <View key={this.state.imageData} style={styles.image}>
            <Image source={{ uri: this.state.imageData }} resizeMode={'cover'} marginTop={32} alignSelf={"center"} height={50} width={50}/>
            </View>} 

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
              rating={this.state.rate}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'#002A14'}
              emptyStarColor={'#002A14'}
            />
              <TouchableOpacity
                onPress={()=> this.rateThis()}
                disabled={this.state.rate == 0 ? true : false}
                style={{ alignSelf: "center", width: width * 0.31, height: 40, backgroundColor: this.state.rate == 0 ? "rgba(0,42,20,0.81)" : "#002A14", borderRadius: 10, marginBottom: 0, opacity: 1  }}>
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
    marginVertical: 24,
    alignItems: 'center',
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
    marginHorizontal: 1,
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
  linearGradient: {
    flex: 1,
    height: 88,
    width: width,
  },
  checkBoxStyle: {
    borderColor: "#fff",
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
});
