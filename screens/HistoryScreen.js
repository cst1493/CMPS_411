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
 
const HistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>History Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
 
export default HistoryScreen;