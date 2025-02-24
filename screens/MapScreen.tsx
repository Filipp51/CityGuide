// screens/MapScreen.tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const locations = [
  // Мурманск
  { id: 1, title: "Памятник Алёше", latitude: 68.99298316134549, longitude: 33.07104882143354, type: "Интересные места", city: "Мурманск" },
  { id: 2, title: "Ледокол Ленин", latitude: 68.97480142481456, longitude: 33.06158859321789, type: "Интересные места", city: "Мурманск" },
  { id: 3, title: "Пять углов", latitude: 68.97069205257411, longitude: 33.07522382687587, type: "Интересные места", city: "Мурманск" },

  // Музеи
  { id: 4, title: "Краеведческий музей", latitude: 68.97384207505566, longitude: 33.08698305370444, type: "Музеи", city: "Мурманск" },

  // Рестораны
  { id: 5, title: "Тундра, Grill & Bar", latitude: 68.966861075682, longitude: 33.09773370283169, type: "Рестораны", city: "Мурманск" },

  // Териберка
  { id: 6, title: "Каменный пляж", latitude: 69.20488734670413, longitude: 35.091904283845075, type: "Интересные места", city: "Териберка" },
  { id: 7, title: "Батарейский Водопад", latitude: 69.20365350819772, longitude: 35.06858368075331, type: "Интересные места", city: "Териберка" }
];


export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string>("");
  const [visitedLocations, setVisitedLocations] = useState<boolean[]>([false, false, false, false]);
  const [allVisited, setAllVisited] = useState(false);

  const [selectedCity, setSelectedCity] = useState("Все");
  const [selectedType, setSelectedType] = useState("Все");

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    checkVisitedLocations(location.coords);
  };

  const checkVisitedLocations = (coords: any) => {
    const newVisitedLocations = locations.map((location) => {
      const distance = getDistance(coords.latitude, coords.longitude, location.latitude, location.longitude);
      return distance < 0.01; // если меньше 10 метров
    });
    setVisitedLocations(newVisitedLocations);
    const allVisited = newVisitedLocations.every((visited) => visited);
    setAllVisited(allVisited);
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredLocations = locations.filter((location) => {
    const cityMatch = selectedCity === "Все" || location.city === selectedCity;
    const typeMatch = selectedType === "Все" || location.type === selectedType;
    return cityMatch && typeMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Карта</Text>
      <Button title="Получить местоположение" onPress={getUserLocation} />

      <Picker selectedValue={selectedCity} onValueChange={(itemValue) => setSelectedCity(itemValue)}>
        <Picker.Item label="Все города" value="Все" />
        <Picker.Item label="Мурманск" value="Мурманск" />
        <Picker.Item label="Териберка" value="Териберка" />
      </Picker>

      <Picker selectedValue={selectedType} onValueChange={(itemValue) => setSelectedType(itemValue)}>
        <Picker.Item label="Все типы" value="Все" />
        <Picker.Item label="Музеи" value="Музей" />
        <Picker.Item label="Рестораны" value="Ресторан" />
        <Picker.Item label="Интересные места" value="Интересное место" />
      </Picker>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 69.1839,
          longitude: 33.3462,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={`Вы находитесь возле ${location.title}`}
            pinColor={visitedLocations[location.id - 1] ? "green" : "red"}
          />
        ))}
      </MapView>

      {locationErrorMsg && <Text>{locationErrorMsg}</Text>}
      {allVisited && <Text>Поздравляем! Вы посетили все локации!</Text>}
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


