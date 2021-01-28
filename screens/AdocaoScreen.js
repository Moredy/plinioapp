import React, { Component , useState, useEffect  } from 'react';
import { View, StyleSheet, Button , TextInput , Alert } from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label , Text} from 'native-base';
import firebase from 'firebase';

function AdocaoScreen({ navigation }) {

  const petObj = navigation.getParam('petObj', 'NO-OBJ')

  let userUid;

  var user = firebase.auth().currentUser;

    if (user) {
      userUid = user.uid
    } else {
      // No user is signed in.
    }



  const writeNewUserData = () => {

    if (adress && phone) {

    firebase.database().ref('users/' + userUid).update({
      adress: adress,
      phone: phone
    });
    
  }

  }

  const successMessage = () => {
    Alert.alert(
      "Pedido para adoção",
      "Seu pedido foi registrado com sucesso, agora você pode acompanhar o processo de adoção em `Minhas Adoções`. ",
      [
        {
          text: "Voltar para home",
          onPress: () => navigation.navigate('HomeScreen'),
          style: "cancel"
        },
        { text: "Ir para minhas adoções", onPress: () => navigation.navigate('MinhasAdocoesScreen') }
      ],
      { cancelable: false }
    );

  }

  const writeNewAdoptRequest = async () => {

    let userDataObj;

    await firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
      if (snapshot.val()) {
        userDataObj = {
          first_name: snapshot.val().first_name,
          last_name: snapshot.val().last_name,
          gmail: snapshot.val().gmail,
          adress: snapshot.val().adress,
          created_at: snapshot.val().created_at,
          phone: snapshot.val().phone,
          profile_picture: snapshot.val().profile_picture
        }
      }
    });

    const adoptRequest = [petObj, userDataObj];

    //Pedido de adoção
    console.log (adoptRequest)

    if (petObj && userDataObj) {
      return 1; //Sucess return
    }
  }

  const  haddleConfirmAdopt = async () => {
   
    writeNewUserData()

    if (await writeNewAdoptRequest() == 1)
    {
      successMessage ()
    }
    else{
      alert ("Ocorreu algum erro :( ")
    }
    

  }

  
  const [adressStatic, setAdressStatic] = useState("");
  const [phoneStatic, setPhoneStatic] = useState("");




  firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
    if (snapshot.val()) {
      //console.log (snapshot.val().adress)
    setAdressStatic(snapshot.val().adress)
    setPhoneStatic(snapshot.val().phone)
    }
  });
  

  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");


  
    return (
      <View style={styles.container}>
        <Text>AdocaoScreen</Text>

        <Text>Leia os termos e caso necessário finalize o seu perfil para aplicar para adoção!</Text>

        <Text> TERMOSBLA BLA BALBALBLA BALBALBLA BALBALBLA BALBALBLA BALBALBLA BALBAL BLA BALBALBLA BALBALBLA BALBAL</Text>

        {!adressStatic ? (
            <Item stackedLabel>
              <Label>Endereço</Label>
              <TextInput onChangeText={text => setAdress(text)} />
            </Item>
        ) : null}

      {!phoneStatic ? (
      <Item stackedLabel>
        <Label>Telefone</Label>
        <TextInput onChangeText={text => setPhone(text)} />
      </Item>
      ) : null}

        { phone && adress || adressStatic && phoneStatic ? (
        <Button title="Eu concordo com os termos do aplicativo e gostaria de aplicar para adoção" onPress={haddleConfirmAdopt} />
        ) : null}

        <Text>Você está prestes a adotar {petObj.name}</Text>
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
