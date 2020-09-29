// @ts-check
import React,{Component} from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,      
      data: [
        {
          name: "Cheeseburger",
        },
        {
          name: "Pizza",
        },
        {
          name: "Macaroni and Cheese",
        },
        {
          name: "Chicken Sandwich",
        },
        {
          name: "Burrito",
        },
      ],      
      error: null,  
    };
    this.foodArray = this.state.data;
  }

searchFilterFunction = text => {
  this.setState({
    value: text,
  });

  const newData = this.foodArray.filter(item => {
    const itemData = `${item.name.toUpperCase()}`;
    const textData = text.toUpperCase();

    return itemData.indexOf(textData) > -1;
  });

  this.setState({
    data: newData,
  });
};
renderHeader = () => {
  return (
    <SearchBar
      placeholder="Enter Text Here..."
      lightTheme
      round
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
      value={this.state.value}
      />

  );
};
renderSeparator = () => {
  return (
    <View style={
      this.styles.container
    }>
    </View>
  );
};
  render = () => {
    if (this.state.loading) {
      return (
        <View style={this.styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  
  return (
    <View style={this.styles.container}>
      <FlatList
        data = {this.state.data}
        renderItem={({ item }) => (
          <Text>{ item.name }</Text>
        )}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        />

      <Button
        title="Go to Home"
        onPress={() => this.props.navigation.navigate('Home')}
      />
    </View>
  );
  };
styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
}
export default SearchScreen;