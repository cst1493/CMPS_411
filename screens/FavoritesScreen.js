// @ts-check
import React, {Component} from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Consts from '../Consts';
import { AsyncStorage } from 'react-native';
 
const buttonColor = Consts.color1;

const FavoritesScreen = ({ navigation }) => {
  //overwriteFavoritesList(true); // RECOMMENDED TO RUN overwriteFavoritesList(true) ONCE TO STORE DUMMY DATA //
  //AsyncStorage.removeItem(favoritesKey); //to delete all local storage while testing.
  updateFavoritesList(); //all food items updated to var Const.favoritesList. will return null if storing data at the same time.
  console.log('Consts.favoritesList[0] = ' + Consts.favoritesList[0]); //TODO add load delay or move this to App.js???
  
  //removeFromWheel('Sushi'); addToWheel('Bacon'); //TODO connect functions to a checkbox on the list.

  return (
    <View style={styles.container}>
      <Text></Text>
      <ScrollView style={styles.scrollStyle}>
        <ListItem.Title style={styles.Listing}>{'FOOD ITEM 1'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'FOOD ITEM 2'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'FOOD ITEM 3'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{' '} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'Need to make this label a food item,'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'and add 2 buttons per listing.'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'btn1: decide now.'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'btn2: add to wheel checkbox'} </ListItem.Title>
      </ScrollView>
      <View style={[{width: '100%'}]}>
        <Button title="Spin The Wheel" color={buttonColor} onPress={() => navigation.navigate('Randomizer')} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollStyle:{
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  Listing: {
    fontSize: 30,
    borderBottomWidth: 3,
    textAlign: 'left',
    backgroundColor: buttonColor,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  goToWheel:{width: '100%'}
});



const favoritesKey = 'favorites'; //key is used to find, store and replace favorites data.
async function overwriteFavoritesList(populateDummyData) { //overwrite current Consts.favoritesList.
  if (populateDummyData == true) {
    const testFavorites = ['Chicken', 'Fish', 'Subway', 'Pizza'    ];/*
    , 'Salad', 'Shrimp', 'China Buffet', 'Popeyes', 'BK', 'Canes', 'Burgers', 'Fried Rice', 'Tacos', 'Pancakes', 'Eggs']; //*/
    Consts.favoritesList = testFavorites;
  }
  try {
    await AsyncStorage.removeItem(favoritesKey); //reset old key to null (replaces file).
    AsyncStorage.setItem(favoritesKey, JSON.stringify(Consts.favoritesList));
    /*try { //looks at newly stored data
      console.log('storing data...');
      var x = await AsyncStorage.getItem(favoritesKey); console.log(x);
    } catch{'err'}*/
  } catch (error) {
    console.log('error on async storeData()');
  }
  return
}

async function updateFavoritesList() { //update Consts.favoritesList with stored data. Move to App.js???
  try {
    let temp = await AsyncStorage.getItem(favoritesKey); //got json storage file with array info.
    if (temp !== null) { //if data found
      Consts.favoritesList = await AsyncStorage.getItem(favoritesKey).then(require => JSON.parse(require))
      .catch(error => console.log('retrieve error'));
      //console.log(Consts.favoritesList);
    }
    else console.log('favoritesKey is empty.')
  } catch (error) {
      console.log("failed to retrieveData()");
  } return;
}

function addToWheel(addItem) {
  if (Consts.wheelFoods.length > 11) { return } //too many items for the wheel.
  for (var i = 0; i < Consts.wheelFoods.length; i++) {
    if (Consts.wheelFoods[i] == addItem){
      return; //duplicate found. do nothing.
    }
  }
  Consts.wheelFoods.push(addItem); return;
}
function removeFromWheel(removeItem) {
  var arr = Consts.wheelFoods;
  for (var i = 0; i < arr.length; i++){
    if (arr[i] == removeItem){
      if (i == arr.length-1) {
        arr.pop() //if this is the last item, don't set to anything.
      } else { arr[i] = arr.pop() }
      Consts.wheelFoods = arr;
      return;
    }
  }
}

export default FavoritesScreen;