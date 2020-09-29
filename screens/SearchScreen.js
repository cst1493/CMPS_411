// @ts-check
import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, VirtualizedList  } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#21F3CB',
    height: 150,
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 50,
    padding: 50,
  },
  title: {
    fontSize: 32,
  },
});
const DATA = [ 'popeyes',  'Taco Bell', 'Zaxbys'];

const getItem = (data, index) => {
  return {
    id: Math.random().toString(12).substring(0),
    title: `Item ${index+1}`
  }
}

const getItemCount = (data) => {
  return 3;
}

const Item = ({ title })=> {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}


const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Search Database Screen</Text>
      <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
 
export default SearchScreen;