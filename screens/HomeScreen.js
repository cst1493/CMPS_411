import * as React from 'react';
import { Text, View, Alert } from 'react-native';
//import getEnvVars from './xxxxx';
//import { Card, Button } from 'react-native-elements';

export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
              
          </View>
        </ScrollView>
      </View>
    );
  }

  HomeScreen.navigationOptions = {
    header: null,
  };