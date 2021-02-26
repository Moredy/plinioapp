import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left , Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';

function AdocaoScreen({ navigation }) {

  const handleBackButtonClick = () => {
    navigation.goBack(null); // Pula a loading screen.
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, []); 

  const petObj = navigation.getParam('petObj', 'NO-OBJ')

  let userUid;

  var user = firebase.auth().currentUser;

  if (user) {
    userUid = user.uid
  } else {
    // No user is signed in.
  }



  const writeNewUserData = () => {

    if (adress && phone) {

      firebase.database().ref('users/' + userUid).update({
        adress: adress,
        phone: phone
      });

    }

  }



  const writeNewAdoptRequest = async () => {

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

    const adoptRequest = [petObj, userDataObj];

    //Pedido de adoção
    console.log(adoptRequest)

    if (petObj && userDataObj) {
      return 1; //Sucess return
    }
  }

  const haddleConfirmAdopt = async () => {

    writeNewUserData()

    if (await writeNewAdoptRequest() == 1) {
      navigation.navigate('TermosAdocaoScreen')
    }
    else {
      alert("Ocorreu algum erro :( ")
    }


  }


  const [adressStatic, setAdressStatic] = useState("loading");
  const [phoneStatic, setPhoneStatic] = useState("loading");




  firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
    if (snapshot.val()) {
      //console.log (snapshot.val().adress)
      
      setAdressStatic(snapshot.val().adress)
      setPhoneStatic(snapshot.val().phone)

      //Caso o endereço e o telefone já estiverem cadastrados ele pula a etapa
      if (snapshot.val().adress && snapshot.val().phone) {
        navigation.navigate('TermosAdocaoScreen')
      }


    }
  });


  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");



  return (

    <Container>

        <Header>
          <Left/>
          <Body>
            <Text style={styles.title}>Adotar {petObj.name} </Text>
         
          </Body>
          <Right />
        </Header>

      <Container style={styles.container}>


        <Text style={{ marginBottom: "5%" }}>Finalize o seu perfil para prosseguir com a adoção</Text>

        <Content style={styles.container2}>


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
            <Button title="Gostaria de aplicar para adoção" onPress={haddleConfirmAdopt} />
          ) : <Button disabled title="Gostaria de aplicar para adoção" onPress={haddleConfirmAdopt} />}

        {/*<Button title="Sign out" onPress={() => firebase.auth().signOut()} />*/}
        
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
      </Container>
    </Container>
  );

}
export default AdocaoScreen;

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
