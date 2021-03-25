import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';

function TermosAdocaoScreen({ navigation }) {

  const petObj = navigation.getParam('petObj', 'NO-OBJ')

  let userUid;

  var user = firebase.auth().currentUser;


  if (user) {
    userUid = user.uid
  } else {
    // No user is signed in.
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



  const successMessage = () => {
    Alert.alert(
      "Pedido para adoção",
      "Seu pedido foi registrado com sucesso, agora você pode acompanhar o processo de adoção em `Minhas Adoções`. ",
      [
        {
          text: "Voltar para home",
          onPress: () => navigation.navigate('HomeScreen'),
          style: "cancel"
        },
        { text: "Ir para minhas adoções", onPress: () => navigation.navigate('MinhasAdocoesScreen') }
      ],
      { cancelable: false }
    );

  }


  return (
    <Container>

      <Content>
      <Card style={{marginTop: 20}}>

        <CardItem header>
          <Text>TERMOS DE ADOÇÃO</Text>
        </CardItem>

        <CardItem>
          <Body>
            <Text>
              Ao adotar <Text style={{fontWeight: "bold"}}> {petObj.name}</Text>, eu <Text style={{fontWeight: "bold"}}> {user.displayName} </Text> declaro-me apto para assumir a guarda e a responsabilidade sobre este animal, eximindo o doador de toda e
              qualquer responsabilidade por quaisquer atos praticados pelo animal a partir desta data. Declaro ainda estar ciente de todos os cuidados que este
              animal exige no que se refere à sua guarda e manutenção, além de conhecer todos os riscos inerentes à espécie no convívio com humanos,
              estando apto a guardá-lo e vigiá-lo, comprometendo-me a proporcionar boas condições de alojamento e alimentação, assim como, espaço físico
              que possibilite o animal se exercitar.

              Responsabilizo-me por preservar a saúde e integridade do animal e a submetê-lo aos cuidados médico veterinários sempre que necessário para
este fim. Comprometo-me a não transmitir a posse deste animal a outrem sem o conhecimento do doador. Comprometo-me também, a
permitir o acesso do doador ao local onde se encontra o animal para averiguação de suas condições. Comprometo-me também, a
permitir o acesso do doador ao local onde se encontra o animal para averiguação de suas condições.

            </Text>
          </Body>
        </CardItem>
      </Card>

      <Button title="Eu concordo com os termos de adoção" onPress={() => { successMessage(); writeNewAdoptRequest() }} />

      </Content>
    </Container>


  );

}
export default TermosAdocaoScreen;

