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

function CorteRapidoFinalizarPerfilScreen({ navigation }) {

  const handleBackButtonClick = () => {
    navigation.goBack(null); // Pula a loading screen.
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, []); 


  
  const pedido = navigation.getParam('pedido', 'NO-ID')

  

  const handleFinalizarPerfil = async () => {

    writeNewUserData()

    if (await writeNewAdoptRequest(pedido) == 1) {
      const barberRequest = {pedido, cliente: await getUserData()};
      //console.log("Pula pra proxima etapa _>" + barberRequest)
      navigation.navigate('CorteRapidoPagamento' , { barberRequest })
    }
    else {
      alert("Ocorreu algum erro :( ")
    }

  }

  const getUserData = async () => {

    let userDataObj;

    await firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
      if (snapshot.val()) {
        userDataObj = {
          first_name: snapshot.val().first_name,
          last_name: snapshot.val().last_name,
          gmail: snapshot.val().gmail,
          adress: snapshot.val().adress,
          created_at: snapshot.val().created_at,
          phone: snapshot.val().phone,
          profile_picture: snapshot.val().profile_picture
        }
      }
    });

    return userDataObj;

  }

  const writeNewUserData = () => {

    if (adress && phone) {

      firebase.database().ref('users/' + userUid).update({
        adress: adress,
        phone: phone
      });

    }

  }


  const writeNewAdoptRequest = async (pedido) => {

    let userDataObj;

    await firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
      if (snapshot.val()) {
        userDataObj = {
          first_name: snapshot.val().first_name,
          last_name: snapshot.val().last_name,
          gmail: snapshot.val().gmail,
          adress: snapshot.val().adress,
          created_at: snapshot.val().created_at,
          phone: snapshot.val().phone,
          profile_picture: snapshot.val().profile_picture
        }
      }
    });

    const barberRequest = {pedido, cliente: {userDataObj}};

    console.log(barberRequest)

    if (pedido && userDataObj) {
      return 1; //Sucess return
    }

  }


  let userUid;

  var user = firebase.auth().currentUser;

  if (user) {
    userUid = user.uid
  } else {
    // No user is signed in.
  }

  const [adressStatic, setAdressStatic] = useState("loading");
  const [phoneStatic, setPhoneStatic] = useState("loading");


  firebase.database().ref('/users/' + userUid).once('value').then(async (snapshot) => {
    if (snapshot.val()) {
      //console.log (snapshot.val().adress)
      
      setAdressStatic(snapshot.val().adress)
      setPhoneStatic(snapshot.val().phone)

      //Caso o endereço e o telefone já estiverem cadastrados ele pula a etapa
      if (snapshot.val().adress && snapshot.val().phone) {
        

        const barberRequest = {pedido, cliente: await getUserData()};
       // console.log(barberRequest)
        navigation.navigate('CorteRapidoPagamento' , { barberRequest })

      }


    }
  });

  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");


  return (

    <Container>



      <Container style={styles.container}>

        <Content style={styles.container2}>

        <Text>Finalizar perfil</Text>

        {adressStatic == "loading" || phoneStatic == "loading" ? (
            <Item stackedLabel>
              <ActivityIndicator size="large" color="#0000ff" />
            </Item>
          ) : null}

          {!adressStatic ? (
            <Item stackedLabel style={{ marginBottom: "5%" }}>
              <Label>Endereço</Label>
              <TextInput onChangeText={text => setAdress(text)} />
            </Item>
          ) : null}

          {!phoneStatic ? (
            <Item stackedLabel style={{ marginBottom: "5%" }} >
              <Label>Telefone</Label>
              <TextInput onChangeText={text => setPhone(text)} />
            </Item>
          ) : null}


        </Content>

        {phone && adress || adressStatic && phoneStatic ? (
            <Button title="Efetuar pagamento" onPress={handleFinalizarPerfil} />
          ) : <Button disabled title="Gostaria de aplicar para adoção" />}

  
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
      </Container>
    </Container>
  );

}
export default CorteRapidoFinalizarPerfilScreen;

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
