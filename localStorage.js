/// @ts-check
import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

class localStorage extends Component{
    state = {
        testKey: '',
        //foodTitles: '',

    }

    constructor(props) {
        super(props);
        this._retrieveData();
    }
    
    //static setItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
    _storeData = async () => {
        try {
            this.setState({ testKey: 'testStoredValue' })
            await AsyncStorage.setItem('testKey', 'testStoredValue')
        } catch (error) {
          console.log("catch localStorage.async _storeData");
        }
    };
    
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('testKey');

          if (value !== null) {
            //We have data
            console.log(value);
            this.setState({ testKey: value })
          }
        } catch (error) {
            console.log("catch localStorage._retrieveData");
        }
    };


    //await AsyncStorage.removeItem('removedKey');
    //await AsyncStorage.clear() //wipes all local data.

    //export default _retrieveData; //import in HomeScreen.js


}




