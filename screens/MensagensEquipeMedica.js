import React, { Component, useState, useEffect } from 'react'
import firebase from 'firebase';
import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion, Text, Button, Picker, Icon } from 'native-base';
import { Switch, StyleSheet, ActivityIndicator } from "react-native";
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast';


export default function Mensagenspacientes({ navigation }) {

    useEffect(() => {

        getpacientesInfoFromDatabase();
        getAllMsgDeUid();

     

    }, [navigation]);


    const convertUidpacientesParaNome = async (myMsgs) => {


        let myMsgsNew = myMsgs;
        console.log("AA")
        console.log (myMsgsNew)
        console.log("BB")

        console.log (myMsgsNew);

        for(let i =0 ; i< myMsgsNew.length ; i++) {
            await firebase.database().ref('/pacientes/' +  myMsgsNew[i].de + "/name/").once('value').then(async (snapshot) => {
                myMsgsNew[i].de = await snapshot.val();
               
              });
        }

       
        setMyMsgsNew(myMsgsNew)
      
    }


   


    function makeid(length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }

    const [selectedValue, setSelectedValue] = useState('');

    const [pacientes, setpacientes] = useState();

    const [mensagens, setMensagens] = useState();

    const [text, setText] = useState('');

    const [myMsgs, setMyMsgs] = useState('');
    
    const [myMsgsNew, setMyMsgsNew] = useState();

    //console.log (myMsgs)


    const getpacientesInfoFromDatabase = () => {
        firebase.database().ref('/pacientes/').on('value', (snapshot) => {
            if (snapshot.val()) {

                setpacientes(snapshot.val())

            }
        });
    }
    const user = firebase.auth().currentUser;

    const enviarMsg = () => {
        let msg = {
            de: user.uid,
            para: selectedValue,
            msg: text
        }

        setText("")

        Toast.show('Mensagem enviada com sucesso!');

        firebase.database().ref('/mensagens/' + makeid(25)).set(msg)

    }

    const getAllMsgDeUid = () => {


        let myMsg = [];

        firebase.database().ref('/mensagens/').on('value', (snapshot) => {

            if (!snapshot.val()) return;

            Object.keys(snapshot.val()).map((prop, key) => {

                firebase.database().ref('/mensagens/' + prop).once('value', (snapshot) => {

                    if (snapshot.val().para == user.uid) {
                        myMsg.push({
                            de: snapshot.val().de,
                            para: snapshot.val().para,
                            msg: snapshot.val().msg
                        })
                    }


                });




            })

            setMyMsgs(myMsg);

            convertUidpacientesParaNome(myMsg);
        });

        
    }

 
    


    return (
        <Container>
            <Content style={{ marginTop: 50 }}>
                <Text> Nova mensagem </Text>

                <Form>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        headerStyle={{ backgroundColor: "#b95dd3" }}
                        headerBackButtonTextStyle={{ color: "#fff" }}
                        headerTitleStyle={{ color: "#fff" }}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => {

                            setSelectedValue(itemValue)

                        }}
                    >
                        <Picker.Item label="Selecione o paciente" value="" />

                        {pacientes ? Object.keys(pacientes).map((prop, key) => {
                            return (
                                <Picker.Item label={pacientes[prop].name} value={prop} />
                            );

                        }) : null}


                    </Picker>
                </Form>

                <TextInput mode={"outlined"} style={{ marginLeft: 10, marginRight: 10 }}
                    label="Mensagem"
                    value={text}
                    onChangeText={text => setText(text)}
                />

                <Button onPress={enviarMsg}><Text>Enviar</Text></Button>

            </Content>



            <Content>

                <Text>Minhas mensagens</Text>

                {myMsgsNew ?

                    <Content>
                        
                        {myMsgsNew.map((prop, key) => {

                            //prop.de = await convertUidPacienteParaNome(prop.de)
                            //prop.para = convertUidPacienteParaNome(prop.para)


                            console.log (myMsgs)
                            return (
                                <Card>
                                    <CardItem>
                                        <Text>De: {prop.de}</Text>
                                    </CardItem>
                                    {/*
                                    <CardItem>
                                        <Text>Para: {prop.para}</Text>
                                    </CardItem>
                                    */}
                                    <CardItem>
                                        <Text>Msg: {prop.msg}</Text>
                                    </CardItem>
                                </Card>
                            );
                        })}

                    </Content>

                    : null}


            </Content>
        </Container>
    )

}
