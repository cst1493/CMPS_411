//@ts-check
import React, {Component} from 'react';
import { ListItem /*, CheckBox*/} from 'react-native-elements';
import { View, Text, Button, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Consts from '../Consts';
import { AsyncStorage } from 'react-native';
import { add, color } from 'react-native-reanimated';
import CheckBox from '@react-native-community/checkbox';
import { Circle } from 'react-native-svg';
 
const buttonColor = Consts.color3;
const listColor = Consts.color1;

//overwriteFavoritesList(true); // RECOMMENDED TO RUN overwriteFavoritesList(true) ONCE TO STORE DUMMY DATA //

//AsyncStorage.removeItem(favoritesKey); //to delete all local storage while testing.
//updateFavoritesList(); //all food items updated to var Const.favoritesList. will return null if storing data at the same time.

Consts.wheelFoods=[];
Consts.totalChecks = 0;
class Favorites extends Component 
{
  constructor(props){
    super(props);
    this.state = {
      checkbox: [false],
    }
  }
  decideNow() { //TODO finish button with yes/no confirm and save to history.
    alert("TODO added to history?");
    return;
  }
  goToWheel() { //navigate if 2 or more selected foods.
    if (Consts.totalChecks < 2) { 
      alert("Must select 2 or more items to randomize."); //TODO replace with: https://docs.nativebase.io/Components.html#toast-type-headref 
      return;
    }
    this.props.navigation.navigate('Randomizer');
    return;
  }

  changeCheckBox(index, food) {
    if (this.state.checkbox[index] === true) {
      removeFromWheel(food);
      this.state.checkbox[index] = false;
      return false;
    } //else
    addToWheel(food);
    this.state.checkbox[index] = true;
    return true; 
  }
  
  addTempFood(){
    //TODO add functionality to add a temporary food item by letting the user type in a food name.
    alert("TODO: add functionality here");
    return;
  }

  render()
  {
    //if coming from the homepage, reset all checkboxes back to false and clear the wheel.
    if(this.state.checkbox.length < Consts.favoritesList.length) {
      Consts.wheelFoods = []; Consts.totalChecks = 0;
      while(this.state.checkbox.length < Consts.favoritesList.length) {
        this.state.checkbox.push(false);
      }
    }
    return (
      <View style={styles.container }>
        <ScrollView style={styles.scrollStyle}>

          <View style={[{width: '100%'}]}>
            <Button title="Add Temporary Food To Wheel" color={buttonColor} onPress={() => this.addTempFood()} />
          </View>

          <View>
            {/* <CheckBox onPress={() => this.testButton()} checked={this.state.pressed} /> */}
            {(Consts.favoritesList).map((element, index) => (
              <ListItem key={index} style={styles.Listing}> 
                <ListItem.Title> 
                  {element}
                </ListItem.Title>
                <Button title="Decide Now" color={buttonColor} onPress={() => this.decideNow()} />
                <CheckBox
                  value={this.state.checkbox[index]}
                  onValueChange={( x_ ) => this.setState({value: this.changeCheckBox(index, element)})}
                />
                <Text>on wheel</Text>
              </ListItem>
              )
            )}
          </View>
        </ScrollView>

        <View style={[{width: '100%'}]}>
          <Button title="Spin The Wheel" color={buttonColor} onPress={() => this.goToWheel()} />
        </View>
        
      </View>
    );
  }
};



const favoritesKey = 'favorites'; //key is used to find, store and replace favorites data.
async function overwriteFavoritesList(populateDummyData) { //overwrite current Consts.favoritesList.
  if (populateDummyData == true) {
    const testFavorites = ['Chicken', 'Fish', 'Subway', 'Pizza'
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

function addToWheel(addItem) {
  if (Consts.wheelFoods.length > 11) { return } //too many items for the wheel.
  for (var i = 0; i < Consts.wheelFoods.length; i++) {
    if (Consts.wheelFoods[i] == addItem){
      return; //duplicate found. do nothing.
    }
  }
  Consts.wheelFoods.push(addItem);
  Consts.totalChecks++;
  return;
}
function removeFromWheel(removeItem) {
  var arr = Consts.wheelFoods;
  for (var i = 0; i < arr.length; i++){
    if (arr[i] == removeItem){
      if (i == arr.length-1) {
        arr.pop() //if this is the last item, don't set to anything.
      } else { arr[i] = arr.pop() }
      Consts.wheelFoods = arr;
      Consts.totalChecks--;
      return;
    }
  }
}

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
    backgroundColor: listColor,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  goToWheel:{width: '100%'}
});

export default Favorites;