import React, { Component, useState } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Input, Form, Item } from 'native-base';
import { Platafrom, StyleSheet, View, Image, TouchableOpacity, TouchableHighlight, Modal, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

import MainListCard from '../components/MainListCard'


export default function HomeScreen({ navigation }) {


  const saveSelectedPetOnLocalStorage = async (petId) => {

    try {
      await AsyncStorage.setItem('@selectedPet_id', petId)
    } catch (e) {
      // saving error
    }

  }

  const haddleSelectPet = async (petId) => {

    //Salva o pet no LocalStorage.
    saveSelectedPetOnLocalStorage(petId)

    navigation.navigate('PetInfoScreen')
    //Navegar para tela de adoção

  }


  return (
   
    <Container>


      <Content>


        <MainListCard
          name="Belinha"
          img={require('../assets/belinha.png')}
          subtitle="line number one"
          onPress={() => haddleSelectPet("abc123")}
        />

        <MainListCard
          name="Rubens"
          img={require('../assets/rubens.png')}
          subtitle="line number two"
          onPress={() => haddleSelectPet("abc321")}
        />

        <MainListCard
          name="Robinho"
          img={require('../assets/robinho.png')}
          subtitle="line number two"
          onPress={() => haddleSelectPet("adb333")}
        />
       
      </Content>
       

    </Container>

  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});