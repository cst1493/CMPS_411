/// @ts-check
import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import Consts from './Consts';
import arrayMove from 'array-move';

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

async function MoveToBotOfList(favorites, latestMeal) {
    try {
        //Get Last Index of Array
        const len = favorites.length-1;

        //Find index of latestMeal
        var latestIndex;
        for(var i = 0; i<favorites.length;i++){
            if (favorites[i]==latestMeal) {
                latestIndex = i;
            } 
        }
        //check to make sure latestIndex isn't null
        if (latestIndex == null) {
            throw 'Index not found!';
        }
        //move the index to the last index
        const newFavArray = arrayMove(favorites,latestIndex,len);
        
        //Store the new array in local storage
        AsyncStorage.setItem(favoritesKey, JSON.stringify(newFavArray));
        console.log('stored: ' + newFavArray);
        return;


    } catch(error) {
        console.log("MoveToBotOfList" + error);
    }
}

export function AddToHistoryList(newItem) 
{
    if (Consts.historyList.length < Consts.maxHistoryLength) {
      Consts.historyList.push('temp');
    } else if (Consts.historyList.length > Consts.maxHistoryLength) {
      Consts.historyList.pop();
    }
    for(var i = (Consts.historyList.length-1); i > 0; i--){
      Consts.historyList[i] = Consts.historyList[i-1];
    }
    Consts.historyList[0] = newItem;
}
export async function PushHistoryToStorage() { //overwrite current Consts.favoritesList.
    const key = Consts.historyKey;
    try {
        await AsyncStorage.removeItem(key); //reset old key to null (replaces file).
        AsyncStorage.setItem(key, JSON.stringify(Consts.historyList));
    }   catch (error) {
    console.log('error on async storeData()');
  }
  return
}



export default {
    favoritesArray, localStorage,
}

