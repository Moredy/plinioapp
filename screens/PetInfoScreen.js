import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text } from 'native-base';


function PetInfoScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <Text>PetInfoScreen</Text>
 

        <Button title="Adotar" onPress={() => navigation.navigate('PetInfoControlScreen')} />

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
