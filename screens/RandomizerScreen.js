// @ts-check
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Wheel } from 'react-custom-roulette';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const data = [
    { option: 'Pizza', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: 'Hamburger', style: { backgroundColor: 'white', textColor: 'black' } },
    { option: 'Salad', style: {backgroundColor: 'blue', textColor: 'black'} },
    { option: 'Chicken', style: { backgroundColor: 'orange', textColor: 'black' } },
    { option: 'Spaghetti' },
    { option: 'Spin Again' },
]
 
const RandomizerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Wheel
        mustStartSpinning={true}
        prizeNumber={Math.floor(Math.random() * (data.length - 1))}
        data={data}
        backgroundColors={['#3e3e3e', '#df3428']}
        textColors={['#ffffff']}
      />
      <Text>Spin-Wheel/Randomizer Screen</Text>
      
      <Button
        title="Back to Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
    </View>
  );
};
 
export default RandomizerScreen;
