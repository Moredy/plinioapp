import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import HomeScreen from './screens/HomeScreen';
import CriarPerfil from './screens/CriarPerfil';
import Dashboard from './screens/Dashboard'
import LerSintomas from  './screens/LerSintomas'

import DashboardEquipeMedica from  './screens/DashboardEquipeMedica'
import CriarPerfilEquipeMedica from  './screens/CriarPerfilEquipeMedica'
import MensagensEquipeMedica from './screens/MensagensEquipeMedica';
import Mensagens from './screens/Mensagens';


firebase.initializeApp(firebaseConfig);


const RootStack = createStackNavigator ({

  LerSintomas: LerSintomas,
  HomeScreen: HomeScreen, 
  CriarPerfil: CriarPerfil,
  Dashboard: Dashboard,
  DashboardEquipeMedica: DashboardEquipeMedica,
  MensagensEquipeMedica: MensagensEquipeMedica,
  Mensagens: Mensagens,
  CriarPerfilEquipeMedica: CriarPerfilEquipeMedica,

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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
