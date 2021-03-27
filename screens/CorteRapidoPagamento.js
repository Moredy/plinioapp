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

function CorteRapidoPagamento({ navigation }) {


    const barberRequest = navigation.getParam('barberRequest', 'NO-ID')

    console.log (barberRequest)

        return (
            <Container>
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


                <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
            </Container>
            
        )

    
}

export default CorteRapidoPagamento;