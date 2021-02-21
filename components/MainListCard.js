import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Thumbnail, Subtitle, Button, Icon } from 'native-base';
import { Platafrom, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Alert, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class MainListCard extends Component {

  render() {

    return (


      <Card button onPress={
        this.props.onPress}>
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
        this.props.onPress}>
          <Image source={this.props.img} style={{ height: 200, width: null, flex: 1 }} />

        </CardItem>

        <CardItem>
          <Left>
            <Body>
              <Text style={text.title}>{this.props.name}</Text>
            </Body>
          </Left>

          <Right>
            <Body>
              <Icon name="logo-github"><Text style={text.iconText}>2 Meses</Text></Icon>
            </Body>
          </Right>

          <Right>
            <Body>
              <Icon name="logo-github"><Text style={text.iconText}>Macho</Text></Icon>
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
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
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


