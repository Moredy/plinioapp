import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class HomeControlScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        if (user) {
          firebase.database().ref('/users/' + user.uid).once('value').then( async (snapshot) => {
            if (snapshot.val()) {
            
              this.props.navigation.navigate('HomeScreen', { user });

            } else {
              alert("Você ainda não possui uma conta de usuário, por favor crie uma logando com sua conta google")
              this.props.navigation.navigate('LoginScreen');
            }
        
          });
         

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
export default HomeControlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
