// @ts-check
import React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Consts from '../Consts';
 
const buttonColor = Consts.color1;

const FavoritesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text></Text>
      <ScrollView style={styles.scrollStyle}>
        <ListItem.Title style={styles.Listing}>{'FOOD ITEM 1'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'FOOD ITEM 2'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'FOOD ITEM 3'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{' '} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'Need to make this label a food item,'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'and add 2 buttons per listing.'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'btn1: decide now.'} </ListItem.Title>
        <ListItem.Title style={styles.Listing}>{'btn2: add to wheel checkbox'} </ListItem.Title>
      </ScrollView>
      <View style={[{width: '100%'}]}>
        <Button title="Spin The Wheel" color={buttonColor} onPress={() => navigation.navigate('Randomizer')} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollStyle:{
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  Listing: {
    fontSize: 30,
    borderBottomWidth: 3,
    textAlign: 'left',
    backgroundColor: buttonColor,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  goToWheel:{width: '100%'}
});

export default FavoritesScreen;