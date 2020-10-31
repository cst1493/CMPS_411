//@ts-check
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Consts from './Consts';
import arrayMove from 'array-move';

const hKey = 'history';
const fKey = 'favorites';
//AsyncStorage.removeItem(favoritesKey); //to delete all local storage while testing.

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
        AsyncStorage.setItem(fKey, JSON.stringify(newFavArray));
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
    try {
        await AsyncStorage.removeItem(hKey); //reset old key to null (replaces file).
        AsyncStorage.setItem(hKey, JSON.stringify(Consts.historyList));
    }   catch (error) {
    console.log('error on async storeData()');
  }
  return
}
export async function PullHistoryFromStorage() { //update Consts.Name with stored data.
    try {
      let temp = await AsyncStorage.getItem(hKey); //got json storage file with array info.
      if (temp !== null) { //if data found
          Consts.historyList = await AsyncStorage.getItem(hKey).then(require => JSON.parse(require))
          .catch(error => console.log('retrieve error'));
      }
      else console.log('favoritesKey is empty.')
    } catch (error) {
          console.log("failed to retrieveData()");
    } return;
}


export async function PullFavoritesFromStorage() { //update Consts.favoritesList with stored data.
    try {
      let temp = await AsyncStorage.getItem(fKey); //got json storage file with array info.
      if (temp !== null) { //if data found
        Consts.favoritesList = await AsyncStorage.getItem(fKey).then(require => JSON.parse(require))
        .catch(error => console.log('retrieve error'));
      }
      else console.log('favoritesKey is empty.')
    } catch (error) {
        console.log("failed to retrieveData()");
    } return;
}
export async function PushFavoritesToStorage(populateDummyData) { //overwrite current Consts.favoritesList.
    if (populateDummyData == true) {
      const testFavorites = ['Chicken', 'Fish', 'Subway', 'Pizza'
      , 'Salad', 'Shrimp', 'China Buffet', 'Popeyes', 'BK', 'Canes', 'Burgers', 'Fried Rice', 'Tacos', 'Pancakes', 'Eggs']; //*/
      Consts.favoritesList = testFavorites;
    }
    try {
      await AsyncStorage.removeItem(fKey); //reset old key to null (replaces file).
      AsyncStorage.setItem(fKey, JSON.stringify(Consts.favoritesList));
      /*try { //looks at newly stored data
        console.log('storing data...');
        var x = await AsyncStorage.getItem(favoritesKey); console.log(x);
      } catch{'err'}*/
    } catch (error) {
      console.log('error on async storeData()');
    }
    return
}


