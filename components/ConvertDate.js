import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Thumbnail, Subtitle, Button, Icon } from 'native-base';
import { Platafrom, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Alert, TouchableHighlight, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';



export default function ConvertDate(props) {

    //console.log(props.bornDate)


    function getDuration(milli){


        let minutes = Math.floor(milli / 60000);
        let hours = Math.round(minutes / 60);
        let days = Math.round(hours / 24);


        return days
        
      };


    const getAge=(dateString)=>{

        var timeStampBornDate = Number(dateString);

        var timeStampNow = Date.now();

        var ageInMilisseconds = timeStampNow - timeStampBornDate;

        var age = (getDuration(ageInMilisseconds));

        console.log (age)

          return age;//format: dd-mm-yyyy;
    }

    return getAge(props.bornDate) + " dias";

}
