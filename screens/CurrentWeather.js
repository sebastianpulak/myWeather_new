/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, TextInput, Image} from 'react-native';
//var moment = require('moment');

export default class CurrentWeather extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      inputCity: 'London',
      cityName: 'London',
      iconUrl: 'http://openweathermap.org/img/w/',
      //dateString: moment.unix(1556226000).format("MM/DD/YYYY")
    }
  }
   
  
   
  componentDidMount() {
   this.callApi();
  }

  callApi(){
    return fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.state.inputCity + '&units=metric&appid=5cacdcffc387b9b5dd7ec2505797e494')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPress = () => {
    this.callApi();
    this.setState({
      cityName: this.state.inputCity
    })
  }


   
   
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'}/>
        </View>
      );
    }
    
    if(this.state.dataSource.cod===200){
    return (
      <View style={styles.container}>
      <TextInput
          style={styles.buttonViewContainer}
          placeholder="Type in the city you want to check!"
          onChangeText={(inputCity) => this.setState({inputCity})}
        />

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.textViewContainer}>Search</Text>
        </TouchableOpacity>
        <Text style={styles.cityText} > {this.state.cityName} </Text>

        <View style={styles.container2}>
        <Text style={styles.textViewContainer} > {Math.round(this.state.dataSource.main.temp)}℃ 
        <Image style={{height: 40, width: 40}} source={{uri: this.state.iconUrl + this.state.dataSource.weather[0].icon+'.png'}}></Image></Text>
        <Text style={styles.textViewContainer} > Humidity: {this.state.dataSource.main.humidity}%</Text>
        <Text style={styles.textViewContainer} > Pressure: {this.state.dataSource.main.pressure} hPa</Text>
        <Text style={styles.textViewContainer} > Wind: {this.state.dataSource.wind.speed} km/h</Text>
        <Text style={styles.textViewContainer} > Cloudiness: {this.state.dataSource.clouds.all}%</Text>
        </View>
      </View>
    );
    }
    else {
      return (
        <View style={styles.container}>
      <TextInput
          style={styles.buttonViewContainer}
          placeholder="Type in the city you want to check!"
          onChangeText={(inputCity) => this.setState({inputCity})}
        />

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.textViewContainer}>Search</Text>
        </TouchableOpacity>

        <Text style={styles.textViewContainer}>Incorrect city name</Text>

      </View>
    );
    }
  }
  }
   
  const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1d7ff',
  },
  container2: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },

  button: {
    marginBottom: 25,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    borderRadius: 40
  },
  button2: {
    marginBottom: 25,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    borderRadius: 40
  },
   
  textViewContainer: {
   textAlignVertical:'center', 
   padding:10,
   fontSize: 20,
   color: '#053f60',
  },

  cityText: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 40,
    color: '#053f60',
   },
  
  buttonViewContainer: {
   marginBottom: 25,
   textAlignVertical:'center', 
   padding:10,
   fontSize: 20,
   borderRadius: 10,
   backgroundColor: '#2196F3',
    
   }
   
  });
