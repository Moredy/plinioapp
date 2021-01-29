import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class AdocaoControlScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        if (user) {

          const petObj = this.props.navigation.getParam('petObj', 'NO-OBJ')

          this.props.navigation.navigate('AdocaoScreen', { petObj });
        } else {
          this.props.navigation.navigate('LoginScreen');
        }
      }.bind(this)
    );
  };
  
 
  

  render() {


    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
export default AdocaoControlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
