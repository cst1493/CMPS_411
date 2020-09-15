// @ts-check
//import * as React from 'react';
import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { getEnforcing } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Consts from "../Consts";
// @ts-ignore
import WheelOfFortune from 'react-native-wheel-of-fortune';

//var wheelFoods = ['Pizza','Burgers','Tacos','Canes', 'Popeyes', 'Sushi'];

class WheelConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerValue: null,
      winnerIndex: null
    }
    this.child = null
  }
}
var construct = new WheelConstructor(); //TODO only make new if not already spun on this app-open.
const RandomizerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WheelOfFortune
        duration={5000}
        onRef={ref => (construct.child = ref)} 
        rewards={ Consts.wheelFoods }
        knobSize={26}
        borderWidth={10}
        borderColor={ '#c0392b' }
        winner={ GetRandomWinner() }
        innerRadius={50}
        backgroundColor={"#c0392b"}
        //getWinner={(value, index) => construct.state({ winnerValue = value, winnerIndex: index })}
        getWinner={(value, index) => construct.setState({ winnerValue: value, winnerIndex: index })}
      />
      {/* <Button title="Press me" onPress={ () => { con.child._onPress() } } /> */}
    </View>
  );
};

function GetRandomWinner() //Can add a static variable here if needing the result elsewhere.
{
  return (Math.floor(Math.random() * Consts.wheelFoods.length)) //gets the wheel result.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Consts.color1,
  },
});

export default RandomizerScreen;