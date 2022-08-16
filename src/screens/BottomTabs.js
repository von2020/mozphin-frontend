import React from 'react';
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from "../screens/Dashboard";
import FaqScreen from "../screens/FaqScreen";
import PaymentScreen from "../screens/PaymentScreen";
import SendMoney from '../screens/SendMoney';
import TransactionHistory from '../screens/TransactionHistory';
import TransactionReceipt from '../screens/TransactionReceipt';
import NotificationIcon from '../assets/svgs/notificationicon';
import LoansIcon from '../assets/svgs/loansicon';
import HomeIcon from '../assets/svgs/homeicon';
import PaymentIcon from '../assets/svgs/paymenticon';
import AirtimeNData from '../screens/AirtimeNData';
import NotificationScreen from '../screens/NotificationScreen';
import AddBeneficiary from '../screens/AddBeneficiary';

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
        headerShown: true,
        headerTransparent: true,
        headerStyle: { backgroundColor: 'transparent', },
        title: "",
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "100",
        },
        },
    },
    Faq: {
      screen: FaqScreen,
      navigationOptions: {
        headerShown: false
      },
    },
    AirtimeNData: {
      screen: AirtimeNData,
      navigationOptions: {
        headerShown: true,
        headerStyle: { backgroundColor: '#002A14', },
      title: "Airtime/Data",
      headerTintColor: "#FFF",
      headerTitleStyle: {
          fontWeight: "600",
          alignSelf: "center",
          right: 30
        },
      },
    },
    TransactionHistory: {
      screen: TransactionHistory,
      navigationOptions: {
        headerShown: true,
        headerStyle: { backgroundColor: '#002A14' },
        title: "Transaction History",
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "600",
            textAlign: "center",
            right: 30
          },
      },
    },
    TransactionReceipt: {
      screen: TransactionReceipt,
      navigationOptions: {
        headerShown: true,
        headerStyle: { backgroundColor: '#002A14' },
        title: "Transaction Receipt",
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "600",
            textAlign: "center",
            right: 30
          },
      },
    },
    AddBeneficiary: {
      screen: AddBeneficiary,
      navigationOptions: {
        headerShown: true,
        headerStyle: { backgroundColor: '#002A14' },
        title: "Beneficiary",
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "600",
            textAlign: "center",
            right: 30
          },
      },
    },
  });
  
  const NotificationStack = createStackNavigator({
    "Notification": {
      screen: NotificationScreen, 
      navigationOptions: { 
      headerShown: true,
      headerStyle: { backgroundColor: '#002A14', },
      title: "Notifications",
      headerTintColor: "#FFF",
      headerTitleStyle: {
          fontWeight: "600",
          alignSelf: "center",
          right: 30
        }, 
    },
  },
  })

  const PaymentStack = createStackNavigator({
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {
        headerShown: true,
        headerStyle: { backgroundColor: '#002A14', },
      title: "Payments",
      headerTintColor: "#FFF",
      headerTitleStyle: {
          fontWeight: "600",
          alignSelf: "center",
        },
      },
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
  }
  })

const TabNavigator = createMaterialBottomTabNavigator({  
    Home:{  
      screen: DashboardStack,  
      navigationOptions:{  
        tabBarLabel:'Home',  
        // tabBarLabel: ({ focused, tintColor }) => (
        //       <Text color={focused ? '#FFFFFF' : '#B2BE35'}>Home</Text>),
        tabBarIcon:({focused})=>(  
            <HomeIcon color={focused ? '#FFFFFF' : '#B2BE35'}/>  
        )  
      }  
    },   
    Payment:{  
      screen: PaymentStack,  
      navigationOptions:{  
        tabBarLabel:'Payments',  
        tabBarIcon:({focused})=>(  
            <PaymentIcon color={focused ? '#FFFFFF' : '#B2BE35'}/>  
        )  
      }  
    },  
    Notification:{  
      screen: NotificationStack,  
      navigationOptions:{  
        tabBarLabel:'Notification',  
        tabBarIcon:({focused})=>(  
            <NotificationIcon color={focused ? '#FFFFFF' : '#B2BE35'}/>  
        )  
      }  
    },
    GetLoans:{  
      screen:NotificationStack,  
      navigationOptions:{  
        tabBarLabel:'Get Loans',  
        tabBarIcon:({focused})=>(  
            <LoansIcon color={focused ? '#FFFFFF' : '#B2BE35'}/>  
        )  
      }  
    },       
  },{  
    initialRouteName: "Home",
    tabBarOptions: {
      labelPosition: 'below-icon',
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#B2BE35',
      fontSize: 50,
    },
    barStyle: {
      height: 50,
      backgroundColor: '#002A14',
      paddingBottom: 5,
     }
  });
  
export default createAppContainer(TabNavigator);