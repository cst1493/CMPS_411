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
 
const FavoritesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Favorites Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Spin the wheel"
        onPress={() => navigation.navigate('Randomizer')}
      />
    </View>
  );
};
 
export default FavoritesScreen;