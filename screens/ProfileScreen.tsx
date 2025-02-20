// screens/ProfileScreen.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen({ visitedLocations }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Мои достижения</Text>
      <View style={styles.achievements}>
        {visitedLocations.map((visited: boolean, index: number) => (
          <Text key={index}>
            Локация {index + 1}: {visited ? "Посещено" : "Не посещено"}
          </Text>
        ))}
      </View>
      <Text style={styles.footer}>
        {visitedLocations.every((visited: boolean) => visited)
          ? "Поздравляем! Вы посетили все локации!"
          : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  achievements: {
    marginTop: 30,
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

