import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
  //   ObservationList: {
  //     screen: ObservationListScreen,
  //     navigationOptions: {
  //       headerShown: true
  //     },
  //   }, 
  //   ViewObservation: {
  //     screen: ViewObservationScreen,
  //     navigationOptions: {
  //       headerShown: true
  //     },
  //   }, 
  //   EditObservation: {
  //     screen: EditObservationScreen,
  //     navigationOptions: {
  //       headerShown: true
  //     },
  //   }, 
  //   ConfirmObservation: {
  //     screen: ConfirmObservationScreen,
  //     navigationOptions: {
  //       headerShown: true
  //     },
  //   }
  
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
//     "Added Subjects": {
//       screen: AddSubjectList,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Class Subjects": {
//       screen: ClassSubject,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Assign Subject(s)": {
//       screen: AssignSubjects,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Assigned Subjects": {
//       screen: AssignedSubjectList,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "School Subjects": {
//       screen: SchoolSubject,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "UnAssigned Subjects": {
//       screen: UnAssignedSubject,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Report Card Configuration": {
//       screen: ReportCard,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Report Card Config List": {
//       screen: ReportCardConfigList,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Compute Result": {
//       screen: ComputeResult,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Computed Result": {
//       screen: ComputeResultList,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Lesson Note": {
//       screen: LessonNote,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Lesson Note List": {
//       screen: LessonNoteList,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//   });

  const AdministrationStack = createStackNavigator({
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
    "All Students": {
      screen: DashboardScreen,  
      navigationOptions: {
        headerShown: true
      },
    },
  })
//     "Add Students": {
//       screen: AddStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "View Parents": {
//       screen: ViewParents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Assign Students": {
//       screen: AssignStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Assigned Students": {
//       screen: AssignedStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "All Staff": {
//       screen: AllStaff,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "All Teachers": {
//       screen: AllTeachers,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "All Campus": {
//       screen: AllCampus,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Add Campus": {
//       screen: AddCampus,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Update School": {
//       screen: UpdateSchool,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Add Staff": {
//       screen: AddStaff,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Add Teacher": {
//       screen: AddTeacher,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Assign Class Arm": {
//       screen: AssignClassArm,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Assigned Class Arm": {
//       screen: AssignedClassArm,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "All Classes": {
//       screen: AllClasses,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "All Class Arm": {
//       screen: AllClassArm,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Add Class": {
//       screen: AddClass,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Add Class Arm": {
//       screen: AddClassArm,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Manage Session": {
//       screen: ManageSession,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Academic Session": {
//       screen: AcademicSession,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Manage Score Category": {
//       screen: ManageScoreCategory,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Manage Score SubCategory": {
//       screen: ManageScoreSubCategory,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Bulk Upload": {
//       screen: BulkUpload,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Move Students": {
//       screen: MoveStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "Moved Students": {
//       screen: MovedStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//     "View Moved Students": {
//       screen: CheckedMoveStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
//   });
  
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
      screen: AdministrationStack,  
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