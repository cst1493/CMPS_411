/// @ts-check
import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import Consts from './Consts';

class localStorage extends Component{
    //favoritesArray['', ''];
    favoritesArry = retrieveData()
}

const testingFavorites = ['Chicken', 'Fish', 'Burgers', 'Pizza', 'Salad', 'Shrimp', 'China Buffet',
    'Popeyes', 'BK', 'Canes', 'Subway', 'Fried Rice', 'Tacos', 'Pancakes', 'Eggs'];

const favoritesKey = 'favorites';
//var favoritesArray = ['temp', 'temp'];
var favoritesArray;

async function storeData() {
    favoritesArray = testingFavorites; //TODO TEMP
    try {
        AsyncStorage.setItem(favoritesKey, JSON.stringify(favoritesArray));
        console.log('stored: ' + favoritesArray);
        return
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
      else console.log('favoritesKey is empty.')
    } catch (error) {
        console.log("catch localStorage.retrieveData()");
    }
    return 
}
export default {
    favoritesArray, localStorage,
}

