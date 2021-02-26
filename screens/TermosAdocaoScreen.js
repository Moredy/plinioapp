import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left , Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';

function TermosAdocaoScreen({ navigation }) {

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
    <Text>
      Ao adotar o animal acima descrito declaro-me apto para assumir a guarda e a responsabilidade sobre este animal, eximindo o doador de toda e
qualquer responsabilidade por quaisquer atos praticados pelo animal a partir desta data. Declaro ainda estar ciente de todos os cuidados que este
animal exige no que se refere à sua guarda e manutenção, além de conhecer todos os riscos inerentes à espécie no convívio com humanos,
estando apto a guardá-lo e vigiá-lo, comprometendo-me a proporcionar boas condições de alojamento e alimentação, assim como, espaço físico
que possibilite o animal se exercitar.

    </Text>

    <Button title="Finalizar adoção" onPress={successMessage} />


    </Container>

     
  );

}
export default TermosAdocaoScreen;

