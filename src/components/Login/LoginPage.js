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

export default class LoginPage extends React.Component {
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
<<<<<<< HEAD
        this.props.doooLogin(this.state.username,this.state.password);
=======
        this.props.doLogin(this.state.username,this.state.password);
>>>>>>> 89a35318c2ad8c1de7cd1302a50f6ad2118f8599
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