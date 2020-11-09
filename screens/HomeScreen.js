//@ts-check
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Consts from '../Consts';
import { PullFavoritesFromStorage, PullHistoryFromStorage } from '../localStorage';

const title = 'Hungry?\nI\'m here to help you decide.'
const btn1 = 'Search New Meals'
const btn2 = 'Meal History'
const btn3 = 'Favorites'
const btnColor = Consts.color1;
const border = Consts.color5;

class HomeScreen extends Component 
{ 
  constructor(props) { super(props); this.state = {} }

  
  nav(location){
    this.props.navigation.navigate(location)
  }

  render() {
    //AsyncStorage.removeItem('favorites'); AsyncStorage.removeItem('history');
    PullFavoritesFromStorage();
    PullHistoryFromStorage();
    return (
      //@ts-ignore
      <ImageBackground style={styles.image} source={ require('../img/bg1.png') }>
      
        <View style={styles.container}>
        
          <Text style={styles.topText}> 
            {title}
          </Text>

          <TouchableOpacity onPress={() => this.nav('Search')}> 
            <Text style={styles.button}> {btn1} </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.nav('History')}> 
            <Text style={styles.button}> {btn2} </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.nav('Favorites')}> 
            <Text style={styles.button}> {btn3} </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: '70%',
    marginTop: '10%',
    backgroundColor: btnColor,
    borderWidth: 2,
    borderRadius: 12,
    color: Consts.fontColor,
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5%',
    textAlign:'center',
    overflow: 'hidden',
    borderColor: border,
  },
  topText:{
    minWidth: '90%',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 2,
    borderRadius: 12,
    textAlign:'center',
    justifyContent: 'center',
    overflow: 'hidden',
    color: Consts.fontColor,
    backgroundColor: btnColor,
    borderColor: border,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
});
