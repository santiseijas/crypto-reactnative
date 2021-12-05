import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './src/pages/Detail';
import Home from './src/pages/Home';


const Stack = createStackNavigator();

export default function App() {
  console.disableYellowBox=true
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false,}} >
    <Stack.Screen
            name="Home"
            component={Home}
          />
            <Stack.Screen
          
            name="Detail"
            component={Detail}
          />
    </Stack.Navigator>
  </NavigationContainer>
   
 
  );
}


