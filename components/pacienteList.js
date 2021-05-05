import React, { Component, useEffect, useState } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Thumbnail, Subtitle, Button, Icon} from 'native-base';
import { Platafrom, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Alert, TouchableHighlight, View , Input} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConvertDate from './Sintomas'
import firebase from 'firebase';




export default function pacienteList(props) {
    
    //const arrayDeSintomas = props.arrayDeSintomas;
    //const paciente = props.paciente;


    useEffect(() => {
        
    },[])



        return (

            <View style={card.main} >


            </View>

        );

}

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


const card = StyleSheet.create({
    main: {
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 40,
        marginLeft: 8,
        marginRight: 8
    }
});
