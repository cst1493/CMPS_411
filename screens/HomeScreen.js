// @ts-check
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Protected Home Screen</Text>
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