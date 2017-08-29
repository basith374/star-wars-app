import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import {
  View,
  Text
} from 'react-native';

export default class Root extends React.Component {
  render() {
    const App = StackNavigator({
      Login: { screen: LoginScreen },
      Search: { screen: SearchScreen },
    });
    return <App />;
  }
}
