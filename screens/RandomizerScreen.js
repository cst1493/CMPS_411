// @ts-check
import React, { Component } from "react";
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import Consts from "../Consts";
import { PushHistoryToStorage, AddToHistoryList, MoveToBotOfFavs } from '../localStorage'
// @ts-ignore
import WheelOfFortune from 'react-native-wheel-of-fortune';
const wheelFrame = Consts.color5;
const colores = ['#943E37', '#276000', '#CBA25F', '#61318C', '#F07212'];

class Wheel extends Component
{
  constructor(props) 
  {
    super(props);
    this.state = {
      winnerValue: null,
      winnerIndex: null
    }
    this.child = null
  }
  render() {
    return(
      <View style={styles.container}>
        <WheelOfFortune
          duration={5000}
          onRef={ref => (this.child = ref)} 
          rewards={ Consts.wheelFoods }
          colors={colores}
          knobSize={25}
          borderWidth={2}
          borderColor={ wheelFrame }
          innerRadius={12}
          backgroundColor={ wheelFrame }
          getWinner={(value, index) => this.setState({ winnerValue: BorrowValue(value), winnerIndex: index })}
        />
      </View>
    )
  }
}

//work-around to keep the value of the winner after the constructor is deleted.
async function BorrowValue(value)
{
  AddToHistoryList(value.toString());
  await PushHistoryToStorage();
  await MoveToBotOfFavs(value.toString());
  Alert.alert(
    Consts.historyList[0] + ' was added to your history list', '',
    [ 
      { text: 'Close' }, 
    ]
  );
  return value //gets the wheel result.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Consts.color1,
  },
});

export default Wheel;