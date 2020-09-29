// @ts-check
//import * as React from 'react';
import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { getEnforcing } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Consts from "../Consts";
// @ts-ignore
import WheelOfFortune from 'react-native-wheel-of-fortune';

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
          duration={1000} //duration={5000}
          onRef={ref => (this.child = ref)} 
          rewards={ Consts.wheelFoods }
          knobSize={26}
          borderWidth={10}
          borderColor={ '#c0392b' }
          innerRadius={50}
          backgroundColor={"#c0392b"}
          getWinner={(value, index) => this.setState({ winnerValue: BorrowValue(value), winnerIndex: index })}
        />
        {/* <Button title="Press me" onPress={ () => { this.child._onPress() } } /> */}
      </View>
    )
  }
}

//work-around to keep the value of the winner after the constructor is deleted.
function BorrowValue(value)
{
  Consts.winner = value.toString();
  alert('The winner is: ' + Consts.winner); //TODO set to history[0];
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