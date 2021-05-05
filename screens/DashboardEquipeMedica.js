import React, { Component, useState, useEffect } from 'react'
import firebase from 'firebase';
import { Container, Header, Form, Item, Input, Label, Content, Card, CardItem, Body, Left, Right, Title, Subtitle, Accordion, Text, Button, Icon, Picker } from 'native-base';
import { Switch, StyleSheet, ActivityIndicator } from "react-native";
import { RadioButton } from 'react-native-paper';



function DashboardEquipeMedica({ navigation }) {

    useEffect(() => {

        getUserInfoFromDatabase();
        getPacientesInfoFromDatabase();

    }, [navigation]);



    const user = firebase.auth().currentUser;

    const getUserInfoFromDatabase = () => {

        firebase.database().ref('/equipemedica/' + user.uid).on('value', (snapshot) => {
            if (snapshot.val()) {

                setName(snapshot.val().name)
                setPhone(snapshot.val().phone)
                setEmail(snapshot.val().email)

            }
        });

    }

    const getPacientesInfoFromDatabase = () => {
        firebase.database().ref('/pacientes/').on('value', (snapshot) => {
            if (snapshot.val()) {

                setPacientes(snapshot.val())

            }
        });
    }



    const updateStateOfPacienteByUid = (newState, prop) => {
        firebase.database().ref('/pacientes/' + prop).update({
            state: newState
        });
    }
    /*const pacientList = (arrayDeSintomas, paciente) => {
        return (

            <Card>
                <CardItem>
                    <Text>Nome: {paciente.name}</Text>
                </CardItem>

                <CardItem>
                    <Text>Email: {paciente.email}</Text>
                </CardItem>

                <CardItem>
                        <Text>Sintomas: {arrayDeSintomas.join(", ")}</Text>
                    </CardItem>

            </Card>
        );


    }*/







    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pacientes, setPacientes] = useState();



    const [estadoPaciente, setEstadoPaciente] = useState('');



    //Valor selecionado no Picker (Caixa de Seleção)
    const [selectedValue, setSelectedValue] = useState("");
    //Valor a ser buscado
    const [searchQuery, SetSearchQuery] = useState("");


    return (
        <Container style={{ marginTop: 50 }}>

            {name && phone && email && pacientes ?
                <Content>

                    <Text>Nome: {name} </Text>
                    <Text>Telefone: {phone} </Text>
                    <Text>Email: {email} </Text>

                    <Text>Pacientes: </Text>


                    <Content>
                        <Text>Buscar por</Text>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                headerStyle={{ backgroundColor: "#b95dd3" }}
                                headerBackButtonTextStyle={{ color: "#fff" }}
                                headerTitleStyle={{ color: "#fff" }}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Sem Filtro" value="" />
                                <Picker.Item label="Nome" value="name" />
                                <Picker.Item label="Estado" value="estado" />
                                <Picker.Item label="Cidade" value="cidade" />
                                
                                <Picker.Item label="Sintoma" value="symptoms" />
                            </Picker>
                        </Form>
                    </Content>

                    {/*Caso o "Buscar por" existir ele exibe o campo de busca */}
                    {selectedValue ? <Content>
                        <Header searchBar rounded style={{ backgroundColor: "grey" }}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Digite o valor que deseja buscar" onChangeText={SetSearchQuery} />
                                <Icon name="ios-people" />
                            </Item>
                            <Button transparent>
                                <Text>Buscar</Text>
                            </Button>
                        </Header>
                    </Content> : null}

                    {selectedValue == "symptoms" ?
                        <Content>
                            <Text>Códigos para busca: </Text>
                            <Text>1: Tosse seca e persistente; </Text>
                            <Text>2: Febre acima de 38º C;</Text>
                            <Text>3: Cansaço excessivo; </Text>
                            <Text>4: Dor muscular generalizada;</Text>
                            <Text>5: Dor de cabeça; </Text>
                            <Text>6: Garganta inflamada; </Text>
                            <Text>7: Coriza ou nariz entupido;</Text>
                            <Text>8: Alterações do trânsito intestinal, principalmente diarreia;</Text>
                            <Text>9: Perda de gosto e olfato.</Text>
                        </Content>
                        : null}

                    {Object.keys(pacientes).map((prop, key) => {

                        let arrayDeSintomas = []

                        for (let i = 0; i < 9; i++) {
                            if (pacientes[prop].symptoms[i]) {
                                arrayDeSintomas.push(i)
                            }
                        }




                        if (selectedValue == "") {


                            return (
                                <Card>
                                    <CardItem>
                                        <Text>Nome: {pacientes[prop].name}</Text>
                                    </CardItem>

                                    <CardItem>
                                        <Text>Email: {pacientes[prop].email}</Text>
                                    </CardItem>

                                    <CardItem>
                                        <Text>Sintomas: {arrayDeSintomas.join(", ")}</Text>
                                    </CardItem>

                                    <CardItem>



                                        <Text>Estado do Paciente:</Text>

                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            headerStyle={{ backgroundColor: "#b95dd3" }}
                                            headerBackButtonTextStyle={{ color: "#fff" }}
                                            headerTitleStyle={{ color: "#fff" }}
                                            selectedValue={
                                                pacientes[prop].state
                                            }
                                            onValueChange={(itemValue, itemIndex) => {
                                                updateStateOfPacienteByUid(itemValue, prop)
                                            }
                                            }
                                        >
                                            <Picker.Item label="Em análise" value="Em análise" />
                                            <Picker.Item label="Covid-19 Confirmada" value="Covid-19 Confirmada" />
                                            <Picker.Item label="Não está com Covid-19" value="Não está com Covid-19" />
                                        </Picker>


                                    </CardItem>



                                </Card>
                            );
                        }
                        if (selectedValue && selectedValue !== "symptoms") {



                            if (pacientes[prop][selectedValue].toLowerCase().includes(searchQuery.toLowerCase())) {

                                return (
                                    <Card>
                                        <CardItem>
                                            <Text>Nome: {pacientes[prop].name}</Text>
                                        </CardItem>

                                        <CardItem>
                                            <Text>Email: {pacientes[prop].email}</Text>
                                        </CardItem>

                                        <CardItem>
                                            <Text>Cidade: {pacientes[prop].cidade}</Text>
                                        </CardItem>

                                        <CardItem>
                                            <Text>Estado: {pacientes[prop].estado}</Text>
                                        </CardItem>

                                        <CardItem>
                                            <Text>Sintomas: {arrayDeSintomas.join(", ")}</Text>
                                        </CardItem>

                                        <CardItem>



                                            <Text>Estado do Paciente:</Text>

                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                headerStyle={{ backgroundColor: "#b95dd3" }}
                                                headerBackButtonTextStyle={{ color: "#fff" }}
                                                headerTitleStyle={{ color: "#fff" }}
                                                selectedValue={
                                                    pacientes[prop].state
                                                }
                                                onValueChange={(itemValue, itemIndex) => {
                                                    updateStateOfPacienteByUid(itemValue, prop)
                                                }
                                                }
                                            >
                                                <Picker.Item label="Em análise" value="Em análise" />
                                                <Picker.Item label="Covid-19 Confirmada" value="Covid-19 Confirmada" />
                                                <Picker.Item label="Não está com Covid-19" value="Não está com Covid-19" />
                                            </Picker>


                                        </CardItem>



                                    </Card>
                                );

                            }

                        }

                        if (selectedValue && selectedValue == "symptoms") {


                            if (arrayDeSintomas.includes(parseInt(searchQuery))) {

                                return (
                                    <Card>
                                        <CardItem>
                                            <Text>Nome: {pacientes[prop].name}</Text>
                                        </CardItem>

                                        <CardItem>
                                            <Text>Email: {pacientes[prop].email}</Text>
                                        </CardItem>

                                        <CardItem>
                                            <Text>Sintomas: {arrayDeSintomas.join(", ")}</Text>
                                        </CardItem>

                                        <CardItem>



                                            <Text>Estado do Paciente:</Text>

                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                headerStyle={{ backgroundColor: "#b95dd3" }}
                                                headerBackButtonTextStyle={{ color: "#fff" }}
                                                headerTitleStyle={{ color: "#fff" }}
                                                selectedValue={
                                                    pacientes[prop].state
                                                }
                                                onValueChange={(itemValue, itemIndex) => {
                                                    updateStateOfPacienteByUid(itemValue, prop)
                                                }
                                                }
                                            >
                                                <Picker.Item label="Em análise" value="Em análise" />
                                                <Picker.Item label="Covid-19 Confirmada" value="Covid-19 Confirmada" />
                                                <Picker.Item label="Não está com Covid-19" value="Não está com Covid-19" />
                                            </Picker>


                                        </CardItem>

                                    </Card>
                                );

                            }

                        }
                    })}







                </Content> : <ActivityIndicator size="large" color="#0000ff" />
            }

            {/* <HistoricoMedico user={user}/>*/}


            <Button onPress={() =>
                firebase.auth().signOut().then(() => {
                    navigation.navigate('HomeScreen')
                })
            }><Text>Saire</Text></Button>


            <Button onPress={() =>
                    navigation.navigate('MensagensEquipeMedica')
            }><Text>Mensagens</Text></Button>


        </Container >


    )

}

export default DashboardEquipeMedica;