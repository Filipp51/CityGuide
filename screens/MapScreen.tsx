// screens/MapScreen.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Координаты для локаций
const locations = [
  { id: 1, title: "Памятник Алёше", latitude: 68.9705, longitude: 33.0801 },
  { id: 2, title: "Ледокол Ленин", latitude: 69.3492, longitude: 33.0766 },
  { id: 3, title: "Пять углов", latitude: 69.1839, longitude: 33.3462 },
];

export default function MapScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Карта</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 69.1839,
          longitude: 33.3462,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={`Вы находитесь возле ${location.title}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});
