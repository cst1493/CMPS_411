// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { View, Text, Button, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Consts from '../Consts';

import localStorage from '../localStorage';
import storeData from '../localStorage';
import retrieveData from '../localStorage';

//Navigation --> https://www.robinwieruch.de/react-native-navigation
//localStorage tempConstruct = new localStorage();
//var favList = [];
//favList = localStorage.retrieveData;
storeData;


const HomeScreen = ({ navigation }) => {
  updateFavoritesList();
  PullFromStorage();
  return (
    // @ts-ignore
    <ImageBackground style={styles.image} source={ require('../img/bg1.png') }>
    
      <View style={styles.container}>
      
        <Text style={styles.looseText}> 
          Hungry?{"\n"}I'm here to help you decide.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
          <Text style={styles.button}>Search New Meals</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('History')}> 
          <Text style={styles.button}>Meal History</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}> 
          <Text style={styles.button}>Favorites</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};
export default HomeScreen;

const favoritesKey = 'favorites'; 
async function updateFavoritesList() { //update Consts.favoritesList with stored data. Move to App.js???
  try {
    let temp = await AsyncStorage.getItem(favoritesKey); //got json storage file with array info.
    if (temp !== null) { //if data found
      Consts.favoritesList = await AsyncStorage.getItem(favoritesKey).then(require => JSON.parse(require))
      .catch(error => console.log('retrieve error'));
    }
    else console.log('favoritesKey is empty.')
  } catch (error) {
      console.log("failed to retrieveData()");
  } return;
}

const key = Consts.historyKey;
async function PullFromStorage() { //update Consts.Name with stored data.
  try {
    let temp = await AsyncStorage.getItem(key); //got json storage file with array info.
    if (temp !== null) { //if data found
        Consts.historyList = await AsyncStorage.getItem(key).then(require => JSON.parse(require))
        .catch(error => console.log('retrieve error'));
    }
    else console.log('favoritesKey is empty.')
  } catch (error) {
        console.log("failed to retrieveData()");
  } return;
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: Consts.color1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 15,
    //borderColor: Consts.color2,
  },
  button: {
    minWidth: '70%',
    marginBottom: '5%',
    marginTop: '5%',
    backgroundColor: Consts.color4,
    borderWidth: 2,
    borderRadius: 12,
    color: Consts.color3,
    fontSize: 24,
    fontWeight: 'bold',
    padding: '5%',
    textAlign:'center',
    overflow: 'hidden',
  },
  looseText:{
    minWidth: '90%',
    color: Consts.color5,
    fontSize: 26,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 12,
    textAlign:'center',
    justifyContent: 'center',
    backgroundColor: Consts.color1,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
});
