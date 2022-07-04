import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  LogBox
} from "react-native";
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-banner-carousel';
import LinearGradient from 'react-native-linear-gradient';
// import { UserContext } from './../contextApi/Context';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

class StartUpScreen extends Component {
    // static contextType = UserContext;

    constructor(){  
        super();  
        this.state={  
        isVisible : true,  
        }  
    }  

    Hide_Splash_Screen=()=>{  
        this.setState({   
        isVisible : false   
        });  
    }  
       
    SignIn=()=>{
        var that = this;
        if(this.context.dataa == null){   
        setTimeout(function(){  
            that.props.navigation.navigate("SignIn")   
        }, 9300);
        }else{
            
        }
    }

    skipInfoSignIn(){
            this.props.navigation.navigate("SignIn");
    }

    signUp(){
      this.props.navigation.navigate("SignUp");
    }

    help(){
      this.props.navigation.navigate("Help");
    }

    notifications(){
        Alert.alert(null,"No available FAQs")
    }

    componentDidMount(){ 
    if(this.context.dataa == null){ 
        var that = this;  
        setTimeout(function(){  
            that.Hide_Splash_Screen();  
        }, 3000);  
    }else{
        var that = this;  
        setTimeout(function(){  
            that.Hide_Splash_Screen();  
            that.props.navigation.navigate("SignIn");
        }, 3000);
        
    }
    // setTimeout(function(){  
    //     that.SignIn();  
    // }, 5000);  
    
    }  
    
  render() {
    LogBox.ignoreAllLogs(true);
    let Splash_Screen = (
        <View style={styles.container}>
          <StatusBar backgroundColor="#045135" barStyle="light-content"/>
          {/* <ImageBackground
            source={require("../assets/taylor_.jpeg")}
            style={styles.imageBgd}>

        </ImageBackground> */}
        
        <Image source={require('../assets/mozfin_logo.jpg')} resizeMode={'cover'} margin={10} top={height * 0.37} position={"absolute"} alignSelf={"center"} />
        <Text style={styles.titleBottom}>Developed by Softworks Limited</Text>
      </View>
    );
    return (
        <View style = { styles.MainContainer }> 
        {/* <StatusBar backgroundColor="#000000" barStyle="light-content"/> */}

        {this.state.isVisible === true ? Splash_Screen : <View>
        <Carousel
          loop={true} 
          autoplay={true}
          sliderWidth={100}
          itemWidth={100}
          autoplayTimeout={3000}
          activePageIndicatorStyle={{ backgroundColor: 'green', direction: 'rtl' }}//#D4E3ED
          index={0}
          onMoveShouldSetResponder={ (evt, gestureState) => true}
          slideStyle={{ width: 0, color: '#ffffff',}}
          pageIndicatorStyle={{ bottom: height * 0.27, color: "#D4E3ED", alignSelf: "flex-start",  }}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={1}>
              <View style={{ height: height, width: width, bottom: height * 0.05, }}>
              <ImageBackground
                source={require("../assets/cloth.jpeg")}
                // blurRadius={1}
                style={styles.imageBgd}>

                {/* <LinearGradient
                    colors={['#000','transparent','transparent', '#000']} style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: 0, alignSelf: "center", backgroundColor: "grey"}}>
                <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "flex-end", width: 50, height: 50, marginEnd: 12, backgroundColor: "orange", borderRadius: 200, marginTop: 10, marginBottom: 20, }}>
                <MaterialIcons
                    name="notifications-active"
                    color="#FFF"
                    size={22}
                    style={{ padding: 12, alignSelf: "center"}}
                    />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", width: width * 0.8, height: 50, backgroundColor: "green", borderRadius: 18, marginBottom: 5 }}>
                <Text style={styles.getStarted}>SIGN IN</Text>
              </TouchableOpacity>
              <View
                    style={{
                    backgroundColor: '#FFF',
                    height: 2,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center"
                }} />
                <View flexDirection="row" justifyContent="space-between" width={width * 0.8} marginBottom={20} alignSelf={"center"}>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginStart: 20}}>
                <Text style={styles.getStartedSmall}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginEnd: 20}}>
                <Text style={styles.getStartedSmall}>Help</Text>
              </TouchableOpacity>
                </View>
              </LinearGradient> */}
              </ImageBackground>
              
              <Text style={styles.studentTitle}>MOZFIN INSURANCE</Text>
              <Text style={styles.studentDetails}>Micro Insurance</Text>
              <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
        
              </View>

              <View style={{ height: height, width: width, alignSelf: "center", bottom: height * 0.05, backgroundColor: "#FFF"}}>
              <ImageBackground
                source={require("../assets/fish.jpeg")}
                style={styles.imageBgd}>
                {/* <LinearGradient
                    colors={['#000','transparent','transparent', '#000']} style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: 0, alignSelf: "center", backgroundColor: "grey"}}>
                <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "flex-end", width: 50, height: 50, marginEnd: 12, backgroundColor: "orange", borderRadius: 200, marginTop: 20, marginBottom: 30, }}>
                <MaterialIcons
                    name="notifications-active"
                    color="#FFF"
                    size={22}
                    style={{ padding: 12, alignSelf: "center"}}
                    />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", width: width * 0.8, height: 50, backgroundColor: "green", borderRadius: 18, marginBottom: 5 }}>
                <Text style={styles.getStarted}>SIGN IN</Text>
              </TouchableOpacity>
              <View
                    style={{
                    backgroundColor: '#FFF',
                    height: 2,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center"
                }} />
                <View flexDirection="row" justifyContent="space-between" width={width * 0.8} marginBottom={20} alignSelf={"center"}>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginStart: 20}}>
                <Text style={styles.getStartedSmall}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginEnd: 20}}>
                <Text style={styles.getStartedSmall}>Help</Text>
              </TouchableOpacity>
                </View>
              </LinearGradient> */}
              </ImageBackground>

              <Text style={styles.teacherTitle}>ASSET FINANCING</Text>
              <Text style={styles.teacherDetails}>LPO Financing</Text>
              <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/>

              </View>

              <View style={{ height: height, width: width, bottom: height * 0.05}}>
              <ImageBackground
                source={require("../assets/market.jpeg")}
                style={styles.imageBgd}>
                {/* <LinearGradient
                    colors={['#000','transparent','transparent', '#000']} style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: 0, alignSelf: "center", backgroundColor: "grey"}}>
                <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "flex-end", width: 50, height: 50, marginEnd: 12, backgroundColor: "orange", borderRadius: 200, marginTop: 10, marginBottom: 20, }}>
                <MaterialIcons
                    name="notifications-active"
                    color="#FFF"
                    size={22}
                    style={{ padding: 12, alignSelf: "center"}}
                    />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", width: width * 0.8, height: 50, backgroundColor: "green", borderRadius: 18, marginBottom: 5 }}>
                <Text style={styles.getStarted}>SIGN IN</Text>
              </TouchableOpacity>
              <View
                    style={{
                    backgroundColor: '#FFF',
                    height: 2,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center"
                }} />
                <View flexDirection="row" justifyContent="space-between" width={width * 0.8} marginBottom={20} alignSelf={"center"}>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginStart: 20}}>
                <Text style={styles.getStartedSmall}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginEnd: 20}}>
                <Text style={styles.getStartedSmall}>Help</Text>
              </TouchableOpacity>
                </View>
              </LinearGradient> */}
              </ImageBackground>
              <Text style={styles.parentTitle}>MOZFIN COLLECTION</Text>
              <Text style={styles.parentDetails}>Daily Collection</Text>
              <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              
              </View>

              <View style={{ height: height, width: width, bottom: height * 0.05}}>
              <ImageBackground
                source={require("../assets/taylor_.jpeg")}
                // blurRadius={1}
                style={styles.imageBgd}>
                {/* <LinearGradient
                    colors={['#000','transparent','transparent', '#000']} style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: 0, alignSelf: "center", backgroundColor: "grey"}}>
                <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "flex-end", width: 50, height: 50, marginEnd: 12, backgroundColor: "orange", borderRadius: 200, marginTop: 10, marginBottom: 20, }}>
                <MaterialIcons
                    name="notifications-active"
                    color="#FFF"
                    size={22}
                    style={{ padding: 12, alignSelf: "center"}}
                    />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", width: width * 0.8, height: 50, backgroundColor: "green", borderRadius: 18, marginBottom: 5 }}>
                <Text style={styles.getStarted}>SIGN IN</Text>
              </TouchableOpacity>
              <View
                    style={{
                    backgroundColor: '#FFF',
                    height: 2,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center"
                }} />
                <View flexDirection="row" justifyContent="space-between" width={width * 0.8} marginBottom={20} alignSelf={"center"}>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginStart: 20}}>
                <Text style={styles.getStartedSmall}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", marginEnd: 20}}>
                <Text style={styles.getStartedSmall}>Help</Text>
              </TouchableOpacity>
                </View>
              </LinearGradient> */}
              </ImageBackground>

              <Text style={styles.parentTitle}>ADVANCE LOANS</Text>
              <Text style={styles.parentDetails}>Group Loans</Text>
              <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              
              </View>  
        </Carousel> 
        <LinearGradient
                    colors={['transparent','transparent','#000000', '#000000']} style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: 0, alignSelf: "center", backgroundColor: "grey", opacity: 0.7}}>
                <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "flex-end", width: 50, height: 50, marginEnd: 12, backgroundColor: "orange", borderRadius: 200, marginTop: 10, marginBottom: 20, opacity: 1}}>
                <MaterialCommunityIcons
                    name="frequently-asked-questions"
                    color="#FFF"
                    size={22}
                    style={{ padding: 14, alignSelf: "center"}}
                    />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.skipInfoSignIn.bind(this)} style={{alignSelf: "center", width: width * 0.8, height: 50, backgroundColor: "green", borderRadius: 18, marginBottom: 5, opacity: 1 }}>
                <Text style={styles.getStarted}>SIGN IN</Text>
              </TouchableOpacity>
              <View
                    style={{
                    backgroundColor: '#FFF',
                    height: 2,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center"
                }} />
                <View flexDirection="row" justifyContent="space-between" width={width * 0.8} marginBottom={20} alignSelf={"center"}>
              <TouchableOpacity onPress={this.signUp.bind(this)} style={{alignSelf: "center", marginStart: 20}}>
                <Text style={styles.getStartedSmall}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.help.bind(this)} style={{alignSelf: "center", marginEnd: 20}}>
                <Text style={styles.getStartedSmall}>Help</Text>
              </TouchableOpacity>
                </View>
              </LinearGradient>
        </View>}
    </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
        // opacity: 0.7
    },
    MainContainer:{  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    },  
    header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,

    },
    imageBgd: {
        width: width,
        height: height,
        flex: 1,
        backgroundColor: "#FFF", 
        opacity: 0.71,
        resizeMode: 'cover'
    },
    footer:{
        flex:1,
        backgroundColor:'#fff',
        // borderTopRightRadius:30,
        // borderTopLeftRadius:30,
        paddingVertical:50,
        paddingHorizontal:30
    },
    title:{
        color:'#FFF',
        fontSize:18,
        margin: 10,
        top: height * 0.47, 
        position: "absolute",
        alignSelf:"center"
    },
    getStarted: {
        color:'#FFF',
        fontSize: 16,
        fontWeight: "bold",
        padding: 10, 
        textAlign: "center",
        alignSelf: "center"
    },
    getStartedSmall: {
        color:'#FFF',
        fontSize: 14,
        fontWeight: "bold",
        // padding: 10, 
        textAlign: "center",
        alignSelf: "center"
    },
    studentTitle: {
        color:'#FFF',
        fontSize:24,
        fontWeight: "bold",
        margin: 10,
        top: height * 0.25, 
        position: "absolute",
        alignSelf:"center"
    },
    parentTitle: {
        color:'#FFF',
        fontSize:24,
        fontWeight: "bold",
        margin: 10,
        top: height * 0.25, 
        position: "absolute",
        alignSelf:"center"
    },
    teacherTitle: {
        color:'#FFF',
        fontSize:24,
        fontWeight: "bold",
        margin: 10,
        top: height * 0.25, 
        position: "absolute",
        alignSelf:"center"
    },
    studentDetails: {
        color:'#FFF',
        fontSize:14,
        margin: 20,
        top: height * 0.30, 
        position: "absolute",
        alignSelf:"center",
        width: width * 0.78, 
        textAlign: "center"
    },
    parentDetails: {
        color:'#FFF',
        fontSize:14,
        margin: 20,
        top: height * 0.30, 
        position: "absolute",
        alignSelf:"center",
        width: width * 0.78, 
        textAlign: "center"
    },
    teacherDetails: {
        color:'#FFF',
        fontSize:14,
        margin: 20,
        top: height * 0.30,
        position: "absolute",
        alignSelf:"center",
        width: width * 0.78, 
        textAlign: "center"
    },
    titleBottom:{
        color:'#045135',
        fontSize:13,
        margin: 10,
        bottom: 10,
        position: "absolute",
        alignSelf:"center",
        fontWeight: "700"
    },
    text:{
        color:'grey',
        marginTop:30
    },
    button:{
        alignItems:'flex-end',
        marginTop:30
    },
    signIn:{
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    },
    textSign:{
        color:'white',
        fontWeight:'bold'
    }
})

export default StartUpScreen;