import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';

const styles = {
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#efefef',
    flex: 1
  },
  txt: {
    fontSize: 15,
    marginBottom: 10
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
  },
  errorTxt: {
    color: '#FF4136',
    textAlign: 'center'
  }
}

export default class LoginScreen extends React.Component {
  state = {
    user: '',
    pass: '',
    working: false,
    error: false
  }

  static navigationOptions = {
    title: 'Star Wars Login'
  }

  fetchUsers() {
    const {user,pass} = this.state;
    if(!user || !pass) return;
    this.setState({
      working: true,
      error: false
    })
    fetch('https://swapi.co/api/people')
      .then((rsp) => rsp.json())
      .then((rsp) => {
        this.setState({
          working: false
        })
        const users = rsp.results.filter((p) => {
          return p.name.toLowerCase() == user.toLowerCase() &&
            p.birth_year == pass;
        });
        if(users.length) {
          console.log('Login success')
          const user = users[0];
          this.props.navigation.navigate('Search', { user: user.name  });
        } else {
          this.setState({
            error: true
          })
          console.log('Login failed')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const {user,pass,working,error} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Enter Credentials</Text>
        <TextInput
          style={styles.input}
          onChangeText={(user) => this.setState({user})}
          value={user}
          underlineColorAndroid="transparent"
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={(pass) => this.setState({pass})}
          value={pass}
          underlineColorAndroid="transparent"
          placeholder="Password"
        />
        <Button
          title="Login"
          onPress={this.fetchUsers.bind(this)}
          color="#841584"
          style={styles.btn}
          disabled={working}
        />
        {working && <ActivityIndicator size="small" />}
        {error && <Text style={styles.errorTxt}>Login failed</Text>}
      </View>
    )
  }
}
