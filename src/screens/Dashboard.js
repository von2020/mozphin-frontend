import React, { Component } from "react";
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
  LogBox,
  LinearGradient,
  Image,
  StatusBar
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-banner-carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HamburgerIcon from '../component/HamburgerIcon';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const initialState = {
  faqList: [], 
  up: false,
  down: true,
  password: "",
  token: "",
  isFetching: false,
  errors: {}, 
  isAuthorized: false, 
  isLoading: false, 
};
class Dashboard extends Component {
 state = initialState;

  color = (status) => {
    let color = "";
    if (status === "APPROVED") {
      color = "#3BC34E";
    } else if (status === "PENDING") {
      color = "#F6BB42";
    } else {
      color = "#FF0000";
    }
    return color;
  };

list = [
  {
  title : "Title 1",
  description: "Desc 1"
  },
  {
  title : "Title 2",
  description: "Desc 2"
  }
]

  componentDidMount = () => {
    console.log("Did mount");
    this.allFaqList();
  };

  allFaqList() {
    // setClientToken(token);
    this.setState({ isLoading: true });
    
    const faqList = [];

    // safeXrayService
    //   .get("/Faq/allFaq")
    //   .then((data) => {
    //     this.setState({ isLoading: false, isAuthorized: true });
    //     this.setState((state) => (state.faqList = faqList));
        
    //     // data.forEach((element) => {
    //       // faqList.push(data.data.data);
    //     // });
    //     this.setState({ faqList: data.data.data });
    //     if(data.data.data.length == 0){
    //       Alert.alert('Info: ','List is empty')
    //     }
    //     console.log("faqList: ", faqList);
    //     console.log("data[0].data: ........", data.data.data);

    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     this.setState({ isLoading: false, isAuthorized: true });
    //   });
  }

  upValue(){
    this.setState({ up: false, down: true });
    console.log("Up up up", this.state.up)
  }

  downValue(){
    this.setState({ up: true, down: false });
    console.log("Up up up", this.state.up)
  }

  static navigationOptions = () => {
    return {
        headerRight: ()=> <HamburgerIcon
        colour="white"/>
    }
    }

  greetingMessage(ndate) {
    var greeting = "";
    // var ndate = new Date();
    var hr = ndate.getHours();
      // var h = hr % 12;
    
    if (hr < 12){
          greeting = 'Good Morning.';
    } else if (hr >= 12 && hr <= 16){
          greeting = 'Good Afternoon.';
    } else if (hr >= 16 && hr <= 24)
          greeting = 'Good Evening.';
      return greeting;
  }

  render() {
      LogBox.ignoreAllLogs(true);
      // console.disableYellowBox = true;
    return (
      <ScrollView
      style={styles.scrollView}
      backgroundColor="#DDDDDD"
      paddingBottom={30}
    >
      <View backgroundColor="#DDDDDD" width={width}>
      {/* <Spinner
            visible={this.state.isLoading}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          /> */}
          
        <View style={styles.headerContainer}>
          <View
            style={styles.pageContainer}
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={15}
            paddingBottom={5}
            paddingTop={20}
          >
            <View style={styles.headerTextContainer}>
              <Text style={styles.helloHaderText}>Hello,</Text>
              <Text style={styles.headerText}>{this.greetingMessage(new Date())} </Text>
          
              </View>
           </View>
         
        </View>
        
        
        <View marginTop={50}>
              <ScrollView horizontal={true}>
            <View flexDirection="row">
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("GeoLocationScreen")
                }
              >
              <View style={styles.firstCardStyle}>
              {/* <LinearGradient
                colors={["#51A3FF", "#4848FF", "#022C6B"]}
                locations={[0, 0.3, 0.9]}
                style={styles.linearGradient}
              > */}
                {/* <View borderRadius={20} borderWidth={2} padding="10" borderColor="grey" backgroundColor="#FFF" width={30} height={30}> */}
                  <FontAwesome5
                  name="money-check-alt"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle}
                  size={25}/>
                {/* </View> */}
                {/* <Image
                  source={require("/../assets/download.jpeg")}
                  style={styles.imageStyle}
                /> */}
                <Text style={styles.descriptionText}>Take Loans</Text>
              {/* </LinearGradient> */}
              </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("MedicalCentersListScreen")
                }
              >
              <View style={styles.secondCardStyle}>
              {/* <View borderRadius={20} borderWidth={2} borderColor="grey" backgroundColor="#FFF" width={30} height={30}> */}
              <FontAwesome5
                  name="money-bill-wave"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle}
                  size={25}/>
              {/* </View> */}
              <Text style={styles.descriptionText}>Payments</Text>

              </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("FAQListScreen")
                }
              >
              <View style={styles.thirdCardStyle}>
              <MaterialCommunityIcons
                  name="frequently-asked-questions"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle}
                  size={25}/>
              <Text style={styles.descriptionText}>FAQs</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("FeedBackSceen")
                }
              >
              <View style={styles.fourthCardStyle}>
              <MaterialIcons
                  name="feedback"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle}
                  size={25}/>
              <Text style={styles.descriptionText}>FeedBack</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("AboutUsScreen")
                }
              >
              <View style={styles.fifthCardStyle}>
              <Entypo
                  name="info-with-circle"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle}
                  size={25}/>
              <Text style={styles.descriptionText}>About Us</Text>
              </View>
              </TouchableOpacity>

            </View>
            </ScrollView>

            <View
                    style={{
                    backgroundColor: '#042504',
                    height: 1,
                    margin: 1,
                    marginTop: 15,
                    marginStart: 20,
                    marginEnd: 20,
                }} />
                
            <Text style={styles.descriptionText_}>MOZFIN</Text>
              <View
                    style={{
                    backgroundColor: '#042504',
                    height: 1,
                    margin: 1,
                    marginStart: 20,
                    marginEnd: 20,
                    marginBottom: 8,
                }} />

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
          pageIndicatorStyle={{ color: "#D4E3ED"  }}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={1}>
              <View style={{ bottom: height * 0.02 }}>
              <Image
                source={require("../assets/cloth.jpeg")}
                // blurRadius={1}
                style={styles.imageBgd}/>
              
              {/* <Text style={styles.studentTitle}>MOZFIN INSURANCE</Text>
              <Text style={styles.studentDetails}>Micro Insurance</Text> */}
              {/* <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/> */}
        
              </View>

              <View style={{ bottom: height * 0.02 }}>
              <Image
                source={require("../assets/fish.jpeg")}
                style={styles.imageBgd}/>

              {/* <Text style={styles.teacherTitle}>ASSET FINANCING</Text>
              <Text style={styles.teacherDetails}>LPO Financing</Text> */}
              {/* <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/> */}

              </View>

              <View style={{ bottom: height * 0.02 }}>
              <Image
                source={require("../assets/market.jpeg")}
                style={styles.imageBgd}>
              </Image>
              {/* <Text style={styles.parentTitle}>MOZFIN COLLECTION</Text>
              <Text style={styles.parentDetails}>Daily Collection</Text> */}
              {/* <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/> */}
              
              </View>

              <View style={{ bottom: height * 0.02 }}>
              <Image
                source={require("../assets/taylor_.jpeg")}
                style={styles.imageBgd}/>

              {/* <Text style={styles.parentTitle}>ADVANCE LOANS</Text>
              <Text style={styles.parentDetails}>Group Loans</Text> */}
              {/* <Image source={require('../assets/mozfin_rounded_logo_.png')} resizeMode={'cover'} top={height * 0.17} alignSelf={"center"} position={"absolute"} height={20} width={20}/> */}
              
              </View>  
        </Carousel>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
  },
  imageStyle: {
    width: 250,
    top: 10,
    height: 200,
    marginBottom: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8
  },
  pageContainer: {
    alignSelf: "center",
    width: width * 0.9,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    opacity: 1,
  },
  circlarIconContainer: {
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  imageBgd: {
    width: width * 0.8,
    height: height * 0.28,
    flex: 1,
    alignSelf: "center",
    borderRadius: 15,
    // backgroundColor: "#FFF", 
    opacity: 0.71,
    resizeMode: 'cover',
    margin: 10,
  },
  cardStyle: {
    width: 250,//width * 0.45,
    height: 150,
    padding: 10,
    color: "#ffffff",
    opacity: 1,
    margin:15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  firstCardStyle: {
    width: 250,//width * 0.45,
    height: 150,
    padding: 10,
    color: "#ffffff",
    opacity: 1,
    margin:15,
    borderRadius: 10,
    backgroundColor: "#1e5228",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  secondCardStyle: {
    width: 250,//width * 0.45,
    height: 150,
    padding: 10,
    color: "#ffffff",
    opacity: 1,
    margin:15,
    borderRadius: 10,
    backgroundColor: "#556B2F",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  thirdCardStyle: {
    width: 250,//width * 0.45,
    height: 150,
    padding: 10,
    color: "#ffffff",
    opacity: 1,
    margin:15,
    borderRadius: 10,
    backgroundColor: "#808000",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  fourthCardStyle: {
    width: 250,//width * 0.45,
    height: 150,
    padding: 10,
    color: "#ffffff",
    opacity: 1,
    margin:15,
    borderRadius: 10,
    backgroundColor: "#3CB371",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  fifthCardStyle: {
    width: 250,//width * 0.45,
    height: 150,
    padding: 10,
    color: "#ffffff",
    opacity: 1,
    margin:15,
    borderRadius: 10,
    backgroundColor: "#045F5F",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  listHeadingText: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#4848FF",
    marginEnd: 5,
    marginTop: 5,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },  
  helloHaderText: {
    textAlign: "left",
    color: "grey",
    fontSize: 22,
    padding: 0,
    marginBottom: -7,
    fontFamily: "Nunito_700Bold",
    width: width * 0.65,
    letterSpacing: 0.05,
  }, 
  descriptionText: {
    fontSize: 18,
    textAlign: "left",
    color: "#FFF",
    alignSelf: "center",
    fontFamily: "Nunito_700Bold",
  },
  descriptionText_: {
    fontSize: 18,
    textAlign: "left",
    color: "#042504",
    fontFamily: "Nunito_700Bold",
    alignSelf: "center",
  },
  headerText: {
    textAlign: "left",
    color: "#fff",
    fontSize: 22,
    padding: 0,
    marginBottom: -7,    
    fontFamily: "Nunito_700Bold",
    width: width * 0.65,
    letterSpacing: 0.05,
  },
  card: {
    width: width * 0.9,
    borderRadius: 5,
    marginBottom: 30,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 30,
    borderLeftWidth: 10,
    backgroundColor: "#ffffff",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  cardHeaderText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardHeader: {
    justifyContent: "space-between",
  },
  approvedLabel: {
    paddingTop: 5,
    borderRadius: 3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  cardStyleLong: {
    marginTop: 20,
    marginBottom: 40,
    alignSelf: "center",
    width: width * 0.94,
    height: 70,
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
    color: "#ffffff",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5
  },
  cardApprovedLabelText: {
    fontSize: 10,
    flex: 1,
    color: "#fff",
    flexWrap: "wrap",
    alignSelf: "center",
    fontWeight: "bold",
  },
  cardMultipleData: {
    paddingLeft: 30,
    alignContent: "center",
    alignItems: "center",
  },
  cardDescription: {
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardListLabel: {
    fontSize: 10,
    color: "#323C47",
  },
  cardListData: {
    fontSize: 10,
    textAlign: "left",
    flexWrap: "wrap",
    width: 250,
    marginEnd: 5,
  },
  singleCardListData: {
    fontSize: 10,
    textAlign: "left",
    flexWrap: "wrap",
    width: 200,
    marginEnd: 5,
  },
  cardRequestDate: {
    fontSize: 10,
    position: "absolute",
    color: "#414D5B",
    textAlign: "right",
    left: width * 0.64,
    marginEnd: 5,
  },
  headerTextStyle: {
    textAlign: "left",
    color: "#414D5B",
    opacity: 1,
    letterSpacing: 0.54,
  },
  icons: {
    marginRight: 5,
  },
  noListText: {
        fontSize: 13,
        fontWeight: "bold",
        alignSelf: "center",
        color: "grey",
        backgroundColor: "#DDDDDD",
        padding: 20,
        margin: 15,
        marginTop:50
    },
});
export default Dashboard;
