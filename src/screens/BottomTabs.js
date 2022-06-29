import React from 'react';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import DashboardScreen from "../screens/Dashboard";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

const DashboardStack = createStackNavigator({
    Dashboard: { 
      screen: DashboardScreen,  
      navigationOptions: {
        headerShown: false,
        headerStyle: { backgroundColor: '#DE9803' },
        title: "",
        headerTintColor: "#000",
        headerTitleStyle: {
            fontWeight: "100",
        },
        }  
    },
  //   NewProject: {
  //     screen: NewProjectScreen,
  //     navigationOptions: {
  //       headerShown: false
  //     },
  //   },
  //   NewObservation: {
  //     screen: NewObservationScreen,
  //     navigationOptions: {
  //       headerShown: true
  //     },
  //   },
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
  
//   const AcademicsStack = createStackNavigator({
//     "Grading & Attendance": {
//       screen: AcademicsScreen,  
//       navigationOptions: {
//         headerShown: true,
//       }, 
       
//     },
//     "Add Subject": {
//       screen: AddSubjectScreen,
//       navigationOptions: {
//         headerShown: true
//       },
//     },
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

//   const AdministrationStack = createStackNavigator({
//     "Administration ": { 
//       screen: AdministrationScreen,  
//       navigationOptions: {
//         headerShown: true
//       },  
//     },
//     "All Students": {
//       screen: AllStudents,  
//       navigationOptions: {
//         headerShown: true
//       },
//     },
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
    Dashboard:{  
      screen: DashboardStack,  
      navigationOptions:{  
        tabBarLabel:'Dashboard',  
        tabBarIcon:({focused})=>(  
            <Entypo name="home" color={focused ? '#000' : '#8A8A8A'} size={20}/>  
        )  
      }  
    },   
    Academics:{  
      screen:DashboardStack,  
      navigationOptions:{  
        tabBarLabel:'Academics',  
        tabBarIcon:({focused})=>(  
            <Entypo name="graduation-cap" color={focused ? '#000' : '#8A8A8A'} size={20}/>  
        )  
      }  
    },  
    Administration:{  
      screen:DashboardStack,  
      navigationOptions:{  
        tabBarLabel:'Administration',  
        tabBarIcon:({focused})=>(  
            <FontAwesome5 name="user-cog" color={focused ? '#000' : '#8A8A8A'} size={18}/>  
        )  
      }  
    },       
  },{  
    initialRouteName: "Dashboard",
    tabBarOptions: {
      labelPosition: 'below-icon',
      activeTintColor: '#000',
      inactiveTintColor: '#8A8A8A',
      fontSize: 50,
    },
    barStyle: {
      height: 50,
      backgroundColor: '#FFF',
      paddingBottom: 5
     }
  });
  
export default createAppContainer(TabNavigator);