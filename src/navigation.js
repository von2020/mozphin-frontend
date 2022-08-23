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
import ForgotPasswordSubject from '../src/screens/ForgotPasswordSubject';
import ForgotPassword from '../src/screens/ForgotPasswordScreen';
import SideMenuScreen from '../src/screens/SideMenuScreen';
import BottomTabs from '../src/screens/BottomTabs';
import TransactionPinScreen from './screens/TransactionPinScreen';
import PasswordScreen from '../src/screens/PasswordScreen';
import ProfileInformationScreen from '../src/screens/ProfileInformationScreen';
import Otppcode from '../src/screens/Otppcode';
import ReferralsScreen from './screens/ReferralsScreen';
import AccountInformation from './screens/AccountInformation';
import SettingsScreen from './screens/SettingsScreen';
import ChangePassword from './screens/ChangePassword';
import ChangePin from './screens/ChangePin';
import SendMoney from './screens/SendMoney';
import StatementOfAccount from './screens/StatementOfAccount';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SideIcon8 from './assets/svgs/side8';
import SideIcon7 from './assets/svgs/side7';
import SideIcon6 from './assets/svgs/side6';
import SideIcon5 from './assets/svgs/side5';
import SideIcon4 from './assets/svgs/side4';
import SideIcon3 from './assets/svgs/side3';
import SideIcon2 from './assets/svgs/side2';
import SideIcon1 from './assets/svgs/side1';
import SideIconX from './assets/svgs/sidex';

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
          <ScrollView backgroundColor={"#002A14"}>
                    <SafeAreaView
                    forceInset={{ top: 'always', horizontal: 'never' }}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ height: height , width: width, alignItems: 'center', bottom: height * 0.15 }}>
                    <View style={{ marginStart: 10, left: width * 0.1, position: "absolute", top: 93, }}>
                    <TouchableOpacity onPress={() => { props.navigation.closeDrawer() }} style={{ alignSelf: "flex-end", top: 30, position: "absolute", right: 0, left: width * 0.65 }}>
                    <SideIcon5/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('AccountInfo');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 67 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon4/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 5 }}>
                        Account Information
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('TransactionHistory');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon3/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 5 }}>
                        Transaction History
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('StatementOfAccount');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIconX/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 1 }}>Statement Of Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('Referrals');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon6/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 2 }}>
                        Referrals
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('Contact');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon1/>
                        </View>        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 8 }}>
                        Get Help
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('About');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon2/>
                        </View>        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 8 }}>
                        About Mozfin
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('Settings');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon7/>
                        </View>        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 5 }}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            removeItemValue("userDetails");
                            props.navigation.navigate('StartUp');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon8/>
                        </View>        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75, marginStart: 5 }}>
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
        Otppcode: {
          screen: Otppcode,
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
          Referrals: {
            screen: ReferralsScreen,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "Referrals",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
                  right: 30
              },
            }
          },
          AccountInfo: {
            screen: AccountInformation,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "Account Information",
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
              },
            }
          },
          Settings: {
            screen: SettingsScreen,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "Settings",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
              },
            }
          },
          ChangePassword: {
            screen: ChangePassword,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "Change Password",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
              },
            }
          },
          ChangePin: {
            screen: ChangePin,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "Change Pin",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
              },
            }
          },
          SendMoney: {
            screen: SendMoney,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
              title: "Send Money",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
                  right: 30
              },
          },
        },
        StatementOfAccount: {
          screen: StatementOfAccount,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
            title: "Statement Of Account",
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
            },
        },
      },
      ForgotPasswordSubject: {
        screen: ForgotPasswordSubject,
        navigationOptions: {
          headerShown: true,
          headerStyle: { backgroundColor: '#002A14' },
          title: "Forgot Password",
          headerTintColor: "#FFF",
          headerTitleStyle: {
              fontWeight: "600",
              textAlign: "center",
              right: 30
          },
        }
      }, 
      ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
          headerShown: true,
          headerStyle: { backgroundColor: '#002A14' },
          title: "Forgot Password",
          headerTintColor: "#FFF",
          headerTitleStyle: {
              fontWeight: "600",
              textAlign: "center",
              right: 30
          },
        }
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