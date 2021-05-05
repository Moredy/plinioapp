import React, { Component, useState, useEffect } from 'react'
import firebase from 'firebase';
import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion, Text, Button } from 'native-base';
import { Switch, StyleSheet, ActivityIndicator } from "react-native";




function LerSintomas({ navigation }) {

    useEffect(() => {
        checkIfLoggedIn()

    },[navigation]);

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

    return (
        <Content style={{ marginTop: 50 }}>

                <Text>Normalmente os primeiros sintomas da COVID-19 aparecem 2 a 14 dias após uma possível exposição ao vírus, e incluem: </Text>
                <Text>Tosse seca e persistente; </Text>
                <Text>Febre acima de 38º C;</Text>
                <Text>Cansaço excessivo; </Text>
                <Text>Dor muscular generalizada;</Text>
                <Text>Dor de cabeça; </Text>
                <Text>Garganta inflamada; </Text>
                <Text>Coriza ou nariz entupido;</Text>
                <Text>Alterações do trânsito intestinal, principalmente diarreia;</Text>
                <Text>Perda de gosto e olfato.</Text>


                <Button title="Criar Perfil" onPress={() => navigation.navigate("CriarPerfil")}><Text>Criar Perfil</Text></Button>
                <Button title="Ir para Home" onPress={() => navigation.navigate("HomeScreen")}><Text>Ir para Home</Text></Button>

    </Content>


  )

}

export default LerSintomas;