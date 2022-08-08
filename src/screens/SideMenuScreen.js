import React, { useContext, createContext } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity, Dimensions, Image, StatusBar, Alert } from 'react-native';
import HelpScreen from './FaqScreen';
import SecretQueScreen from './SecretQueScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabs from './BottomTabs';
// import ChangePasswordScreen from './ChangePasswordScreen';
import ContactScreen from '../screens/ContactScreen';
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
                    <View style={{ marginStart: 10, left: width * 0.09, position: "absolute", top: 93, }}>
                    <TouchableOpacity onPress={() => { props.navigation.closeDrawer() }} style={{ left: 38, alignSelf: "flex-end", top: 30, }}>
                    <SideIcon5/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('ProfileScreen');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 57 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon4/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
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
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
                        Transaction History
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('ProfileScreen');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIconX/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>Statement Of Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('ProfileScreen');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon6/>
                        </View>        
                        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
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
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
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
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
                        About Mozfin
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('SecretQhueScreen');
                            props.navigation.closeDrawer();
                            }} style={{ flexDirection: "row", alignSelf: "flex-start", marginStart: 18.5, marginTop: 26 }}>
                        <View style={{ alignSelf: "flex-end", marginEnd: 12, bottom: 5 }}>
                        <SideIcon7/>
                        </View>        
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>Settings</Text>
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
                        <Text style={{color: "#FFF", fontWeight: "400", fontSize: 16, fontStyle: "normal", lineHeight: 18.75 }}>
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
        SecretQueScreen: {
            screen: SecretQueScreen,
            navigationOptions: {
            headerStyle: { backgroundColor: '#FFF' },
            title: "Settings",
            headerTintColor: "#000",
            headerTitleStyle: {
                fontWeight: "100",
            },
            }
        }
 	 }
 );

export default createAppContainer(Stack); 