// @ts-check
//import { Component, useState } from "react";

const color1 = '#222222'; const color2 = '#2D2D2D'; 
const color3 = '#276000'; const color4 = '#943E37'; 
const color5 = '#000000'; const fontColor = '#FCFCFC'; //*/

const maxHistoryLength = 20;

var wheelFoods = ['empty'];
var totalChecks = 0; //keeping the counter with wheelFoods so they reset at the same time.  2 checkboxes minimum to go to wheel.
var favoritesList = ['empty'];
var historyList = [''];

export default {
    wheelFoods, totalChecks,
    favoritesList,
    historyList, maxHistoryLength,
    color1, color2, color3, color4, color5, fontColor
}