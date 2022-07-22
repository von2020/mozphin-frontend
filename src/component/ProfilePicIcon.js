import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import {
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
    Dimensions,
    LogBox
} from "react-native";  
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const { width } = Dimensions.get("window");

class ProfilePicIcon extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }
    };
    
    render() {
 	 return (
        <TouchableOpacity
        style={{
            width: 44,
            height: 44,
            marginEnd: 0,
            marginTop: 20,
        }}
        onPress={()=>{
            Alert.alert(null,"No side Profile screen yet..")
            this.props.navigation.navigate("ProfileUpdateDetails");
        }}>
              <Image
                  source={require("../assets/profilesmall.png")}
                  style={{ }} />
        </TouchableOpacity>
 	 )
    };
}

export default withNavigation(ProfilePicIcon);