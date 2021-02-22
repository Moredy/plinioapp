import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Thumbnail, Subtitle, Button, Icon } from 'native-base';
import { Platafrom, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Alert, TouchableHighlight, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class MainListCard extends Component {

  render() {

    return (


      <Card button onPress={
        this.props.onPress}
        
        >
        {/*
     
        <CardItem button onPress={
          this.props.onPress}>

          <Left>
            <Thumbnail
              source={this.props.img}
              style={{ width: 80, height: 60, borderRadius: 5 }} />
            <View style={{ alignItems: 'flex-start', top: -10 }}>
              <Text style={text.title}>{this.props.name}</Text>
              <Text style={text.subtitle}>{this.props.subtitle}</Text>
            </View>

          </Left>




        </CardItem> */}


        <CardItem button onPress={
        this.props.onPress}

        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0
      }}
    
        >


        
        <Image source={this.props.img} style={{ height: 300, width: null, flex: 1, position: "relative"}} ></Image>

        <MaterialCommunityIcons name="bookmark" style={{ height: null , position: "absolute", top: 30, right: 30 }} size={34} color="black"></MaterialCommunityIcons>

        </CardItem>

        <CardItem>
          <Left>
            <Body>
              <Text style={text.title} >{this.props.name}</Text>
              <View style={{ borderBottomColor: '#0ABAB5' ,borderBottomWidth: 4, width: 38 }}
/>
              
      
            </Body>
          </Left>

          <Right>
            <Body>
              <MaterialCommunityIcons name="calendar-month"  size={24} color="black"><Text style={text.iconText}>2 Meses</Text></MaterialCommunityIcons>
            </Body>
          </Right>

          <Right>
            <Body>
              {this.props.gender == "male" ? (
                <MaterialCommunityIcons name="gender-male"  size={24} color="black"><Text style={text.iconText}>Macho</Text></MaterialCommunityIcons>
                )
                : <MaterialCommunityIcons name="gender-female"  size={24} color="black"><Text style={text.iconText}>Fêmea</Text></MaterialCommunityIcons> }
               
              
              
            </Body>
          </Right>


        </CardItem>


        <CardItem>
        <Left>
            <Body>
              <Text style={text.subtitle}>{this.props.subtitle} adasdasd asdas asdas das ddas asdas ads ds adasdasd asdas asdas das ddas asdas ads ds adasdasd asdas asdas das ddas asdas ads ds adasdasd asdas asdas das ddas asdas ads ds</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>


    );
  }
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


