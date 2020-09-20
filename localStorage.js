/// @ts-check
import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

class localStorage extends Component{
    
}

const testingFavorites = ['Chicken', 'Fish', 'Burgers', 'Pizza', 'Salad', 'Shrimp', 'China Buffet',
    'Popeyes', 'BK', 'Canes', 'Subway', 'Fried Rice', 'Tacos', 'Pancakes', 'Eggs'];

const favoritesKey = 'favorites';
var favoritesArray = ['temp', 'temp'];


async function storeData() {
    favoritesArray = testingFavorites; //TODO TEMP
    try {
        AsyncStorage.setItem(favoritesKey, JSON.stringify(favoritesArray));
        console.log('stored: ' + favoritesArray);
    } catch (error) {
      console.log('catch localStorage.async storeData()');
    }
}

async function retrieveData() {
    try {
      const favsList = await AsyncStorage.getItem(favoritesKey);

      if (favsList !== null) { //if found any data
        console.log(favsList);
        return AsyncStorage.getItem(favsList)
        .then(req => JSON.parse(req))
        .then(json => console.log(json))
        .catch(error => console.log('error!')); //stringArr[] = retrieveData(); || stringArr.retrieveData(); ???
      }
    } catch (error) {
        console.log("catch localStorage.retrieveData()");
    }
    return 
}
export default {
    favoritesArray, localStorage,
}

