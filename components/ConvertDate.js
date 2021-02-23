import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Thumbnail, Subtitle, Button, Icon } from 'native-base';
import { Platafrom, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Alert, TouchableHighlight, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';



export default function ConvertDate(props) {

    //console.log(props.bornDate)


    const getAge=(dateString)=>{

        var bornDate = new Date (dateString);

        console.log ("---" + bornDate)

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        var age = year-bornDate.getFullYear()
        var m = month-bornDate.getMonth()

        if ( m <0 || ( m===0 && date < bornDate)) {
            age--
        }
            
          return age;//format: dd-mm-yyyy;
    }


    return getAge(props.bornDate);



}
