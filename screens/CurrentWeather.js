/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, TextInput, Image, ScrollView, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

export default class CurrentWeather extends React.Component {
      

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: {
                alignSelf: 'center',
                flex: 1
              },
              title: 'Current weather',
              headerStyle: {
                backgroundColor: '#3b5998',
              },
              headerTintColor: '#fff',
              headerTintStyle: {
                //fontWeight: 'bold',
              },
              headerRight: (
                <Ionicons style={{ flex: 1, marginRight: 15 }} name="ios-home" size={30} color="#fff"
                  onPress={() => navigation.navigate('Main')} />
              )
        }
      };  

      constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          inputCity: 'London',
          cityName: 'London',
          iconUrl: 'http://openweathermap.org/img/w/',
        }
      }
  
   
      async componentDidMount() {
        const { navigation } = this.props;
        const otherParam = navigation.getParam('otherParam');
        console.log("Current: "+ otherParam);
    
        if(otherParam){
            await this.setState({
                isLoading: true,
                cityName: otherParam,
                inputCity: otherParam
              })
        }
       await this.callApi();
      }

      
  goToHourly = () => {
    const pushAction = StackActions.push({
        routeName: 'HourlyWeather',
        params: {
            otherParam: this.state.inputCity,
        },
    });
      this.props.navigation.dispatch(pushAction);
  }



  async callApi(){
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
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c1d7ff' }}>
        <StatusBar backgroundColor="#3b5998" barStyle="light-content" />
          <ActivityIndicator size={'large'}/>
        </View>
        </LinearGradient>
      );
    }
    
    if(this.state.dataSource.cod===200){
    return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
      <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#3b5998" barStyle="light-content" />
      <TextInput
            placeholder="Type in the city you want to check!"
            placeholderTextColor="#FFFFFF"
          style={styles.buttonViewContainer}
          onChangeText={(inputCity) => this.setState({inputCity})}
          underlineColorAndroid='transparent'
        />

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.textViewContainer}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goToHourly() }>
        <Text style={styles.textViewContainer}>Forecast</Text>
        </TouchableOpacity>
        <Text style={styles.cityText} > {this.state.cityName} </Text>

        <View style={styles.container2}>
        <Text style={styles.textViewContainer} > Temperature: {Math.round(this.state.dataSource.main.temp)}℃ 
        <Image style={{height: 40, width: 40}} source={{uri: this.state.iconUrl + this.state.dataSource.weather[0].icon+'.png'}}></Image></Text>
        <Text style={styles.textViewContainer} > Humidity: {this.state.dataSource.main.humidity}%</Text>
        <Text style={styles.textViewContainer} > Pressure: {this.state.dataSource.main.pressure} hPa</Text>
        <Text style={styles.textViewContainer} > Wind: {this.state.dataSource.wind.speed} km/h</Text>
        <Text style={styles.textViewContainer} > Cloudiness: {this.state.dataSource.clouds.all}%</Text>
        </View>
      </ScrollView>
      </LinearGradient>
    );
    }
    else {
      return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <View style={styles.container}>
        <StatusBar backgroundColor="#3b5998" barStyle="light-content" />
      <TextInput
        placeholder="Type in the city you want to check!"
         placeholderTextColor="#FFFFFF"
          style={styles.buttonViewContainer}
          onChangeText={(inputCity) => this.setState({inputCity})}
          underlineColorAndroid='transparent'
        />

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.textViewContainer}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goToHourly() }>
        <Text style={styles.textViewContainer}>Forecast</Text>
        </TouchableOpacity>

        <Text style={styles.textViewContainer}>Incorrect city name</Text>

      </View>
      </LinearGradient>
    );
    }
  }
  }
   
  const styles = StyleSheet.create({
   
  container: {
    flexGrow: 1,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },

  button: {
    marginBottom: 15,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1
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
   padding:5,
   fontSize: 20,
   color: 'white',
  },

  cityText: {
    textAlignVertical:'center', 
    padding:10,
    fontSize: 40,
    color: 'white',
   },
  
  buttonViewContainer: {
   marginBottom: 25,
   textAlignVertical:'center', 
   padding:10,
   fontSize: 20,
   borderRadius: 10,
   backgroundColor: '#3b5998',
   color: 'white'
    
   }
   
  });
