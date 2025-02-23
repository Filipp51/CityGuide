// navigation/AppNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Карта" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Мои достижения" }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: "Локации" }} />
    </Stack.Navigator>
  );
}













