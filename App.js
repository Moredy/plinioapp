import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import PetInfoScreen from './screens/PetInfoScreen';
import PetInfoControlScreen from './screens/PetInfoControlScreen';
import HomeScreen from './screens/HomeScreen';
import AdocaoScreen from './screens/AdocaoScreen';


import * as firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  PetInfoControlScreen: PetInfoControlScreen,
  LoginScreen: LoginScreen,
  PetInfoScreen: PetInfoScreen,
  AdocaoScreen: AdocaoScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
