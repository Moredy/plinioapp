import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import HomeControlScreen from './screens/HomeControlScreen';
import CorteRapidoScreen from './screens/CorteRapidoScreen';
import BarberPerfilScreen from './screens/BarberPerfilScreen';
import CorteRapidoControlScreen from './screens/CorteRapidoControlScreen';
import CorteRapidoSelecioneCorteScreen from './screens/CorteRapidoSelecioneCorteScreen';
import CorteRapidoFinalizarPerfilScreen from './screens/CorteRapidoFinalizarPerfilScreen';
import CorteRapidoPagamento from './screens/CorteRapidoPagamento'



firebase.initializeApp(firebaseConfig);


const RootStack = createStackNavigator ({
  HomeControlScreen: HomeControlScreen,
  CorteRapidoFinalizarPerfilScreen: CorteRapidoFinalizarPerfilScreen,
  BarberPerfilScreen: BarberPerfilScreen,
  HomeScreen: HomeScreen, 
  CorteRapidoPagamento: CorteRapidoPagamento,
  CorteRapidoControlScreen: CorteRapidoControlScreen,
  CorteRapidoScreen: CorteRapidoScreen,
  CorteRapidoSelecioneCorteScreen: CorteRapidoSelecioneCorteScreen,

  LoginScreen: LoginScreen,

}, { headerMode: 'none' } )

const RootComp = createAppContainer(RootStack);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    return <RootComp />;
  }
}
/*
const AppSwitchNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  AdocaoControlScreen: AdocaoControlScreen,
  LoginScreen: LoginScreen,
  PetInfoScreen: PetInfoScreen,
  AdocaoScreen: AdocaoScreen,
});


const AppNavigator = createAppContainer(AppSwitchNavigator);
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
