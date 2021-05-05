import React, { Component, useState, useEffect } from 'react'
import firebase from 'firebase';
import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion, Text, Button } from 'native-base';
import { Switch, StyleSheet, ActivityIndicator } from "react-native";




function Dashboard({ navigation }) {

  useEffect(() => {

    getUserInfoFromDatabase();

  }, [navigation]);



  const user = firebase.auth().currentUser;

  const getUserInfoFromDatabase = () => {

    firebase.database().ref('/pacientes/' + user.uid).on('value', (snapshot) => {
      if (snapshot.val()) {

        setName(snapshot.val().name)
        setPhone(snapshot.val().phone)
        setEmail(snapshot.val().email)
        setSymptoms(snapshot.val().symptoms)
        setState(snapshot.val().state)

      }
    });

  }

  //Informações do Paciente
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("")
  const [symptoms, setSymptoms] = useState();

  return (
    <Content style={{ marginTop: 50 }}>
      {name && phone && email && symptoms && state ?
        <Content>
          <Text>Status: {state} </Text>
          <Text>Nome: {name} </Text>
          <Text>Telefone: {phone} </Text>
          <Text>Email: {email} </Text>

          <Text>Sintomas:</Text>

          {symptoms[0] ? <Text> - Tosse seca e persistente </Text> : null}
          {symptoms[1] ? <Text> - Febre acima de 38º C </Text> : null}
          {symptoms[2] ? <Text> - Cansaço excessivo </Text> : null}
          {symptoms[3] ? <Text> - Dor muscular generalizada </Text> : null}
          {symptoms[4] ? <Text> - Dor de cabeça </Text> : null}
          {symptoms[5] ? <Text> - Garganta inflamada </Text> : null}
          {symptoms[6] ? <Text> - Coriza ou nariz entupido </Text> : null}
          {symptoms[7] ? <Text> - Alterações do trânsito intestinal, principalmente diarreia </Text> : null}
          {symptoms[8] ? <Text> - Perda de gosto e olfato </Text> : null}



        </Content> : <ActivityIndicator size="large" color="#0000ff" />}

      {/* <HistoricoMedico user={user}/>*/}


      <Button onPress={() =>
        firebase.auth().signOut().then(() => {
          navigation.navigate('HomeScreen')
        })
      }><Text>Sair</Text></Button>

      <Button onPress={() =>
        navigation.navigate('Mensagens')
      }><Text>Mensagens</Text></Button>



    </Content>


  )

}

export default Dashboard;