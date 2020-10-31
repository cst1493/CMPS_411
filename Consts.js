// @ts-check
import { Component, useState } from "react";
//https://color.adobe.com/create/color-wheel
//const color1 = '#4CA7ED'; const color2 = '#4FF7C7'; const color3 = '#59E052'; const color4 = '#F4F74F'; const color5 = '#F0C348'; 
const color1 = '#E6BC05'; const color2 = '#FFA02C'; const color3 = '#FF790B'; const color4 = '#FCFCFC'; const color5 = '#000000';
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
    color1, color2, color3, color4, color5
}