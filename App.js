// @ts-check
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HistoryScreen from './screens/HistoryScreen';
import SearchScreen from './screens/SearchScreen';
import RandomizerScreen from './screens/RandomizerScreen';

//Navigation --> https://www.robinwieruch.de/react-native-navigation
const RootStack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Favorites" component={FavoritesScreen} />
        <RootStack.Screen name="History" component={HistoryScreen} />
        <RootStack.Screen name="Search" component={SearchScreen} />
        <RootStack.Screen name="Spin The Wheel" component={RandomizerScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default App;