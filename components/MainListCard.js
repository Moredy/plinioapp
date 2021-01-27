import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Left, Right, Thumbnail, Subtitle, Button } from 'native-base';
import {Platafrom, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
import { Alert, TouchableHighlight, View } from 'react-native';
export default class MainListCard extends Component {

  render() {

    return (
         
          
          <Card>
            
            <CardItem button onPress={
             this.props.onPress}>

                <Left>
                    <Thumbnail
                    source={this.props.img}
                    style={{width: 80, height: 60, borderRadius: 5}}/>
                    <View style={{alignItems: 'flex-start', top: -10}}> 
                        <Text style={text.title}>{this.props.name}</Text>
                        <Text style={text.subtitle}>{this.props.subtitle}</Text>
                    </View>

                </Left>



                 {/* Código poder ser aproveitado em possível atualização
                 <Right>
                    <View style ={{alignItens: 'flex-end'}}> 
                        <Text style={text.subtitle}>Discount 12%</Text>
                        <Text style={text.subtitle}>Time 2pm to 4pm</Text>
                        
                    </View>
                </Right> */}

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
});


