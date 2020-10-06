// @ts-check
import { Component, useState } from "react";
//https://color.adobe.com/create/color-wheel
//const color1 = '#4CA7ED'; const color2 = '#4FF7C7'; const color3 = '#59E052'; const color4 = '#F4F74F'; const color5 = '#F0C348'; 
//const color1 = '#475CFF'; const color2 = '#43DED0'; const color3 = '#70F555'; const color4 = '#DEC943'; const color5 = '#F5994C'; 
const color1 = '#E6BC05'; const color2 = '#E61B00'; const color3 = '#FF790B'; const color4 = '#FCFCFC'; const color5 = '#000000';
const color6 = '#FFA02C';
const historyKey = 'history';

var wheelFoods = ['Pizza','Burgers','Tacos','Canes', 'Popeyes', 'Sushi'];
var favoritesList = ['empty'];
var historyList = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'];
var winner = '';

export default {
    wheelFoods,
    favoritesList,
    historyList, historyKey,
    winner,
    color1, color2, color3, color4, color5, color6
}