// @ts-check
import * as React from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from './HomeScreen';

//const BottomTab = createTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
//https://reactnavigation.org/docs/screen-options-resolution/


///////////////Added some basic navigation from a previous project.  Anyone can change or delete this if they have a different design.
/*
export default function BottomTabNavigator({ navigation, route }) {
    navigation.setOptions({ headerTitle: 'Engri Agri-Tourism' });

    return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
        />

      </BottomTab.Navigator>
    );
  }
  */
  function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    switch (routeName) {
      case 'Home':
        return 'How to get started';
      case 'Links':
        return 'Links to learn more';
      case 'Account':
        return 'User';
    }
  }