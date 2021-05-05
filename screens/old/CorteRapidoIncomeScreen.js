import React, { Component, useState, useEffect, Fragment , useRef} from 'react';
import { View, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Text, BackHandler } from 'react-native';
import MapView, { Marker } from "react-native-maps";

import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle } from 'native-base';
import firebase from 'firebase';
import { NavigationNativeContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions } from 'react-native';
import Geocoder from "react-native-geocoding";
import markerImage from "../assets/marker.png";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./CorteRapidoIncomeScreenStyles";

function CorteRapidoIncomeScreen({ navigation }) {

  const barberRequest = navigation.getParam('barberRequest', 'NO-REQUEST')
  const idreq = navigation.getParam('idreq', 'NO-ID')

  const [nomeDoBarbeiro, setNomeDoBarbeiro] = useState("");
  const [localizacaoDoBarbeiro, setLocalizacaoDoBarbeiro] = useState();
  const [telefoneDoBarbeiro, setTelefoneDoBarbeiro] = useState("");
  const [especialidadesDoBarbeiro, setEspecialidadesDoBarbeiro] = useState("");


  const [nomeDoCliente, setNomeDoCliente] = useState("");
  const [localizacaoDoCliente, setLocalizacaoDoCliente] = useState();

  Geocoder.init("AIzaSyC8Y1Mk54q326CdAqQEMSbtmcYCbhmaDcc");

  // Mapa
  const [region, setRegion] = useState();
  const [destination, setDestination] = useState();
  const [duration, setDuration] = useState();
  const [location, setLocation] = useState();
  
  const mapRef = useRef(null);


  useEffect(() => {



    getIncomeDataRealTime()
    cancelWatcher()
  }, [navigation]);


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

  const cancelWatcher = () => {
    firebase.database().ref('/incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0]).on('value', (snapshot) => {
      if (!snapshot.val()) {

        navigation.navigate('HomeScreen')
      }

    });
  }

  const cancelRequest = () => {
    clearIdReq()
    clearRequest()

    firebase.database().ref('incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0]).remove().then(
      () => {
        navigation.navigate('HomeScreen')
      }
    )
  }

  const getIncomeDataRealTime = () => {
    console.log('incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0] + "/" + idreq)

    firebase.database().ref('incomeCalls/' + Object.keys(barberRequest.pedido.barbeiro)[0] + "/" + idreq).on('value', (snapshot) => {
      if (snapshot.val()) {

        //Text - Barbeiro
        setNomeDoBarbeiro(snapshot.val().barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].name)
        setLocalizacaoDoBarbeiro(snapshot.val().barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].location)
        setTelefoneDoBarbeiro(snapshot.val().barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].phone)
        setEspecialidadesDoBarbeiro(snapshot.val().barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].specialties)

        //Text - Cliente
        setNomeDoCliente(snapshot.val().barberRequest.cliente.first_name + " " + snapshot.val().barberRequest.cliente.last_name)
        setLocalizacaoDoCliente(snapshot.val().barberRequest.cliente.location)


        //Mapa - Barbeiro
        setRegion({
          latitude: snapshot.val().barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].location.coords.latitude,
          longitude: snapshot.val().barberRequest.pedido.barbeiro[Object.keys(barberRequest.pedido.barbeiro)[0]].location.coords.longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134
        })

        console.log (region)


        //Mapa - Cliente
        setDestination({
          latitude: snapshot.val().barberRequest.cliente.location.latitude,
          longitude: snapshot.val().barberRequest.cliente.location.longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134
        })

        console.log (destination)

      }

    }
    )
  }
  

  return (
    <Container>
      {region && destination ? (

        <View style={{ flex: 1 }}>

          <MapView
            style={{ flex: 1 }}
            region={destination}
            showsUserLocation
            loadingEnabled
            ref={mapRef}

          >
            <Fragment>
            
              <Marker
                coordinate={region}
                anchor={{ x: 0.5, y: 1 }}
                image={markerImage}
              >
              </Marker>

              <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={markerImage}>
              </Marker>

            </Fragment>


          </MapView>

          <Button title="Cancelar pedido" onPress={cancelRequest} ><Text>Cancelar pedido</Text></Button>


        </View>
      ) : null}

    </Container>
    /*
  <Text> Barbeiro</Text>
  <Text> Nome: {nomeDoBarbeiro ? nomeDoBarbeiro : null}</Text>
  <Text> Telefone: {telefoneDoBarbeiro} </Text>
  <Text> Latitude: {localizacaoDoBarbeiro ? localizacaoDoBarbeiro.coords.latitude : null}</Text>
  <Text> Longitude: {localizacaoDoBarbeiro ? localizacaoDoBarbeiro.coords.longitude : null}</Text>
  <Text> Especialidades: {especialidadesDoBarbeiro}</Text>


  <Text> Cliente</Text>
  <Text> Nome: {nomeDoCliente ? nomeDoCliente : null}</Text>
  <Text> Latitude: {localizacaoDoCliente ? localizacaoDoCliente.latitude : null}</Text>
  <Text> Longitude: {localizacaoDoCliente ? localizacaoDoCliente.longitude : null}</Text>

*/





  )

}

export default CorteRapidoIncomeScreen;
