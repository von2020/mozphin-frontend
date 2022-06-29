import React, { Component } from 'react';
import Container from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import { UserProvider } from './src/contextApi/Context.js';

export default class App extends Component {
  componentDidMount(){
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000)
    
  }

  render() {
    return (
        // <UserProvider>
          <Container />
        // </UserProvider>
    );
  }
}