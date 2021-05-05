import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, ListItem, Radio } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';



import MainListCard from '../components/MainListCard'



function CorteRapidoPagamento({ navigation }) {


    const barberRequest = navigation.getParam('barberRequest', 'NO-ID')

    const [formaDePagamento, setFormaDePagamento] = useState("dinheiro");

    const handleProsseguir = (barberRequest) => {

        console.log (barberRequest)
        Alert.alert(
            "Verifique os dados do barbeiro antes pagar",

            "Barbeiro: " + barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].name + "\n" +
            "Especialidades: " +  barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].specialties ,
            [
              {
                text: "Refazer",
                onPress: () => navigation.navigate('HomeScreen'),
                style: "cancel"
              },

              { text: "Pagar com " + formaDePagamento, onPress: () => handlePagamento(formaDePagamento, barberRequest) }
            ]
          );
    }

    function makeid(length) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * 
     charactersLength)));
       }
       return result.join('');
    }


    const handlePagamento = (formaDePagamento, barberRequest) => {

        if (formaDePagamento == "Dinheiro")
        {
           //PAGAR COM DINHEIRO


           console.log(barberRequest) 

           const idreq = makeid(24)
  
           firebase.database().ref('requests/' + Object.keys(barberRequest.pedido.barbeiro)[0] + "/" + idreq).set({
            barberRequest, status: "open" });

            navigation.navigate('CorteRapidoAguardandoBarbeiro', { barberRequest , status: "open", idreq })
        

        } 
        else if (formaDePagamento == "Cartão De Crédito") 
        {
            //PAGAR COM CARTÃO

        }

    }



    return (
        <Container>


            <Content>
                <Header />
                <Content>
                    <ListItem onPress={() => setFormaDePagamento("Dinheiro")}>
                        <Left>
                            <Text>Dinheiro</Text>
                        </Left>
                        <Right>
                        {formaDePagamento == 'Dinheiro' ? 
                                <Radio selected={true} />
                            : <Radio selected={false} />}
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => setFormaDePagamento("Cartao De Crédito")}>
                        <Left>
                            <Text>Cartão de Crédito</Text>
                        </Left>
                        <Right>
                            {formaDePagamento == 'Cartao De Crédito' ? 
                                <Radio selected={true} />
                            : <Radio selected={false} />}
                           
                        </Right>
                    </ListItem>
                </Content>
            </Content>

            {/*
            <Text> Pagamento </Text>

            <Text> Cliente  </Text>
            <Text> Nome: {barberRequest.cliente.first_name} {barberRequest.cliente.last_name}</Text>
            <Text> Email : {barberRequest.cliente.gmail} </Text>
            <Text> Endereço: {barberRequest.cliente.adress} </Text>
            <Text> Telefone: {barberRequest.cliente.phone} </Text>

            <Text> Barbeiro </Text>
            <Text> Nome: {barberRequest.pedido.barbeiro.name} </Text>
            <Text> Descrição: {barberRequest.pedido.barbeiro.description} </Text>
            <Text> Rating: {barberRequest.pedido.barbeiro.rating} </Text>
            <Text> Genero: {barberRequest.pedido.barbeiro.gender} </Text>


            <Text> Pedido </Text>
            <Text> Corte: {barberRequest.pedido.opcoes.corte} </Text>
            <Text> Tipo: {barberRequest.pedido.opcoes.tipoDeCorte} </Text>

            */}
            <Button title="Prosseguir" onPress={() => handleProsseguir(barberRequest)} />
        </Container>

    )


}

export default CorteRapidoPagamento;