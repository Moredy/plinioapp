import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left , Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

import {
  barbersList,
} from "../variables/barbersList";

import MainListCard from '../components/MainListCard'

function BarberPerfilScreen({ navigation }) {

  const handleBackButtonClick = () => {
    navigation.goBack(null); // Pula a loading screen.
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, []); 

  const barberObj = navigation.getParam('barberObj', 'NO-OBJ')

 console.log( )

  let userUid;

  var user = firebase.auth().currentUser;

  if (user) {
    userUid = user.uid
  } else {
    // No user is signed in.
  }



  return (

    <Container>



      <Container style={styles.container}>


        <Content style={styles.container2}>
        <Text>Id: {Object.keys(barberObj)[0]}</Text>
        <Text>Nome: {barberObj[Object.keys(barberObj)[0]].name}</Text>
        <Text>Especialidades: {barberObj[Object.keys(barberObj)[0]].specialties}</Text>
        <Text>Phone: {barberObj[Object.keys(barberObj)[0]].phone}</Text>
        <Text>Rating: </Text>


        </Content>

        <Button title="Quero ir com esse barbeiro" onPress={() => navigation.navigate('CorteRapidoSelecioneCorteScreen' , { barberObj })} />
        
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
      </Container>
    </Container>
  );

}
export default BarberPerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginBottom: "5%",
    justifyContent: 'center',
    marginLeft: "4%",
    marginRight: "4%"
  },
  container2: {
    marginBottom: "5%",

  },
  title: {
    fontSize: 16,
    color: "#fff",
  },


});
