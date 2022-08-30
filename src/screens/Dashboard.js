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
  Image,
  StatusBar
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Carousel from 'react-native-banner-carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HamburgerIcon from '../component/HamburgerIcon';
import ProfilePicIcon from '../component/ProfilePicIcon';
import LinearGradient from 'react-native-linear-gradient';
import BillPaymentIcon from '../assets/svgs/bill_payment';
import DataIcon from '../assets/svgs/data_n_airtime';
import TransHistIcon from '../assets/svgs/trans_history';
import SendMoneyIcon from '../assets/svgs/send_money';
import FundAccountIcon from '../assets/svgs/fund_account';
import EyeCloseSmallIcon from '../assets/svgs/eyeclosesmall';
import EyeOpenSmallIcon from '../assets/svgs/eyeopensmall';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  secureTextEntry: false,
  isLoading: false,
  email: "",
  customerID: "",
  firstname: "",
  lastname: "",
  id: "",
  phone: "",
  tier: "",
  transactionPIN: "",
  accountNumber: "",
  bvn: "" 
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
        headerLeft: <HamburgerIcon colour="white"/>,
        headerRight: <ProfilePicIcon/>
    }
  }

  componentWillMount = ()=> {
    this._retrieveData();
  }
  
  _retrieveData() {    
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        this.setState({
          token: response.token,
          userId: response.id,
          accessToken: response.accessToken,
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

    // static navigationOptions = () => {
    //   return {
    //       headerRight: ()=> <ProfilePicIcon/>
    //   }
    //   }
  
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

  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  }

  render() {
      LogBox.ignoreAllLogs(true);
      // console.disableYellowBox = true;
      const { email, firstname, lastname, phone, accountNumber, bvn, tier } = this.state;
    return (
      <ScrollView
      style={styles.scrollView}
      backgroundColor="#FFFFFF"
      paddingBottom={30}>
          <StatusBar backgroundColor="#002A14" barStyle="light-content"/>

      <View backgroundColor="#FFFFFF" width={width}>    
        <View style={styles.headerContainer}>
          <LinearGradient
                    colors={['#EBF1AC','#B2BE35','#EBF1AC']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}  style={{ width: 263, height: 158, top: 22, borderRadius: 8, padding: 14, marginTop: 40, opacity: 0.7}}>
                      <View>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <View>
                        <Text style={{ color: "#002A14", fontSize: 12, fontWeight: "400" }}>Account number</Text>
                        {this.props.navigation.state.params.accountNumber ? <Text style={{ color: "#002A14", fontSize: 14, fontWeight: "700" }}>{this.props.navigation.state.params.accountNumber}</Text> : 
                        <Text style={{ color: "#002A14", fontSize: 14, fontWeight: "700" }}>No Account Number</Text>}
                        </View>
                        <Image
                          source={require("../assets/dashicon.png")}
                          style={{ width: 24, height: 24, }}/>
                      </View>

                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 19 }}>
                      <View style={{ flexDirection: "row" }}>
                          <View>
                            <Text style={{ color: "#002A14", fontSize: 12, fontWeight: "400" }}>Balance</Text>
                            {!this.state.secureTextEntry ? <Text style={{ color: "#002A14", fontSize: 14, fontWeight: "700" }}>80,000</Text> : <Text style={{ color: "#002A14", fontSize: 14, fontWeight: "700" }}>{" "}******</Text>}
                          </View>
                          
                        <TouchableOpacity 
                          onPress={this.updateSecureTextEntry.bind(this)}>
                          {!this.state.secureTextEntry ?  
                        <View
                          style={{alignSelf: "flex-end", marginStart: 13, top: 20, }}>
                          <EyeCloseSmallIcon/>
                        </View>
                        :
                        <View
                          style={{alignSelf: "flex-end", marginStart: 13, top: 20, }}>
                          <EyeOpenSmallIcon/>
                        </View>}
                       </TouchableOpacity>
                       </View>

                        <View>
                        <Text style={{ color: "#002A14", fontSize: 12, fontWeight: "400" }}>Type</Text>
                        <Text style={{ color: "#002A14", fontSize: 14, fontWeight: "700" }}>Tier-{this.props.navigation.state.params.tier}</Text>
                        </View>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <View>
                        <Text style={{ color: "#002A14", fontSize: 12, fontWeight: "400" }}>{this.props.navigation.state.params.firstname}{" "}{this.props.navigation.state.params.lastname}</Text>
                        </View>
                        <Image
                          source={require("../assets/doublecircle.png")}
                          style={{ width: 53, height: 32, bottom: 14 }}/>
                        </View>

                      </View>
          </LinearGradient>

          {/* <View  onPress={this.notifications.bind(this)} 
            style={styles.pageContainer}
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={15}
            paddingBottom={5}
            paddingTop={20}
          >
            <View style={styles.headerTextContainer}>
              <Text style={styles.helloHaderText}>Hello,</Text>
              <Text style={styles.headerText}>{this.greetingMessage(new Date())} {"\nYour balance is ₦******"}</Text>
          
              </View> */}
              
           {/* </View> */}
         
        </View>

        <View>
        <Text style={{ color: "#002A14", fontSize: 12, fontWeight: "700", lineHeight: 12, marginTop: 24, marginStart: 22 }}>Banking Quick Links</Text>
        <View marginBottom={24}>

        <View flexDirection={"row"} justifyContent={"space-evenly"} marginTop={16}>
        <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Payment")} style={{width: 90.3, height: 80, borderRadius: 13, backgroundColor: "#ECF3A4", paddingVertical: 25, paddingHorizontal: 35, shadowColor: "#000000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, elevation: 3 }}>
          <BillPaymentIcon style={{margin: 32}}/>
        </TouchableOpacity>
        <Text style={{ width: 78, color: "#002A14", fontSize: 12, fontWeight: "500", marginTop: 5, alignSelf: "center", textAlign: "center" }}>Bills payment</Text>
        </View>

        <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("TransactionHistory")} style={{width: 90.3, height: 80, borderRadius: 13, backgroundColor: "#ECF3A4", paddingVertical: 25, paddingHorizontal: 35, shadowColor: "#000000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, elevation: 3 }}>
          <TransHistIcon/>
        </TouchableOpacity>
        <Text style={{ width: 78, color: "#002A14", fontSize: 12, fontWeight: "500", marginTop: 5, alignSelf: "center", textAlign: "center" }}>Transaction history</Text>
        </View>

        <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("SendMoney")} style={{width: 90.3, height: 80, borderRadius: 13, backgroundColor: "#ECF3A4", paddingVertical: 25, paddingHorizontal: 35, shadowColor: "#000000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, elevation: 3 }}>
          <SendMoneyIcon/>
        </TouchableOpacity>
        <Text style={{ width: 78, color: "#002A14", fontSize: 12, fontWeight: "500", marginTop: 5, alignSelf: "center", textAlign: "center" }}>Send Money</Text>
        </View>
        </View>

        <View flexDirection={"row"} justifyContent={"space-evenly"} marginTop={8}>
        <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("AirtimeNData")} style={{width: 90.3, height: 80, borderRadius: 13, backgroundColor: "#ECF3A4", paddingVertical: 25, paddingHorizontal: 35, shadowColor: "#000000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, elevation: 3 }}>
          <DataIcon/>
        </TouchableOpacity>
        <Text style={{ width: 78, color: "#002A14", fontSize: 12, fontWeight: "500", marginTop: 5, alignSelf: "center", textAlign: "center" }}>Data/Airtime</Text>
        </View>

        <View>
        <TouchableOpacity style={{width: 90.3, height: 80, borderRadius: 13, backgroundColor: "#ECF3A4", paddingVertical: 25, paddingHorizontal: 35, shadowColor: "#000000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, elevation: 3 }}>
          <FundAccountIcon/>
        </TouchableOpacity>
        <Text style={{ width: 78, color: "#002A14", fontSize: 12, fontWeight: "500", marginTop: 5, alignSelf: "center", textAlign: "center" }}>Fund account</Text>
        </View>

        <View style={{width: 90.3, height: 80, borderRadius: 13, backgroundColor: "transparent", paddingVertical: 25, paddingHorizontal: 35 }}>
        </View>
        </View>
        
        </View>
        {/* <View margin={30} flexDirection={"row"} justifyContent={"space-around"}>
        <TouchableOpacity alignSelf={"center"}>
          <MaterialCommunityIcons
            name="bank-transfer"
            color="#1e5228"
            style={styles.iconViewStyle}
            bottom={10}
            size={70}/>
          <Text style={{ color: "#1e5228", textAlign: "center", alignSelf: "center", top: -18 }}>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity alignSelf={"center"}>
          <FontAwesome5
            name="money-bill"
            color="#1e5228"
            margin={5}
            style={styles.iconViewStyle}
            size={50}/>
          <Text style={{ color: "#1e5228", textAlign: "center", alignSelf: "center" }}>Bill Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity alignSelf={"center"}>
          <FontAwesome
            name="balance-scale"
            color="#1e5228"
            margin={5}
            style={styles.iconViewStyle}
            size={50}/>
          <Text style={{ color: "#1e5228", textAlign: "center", alignSelf: "center" }}>Balance Enquiry</Text>
        </TouchableOpacity>
        </View>

        <View marginHorizontal={30} flexDirection={"row"} justifyContent={"space-around"}>
        <TouchableOpacity alignSelf={"center"}>
          <FontAwesome5
            name="hand-holding-usd"
            color="#1e5228"
            margin={5}
            style={styles.iconViewStyle}
            size={50}/>
          <Text style={{ color: "#1e5228", textAlign: "center", alignSelf: "center" }}>Loan Request</Text>
        </TouchableOpacity>

        <TouchableOpacity alignSelf={"center"} 
        onPress={() =>
                  this.props.navigation.navigate("About")
                }>
        <Entypo
            name="info-with-circle"
            color="#1e5228"
            margin={5}
            style={styles.iconViewStyle}
            size={50}/>
          <Text style={{ color: "#1e5228", textAlign: "center", alignSelf: "center" }}>About MOZFIN</Text>
        </TouchableOpacity>
        </View>
        </View> */}

        {/* <View marginTop={30}> */}
              {/* <ScrollView horizontal={true}>
            <View flexDirection="row">
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("GeoLocationScreen")
                }
              >
              <View style={styles.firstCardStyle}>
                <MaterialCommunityIcons
                  name="bank-transfer"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle_}
                  size={35}/>
                <Text style={styles.descriptionText}>Transfer</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("MedicalCentersListScreen")
                }
              >
              <View style={styles.secondCardStyle}>
              <FontAwesome5
                  name="money-bill-wave"
                  color="white"
                  margin={5}
                  style={styles.iconViewStyle}
                  size={25}/>
              <Text style={styles.descriptionText}>Bill Payment</Text>

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
                  style={styles.iconViewStyle_}
                  size={25}/>
              <Text style={styles.descriptionText}>Balance Enquiry</Text>
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
                  style={styles.iconViewStyle_}
                  size={25}/>
              <Text style={styles.descriptionText}>Loan Request</Text>
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
                  style={styles.iconViewStyle_}
                  size={25}/>
              <Text style={styles.descriptionText}>About MOZFIN</Text>
              </View>
              </TouchableOpacity>

            </View>
            </ScrollView> */}

            {/* <View
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
                }} /> */}
        <Text style={{ color: "#002A14", fontSize: 12, fontWeight: "700", lineHeight: 12, marginTop: 16, marginBottom: 16, marginStart: 22 }}>What we offer</Text>

        <Carousel
          loop={true} 
          autoplay={true}
          sliderWidth={100}
          itemWidth={100}
          autoplayTimeout={3000}
          activePageIndicatorStyle={{ backgroundColor: '#B2BE35', direction: 'rtl' }}//#D4E3ED
          index={0}
          onMoveShouldSetResponder={ (evt, gestureState) => true}
          slideStyle={{ width: 0, color: '#B2BE35', }}
          pageIndicatorStyle={{  bottom: 30, borderColor: "#B2BE35", backgroundColor: "transparent", borderWidth: 1, }}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={1}>
              <View style={{ bottom: height * 0.018 }}>
              <Image
                source={require("../assets/advance.png")}
                style={styles.imageBgd}/>
              </View>

              <View style={{ bottom: height * 0.018 }}>
              <Image
                source={require("../assets/lpo.png")}
                style={styles.imageBgd}/>
              </View>

              <View style={{ bottom: height * 0.018 }}>
              <Image
                source={require("../assets/micro.png")}
                style={styles.imageBgd}>
              </Image>
              </View>

              <View style={{ bottom: height * 0.02 }}>
              <Image
                source={require("../assets/saving.png")}
                style={styles.imageBgd}/>
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
    backgroundColor: "#002A14",
    height: height * 0.37,
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
  headerTextContainer: {},
  circlarIconContainer: {
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  imageBgd: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 15, 
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
    marginTop: 50,
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
  iconViewStyle: {
    alignSelf: "center",
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
