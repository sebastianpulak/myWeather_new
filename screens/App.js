import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Main from './Main'


// create our app’s navigation stack

export default createAppContainer(createSwitchNavigator(

{
Main
},

{

initialRouteName: 'Main'

}

));