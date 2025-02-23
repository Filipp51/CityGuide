import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Text style={{ fontSize: 20 }}>Добро пожаловать в CityGuide!</Text>
      <Button
        title="Перейти в профиль"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Посмотреть карту"
        onPress={() => navigation.navigate("Map")}
      />
    </View>
  );
}



