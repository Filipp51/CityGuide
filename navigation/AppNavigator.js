import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Карта" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Мои достижения" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
