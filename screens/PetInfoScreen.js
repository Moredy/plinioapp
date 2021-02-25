import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right, Thumbnail, Subtitle, Icon } from 'native-base';
import { Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  petList,
} from "../variables/petList.js";
import ConvertDate from '../components/ConvertDate.js';

function PetInfoScreen({ navigation }) {

  const petId = navigation.getParam('petId', 'NO-ID')

  const imageHeight = 400;

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
  }

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  });


  const getPetInfo = (petId) => {

    for (let i = 0; i < petList.length; i++) {
      if (petList[i].id == petId) {
        return petList[i]
      }

    }

  }

  const petObj = getPetInfo(petId);

  //console.log (getPetInfo (petId))

  return (

    <Container style={{ flex: 1 }}>

<Content>
      <Image
        source={{ uri: petObj.thumbnail }}
        style={{ width: "100%", height: imageHeight, top: 0, position: 'absolute' }}
      />

      {/*</Container><Container style={{
          width: "100%", height: 320, position: 'absolute',
          bottom: 0, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: "#fff"
        }} >*/}

      {/*
        <Text>PetInfoScreen</Text>
        <Text>Id: {petObj.id}</Text>
        <Text>Name: {petObj.name}</Text>
        <Text>Description: {petObj.description}</Text>
        <Text>Gender: {petObj.gender}</Text>
        <Text>Region: {petObj.region}</Text>
        <Text>Data de Nascimento: {petObj.bornDate}</Text>
        <Text>Thumbnail: {petObj.thumbnail}</Text>
        <Text>Tags: {petObj.tags}</Text>
        */}



      <View style={{marginTop: imageHeight-40, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: "#fff"}}>
      <Card transparent >
        <CardItem CardItem style={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}} >
          <Text>{petObj.name}</Text>
          <Right>
            <Body>
              {petObj.gender == "male" ? (
                <MaterialCommunityIcons name="gender-male" size={24} color="black"><Text style={text.iconText}>Macho</Text></MaterialCommunityIcons>
              )
                : <MaterialCommunityIcons name="gender-female" size={24} color="black"><Text style={text.iconText}>Fêmea</Text></MaterialCommunityIcons>}
            </Body>
          </Right>
          <Text><ConvertDate bornDate={petObj.bornDate}></ConvertDate></Text>
        </CardItem>

        <CardItem>
          <Text>{petObj.region}</Text>
        </CardItem>

        <CardItem>
          <Body>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={{ lineHeight: 21 }}>{petObj.description} dada ada ad ada adada a da a  dada ada ad ada adada a da adada ada ad ada adada a da adada ada ad ada adada a da adada ada ad ada adada a da a</Text>
            {
              lengthMore ? <Text
                onPress={toggleNumberOfLines}
                style={{ lineHeight: 21, marginTop: 10 }}>{textShown ? 'Leia menos...' : 'Leia mais...'}</Text>
                : null
            }
          </Body>
        </CardItem>
        <Button title="Adotar" onPress={() => navigation.navigate('AdocaoControlScreen', { petObj })} />
      <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />

      </Card>
      </View>
      </Content>
    </Container>




  );
}

export default PetInfoScreen;




const text = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "#000",
    //fontWeight: "bold",
    textAlign: "left",
    width: "100%",

    /*
    Debugger
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#000",
    */
  },
  subtitle: {
    fontSize: 10,
    color: "#525252",
    fontWeight: "bold",
    textAlign: "left",

  },
  iconText: {
    fontSize: 14,
    color: "#525252",
    textAlign: "left",

  },
});
