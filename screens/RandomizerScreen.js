// @ts-check
import React from 'react';
//import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Value } from 'react-native-reanimated';
import WheelOfFortune from 'react-native-wheel-of-fortune';


var value;

const RandomizerScreen = ({ navigation }) => {
  return (
    DumbWheel()
  );
};

function DumbWheel(){
  var rewards = [1,2,3,4,5,6,7,8,9,10]
  return(
  <View style={styles.container}>
      <WheelOfFortune
          onRef={ref => (WheelOfFortune.child = ref)} 
          rewards={ rewards }
          knobSize={20}
          borderWidth={3}
          borderColor={"#FFF"}
          winner={3}
          innerRadius={50}
          backgroundColor={"#c0392b"}
          getWinner={(value, index) => WheelOfFortune.setState({ winnerValue: value, winnerIndex: index })}
      />
      <Button title="Press me" onPress={ () => { WheelOfFortune.child._onPress() } } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RandomizerScreen;