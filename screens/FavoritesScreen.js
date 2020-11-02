//@ts-check
import React, {Component} from 'react';
import { ListItem , Icon} from 'react-native-elements';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import Consts from '../Consts';
import { AsyncStorage } from 'react-native';
import { add, color } from 'react-native-reanimated';
import CheckBox from '@react-native-community/checkbox';
import { PushHistoryToStorage, AddToHistoryList, PushFavoritesToStorage } from '../localStorage'
import { Circle } from 'react-native-svg';
import DialogInput from 'react-native-dialog-input'

//RECOMMENDED TO RUN PushFavoritesToStorage(true) ONCE TO STORE DUMMY DATA //
//import { PushFavoritesToStorage } from '../localStorage';
//PushFavoritesToStorage(true);

const buttonColor = Consts.color3;
const buttonColor2 = Consts.color4;
const iconColor = '#8C603E'
const listColor = Consts.color1;
const borderCol = Consts.color5;
const font = Consts.fontColor;

const maxWheelItems = 11;
Consts.wheelFoods=[];
Consts.totalChecks = 0;
class Favorites extends Component 
{
  constructor(props){
    super(props);
    this.state = {
      checkbox: [false],
      dialogVisible: false,
    };
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
            <Button title="Add Temporary Food To Wheel" color={buttonColor2} onPress={() => this.setState({dialogVisible: true})} />
          </View>

          <View>
            <DialogInput 
              isDialogVisible={this.state.dialogVisible}
              title={"Add Temporary Meal"}
              //message={"Add Meal to Wheel"}
              hintInput ={"Meal"}
              cancelText={"Close"}
              submitInput={ (inputText) => {addToWheel(inputText), alert(inputText +" has been added to the Wheel!")} }
              closeDialog={ () => {this.setState({dialogVisible: false})}}>
            </DialogInput>
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
                    onPress={() => deleteFavoriteBtn(element)}
                    color= {iconColor}
                  />
                </View>

                <View style={styles.LI_Section2}>
                  <ListItem.Title style={{color: font}}> { element } </ListItem.Title>
                </View>

                <View style={styles.LI_Section3}> 
                  <Button title="Decide Now" color={buttonColor} onPress={() => decideNowBtn(element)} />
                </View>

                <View style={styles.LI_Section4}>
                  <CheckBox
                    value={this.state.checkbox[index]}
                    tintColors={{true: buttonColor, false: iconColor}}
                    onValueChange={( ) => this.setState({value: this.changeCheckBox(index, element)})}
                  />
                  <Text style={{color: font}}>on wheel</Text>
                </View>

              </ListItem>
              )
            )}
          </View>
        </ScrollView>

        <View style={styles.barButtons}>
          <Button title="Spin The Wheel" color={buttonColor2} onPress={() => this.goToWheel()} />
        </View>
        
      </View>
    );
  }
};

function decideNowBtn(decidedMeal) {
  Alert.alert(
    'Are you sure you want to add ' + decidedMeal + ' to your history?', '',
    [ 
      { text: 'Cancel', onPress: () => console.log('canceled action') },
      { text: 'Confirm', onPress: () => confirmDecideNow(decidedMeal) }, 
    ]
  );
}
function confirmDecideNow(decidedMeal) {
  AddToHistoryList(decidedMeal);
  PushHistoryToStorage();
  //TODO sort this food to the bottom of favorites array.
}

function deleteFavoriteBtn(foodName) {
  Alert.alert(
    'DELETE', 
    'Are you sure you want to permanently delete ' + foodName + ' from your favorites?',
    [ 
      { text: 'Cancel', onPress: () => console.log('canceled action') },
      { text: 'Confirm', onPress: () => confirmDeleteFavorite(foodName) }, 
    ]
  );
}
function confirmDeleteFavorite(foodName) {
  const len = Consts.favoritesList.length;
  var index = -1;
  for(var i = 0; i < len; i++) {
    if(foodName == Consts.favoritesList[i]) {
      index = i;
      console.log('found & deleted ' + Consts.favoritesList[index] + ' at index ' + index);
    }
  }
  if (index != -1) { //found item
    for(var i = index; i < len; i++) {
      Consts.favoritesList[i] = Consts.favoritesList[i+1];
    }
    Consts.favoritesList.pop();
    PushFavoritesToStorage(); //push array to storage.
    //TODO refresh page with new array.
  }
  else {console.log('something went wrong...  Unable to find foodname for deleting.')}
}

function addToWheel(addItem) {
  if (Consts.wheelFoods.length > maxWheelItems) { return } //too many items for the wheel.
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
    borderColor: borderCol,
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
  },
});

export default Favorites;