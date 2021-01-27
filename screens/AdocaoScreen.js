import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text } from 'native-base';
import firebase from 'firebase';

function AdocaoScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <Text>AdocaoScreen</Text>
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        <Button title="Voltar para home" onPress={() => navigation.navigate('HomeScreen')} />
      

      </View>
    );

}
export default AdocaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
