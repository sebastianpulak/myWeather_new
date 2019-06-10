/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, Image, ScrollView, Dimensions,TextInput, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class HourlyWeather extends React.Component {
    
    

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitleStyle: {
            alignSelf: 'center',
            flex: 1
          },
          title: 'Hourly forecast',
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
  
   

   



  async callApi(){
    return fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ this.state.inputCity + '&units=metric&appid=5cacdcffc387b9b5dd7ec2505797e494')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          data: responseJson.list
        }, function() {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {

    const { navigation } = this.props;
    const otherParam = navigation.getParam('otherParam');
    console.log("Hourly: " + otherParam);
    if(otherParam){
        await this.setState({
            isLoading: true,
            cityName: otherParam,
            inputCity: otherParam,
            isShown: false
          })
    }
   await this.callApi();
  }

  onPress = () => {   
    this.setState({
      isLoading: true,
      cityName: this.state.inputCity
    })
    this.callApi();
  }

  goToCurrent = () => {
      const pushAction = StackActions.push({
        routeName: 'CurrentWeather',
        params: {
            otherParam: this.state.inputCity,
        },
    });
      this.props.navigation.dispatch(pushAction);
  }

  show = () => {
      this.setState({
          isShown: !this.state.isShown
      })
  }

  goToDetails = (inputDetails, city) => {
    const pushAction = StackActions.push({
        routeName: 'Details',
        params: {
            inputFromHourly: inputDetails,
            cityNamed: city
        },
    });
      this.props.navigation.dispatch(pushAction);
  }
  
    
  render() {
    if (this.state.isLoading) {
      return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
        </LinearGradient>
      );
    }

    if(this.state.dataSource.cod==200){
    let rowsOfTiles = [];
    let row = [];
    for (let i = 0; i < this.state.dataSource.list.length-1; i++) {
        if (!this.state.dataSource.list[i].rain){
            row.push(
                <View key={i}>
                  <TouchableOpacity style={styles.tile} key={i} onPress={() => this.goToDetails(this.state.dataSource.list[i], this.state.cityName) }>
                    <Text style={styles.tileTextName}>{moment.unix(this.state.dataSource.list[i].dt).format("DD.MM.YYYY HH:mm")}</Text>
                    <Text style={styles.tileTemp}> {Math.round(this.state.dataSource.list[i].main.temp)}℃
                    <Image style={{height: 40, width: 40}} source={{uri: this.state.iconUrl + this.state.dataSource.list[i].weather[0].icon+'.png'}}></Image></Text>
                    <Text style={styles.tileTextName}>Rain: 0mm</Text>
                  </TouchableOpacity>
                </View>
              );
        } else {
            row.push(
                <View key={i}>
                  <TouchableOpacity style={styles.tile} key={i} onPress={() => this.goToDetails(this.state.dataSource.list[i], this.state.cityName) }>
                    <Text style={styles.tileTextName}>{moment.unix(this.state.dataSource.list[i].dt).format("DD.MM.YYYY HH:mm")}</Text>
                    <Text style={styles.tileTemp}> {Math.round(this.state.dataSource.list[i].main.temp)}℃
                    <Image style={{height: 40, width: 40}} source={{uri: this.state.iconUrl + this.state.dataSource.list[i].weather[0].icon+'.png'}}></Image></Text>
                    <View>
                    <Text style={styles.tileTextName}>Rain: {this.state.dataSource.list[i].rain["3h"]}mm</Text>
                    </View>                    
                  </TouchableOpacity>
                </View>
              );
        }
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
          </View>
        ); 
        row = [];
      if (i === this.state.dataSource.list.length - 1) {
        rowsOfTiles.push(
          <View style={styles.rowOfTiles} key={i}>
            {row}
          </View>  
        )
      }
    }
  
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <ScrollView contentContainerStyle={styles.container}>
        <TextInput
        placeholder="Type in the city you want to check!"
        placeholderTextColor="#FFFFFF"
         style={styles.buttonViewContainer}
         onChangeText={(inputCity) => this.setState({inputCity})}
        />

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.textViewContainer}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.goToCurrent() }>
        <Text style={styles.textViewContainer}>Current</Text>
        </TouchableOpacity>
        
        <Text style={styles.cityText} >{this.state.cityName}</Text>
        {rowsOfTiles} 
      </ScrollView>  
      </LinearGradient>
    );
} else {
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
    <View style={styles.container}>
  <TextInput
        placeholder="Type in the city you want to check!"
        placeholderTextColor="#FFFFFF"
         style={styles.buttonViewContainer}
         onChangeText={(inputCity) => this.setState({inputCity})}
    />

    <TouchableOpacity style={styles.button} onPress={this.onPress}>
    <Text style={styles.textViewContainer}>Search</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={() => this.goToCurrent() }>
    <Text style={styles.textViewContainer}>Current</Text>
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
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
  },
      tile: {
        width: width,
        height: 100,
        margin: 2,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#838c99',
        
      },
      rowOfTiles: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
      },
      tileTextName: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: 'white'
      },
      tileIconName: { 
        textAlign: 'center',
        margin: 10
      },
      tileTemp: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
      },
      tileTextPlus: {
        fontSize: 96,
        textAlign: 'center',
        color:"#4F8EF7"
        
      },
      tileTextId: { 
        fontSize: 20,
        textAlign: 'center'
      },
      loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //paddingTop: 20,
        
      },
      button: {
        marginBottom: 25,
        width: 150,
        alignItems: 'center',
        backgroundColor: '#3b5998',
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
       padding:10,
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