//@ts-check
import React, {Component} from 'react';
import { ListItem , Icon} from 'react-native-elements';
import { View, Text, Button, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import Consts from '../Consts';
import { AsyncStorage } from 'react-native';
import { add, color } from 'react-native-reanimated';
import CheckBox from '@react-native-community/checkbox';
import { PushHistoryToStorage, AddToHistoryList } from '../localStorage'
import { Circle } from 'react-native-svg';
 
const buttonColor = Consts.color3;
const trashButtonColor = '#777777';
const listColor = Consts.color1;

//setFavoritesList(true); // RECOMMENDED TO RUN overwriteFavoritesList(true) ONCE TO STORE DUMMY DATA //

//AsyncStorage.removeItem(favoritesKey); //to delete all local storage while testing.
//getFavoritesList(); //all food items updated to var Const.favoritesList. will return null if storing data at the same time.

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
      <View style={{flex: 1}}>
        <ScrollView style={styles.scrollView}>

          <View style={styles.barButtons}>
            <Button title="Add Temporary Food To Wheel" color={buttonColor} onPress={() => this.addTempFood()} />
          </View>

          <View>
            {(Consts.favoritesList).map((element, index) => (
              <ListItem key={index} containerStyle={styles.Listing}>

                <View style={styles.LI_Section1}>
                  <Icon
                    reverse //reactnativeelements.com/docs/icon/
                    type='feather' //icon library
                    name='trash-2' //icon list: feathericons.com
                    size={15}
                    onPress={() => deleteFavorite(element, index)}
                    color= {trashButtonColor}
                  />
                </View>

                <View style={styles.LI_Section2}>
                  <ListItem.Title> { element } </ListItem.Title>
                </View>

                <View style={styles.LI_Section3}> 
                  <Button title="Decide Now" color={buttonColor} onPress={() => decideNowButton(element)} />
                </View>

                <View style={styles.LI_Section4}>
                  <CheckBox
                    value={this.state.checkbox[index]}
                    onValueChange={( ) => this.setState({value: this.changeCheckBox(index, element)})}
                  />
                  <Text>on wheel</Text>
                </View>

              </ListItem>
              )
            )}
          </View>
        </ScrollView>

        <View style={styles.barButtons}>
          <Button title="Spin The Wheel" color={buttonColor} onPress={() => this.goToWheel()} />
        </View>
        
      </View>
    );
  }
};

function decideNowButton(food) {
  alert("added to history?"); //TODO finish button with yes/no confirm and save to history.
  var userConfirmed = false;
  //TODO user confirm message
  if (true) { //add item to history
    AddToHistoryList(food);
    PushHistoryToStorage();
  }
  return;
}

function deleteFavorite(foodName, index) { //TODO
  alert('Are you sure you want to delete ' + foodName + index + ' from your favorites?');
}

const favoritesKey = 'favorites'; //key is used to find, store and replace favorites data.
async function setFavoritesList(populateDummyData) { //overwrite current Consts.favoritesList.
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

async function getFavoritesList() { //update Consts.favoritesList with stored data. Move to App.js???
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
  scrollView:{
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  Listing: {
    borderTopWidth: 2,
    backgroundColor: listColor,
    borderColor: 'black',
  },
  LI_Section1:{
    width: '8%',
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  LI_Section2:{
    width: '35%',
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  LI_Section3:{
    width: '25%',
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  LI_Section4:{
    width: '25%',
    justifyContent: "flex-start",
  },
  barButtons: {
    width: '100%',
    fontSize: 20,
  },
});

export default Favorites;