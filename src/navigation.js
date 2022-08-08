import React, { Component } from 'react';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import { createAppContainer,createSwitchNavigator }  from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createDrawerNavigator } from 'react-navigation-drawer';
import SplashScreen from '../src/screens/SplashScreen';
import StartUpScreen from '../src/screens/StartUpScreen';
import UpdateUserDetails from '../src/screens/UpdateUserDetailsScreen';
import SignInScreen from '../src/screens/SignInScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
import FaqScreen from './screens/FaqScreen';
import ContactScreen from '../src/screens/ContactScreen';
import AboutUs from '../src/screens/AboutUs';
import TermsAndConditions from '../src/screens/TermsAndConditions';
import SecretQueScreen from '../src/screens/SecretQueScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import UpgradeContinueScreen from '../src/screens/UpgradeContinueScreen';
import BVNQuestionScreen from '../src/screens/BVNQuestionScreen';
import BVNVerification from '../src/screens/BVNVerification';
import OTPCode from '../src/screens/OTPCodeScreen';
import OTPCodeOption from '../src/screens/OTPCodeOptionScreen';
import SideMenuScreen from '../src/screens/SideMenuScreen';
import BottomTabs from '../src/screens/BottomTabs';
import TransactionPinScreen from './screens/TransactionPinScreen';
import PasswordScreen from '../src/screens/PasswordScreen';
import ProfileInformationScreen from '../src/screens/ProfileInformationScreen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
// import ProfileScreen from '../src/screens/ProfileScreen';
// import SettingsScreen from '../src/screens/SettingsScreen';
// import StudentProfileScreen from '../src/screens/student/StudentProfileScreen';
// import ChangePasswordScreen from '../src/screens/ChangePasswordScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { UserContext } from './contextApi/Context';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const MyDrawerNavigator = createDrawerNavigator(
  { SideMenuScreen: SideMenuScreen }
  ,{
    drawerPosition: 'left',
    initialRouteName: 'SideMenuScreen',
    contentComponent: props => {
        return (
            <ScrollView backgroundColor={"#252C57"}>
                <SafeAreaView
                forceInset={{ top: 'always', horizontal: 'never' }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <View style={{ height: height , width: width, alignItems: 'center', bottom: height * 0.15 }}>
                {/* <Image source={require('./assets/bluemenu.png')} resizeMode={'cover'}  position={"absolute"}/>
                <Image source={require('./assets/yellowmenu.png')} resizeMode={'cover'} position={"absolute"}/>
                <Image source={require('./assets/whitemenu.png')} resizeMode={'cover'} position={"absolute"}/>
                <UserContext.Consumer>
                    {context => */}
                <View style={{ marginTop: 60 ,position: "absolute", top: height * 0.13, }}>
                {/* {context.dataa.schoolCode && <Text style={{color: "#252C57", textAlign: "center", lineHeight: 56.25, fontSize: 48, fontWeight: "900", fontStyle: "normal", bottom: 0, textTransform: "uppercase" }}>{context.dataa.schoolCode}</Text>}
                {context.dataa.schoolName && <Text style={{color: "#000", textAlign: "center", lineHeight: 21.09, fontSize: 18, bottom: 10 }}>{context.dataa.schoolName}{"\n"}({context.dataa.schoolTypeName})</Text>}
                {context.dataa.currentTermName && context.dataa.currentSessionName ? <Text style={{color: "#000", textAlign: "center", lineHeight: 16.41, fontSize: 14, fontWeight: "900", fontStyle: "normal", marginTop: 5, textTransform: "uppercase" }}>{context.dataa.currentTermName}, {context.dataa.currentSessionName} SESSION</Text> : <Text style={{color: "#000", textAlign: "center", lineHeight: 16.41, fontSize: 14, fontWeight: "900", fontStyle: "normal", marginTop: 5, textTransform: "uppercase" }}>- TERM, - SESSION</Text>} */}
                </View>
                    {/* }
                </UserContext.Consumer> */}
                <View
                style={{
                    height: 0.5, 
                    width: 240, 
                    backgroundColor: "#252C57", 
                    marginTop: 30,
                    position: "absolute", 
                    top: height * 0.37,}}
                />

                <View style={{ marginStart: 10, left: width * 0.09, position: "absolute", top: height * 0.42, }}>
                <TouchableOpacity 
                    onPress={() => {
                        props.navigation.navigate('ContactScreen');
                        props.navigation.closeDrawer();
                        }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 57 }}>
                    <EvilIcons
                        name="user"
                        size={45}
                        color="#252C57"
                        style={{ alignSelf: "flex-end", marginEnd: 4, bottom: 10, fontWeight: "10" }}/>

                    <Text style={{color: "#252C57", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
                        My Profile
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {
                        props.navigation.navigate('FaqScreen');
                        props.navigation.closeDrawer();
                        }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 25.5, marginTop: 15 }}>
                    <SimpleLineIcons
                        name="settings"
                        size={30}
                        color="#252C57"
                        style={{ alignSelf: "flex-end", marginEnd: 11, bottom: 6, fontWeight: "10" }}/>

                    <Text style={{color: "#252C57", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75}}>
                    Settings
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={() => {
                        props.navigation.navigate('StartUp');
                        props.navigation.closeDrawer();
                        }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 28, marginTop: 15 }}>
                    <AntDesign
                        name="logout"
                        size={28}
                        color="#252C57"
                        style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5, fontWeight: "10" }}/>

                    <Text style={{color: "#252C57", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75}}>
                    Logout
                    </Text>
                </TouchableOpacity>
                </View>
                </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
});

  //Student Drawer Navigator..
  const StudentDrawerNavigator = createDrawerNavigator(
    { SideMenuScreen: SideMenuScreen }
    ,{
      drawerPosition: 'left',
      initialRouteName: 'SideMenuScreen',
      contentComponent: props => {
          return (
              <ScrollView backgroundColor={"#002A14"}>
                  <SafeAreaView
                  forceInset={{ top: 'always', horizontal: 'never' }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                  <View style={{ height: height , width: width, alignItems: 'center', bottom: height * 0.15 }}>
                  
                  <View
                  style={{
                      height: 0.5, 
                      width: 240, 
                      backgroundColor: "#252C57", 
                      marginTop: 30,
                      position: "absolute", 
                      top: height * 0.37,}}
                  />
  
                  <View style={{ marginStart: 10, left: width * 0.09, position: "absolute", top: height * 0.42, }}>
                  <TouchableOpacity 
                      onPress={() => {
                          props.navigation.navigate('StudentProfileScreen');
                          props.navigation.closeDrawer();
                          }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 57 }}>
                      <EvilIcons
                          name="user"
                          size={45}
                          color="#252C57"
                          style={{ alignSelf: "flex-end", marginEnd: 4, bottom: 10, fontWeight: "10" }}/>
  
                      <Text style={{color: "#252C57", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
                          My Profile
                      </Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity 
                      onPress={() => {
                          props.navigation.navigate('SettingsScreen');
                          props.navigation.closeDrawer();
                          }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 25.5, marginTop: 15 }}>
                      <SimpleLineIcons
                          name="settings"
                          size={30}
                          color="#252C57"
                          style={{ alignSelf: "flex-end", marginEnd: 11, bottom: 6, fontWeight: "10" }}/>
  
                      <Text style={{color: "#252C57", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75}}>
                      Settings
                      </Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity 
                      onPress={() => {
                          props.navigation.navigate('StartUp');
                          props.navigation.closeDrawer();
                          }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 28, marginTop: 15 }}>
                      <AntDesign
                          name="logout"
                          size={28}
                          color="#252C57"
                          style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5, fontWeight: "10" }}/>
  
                      <Text style={{color: "#252C57", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75}}>
                      Logout
                      </Text>
                  </TouchableOpacity>
                  </View>
                  </View>
                  </SafeAreaView>
              </ScrollView>
          )
      }
  });

//Side Menu Design..
const Stack = createStackNavigator(
  {
      Drawer: {
          screen: MyDrawerNavigator,
          navigationOptions: {
              headerShown: null,
          },
        },
        "Change Password": {
          screen: AboutUs, 
          navigationOptions: {
              headerStyle: { backgroundColor: '#FFF' },
              title: "Change Password",
              headerTintColor: "#000",
              headerTitleStyle: {
                  fontWeight: "600",
                  right: 30
              },
          },
        },
        ProfileScreen: {
          screen: ContactScreen,
          navigationOptions: {
          headerStyle: { backgroundColor: '#FFB415' },
          title: "My Profile",
          headerTintColor: "#fff",
          headerTitleStyle: {
              fontWeight: "600",
              right: 30
          },
          }
      },
      SettingsScreen: {
          screen: FaqScreen,
          navigationOptions: {
          headerStyle: { backgroundColor: '#FFF' },
          title: "Settings",
          headerTintColor: "#000",
          headerTitleStyle: {
              fontWeight: "100",
          },
          }
      },
  }
);

//Main Startup Stack..
const StartUpStackMain = createStackNavigator(
    {
        StartUp: {
            screen: StartUpScreen,
            navigationOptions: {
            headerShown: false
            },
        },
        SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent', },
              title: "",
              headerTintColor: "#002A14",
              headerTitleStyle: {
                  fontWeight: "600",
                  right: 30
              },
            },
        },
        SignUp: {
          screen: SignUpScreen,
          navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#045135' },
              title: "Register",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  right: 30
              },
              },
        },
        Faqs: {
          screen: FaqScreen,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
            title: "FAQS",
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
            },
          }
        },
        Contact: {
          screen: ContactScreen,
          navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "GET HELP",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
                  right: 30
              },
            }
        },
        About: {
          screen: AboutUs,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
            title: "ABOUT MOZFIN",
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
            },
          }
        },
        TermsAndConditions: {
          screen: TermsAndConditions,
          navigationOptions: {
              headerShown: false
              },
        },
        SecretQueScreen: {
          screen: SecretQueScreen,
          navigationOptions: {
              headerShown: false
              },
        },
        Register: {
          screen: RegisterScreen,
          navigationOptions: {
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent', },
              title: "",
              headerTintColor: "#002A14",
              headerTitleStyle: {
                  fontWeight: "600",
                },
              },
        },
        UpgradeContinue: {
            screen: UpgradeContinueScreen,
            navigationOptions: {
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "100",
                  },
                },
        },
        BVNQuestion: {
            screen: BVNQuestionScreen,
            navigationOptions: {
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "100",
                  },
                },
        },
        BVNVerification: {
            screen: BVNVerification,
            navigationOptions: {
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "100",
                  },
                },
        },
        OTPCode: {
            screen: OTPCode,
            navigationOptions: {
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "100",
                  },
                },
        },
        OTPCodeOption: {
          screen: OTPCodeOption,
          navigationOptions: {
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent', },
              title: "",
              headerTintColor: "#002A14",
              headerTitleStyle: {
                  fontWeight: "100",
                },
              },
      },
      ProfileInformation: {
        screen: ProfileInformationScreen,
        navigationOptions: {
          headerShown: true,
          headerStyle: { backgroundColor: '#002A14', },
            title: "Profile Information",
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "600",
                alignSelf: "center",
                right: 30
              },
            },
      },
        UpdateUserDetails: {
            screen: UpdateUserDetails,
            navigationOptions: {
              headerShown: false,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "100",
                  },
                },
        },
        TransactionPin: {
            screen: TransactionPinScreen,
            navigationOptions: {
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "100",
                  },
                },
          },
          PasswordScreen: {
            screen: PasswordScreen,
            navigationOptions: {
              headerShown: true,
              headerTransparent: true,
              headerStyle: { backgroundColor: 'transparent', },
                title: "",
                headerTintColor: "#002A14",
                headerTitleStyle: {
                    fontWeight: "600",
                    right: 30
                  },
                },
          },
  }
  );

  
//containers..
const SideMenuContainer = createAppContainer(Stack);
const StartUpStackContainer = createAppContainer(StartUpStackMain);


//All Stacks..
const StartUpStack = createSwitchNavigator({
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false
      },
    },
    StartUp: {
        screen: StartUpStackContainer,
        navigationOptions: {
          headerShown: false
        },
    },
    SideMenu: {
      screen: SideMenuContainer,
      navigationOptions: {
        headerShown: true,
      }
    },
  });
  
  const Container = createAppContainer(StartUpStack);
  export default Container;