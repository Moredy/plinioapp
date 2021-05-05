import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion, List, ListItem, CheckBox } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

function CriarPerfilEquipeMedica({ navigation }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleCreateAccount = () => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {

        navigation.navigate('DashboardEquipeMedica')

        writeUserData(user.user.uid, name, email, phone)

      })
      .catch((error) => {

        console.log(error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });

  }

  function writeUserData(userId, name, email, phone) {
    firebase.database().ref('equipemedica/' + userId).set({
      name: name,
      email: email,
      phone: phone,

    });
  }

  return (

    <Container>

      <Header>
        <Left />
        <Body>
          <Title>Crie seu perfil de Equipe Médica</Title>
        </Body>
        <Right />
      </Header>



      <Container style={styles.container}>

        <Content style={styles.container2}>

          <Item stackedLabel style={{ marginBottom: "5%" }}>
            <Label>Nome</Label>
            <TextInput onChangeText={text => setName(text)} />
          </Item>

          <Item stackedLabel style={{ marginBottom: "5%" }} >
            <Label>Telefone</Label>
            <TextInput onChangeText={text => setPhone(text)} />
          </Item>

          <Item stackedLabel style={{ marginBottom: "5%" }}>
            <Label>Email</Label>
            <TextInput onChangeText={text => setEmail(text)} />
          </Item>

          
          <Item stackedLabel style={{ marginBottom: "5%" }} >
            <Label>Senha</Label>
            <TextInput onChangeText={text => setPassword(text)} />
          </Item>


        </Content>


        <Button title="Criar perfil de Equipe Médica" onPress={handleCreateAccount} />

        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />

      </Container>
    </Container>
  );

}
export default CriarPerfilEquipeMedica;

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
