import React, { Component, useState, useEffect } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Input, Form, Item } from 'native-base';
import { Platafrom, StyleSheet, View, Image, TouchableOpacity, TouchableHighlight, Modal, Button, TextInput, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

import MainListCard from '../components/MainListCard'

import {
  petList,
} from "../variables/petList.js";

export default function HomeScreen({ navigation }) {




  const saveSelectedPetOnLocalStorage = async (petId) => {

    try {
      await AsyncStorage.setItem('@selectedPet_id', `${petId}`)
    } catch (e) {
      // saving error
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

        <Button
          style={{ fontSize: 20, color: 'green' }}
          styleDisabled={{ color: 'red' }}
          onPress={() => firebase.auth().signOut()}
          title="Deslogar"
        >
          Deslogar
        </Button>

      </Content>
    </Container>

  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5'
  }
});
