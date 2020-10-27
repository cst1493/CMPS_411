// @ts-check
import React,{Component} from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import { Line } from 'react-native-svg';
import Consts from '../Consts';
const searchItems = [ //77 items
'Asparagus', 'Black Beans', 'Bagels', 'Baked Beans', 'BBQ', 'Biscuits', 'Burittos', 'Carne Asada', 'Chicken', 'Chinese', 
'Catfish', 'Crab', 'Chickpeas', 'Chili', 'Chimichanga', 'Dumplings', 'Donuts', 'Eggs', 'Enchiladas', 'Egg Rolls', 
'Fajitas', 'Fish', 'Fishsticks', 'French dip', 'French toast', ' Fried Rice', 'Green Beans', 'Guancamole', 'Gumbo', 'Ham', 
'Hamburger', 'Hashbrowns', 'Hotdogs', 'Ice Cream', 'Indian', 'Italian', 'Jambalaya', 'kabobs', 'lobster', 'Lasagna', 
'Mac & Cheese', 'Meatballs', 'Meatloaf', 'Mexican', 'Nachos', 'Noodles', 'Oatmeal', 'Omelet', 'Oysters', 'Pancakes', 
'Pasta', 'PB&J', 'Peas', 'Pizza', 'Pork Chops', 'Potatos', 'Quesadilla', 'Rice', 'Rotini', 'Salad', 
'Salmon', 'Sandwich', 'Sausage', 'Smoothie', 'Soup', 'Spaghetti', 'Steak', 'Stir Fry', 'Sushi', 'Tacos', 
'Tilapia', 'Tofu', 'Tuna', 'Turkey', 'Waffles', 'Wings', 'Wrap'
];

const listColor = '#cccccc';
const buttonColor = '#777777';
const barButtonColor = '#333333';

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
  render = () => {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  
  return (
    <View style={styles.container}>
    <ListItem  containerStyle={styles.Listing}>
      <View style={styles.topButtons}>
        <Button title="Search Nearby Restaurants" color={buttonColor} onPress={() => addToFavorites(null)} />
      </View>
      <View style={styles.topButtons}>
        <Button title="Add Food Myself" color={buttonColor} onPress={() => addToFavorites(null)} />
      </View>
    </ListItem>

      <FlatList
        data = {searchItems}
        renderItem={({ item, index }) => (
          <ListItem key={index} containerStyle={styles.Listing}>
            <View style={styles.LI_Section1}>
              <ListItem.Title> { item } </ListItem.Title>
            </View>

            <View style={styles.LI_Section2}> 
              <Button title="Add To Favorites" color={buttonColor} onPress={() => addToFavorites(item)} />
            </View>

          </ListItem>
        )}
        keyExtractor={(item, index) => item + index}
        //ItemSeparatorComponent={this.renderSeparator} //replaced with ListItems
        ListHeaderComponent={this.renderHeader}
        />

      <View style={styles.barButtons}>
        <Button title="Save Changes" color={barButtonColor} onPress={() => this.saveChanges()}/>
      </View>
    </View>
  );
  };
saveChanges() {
  //Save to favorites TODO
  this.props.navigation.navigate('Home');
}
}

function addToFavorites(newFav) { //TODO
  alert('Replace with checkboxes???')
  return
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  topButtons: {
    width: '50%',
    fontSize: 20,
  },
  barButtons: {
    width: '100%',
    fontSize: 20,
  }, 
  Listing: {
    borderTopWidth: 2,
    backgroundColor: listColor,
    borderColor: 'black',
  },
  LI_Section1:{
    width: '50%',
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  LI_Section2:{
    width: '50%',
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default SearchScreen;