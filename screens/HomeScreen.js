import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


function HomeScreen({ navigation }) {

  useEffect(() => {
    checkIfLoggedIn()

});


const checkIfLoggedIn = () => {
  firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        //Verifica se usuário tem conta de paciente
      firebase.database().ref('/pacientes/' + user.uid).once('value').then( async (snapshot) => {
          if (snapshot.val()) {

            console.log (snapshot.val())

            navigation.navigate('Dashboard')

          } else {
            //Verifica se o usuario tem conta de equipe medica
            firebase.database().ref('/equipemedica/' + user.uid).once('value').then( async (snapshot) => {
              if (snapshot.val()) {
    
                navigation.navigate('DashboardEquipeMedica')
    
              }
            });
          }
      
       });

      } else {
        //Caso ele não possua conta.
      }
    }
  );
};


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {


        checkIfLoggedIn()

        //navigation.navigate('Dashboard')
      })
      .catch((error) => {
        alert(error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  return (


    <Container>

      <Container style={styles.container}>

        <Item stackedLabel style={{ marginBottom: "5%" }} >
          <Label>Email</Label>
          <TextInput onChangeText={text => setEmail(text)} />
        </Item>

        <Item stackedLabel style={{ marginBottom: "5%" }} >
          <Label>Senha</Label>
          <TextInput onChangeText={text => setPassword(text)} />
        </Item>

        <Button title="Entrar" onPress={handleLogin} />


        <Button title="Criar perfil de paciente" onPress={() => navigation.navigate('CriarPerfil')} />


        <Button title="Criar perfil de equipe médica" onPress={() => navigation.navigate('CriarPerfilEquipeMedica')} />

      </Container>
    </Container>
  );

}
export default HomeScreen;

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
