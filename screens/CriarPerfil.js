import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion, List, ListItem, CheckBox } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

function CriarPerfil({ navigation }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);


  const handleCreateAccount = () => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {

        navigation.navigate('Dashboard')

        writeUserData(user.user.uid, name, email, phone , cpf, cidade, estado, checked1 , checked2, checked3, checked4, checked5, checked6, checked7, checked8, checked9)

      })
      .catch((error) => {

        console.log(error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });

  }

  function writeUserData(userId, name, email, phone, cpf, cidade, estado, checked1 , checked2, checked3, checked4, checked5, checked6, checked7, checked8, checked9) {
    firebase.database().ref('pacientes/' + userId).set({
      name: name,
      email: email,
      phone: phone,
      cpf: cpf,
      cidade: cidade,
      estado: estado,
      symptoms: [checked1, checked2, checked3, checked4, checked5, checked6 , checked7 ,checked8, checked9],
      state: "Em análise"
    });
  }

  return (

    <Container>

      <Header>
        <Left />
        <Body>
          <Title>Crie seu perfil</Title>
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

          <Item stackedLabel style={{ marginBottom: "5%" }} >
            <Label>CPF</Label>
            <TextInput onChangeText={text => setCpf(text)} />
          </Item>

          <Item stackedLabel style={{ marginBottom: "5%" }} >
            <Label>Cidade</Label>
            <TextInput onChangeText={text => setCidade(text)} />
          </Item>

          <Item stackedLabel style={{ marginBottom: "5%" }} >
            <Label>Estado</Label>
            <TextInput onChangeText={text => setEstado(text)} />
          </Item>

          <Item stackedLabel style={{ marginBottom: "5%" }}>
            <Label>Email</Label>
            <TextInput onChangeText={text => setEmail(text)} />
          </Item>

          
          <Item stackedLabel style={{ marginBottom: "5%" }} >
            <Label>Senha</Label>
            <TextInput onChangeText={text => setPassword(text)} />
          </Item>

          <List>
            <ListItem onPress={() => setChecked1(!checked1)}>
              <CheckBox checked={checked1} />
              <Text>Tosse seca e persistente: 1</Text>
            </ListItem>

            <ListItem onPress={() => setChecked2(!checked2)}>
              <CheckBox checked={checked2} />
              <Text>Febre acima de 38º C: 2</Text>
            </ListItem>

            <ListItem onPress={() => setChecked3(!checked3)}>
              <CheckBox checked={checked3} />
              <Text>Cansaço excessivo: 3</Text>
            </ListItem>

            <ListItem onPress={() => setChecked4(!checked4)}>
              <CheckBox checked={checked4} />
              <Text>Dor muscular generalizada: 4</Text>
            </ListItem>

            <ListItem onPress={() => setChecked5(!checked5)}>
              <CheckBox checked={checked5} />
              <Text>Dor de cabeça: 5</Text>
            </ListItem>

            <ListItem onPress={() => setChecked6(!checked6)}>
              <CheckBox checked={checked6} />
              <Text>Garganta inflamada: 6</Text>
            </ListItem>

            <ListItem onPress={() => setChecked7(!checked7)}>
              <CheckBox checked={checked7} />
              <Text>Coriza ou nariz entupido: 7</Text>
            </ListItem>

            <ListItem onPress={() => setChecked8(!checked8)}>
              <CheckBox checked={checked8} />
              <Text>Alterações do trânsito intestinal, principalmente diarreia: 8</Text>
            </ListItem>

            <ListItem onPress={() => setChecked9(!checked9)}>
              <CheckBox checked={checked9} />
              <Text>Perda de gosto e olfato: 9</Text>
            </ListItem>

          </List>




        </Content>


        <Button title="Criar perfil de paciente" onPress={handleCreateAccount} />



        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />

      </Container>
    </Container>
  );

}
export default CriarPerfil;

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
