/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const names = Platform.select({
  android:
    'Sebastian Pulak\n' +
    'and\n'+
    'Piotr Gębski'
});


export default class Main extends React.Component {
  state = {
    names: [
      { 'name': 'Current weather', 'id': 1, 'test': 'CurrentWeather' },
      { 'name': 'Forecast', 'id': 2, 'test': 'HourlyWeather' },
    ]
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
      },
      title: 'Home',
      headerStyle: {
        backgroundColor: '#3b5998',
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        //fontWeight: 'bold',
      }
    }
  };


  goToScreen = (screenName) => {
    this.props.navigation.navigate(screenName)
  }

  render() {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar backgroundColor="#3b5998" barStyle="light-content" />
      <Image
          style={{width: 150, height: 150}}
          source={{uri: 'https://cdn1.iconfinder.com/data/icons/weather-429/64/weather_icons_color-14-512.png'}}
        />
        <Text style={styles.logo}>MyWeather App </Text>
        <Text style={styles.create}>Created by: </Text>
        <Text style={styles.names}>{names}</Text>
          {
            this.state.names.map((item, index) => (
                
              <View style={styles.container2} key={item.id}>
                <TouchableOpacity style={styles.button} onPress={() => this.goToScreen(item.test)}>
                <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>  
                            
              </View>
              
            ))
          }

        </ScrollView>
        </LinearGradient>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  linearGradientButton: {
    flex: 1,
    borderRadius: 40
  },
  button: {
      flex:1,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    color: 'white'
  },
  logo: {
    padding: 10,
    color: 'white',
    fontSize: 25,
  },

  create:{
    padding: 10,
    color: 'white',
    fontSize: 15,
  },
  names:{
    padding: 10,
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }

});