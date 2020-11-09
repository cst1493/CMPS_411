//@ts-check
import { AsyncStorage } from 'react-native';
import Consts from './Consts';

const hKey = 'history';
const fKey = 'favorites';
//AsyncStorage.removeItem(favoritesKey); //to delete all local storage while testing.

export async function MoveToBotOfFavs(latestMeal) {
  var favs = Consts.favoritesList;
  var temp = "";
  var prevIndex = -1;
  if (favs.length > 0) {
    for (var i = 0; i < favs.length-1; i++) {
      if (favs[i] == latestMeal) {
        temp = favs[i];
        prevIndex = i;
      }
    }
    if (prevIndex != -1) {
      for (var i = prevIndex; i < favs.length-1; i++) {
        favs[i] = favs[i+1]
      }
      favs[favs.length-1] = temp;
      Consts.favoritesList = favs;
      PushFavoritesToStorage();
    }
  }
  return;
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
export async function PushFavoritesToStorage() { //overwrite current Consts.favoritesList.
    try {
      await AsyncStorage.removeItem(fKey); //reset old key to null (replaces file).
      AsyncStorage.setItem(fKey, JSON.stringify(Consts.favoritesList));
    } catch (error) {
      console.log('error on async storeData()');
    }
    return
}


