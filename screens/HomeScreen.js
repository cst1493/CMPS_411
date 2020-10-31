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

class HomeScreen extends Component 
{ 
  constructor(props) { super(props); this.state = {} }

  
  nav(location){
    this.props.navigation.navigate(location)
  }

  render() {
    PullFavoritesFromStorage();
    PullHistoryFromStorage();
    return (
      //@ts-ignore
      <ImageBackground style={styles.image} source={ require('../img/bg1.png') }>
      
        <View style={styles.container}>
        
          <Text style={styles.looseText}> 
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
