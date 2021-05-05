import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left , Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 



import MainListCard from '../components/MainListCard'

function CorteRapidoSelecioneCorteScreen({ navigation }) {

  const handleBackButtonClick = () => {
    navigation.goBack(null); // Pula a loading screen.
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, []); 



  const barberObj = navigation.getParam('barberObj', 'NO-ID')


 
  const handleCabelo = () => {
   
    const pedido = {barbeiro: barberObj, opcoes: {tipoDeCorte: "rapido", corte: "cabelo"}}

    console.log (pedido)
    navigation.navigate('CorteRapidoFinalizarPerfilScreen', { pedido })

  }

  const handleBarbaBigode = () => {
    const pedido = {barbeiro: barberObj, opcoes: {tipoDeCorte: "rapido", corte: "barbabigode"}}
    console.log (pedido)
  }

  const handleCabeloBarbaBigode = () => {
    const pedido = {barbeiro: barberObj, opcoes: {tipoDeCorte: "rapido", corte : "cabelobarbabigode" }}
    console.log (pedido)
  }


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

        <Text>Selecione Corte</Text>

        <Card >
            <CardItem button onPress={handleCabelo}>
              <Body>
                <Text>
                   Cabelo
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem button onPress={handleBarbaBigode}>
              <Body>
                <Text>
                   Barba e bigode
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem button onPress={handleCabeloBarbaBigode}>
              <Body>
                <Text>
                   Cabelo barba e bigode
                </Text>
              </Body>
            </CardItem>
          </Card>

        </Content>


        
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
      </Container>
    </Container>
  );

}
export default CorteRapidoSelecioneCorteScreen;

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
