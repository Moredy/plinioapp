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

  const [babersOnList, setBabersOnList] = useState(false); //To show ur remaining Text

  const handleBackButtonClick = () => {
    navigation.goBack(null); // Pula a loading screen.
  }


  useEffect(() => {

    firebase.database().ref('/barbers/').on('value', function (snapshot) {
      if (snapshot.val()) {
      let barbersArray = Object.entries(snapshot.val()).map((e) => ( { [e[0]]: e[1] } ))

      //let newBarbers = barbersArray.map((item, index) => {
      //  return barbersArray[index][Object.keys(barbersArray)[index]]
      //});

      let barbersArrayOn = []

      barbersArray.map((item, index) => {

        if (barbersArray[index][Object.keys(barbersArray[index])[0]].disponivelParaCorteRapido) {
          barbersArrayOn.push(barbersArray[index])
        }
    
      });

      setBabersOnList(barbersArrayOn)
      
    }

  });
    



  

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

        {babersOnList ? babersOnList.map((item, index) => {
          return (
            <MainListCard
              key={index}
              name={babersOnList[index][Object.keys(babersOnList[index])[0]].name}
              img={{ uri: barbersList[index].thumbnail }}
              subtitle={babersOnList[index][Object.keys(babersOnList[index])[0]].specialties}
              gender={barbersList[index].gender}
              bornDate={barbersList[index].bornDate}
              onPress={() => haddleSelectBarber(barbersList[index].id)} />
          );
        }) : null}


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
