// @ts-check
import { Component, useState } from "react";
//https://color.adobe.com/create/color-wheel
/*const color1 = '#E6BC05'; const color2 = '#FFA02C'; 
const color3 = '#FF790B'; const color4 = '#FF790B'; 
const color5 = '#777777'; const fontColor = '#000000'; //*/

const color1 = '#222222'; const color2 = '#444444'; 
const color3 = '#276000'; const color4 = '#943E37'; 
const color5 = '#777777'; const fontColor = '#FCFCFC'; //*/

const maxHistoryLength = 12;

var wheelFoods = ['empty'];
var totalChecks = 0; //keeping the counter with wheelFoods so they reset at the same time.  2 checkboxes minimum to go to wheel.
var favoritesList = ['empty'];
var historyList = [''];
var winner = '';

export default {
    wheelFoods, totalChecks,
    favoritesList,
    historyList, maxHistoryLength,
    winner,
    color1, color2, color3, color4, color5, fontColor
}