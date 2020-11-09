//@ts-check
import React,{Component} from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import { PushFavoritesToStorage } from '../localStorage';
import Consts from '../Consts';
import DialogInput from 'react-native-dialog-input'

const searchItems = [ //74 items
'Asparagus', 'Black Beans', 'Bagels', 'Baked Beans', 'BBQ', 'Biscuits', 'Burittos', 'Carne Asada', 'Chicken', 'Chinese', 
'Catfish', 'Crab', 'Chickpeas', 'Chili', 'Chimichanga', 'Dumplings', 'Donuts', 'Eggs', 'Enchiladas', 'Egg Rolls', 
'Fajitas', 'Fish', 'Fishsticks', 'French dip', 'French toast', ' Fried Rice', 'Green Beans', 'Guancamole', 'Gumbo', 'Ham', 
'Hamburger', 'Hashbrowns', 'Hotdogs', 'Ice Cream', 'Jambalaya', 'Kabobs', 'Lobster', 'Lasagna', 'Mac & Cheese', 'Meatballs', 
'Meatloaf', 'Nachos', 'Noodles', 'Oatmeal', 'Omelet', 'Oysters', 'Pancakes', 'Pasta', 'PB&J', 'Peas', 
'Pizza', 'Pork Chops', 'Potatos', 'Quesadilla', 'Rice', 'Rotini', 'Salad', 'Salmon', 'Sandwich', 'Sausage', 
'Smoothie', 'Soup', 'Spaghetti', 'Steak', 'Stir Fry', 'Sushi', 'Tacos', 'Tilapia', 'Tofu', 'Tuna', 
'Turkey', 'Waffles', 'Wings', 'Wrap'
];

const listColor = Consts.color1;
const buttonColor = Consts.color3;
const barButtonColor = Consts.color4;
const border = Consts.color5;

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: searchItems,
      error: null,
      dialogVisible: false,
    };
    this.foodArray = this.state.data;
  }

searchFilterFunction = text => {
  this.setState({
    value: text,
  });
  const newData = searchItems.filter(item => {
    const itemData = `${item.toUpperCase()}`;
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
      placeholder="Search..."
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
          <Button title="Add Food Myself" color={barButtonColor} onPress={ () => this.setState({dialogVisible: true}) }/>
        </View>
      </ListItem>

      <View>
        <DialogInput 
          isDialogVisible={this.state.dialogVisible}
          title={"Add Custom Food"}
          message={"Can't find your favorite meal or restaurant? Add it yourself!"}
          hintInput ={"Meal"}
          cancelText={"Close"}
          submitInput={ (inputText) => {addToFavoritesBtn(inputText)} }
          closeDialog={ () => {this.setState({dialogVisible: false})}}>
          </DialogInput>
      </View>

      <FlatList
        data = {this.state.data}
        renderItem={({ item, index }) => (
          <ListItem key={index} containerStyle={styles.Listing}>
            <View style={styles.LI_Section1}>
              <ListItem.Title style={{color: Consts.fontColor}}> { item } </ListItem.Title>
            </View>

            <View style={styles.LI_Section2}> 
              <Button title="Add To Favorites" color={buttonColor} onPress={() => addToFavoritesBtn(item)} />
            </View>

          </ListItem>
        )}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={this.renderHeader}
      />
    </View>
  );
  };
}

function addToFavoritesBtn(newFav) {
  if (newFav == null || newFav == "") { alert('canceled out'); return; }
  Alert.alert(
    'Are you sure you want to add ' + newFav + ' to your favorites?', '',
    [ 
      { text: 'Cancel' },
      { text: 'Confirm', onPress: () => confirmedAddFavorite(newFav) }, 
    ]
  );
  return;
}
function confirmedAddFavorite(newFav) {
  var foundDuplicate = false;
  const len = Consts.favoritesList.length;
  for(var i = 0; i < len; i++) {
    if (Consts.favoritesList[i] == newFav) { foundDuplicate = true }
  }
  if (foundDuplicate == false) { //add to favorites array
    for(var i = len; i > 0; i--) {
      Consts.favoritesList[i] = Consts.favoritesList[i-1];
    } 
    Consts.favoritesList[0] = newFav;
    PushFavoritesToStorage(); //add array to DB
    //alert so the user doesn't backout too fast while uploading.
    Alert.alert(
      newFav + ' is added to your favorites.', '',
      [{ text: 'Close' }]
    );
  } 
  else { alert('This food is already in your favorites list.'); }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: border,
  }, 
  topButtons: {
    width: '100%',
    fontSize: 20,
  },
  Listing: {
    borderTopWidth: 2,
    backgroundColor: listColor,
    borderColor: border,
  },
  LI_Section1:{
    width: '50%',
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: '3%',
  },
  LI_Section2:{
    width: '50%',
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: '3%',
  },
});
export default SearchScreen;