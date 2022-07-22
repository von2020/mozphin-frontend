import React, { useContext, createContext } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity, Dimensions, Image, StatusBar, Alert } from 'react-native';
import HelpScreen from './HelpScreen';
import SecretQueScreen from './SecretQueScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabs from './BottomTabs';
// import ChangePasswordScreen from './ChangePasswordScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { UserContext } from '../contextApi/Context';

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
                <ScrollView backgroundColor={"#252C57"}>
                    <SafeAreaView
                    forceInset={{ top: 'always', horizontal: 'never' }}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ height: height , width: width, alignItems: 'center', bottom: height * 0.15 }}>
                    {/* <Image source={require('../assets/bluemenu.png')} resizeMode={'cover'}  position={"absolute"}/>
                    <Image source={require('../assets/yellowmenu.png')} resizeMode={'cover'} position={"absolute"}/>
                    <Image source={require('../assets/whitemenu.png')} resizeMode={'cover'} position={"absolute"}/> */}
                    
                    {/* <UserContext.Consumer>
                    {context =>  */}
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
                            props.navigation.navigate('ProfileScreen');
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
                            removeItemValue("userDetails");
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
          "Help Me!": {
            screen: HelpScreen, 
            navigationOptions: {
                headerStyle: { backgroundColor: '#FFF' },
                title: "Change Password",
                headerTintColor: "#000",
                headerTitleStyle: {
                    fontWeight: "100",
                },
            },
          },
          HelpScreen: {
            screen: HelpScreen,
            navigationOptions: {
            headerStyle: { backgroundColor: '#F9AC06' },
            title: "My Profile",
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "100",
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