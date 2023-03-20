import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './view/Home'
import MoreScreen from './view/More'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen} />
        <Stack.Screen name="MoreScreen" options={{headerShown:false}} component={MoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;