import React, { Component } from 'react';
import { View, StyleSheet, Button , Image} from 'react-native';
import { Text } from 'native-base';

import {
  petList,
} from "../variables/petList.js";

function PetInfoScreen({ navigation }) {

  const petId = navigation.getParam('petId', 'NO-ID')


  const getPetInfo = (petId) => {

    for (let i = 0 ; i < petList.length; i ++) {
      if (petList[i].id == petId) {
        return petList[i]
      }

    }
   
  }

  const petObj = getPetInfo(petId);

  //console.log (getPetInfo (petId))

    return (
      <View style={styles.container}>
              <Image
        source={{ uri: petObj.thumbnail }}
        style={{ width: "100%", height: 400, top: 0, position: 'absolute' }}
      />



        <View style={{ width: "100%", height: 320,  position: 'absolute',
  bottom:0 , borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: "#fff"}} >

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


        <View style={{ padding: 20}} 
        >
        <Text>{petObj.name}</Text>

        <Text>{petObj.description}</Text>

        <Button title="Adotar" onPress={() => navigation.navigate('AdocaoControlScreen', { petObj })} />
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
        </View>
        </View>

      </View>
    );

}
export default PetInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
