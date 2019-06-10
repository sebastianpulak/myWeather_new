import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './Main';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';


// create our app’s navigation stack

const AppNavigator = createStackNavigator(
    {
        Main: Main,
        CurrentWeather: CurrentWeather,
        HourlyWeather: HourlyWeather
    },
    {
        initialRouteName: "Main"
    });

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}
