// @ts-check
import React, {Component, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Consts from '../Consts';

class History extends Component{
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Your Meal History
        </Text>
        <FlatList style={styles.scrollStyle}
          numColumns={1}
          data={Consts.historyList}
          renderItem={({ item, index }) => (
            <ListItem containerStyle={ index % 2 === 0 ? styles.listItem1 : styles.listItem2 }>
              <View>
                <Text>
                  { (index+1) + ":  " + item }
                </Text>
              </View>
            </ListItem>
          )}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    flex: 1,
    width: '100%',
    backgroundColor: Consts.color5,
  },
  title: {
    padding: 18,
    borderWidth: 4,
    backgroundColor: Consts.color1,
    textAlign: 'center',
    fontSize: 30,
  },
  scrollStyle:{
    width: '100%',
    backgroundColor: 'grey',
  },
  listItem1:{
    backgroundColor: Consts.color3,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  listItem2:{
    backgroundColor: Consts.color6,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default History;