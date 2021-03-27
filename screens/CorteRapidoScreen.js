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

function CorteRapidoScreen({ navigation }) {

  const handleBackButtonClick = () => {
    navigation.goBack(null); // Pula a loading screen.
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, []); 





  let userUid;

  var user = firebase.auth().currentUser;

  if (user) {
    userUid = user.uid
  } else {
    // No user is signed in.
  }



  const saveSelectedBarberOnLocalStorage = async (barberId) => {

    try {
      await AsyncStorage.setItem('@selectedBarber_id', `${barberId}`)
    } catch (e) {
      // saving error
    }

  }

  const haddleSelectBarber = (barberId) => {

    saveSelectedBarberOnLocalStorage(barberId)

    console.log (barberId + " ID BARBER")

    navigation.navigate('BarberPerfilScreen', { barberId })

  }


  return (

    <Container>

        <Header>
          <Left/>
          <Body>
            <Text style={styles.title}>Selecione o seu barbeiro  </Text>
         
          </Body>
          <Right />
        </Header>

      <Container style={styles.container}>


        <Content style={styles.container2}>

        {barbersList.map((item, index) => {
          return (
            <MainListCard
              key={index}
              name={barbersList[index].name}
              img={{ uri: barbersList[index].thumbnail }}
              subtitle={barbersList[index].description}
              gender={barbersList[index].gender}
              bornDate={barbersList[index].bornDate}
              onPress={() => haddleSelectBarber(barbersList[index].id)} />
          );
        })}


        </Content>

        
        
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
      </Container>
    </Container>
  );

}
export default CorteRapidoScreen;

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
