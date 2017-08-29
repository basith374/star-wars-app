import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },
  result: {
    padding: 10
  }
});

export default class SearchScreen extends React.Component {
  state = {
    query: '',
    data: []
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user}`,
  });

  findPosition(num) {
    var place = 10;
    while(num > 0) {
      num = Math.floor(num / 10);
      place++;
    }
    return place;
  }

  reloadQuery(text) {
    this.setState({ query: text });
    if(!text) return;
    fetch('https://swapi.co/api/planets?search=' + text)
      .then((rsp) => rsp.json())
      .then((rsp) => {
        this.setState({
          data: rsp.results
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { query, data } = this.state;
    const findPosition = this.findPosition;
    return (
      <View style={styles.container}>
        <Autocomplete
          data={data}
          defaultValue={query}
          placeholder="Type to search planets"
          onChangeText={text => this.reloadQuery(text)}
          renderItem={data => {
            console.log(data.population)
            const size = findPosition(data.population);
            return (
              <TouchableOpacity style={styles.result}>
                <Text style={{fontSize: size}}>{data.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}
