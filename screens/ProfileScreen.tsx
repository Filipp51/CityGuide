import React from "react";
import { View, Text, Button } from "react-native";

export default function ProfileScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Text style={{ fontSize: 20 }}>Мои достижения</Text>
      <Button
        title="Назад на карту"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
