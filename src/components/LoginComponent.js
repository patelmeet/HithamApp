import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

export default class LoginComponent extends React.Component {
    static navigationOptions = {
      title: 'Login',
    };
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
        };
        this.handleLogin = this.handleLogin.bind(this);
    };

    handleLogin() {
        this.props.doLogin(this.state.username,this.state.password);
    }

    render() {
      return(
        <View style={styles.container}>
            <TextInput
                style={{height: 50, width:120 }}
                onChangeText={(text) => this.setState({username:text})}
                placeholder='UserName'
            />
            <TextInput
                style={{height: 50, width:120 }}
                onChangeText={(text) => this.setState({password:text})}
                placeholder='Password'
            />
            <Button
                onPress={this.handleLogin}
                color='#48BBEC'
                title='Login'
            />
        </View>
    );
    }
  }
  const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    },
  });