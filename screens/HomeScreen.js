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
 
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <Button
        title="Search For Something"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to History"
        onPress={() => navigation.navigate('History')}
      />
      <Button
      title="Go to Favorites"
      onPress={() => navigation.navigate('Favorites')}
      />
    </View>
  );
};
 
export default HomeScreen;

//import * as React from 'react';
//import { Text, View, Alert, ScrollView } from 'react-native';
//import getEnvVars from './xxxxx';
//import { Card, Button } from 'react-native-elements';

/*export default function HomeScreen({navigation}) {
    return (
      <View>
        <ScrollView>
          <View>
              
          </View>
        </ScrollView>
      </View>
    );
  }

  HomeScreen.navigationOptions = {
    header: null,
  };*/