import React, { useContext, createContext } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity, Dimensions, Image, StatusBar, Alert } from 'react-native';
import QRCodeScreen from './QRCodeScreen';
import BillPaymentUtility from './BillPaymentUtility';
import BillPaymentCable from './BillPaymentCable';
import BillPaymentBet from './BillPaymentBet';
import PostPaidPlanScreen from './PostPaidPlanScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabs from './BottomTabs';
import ProfileInformationScreen from '../screens/ProfileInformationScreen';
import SelectBetVendorScreen from '../screens/SelectBetVendorScreen';
import SelectCableSubScreen from '../screens/SelectCableSubScreen';
import SelectSubPlanScreen from './SelectSubPlanScreen';
import SelectUtilityScreen from './SelectUtilityScreen';
import ReferralsScreen from '../screens/ReferralsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatementOfAccount from '../screens/StatementOfAccount';
import AccountInformation from '../screens/AccountInformation';
import BVNQuestionScreen from '../screens/BVNQuestionScreen';
import BVNVerification from '../screens/BVNVerification';
import OTPCode from '../screens/OTPCodeScreen';
import OTPCodeOption from '../screens/OTPCodeOptionScreen';
import ContactScreen from '../screens/ContactScreen';
import UpdateUserDetails from '../screens/UpdateUserDetailsScreen';
import ChangePassword from '../screens/ChangePassword';
import ChangePin from '../screens/ChangePin';
import AboutUs from '../screens/AboutUs';
import SideIcon8 from '../assets/svgs/side8';
import SideIcon7 from '../assets/svgs/side7';
import SideIcon6 from '../assets/svgs/side6';
import SideIcon5 from '../assets/svgs/side5';
import SideIcon4 from '../assets/svgs/side4';
import SideIcon3 from '../assets/svgs/side3';
import SideIcon2 from '../assets/svgs/side2';
import SideIcon1 from '../assets/svgs/side1';
import SideIconX from '../assets/svgs/sidex';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const removeItemValue = async (key) => {
    try {
    await AsyncStorage.removeItem(key);
    return true;
    } catch (exception) {
    return false;
    }
}

const HamburgerNavigation = createDrawerNavigator(
    {
        Tabs: BottomTabs,
    },{ 
        drawerPosition: 'left',
        initialRouteName: 'Tabs',
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
    }
 );

 const Stack = createStackNavigator(
 	 {
        Drawer: {
            screen: HamburgerNavigation,
            navigationOptions: {
                headerShown: null,
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
          BVNQuestion: {
            screen: BVNQuestionScreen,
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
        BVNVerification: {
            screen: BVNVerification,
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
        OTPCode: {
            screen: OTPCode,
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
        OTPCodeOption: {
          screen: OTPCodeOption,
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
        BVNQuestion: {
            screen: BVNQuestionScreen,
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
        BVNVerification: {
            screen: BVNVerification,
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
        SelectBetVendor: {
            screen: SelectBetVendorScreen,
            navigationOptions: {
              headerShown: true,
              headerStyle: { backgroundColor: '#002A14' },
                title: "Select Bet Vendor",
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: "600",
                  textAlign: "center",
                  right: 30
                  },
                },
        },
        SelectCableSub: {
          screen: SelectCableSubScreen,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
              title: "Cable Subscription",
              headerTintColor: "#FFFF",
              headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
                },
              },
        },
        SelectSubPlan: {
          screen: SelectSubPlanScreen,
          navigationOptions: {
          headerShown: true,
          headerStyle: { backgroundColor: '#002A14' },
            title: "Select Subscription",
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "600",
              textAlign: "center",
              right: 30
              },
            },
      },
      SelectUtility: {
      screen: SelectUtilityScreen,
      navigationOptions: {
        headerShown: true,
        headerStyle: { backgroundColor: '#002A14' },
          title: "Utilities",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "600",
            textAlign: "center",
            right: 30
            },
          },
      },
        QRCode: {
          screen: QRCodeScreen,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
              title: "Scan QR Code",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
              },
              },
      },
      BillPaymentUtility: {
        screen: BillPaymentUtility,
        navigationOptions: {
          headerShown: true,
          headerStyle: { backgroundColor: '#002A14' },
            title: "Bill Payment",
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "600",
              textAlign: "center",
              right: 30
            },
            },
        },
        BillPaymentCable: {
          screen: BillPaymentCable,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
              title: "Bill Payment",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
              },
              },
        },
        BillPaymentBet: {
          screen: BillPaymentBet,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
              title: "Bill Payment",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
                right: 30
              },
              },
        },
        PostPaidPlan: {
          screen: PostPaidPlanScreen,
          navigationOptions: {
            headerShown: true,
            headerStyle: { backgroundColor: '#002A14' },
              title: "Postpaid Plan",
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontWeight: "600",
                textAlign: "center",
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
 	 }
 );

export default createAppContainer(Stack); 