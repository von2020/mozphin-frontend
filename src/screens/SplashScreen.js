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
import Icon from '../assets/svgs/get_help';
import FaqsIcon from '../assets/svgs/faqs';
import AboutIcon from '../assets/svgs/about';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

class SplashScreen extends Component {
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
       
    startUp=()=>{
        var that = this;
        if(this.context.dataa == null){   
        setTimeout(function(){  
            that.props.navigation.navigate("StartUp")   
        }, 9300);
        }else{
            
        }
    }

    skipInfoStartUp(){
            this.props.navigation.navigate("SignIn");
    }

    signUp(){
      this.props.navigation.navigate("BVNQuestion");
    }

    help(){
      this.props.navigation.navigate("Help");
    }

    about(){
        this.props.navigation.navigate("About");
    }

    contact(){
        this.props.navigation.navigate("Contact");
    }

    notifications(){
        Alert.alert(null,"No available FAQs")
    }

    componentDidMount(){ 
    // if(this.context.dataa == null){ 
        var that = this;  
        setTimeout(function(){  
            that.Hide_Splash_Screen();  
        }, 3000);  
    //  }else{
    //     var that = this;  
    //     setTimeout(function(){  
    //         that.Hide_Splash_Screen();  
    //         that.props.navigation.navigate("StartUp");
    //     }, 3000);
        
    // }
    }  
    
  render() {
    LogBox.ignoreAllLogs(true);
    let Splash_Screen = (
        <View style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF60" barStyle="dark-content"/>
         
        <Image source={require('../assets/mozfin_splash.png')} resizeMode={'cover'} margin={10} top={height * 0.37} position={"absolute"} alignSelf={"center"} backgroundColor="#FFFFFF70"/>
        <Text style={styles.titleBottom}>Developed by Softworks Limited</Text>
      </View>
    );
    return (
        <View style = { styles.MainContainer }> 

        {this.state.isVisible === true ? Splash_Screen : <View>
        <Carousel
          loop={true} 
          autoplay={true}
          sliderWidth={100}
          itemWidth={100}
          autoplayTimeout={3000}
          activePageIndicatorStyle={{ backgroundColor: '#002A14', borderColor: "#002A14", borderWidth: 1, direction: 'rtl' }}//#D4E3ED
          index={0}
          onMoveShouldSetResponder={ (evt, gestureState) => true}
          slideStyle={{ width: 0, color: '#ffffff',}}
          pageIndicatorStyle={{ bottom: height * 0.395, borderColor: "#002A14", backgroundColor: "#FFF", borderWidth: 1, alignSelf: "flex-start",  }}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={1}>
              <View style={{ height: height, width: width, bottom: height * 0.075, backgroundColor: "#FFFFFF"}}>
              <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
              <Image source={require('../assets/main_icon.png')} resizeMode={'cover'} top={height * 0.22} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              <Image source={require('../assets/first_slide.png')} resizeMode={'cover'} top={height * 0.36} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              </View>

              <View style={{ height: height, width: width, alignSelf: "center", bottom: height * 0.075, backgroundColor: "#FFF"}}>
              <Image source={require('../assets/main_icon.png')} resizeMode={'cover'} top={height * 0.22} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              <Image source={require('../assets/second_slide.png')} resizeMode={'cover'} top={height * 0.36} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              </View>

              <View style={{ height: height, width: width, bottom: height * 0.075, backgroundColor: "#FFF"}}>
              <Image source={require('../assets/main_icon.png')} resizeMode={'cover'} top={height * 0.22} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              <Image source={require('../assets/third_slide.png')} resizeMode={'cover'} top={height * 0.36} alignSelf={"center"} position={"absolute"} height={20} width={20}/>
              </View> 
        </Carousel> 
        {/* <LinearGradient
                    colors={['transparent','transparent','#000000', '#000000']} style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: 0, alignSelf: "center", backgroundColor: "grey", opacity: 0.7}}> */}
                {/* <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "flex-end", width: 50, height: 50, marginEnd: 12, backgroundColor: "orange", borderRadius: 200, marginTop: 10, marginBottom: 20, opacity: 1}}>
                <MaterialCommunityIcons
                    name="frequently-asked-questions"
                    color="#FFF"
                    size={22}
                    style={{ padding: 14, alignSelf: "center"}}
                    />
              </TouchableOpacity> */}
              <View style={{ position: "absolute", width: width, height: height * 0.27, alignItems: "baseline", bottom: height * 0.075, alignSelf: "center", backgroundColor: "#FFF",}}>
              <TouchableOpacity onPress={this.skipInfoStartUp.bind(this)} style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#FFF", borderRadius: 10, borderColor: "#002A14", borderWidth: 1, marginBottom: 8, opacity: 1 }}>
                <Text style={styles.getStarted_}>LOG IN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.signUp.bind(this)} style={{alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#002A14", borderRadius: 10, marginBottom: 5, opacity: 1 }}>
                <Text style={styles.getStarted}>SIGN UP</Text>
              </TouchableOpacity>
              {/* <View
                    style={{
                    backgroundColor: '#000',
                    height: 2,
                    width: width * 0.8,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignSelf: "center"
                }} /> */}
              <View flexDirection="row" justifyContent="space-between" width={width * 0.8} marginBottom={0} top={38} alignSelf={"center"}>
              <View alignSelf={"center"}>
              <TouchableOpacity onPress={this.contact.bind(this)} style={{ alignSelf: "center", borderRadius: 5, elevation: 1, width: 64, height: 52, paddingHorizontal: 20, paddingVertical: 14, shadowColor: "#000000", shadowOffset: { width: 1, height: 2 }, shadowOpacity: 0.2, }}>
                <Icon
                style={{ alignSelf: "center" }}/>
              </TouchableOpacity>
              <Text style={styles.getStartedSmall}>Get Help</Text>
              </View>

              <View alignSelf={"center"}>
              <TouchableOpacity onPress={this.notifications.bind(this)} style={{ alignSelf: "center", borderRadius: 5, elevation: 1, width: 64, height: 52, paddingHorizontal: 20, paddingVertical: 14, shadowColor: "#000000", shadowOffset: { width: 1, height: 2 }, shadowOpacity: 0.2 }}>
              <FaqsIcon/>
              </TouchableOpacity>
              <Text style={styles.getStartedSmall}>FAQs</Text>
              </View>

              <View alignSelf={"center"}>
              <TouchableOpacity onPress={this.about.bind(this)} style={{ alignSelf: "center", borderRadius: 5, elevation: 1, width: 64, height: 52, paddingHorizontal: 20, paddingVertical: 14, shadowColor: "#000000", shadowOffset: { width: 1, height: 2 }, shadowOpacity: 0.2, }}>
              <AboutIcon/>
              </TouchableOpacity>
              <Text style={styles.getStartedSmall}>About</Text>
              </View>
                </View>
              </View>

              {/* </LinearGradient> */}
        </View>}
    </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        // opacity: 0.7
    },
    MainContainer:{  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: "#FFF",
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
        opacity: 0.7,
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
        fontSize: 20,
        fontWeight: "500",
        padding: 5, 
        textAlign: "center",
        alignSelf: "center"
    },
    getStarted_: {
      color:'#002A14',
      fontSize: 20,
      fontWeight: "500",
      padding: 5, 
      textAlign: "center",
      alignSelf: "center"
    },
    getStartedSmall: {
        color:'#002A14',
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 5
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
        color:'#002A14',
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

export default SplashScreen;