// @ts-check
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
console.log(retrieveData);


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.looseText}> 
        Hungry? I'm here to help you decide.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
        <Text style={styles.button}>Search For Something New</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('History')}> 
        <Text style={styles.button}>Recent Meal History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}> 
        <Text style={styles.button}>Select From Favorites</Text>
      </TouchableOpacity>

    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Consts.color1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 15,
    borderColor: Consts.color2,
  },
  button: {
    minWidth: '90%',
    marginBottom: '10%',
    marginTop: '10%',
    backgroundColor: Consts.color4,
    borderWidth: 1,
    borderRadius: 12,
    color: Consts.color3,
    fontSize: 32,
    fontWeight: 'bold',
    padding: '3%',
    textAlign:'center',
  },
  looseText:{
    minWidth: '90%',
    color: Consts.color5,
    fontSize: 26,
    fontWeight: 'bold',
    padding: 25,
    textAlign:'center',
  },
});
