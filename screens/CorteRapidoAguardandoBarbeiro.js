import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CorteRapidoAguardandoBarbeiro({ navigation }) {

    const barberRequest = navigation.getParam('barberRequest', 'NO-ID')
    const idreq = navigation.getParam('idreq', 'NO-ID')

    console.log("S")
    console.log(barberRequest)

    useEffect(() => {
        redirectToIncomeCallsIfIncome()
        cancelWatcherRequests()
        storeIdReq(idreq)
        saveBarberRequest(barberRequest)
        console.log(idreq)
        //console.log (Object.keys(barberRequest.pedido.barbeiro)[0] + "DA")

    }, [navigation]);

    const storeIdReq = async (idreq) => {
        try {
            await AsyncStorage.setItem('idreq', `${idreq}`);
        } catch (error) {
            console.log(error)
        }
    };

    const saveBarberRequest = async (barberRequest) => {
        try {
            await AsyncStorage.setItem('barberRequest', JSON.stringify(barberRequest));
        } catch (error) {
            console.log(error)
        }
    };

    const clearIdReq = async () => {
        try {
            await AsyncStorage.setItem('idreq', ``);
        } catch (error) {
            console.log(error)
        }
    };

    const clearRequest = async () => {
        try {
            await AsyncStorage.setItem('barberRequest', '');
        } catch (error) {
            console.log(error)
        }
    };

    const cancelWatcherRequests = () => {
        firebase.database().ref('/requests/' + Object.keys(barberRequest.pedido.barbeiro)[0] + "/" + idreq).on('value', (snapshot) => {
            // console.log("----------")
            //console.log(snapshot.val()[Object.keys(snapshot.val())[0]])



            if (!snapshot.val()) {

                firebase.database().ref('/incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0] + "/" + idreq).once('value').then(async (snapshot) => {
                    if (!snapshot.val()) {

                        navigation.navigate('HomeScreen')
                        console.log("AQUI")

                    }
                });


            }

        });
    }

    const removeClientRequests = (barberUid) => {
        clearIdReq()
        clearRequest()

        firebase.database().ref('/requests/' + barberUid).once('value').then(async (snapshot) => {
            if (snapshot.val()) {

                //console.log(Object.keys(snapshot.val())[0])

                const idreq = Object.keys(snapshot.val())[0]

                firebase.database().ref('requests/' + barberUid + '/' + idreq).remove().then(() => {
                    console.log("IA")
                    navigation.navigate('HomeScreen')
                })
            }

        });

    }

    const redirectToIncomeCallsIfIncome = () => {

        firebase.database().ref('/incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0]).on('value', (snapshot) => {
            if (snapshot.val()) {
                const idreq = Object.keys(snapshot.val())[0]

              
                //console.log(requestId)
                navigation.navigate('CorteRapidoIncomeScreen', { barberRequest , idreq })
            }

        });

    }





    //console.log ("============================")

    //console.log (Object.keys(barberRequest.pedido.barbeiro)[0])


    return (
        <Container>
            <Content>
                <Text> Aguardando barbeiro </Text>
                <Button title="Cancelar pedido" onPress={() => removeClientRequests(Object.keys(barberRequest.pedido.barbeiro)[0])}> Cancelar pedido</Button>
            </Content>
        </Container>
    )

}

export default CorteRapidoAguardandoBarbeiro;