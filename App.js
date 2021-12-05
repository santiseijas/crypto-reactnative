import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Search  from './components/Search';
import Carrousel from './components/Carrousel';
import { SearchBar } from 'react-native-elements';
import CryptoList from './components/CryptoList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { Icon } from 'react-native-elements/dist/icons/Icon';

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


