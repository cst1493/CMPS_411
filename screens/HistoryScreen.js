// @ts-check
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Consts from '../Consts';

const headerColor = Consts.color3;
const listColor1 = Consts.color1;
const listColor2 = Consts.color2;
const border = Consts.color5;

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
                <Text style={{color: Consts.fontColor}}>
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
    backgroundColor: 'black',
  },
  title: {
    padding: 18,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    backgroundColor: headerColor,
    textAlign: 'center',
    fontSize: 30,
    color: Consts.fontColor,
  },
  scrollStyle:{
    width: '100%',
    backgroundColor: border,
  },
  listItem1:{
    backgroundColor: listColor1,
    borderBottomWidth: 2,
    borderBottomColor: border,
  },
  listItem2:{
    backgroundColor: listColor2,
    borderBottomWidth: 2,
    borderBottomColor: border,
  },
});

export default History;