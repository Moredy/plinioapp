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

  const barberId = navigation.getParam('barberId', 'NO-ID')


  const getBarberInfo = (barberId) => {

    for (let i = 0; i < barbersList.length; i++) {
      if (barbersList[i].id == barberId) {
        return barbersList[i]
      }

    }

  }

  const barberObj = getBarberInfo(barberId);



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

        <Text>Id: {barberObj.id}</Text>
        <Text>Nome: {barberObj.name}</Text>
        <Text>Descrição: {barberObj.description}</Text>
        <Text>Genero: {barberObj.gender}</Text>
        <Text>Especialidades {barberObj.especialidades}</Text>
        <Text>Rating: {barberObj.rating}</Text>


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
