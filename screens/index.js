import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './Main';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import Details from './Details';

const AppNavigator = createStackNavigator(
    {
        Main: Main,
        CurrentWeather: CurrentWeather,
        HourlyWeather: HourlyWeather,
        Details: Details
    },
    {
        initialRouteName: "Main",
        headerLayoutPreset: 'center'
    });

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}
