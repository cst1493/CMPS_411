//@ts-check
import React, {Component} from 'react';
import { ListItem /*, CheckBox*/} from 'react-native-elements';
import { View, Text, Button, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Consts from '../Consts';
import { AsyncStorage } from 'react-native';
import { add, color } from 'react-native-reanimated';
import CheckBox from '@react-native-community/checkbox';
import { Circle } from 'react-native-svg';
 
const buttonColor = Consts.color4;

//const FavoritesScreen = ({ navigation }) => {}
  //overwriteFavoritesList(true); // RECOMMENDED TO RUN overwriteFavoritesList(true) ONCE TO STORE DUMMY DATA //
  //AsyncStorage.removeItem(favoritesKey); //to delete all local storage while testing.
  //updateFavoritesList(); //all food items updated to var Const.favoritesList. will return null if storing data at the same time.
  //console.log('Consts.favoritesList[0] = ' + Consts.favoritesList[0]); //TODO add load delay or move this to App.js???
  
  //removeFromWheel('Sushi'); addToWheel('Bacon'); //TODO connect functions to a checkbox on the list.

var arr1 = ['food1', 'food2', 'food3']
var arr2 = [false, false, false]
class Favorites extends Component 
{
  constructor(props){
    super(props);
    this.state = {
      //array: [{ id: 10 } { ... }],
      _list: {x: false},
      list: false,
      value: false
    }
  }
  FavoritesScreen = ({ navigation }) => {}
  
  changeCheckBox(check, index){ //TODO checkbox functionality.
    if (check === true) {
      removeFromWheel(arr1[0]);
      return false;
    } 
    addToWheel(arr1[0]);
    return true; 
  }

  render() 
  {
    return (
      <View style={styles.container }>
        {/* <CheckBox onPress={() => this.testButton()} checked={this.state.pressed} /> */}
        <ScrollView style={styles.scrollStyle}>
          
          <ListItem style={styles.Listing}>
            <ListItem.Title > {/* style={styles.Listing} */}
              {arr1[0]}
            </ListItem.Title>
            <ListItem.Content>
            </ListItem.Content>
            <Text>on wheel</Text>
            <CheckBox
                //npm install @react-native-community/checkbox --save
                value={this.state.value}
                onValueChange={( x_ ) => this.setState({value: this.changeCheckBox(this.state.value, 0)})}
            />
          </ListItem>

          <ListItem.Title style={styles.Listing}>{'FOOD ITEM 1'} </ListItem.Title>
          <ListItem.Title style={styles.Listing}>{'FOOD ITEM 2'} </ListItem.Title>
          {/* {'btn1: decide now. btn2: add to wheel checkbox'} */}
        </ScrollView>
        <View style={[{width: '100%'}]}>
          <Button title="Spin The Wheel" color={Consts.color3} onPress={() => this.props.navigation.navigate('Randomizer')} />
        </View>
        
      </View>
    );
  }
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

function editWheel(item, checked) {
  if (checked === true) {
    addToWheel(item);
  }
  if (checked === false) {
    removeFromWheel(item);
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

export default Favorites;