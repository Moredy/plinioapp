import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Input, Form, Item } from 'native-base';
import { Platafrom, StyleSheet, View, Image, TouchableOpacity, TouchableHighlight, Modal, Button, TextInput, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import axios from 'axios';


import MainListCard from '../components/MainListCard'

import {
  petList,
} from "../variables/petList.js";

export default function HomeScreen({ navigation }) {

  useEffect(() => {
    redirectToIncomeCallsIfIncome()
  },[navigation]);



  var user = firebase.auth().currentUser;

  if (user) {
    var userUid = user.uid
  } else {
    // No user is signed in.
  }


  const geoloc = () => {
    var location = "Rua Alzevides Gonçalves Pereira, Vila Aurea Maria, Mogi das Cruzes"

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyC8Y1Mk54q326CdAqQEMSbtmcYCbhmaDcc'
      }
    })
      .then(function (response) {
        // Log full response
        console.log(response);
      }
      );


  }


  const redirectToIncomeCallsIfIncome = async () => {

    var barberRequest = await AsyncStorage.getItem('barberRequest');
    barberRequest = JSON.parse(barberRequest);
    var idreq = await AsyncStorage.getItem('idreq');
    console.log('requests/' + Object.keys(barberRequest.pedido.barbeiro)[0] + '/' + idreq)


    if (barberRequest && idreq) {

      console.log('requests/' + Object.keys(barberRequest.pedido.barbeiro)[0] + '/' + idreq)

      firebase.database().ref('requests/' + Object.keys(barberRequest.pedido.barbeiro)[0] + '/' + idreq).on('value', (snapshot) => {
        if (snapshot.val()) {
          
          navigation.navigate('CorteRapidoAguardandoBarbeiro' , { barberRequest , idreq })
        }
    
        });

        

      firebase.database().ref('incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0] + '/' + idreq).on('value', (snapshot) => {
        if (snapshot.val()) {
       
         console.log(barberRequest)
          navigation.navigate('CorteRapidoIncomeScreen' ,  { barberRequest , idreq } )
        }
    
        });


  
    }
    

  }

  const haddleSelectPet = async (petId) => {

    //Salva o pet no LocalStorage.
    saveSelectedPetOnLocalStorage(petId)

    navigation.navigate('PetInfoScreen', { petId })
    //Navegar para tela de adoção

  }





  return (

    <Container style={styles.container}>

      <Content>

        {/*

        {petList.map((item, index) => {
          return (
            <MainListCard
              key={index}
              name={petList[index].name}
              img={{ uri: petList[index].thumbnail }}
              subtitle={petList[index].description}
              gender={petList[index].gender}
              bornDate={petList[index].bornDate}
              onPress={() => haddleSelectPet(petList[index].id)} />
          );
        })}

      */}

        <Button
          style={{ fontSize: 20, color: 'green' }}
          styleDisabled={{ color: 'red' }}
          onPress={() => navigation.navigate('CorteRapidoControlScreen')}
          title="Corte rapido"
        > Corte rapido </Button>

        <Button
          style={{ fontSize: 20, color: 'green' }}
          styleDisabled={{ color: 'red' }}
          onPress={() => firebase.auth().signOut()}
          title="Agende seu corte"
        > Agende seu corte </Button>


        <Button
          style={{ fontSize: 20, color: 'green' }}
          styleDisabled={{ color: 'red' }}
          onPress={() => firebase.auth().signOut()}
          title="Deslogar"
        >
          Deslogar
        </Button>

        <Button
          style={{ fontSize: 20, color: 'green' }}
          styleDisabled={{ color: 'red' }}
          onPress={geoloc}
          title="GeoLoc"
        >
          GeoLoc
        </Button>


      </Content>
    </Container>

  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#E5E5E5'
  }
});
