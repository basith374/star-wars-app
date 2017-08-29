import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from './js/Root';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Root />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
});
