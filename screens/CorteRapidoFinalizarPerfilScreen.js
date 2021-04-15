import React, { Component, Fragment  } from "react";
import { View, Image, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";

import { getPixelSize } from "../utils/utils";
import firebase from 'firebase';
import Search from "../components/Search/Search";
import Directions from "../components/Directions/Directions";
import Details from "../components/Details/Details";
import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Text } from 'native-base';
import markerImage from "../assets/marker.png";
import backImage from "../assets/back.png";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./CorteRapidoFinalizarPerfilScreenStyles";

Geocoder.init("AIzaSyC8Y1Mk54q326CdAqQEMSbtmcYCbhmaDcc");

let userUid;

export default class CorteRapidoFinalizarPerfilScreen extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  };



  async componentDidMount() {

    try {
   
      var user = firebase.auth().currentUser;
      
      userUid = user.uid
      } catch(err) {
      
      }

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, //sucesso
      () => { }, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;


    this.setState({
      destination: {
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
        title: data.structured_formatting.main_text,

      }
    });
  };


  setDestination(coords) {


    this.setState({
      destination: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }
    });

  }

  handleBack = () => {
    this.setState({ destination: null });
  };

  writeNewUserData = (region, adressNote) => {

    if (this.state.adressNote) {


      firebase.database().ref('users/' + userUid + '/location').update({
        adressNote: adressNote,
        latitude: region.latitude,
        longitude: region.longitude
      });

    }

  }


  handleSolicitarBarbeiroNaMarcacao = async (destination, adressNote, pedido) =>{
    
    this.writeNewUserData(destination, adressNote)

    const barberRequest = { pedido, cliente: await this.getUserData() };

    console.log(barberRequest)

    this.props.navigation.navigate('CorteRapidoPagamento', { barberRequest })

  }

  handleUtilizarPosicaoAtual = async (region, adressNote, pedido) =>{

    this.writeNewUserData(region, adressNote)

    const barberRequest = { pedido, cliente: await this.getUserData() };

    console.log(barberRequest)

    this.props.navigation.navigate('CorteRapidoPagamento', { barberRequest })

  }

  getUserData = async () => {

    let userDataObj;
    console.log("ID_CONSOLE")

    await firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
      if (snapshot.val()) {
        userDataObj = {
          first_name: snapshot.val().first_name,
          last_name: snapshot.val().last_name,
          gmail: snapshot.val().gmail,
          created_at: snapshot.val().created_at,
          profile_picture: snapshot.val().profile_picture,
          location: snapshot.val().location
        }
      }
    });

    console.log (userDataObj)

    return userDataObj;

  }



  render() {


    const { region, destination, duration, location, adressNote } = this.state;


    const pedido = this.props.navigation.getParam('pedido', 'NO-ID');



    return (
      <View style={{ flex: 1 }}>

        <MapView
          style={{ flex: 1 }}
          region={destination ? destination : region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <Fragment>
              {/*
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  });
                }}
              />
              */}
              <Marker
                draggable
                coordinate={destination}
                anchor={{ x: 0.5, y: 1 }}
                image={markerImage}
                onDragEnd={(e) => { this.setDestination(e.nativeEvent.coordinate) }}
              >
                {destination.title ?
                  <LocationBox style={{ marginLeft: 20, marginTop: 42 }}>
                    <LocationText>{destination.title}</LocationText>
                  </LocationBox> : null}
              </Marker>

              <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MINN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>



            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>

          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}

        <Item stackedLabel style={{height: 120}}>
          <Label >Seja especifico</Label>
          <Input onChangeText={text => this.setState({ adressNote: text })}   placeholder="Número da casa, Apartamento, Bloco..." />
        </Item>

        {destination && adressNote ? (
          <Button title="Solicitar barbeiro na marcação" onPress={() => this.handleSolicitarBarbeiroNaMarcacao(destination, adressNote, pedido)} >Solicitar barbeiro na marcaçãol</Button>
        ) :
          region && adressNote ? (
            <Button title="Utilizar posição atual" onPress={() => this.handleUtilizarPosicaoAtual(region, adressNote, pedido)}> Utilizar posição atual</Button>
          ) : null}



      </View>
    );
  }
}