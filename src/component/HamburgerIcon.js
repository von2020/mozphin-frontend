import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import {
    TouchableOpacity,
    StatusBar,
    Dimensions,
    LogBox
} from "react-native";  
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const { width } = Dimensions.get("window");

class HamburgerIcon extends Component{
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
            // width: width * 0.90,
            height: 44,
            marginLeft: 20,
            // marginEnd: 20,
            marginTop: 20,
            // alignItems: "flex-end"
        }}
        onPress={()=>{
            this.props.navigation.openDrawer();
        }}>
            <Icon name='menu' size={20} color={this.props.colour}/>
        </TouchableOpacity>
 	 )
    };
}

export default withNavigation(HamburgerIcon);