// @ts-check
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const RandomizerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Spin-Wheel/Randomizer Screen</Text>
      <Button
      title="Back to Favorites"
      onPress={() => navigation.navigate('Favorites')}
      />
    </View>
  );
};
 
export default RandomizerScreen;