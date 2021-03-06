import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ScrollView, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import moment from "moment";

export default class Details extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitleStyle: {
            alignSelf: 'center',
            flex: 1
          },
          title: 'Details',
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
      iconUrl: 'http://openweathermap.org/img/w/'
    }
  }

  async componentWillMount() {

    const { navigation } = this.props;
    const inputFromHourly = navigation.getParam('inputFromHourly');
    const cityNamed = navigation.getParam('cityNamed');
    console.log("Details: " + JSON.stringify(inputFromHourly));
    if(inputFromHourly){
        await this.setState({
            isLoading: true,
            dataSource: inputFromHourly,
            cityName: cityNamed
          })
    }
  }

  goToScreen = (screenName) => {
    const pushAction = StackActions.push({
        routeName: screenName,
        params: {
            otherParam: this.state.cityName,
        },
    });
      this.props.navigation.dispatch(pushAction);
}


  render() {
    if (!this.state.dataSource.rain){
        return (
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <ScrollView contentContainerStyle={styles.container}>
                
      
              <TouchableOpacity style={styles.button} onPress={() => this.goToScreen('CurrentWeather') }>
              <Text style={styles.textViewContainer}>Current</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.goToScreen('HourlyWeather') }>
              <Text style={styles.textViewContainer}>Hourly</Text>
              </TouchableOpacity>
              <Text style={styles.cityText} > {this.state.cityName} </Text>
              <Text style={styles.cityText}> {moment.unix(this.state.dataSource.dt).format("DD.MM.YYYY HH:mm")}</Text>
              
              
      
              <View style={styles.container2}>
              
              <Text style={styles.textViewContainer} > Temperature: {Math.round(this.state.dataSource.main.temp)}℃ 
              <Image style={{height: 40, width: 40}} source={{uri: this.state.iconUrl + this.state.dataSource.weather[0].icon+'.png'}}></Image></Text>
              <Text style={styles.textViewContainer} > Humidity: {this.state.dataSource.main.humidity}%</Text>
              <Text style={styles.textViewContainer} > Pressure: {this.state.dataSource.main.pressure} hPa</Text>
              <Text style={styles.textViewContainer} > Wind: {this.state.dataSource.wind.speed} km/h</Text>
              <Text style={styles.textViewContainer} > Cloudiness: {this.state.dataSource.clouds.all}%</Text>
              <Text style={styles.textViewContainer} > Rain: 0mm</Text>
              </View>
            </ScrollView>
            </LinearGradient>
          );        
    } else {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
      <ScrollView contentContainerStyle={styles.container}>
          
        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen('CurrentWeather') }>
        <Text style={styles.textViewContainer}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goToScreen('HourlyWeather') }>
        <Text style={styles.textViewContainer}>Hourly</Text>
        </TouchableOpacity>
        <Text style={styles.cityText} > {this.state.cityName} </Text>
        <Text style={styles.cityText}> {moment.unix(this.state.dataSource.dt).format("DD.MM.YYYY HH:mm")}</Text>
        
        

        <View style={styles.container2}>
        
        <Text style={styles.textViewContainer} > Temperature: {Math.round(this.state.dataSource.main.temp)}℃ 
        <Image style={{height: 40, width: 40}} source={{uri: this.state.iconUrl + this.state.dataSource.weather[0].icon+'.png'}}></Image></Text>
        <Text style={styles.textViewContainer} > Humidity: {this.state.dataSource.main.humidity}%</Text>
        <Text style={styles.textViewContainer} > Pressure: {this.state.dataSource.main.pressure} hPa</Text>
        <Text style={styles.textViewContainer} > Wind: {this.state.dataSource.wind.speed} km/h</Text>
        <Text style={styles.textViewContainer} > Cloudiness: {this.state.dataSource.clouds.all}%</Text>
        <Text style={styles.textViewContainer} > Rain: {(this.state.dataSource.rain["3h"]).toFixed(2)}mm</Text>
        </View>
      </ScrollView>
      </LinearGradient>
    );
    }
  }
  }
   
  const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },

  button: {
    marginBottom: 25,
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
    padding:5,
    fontSize: 30,
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
