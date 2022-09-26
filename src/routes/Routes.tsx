import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Board from 'src/pages/Board';
import Home from 'src/pages/Home';
import { RoutesList } from './Routes.types';

const Stack = createNativeStackNavigator();

const MainRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RoutesList.Home}>
        <Stack.Screen
          name={RoutesList.Home}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RoutesList.Board}
          component={Board}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
