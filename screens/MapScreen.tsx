// screens/MapScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location"; // Импортируем библиотеку для геолокации

const locations = [
  { id: 1, title: "Памятник Алёше", latitude: 68.9705, longitude: 33.0801 },
  { id: 2, title: "Ледокол Ленин", latitude: 69.3492, longitude: 33.0766 },
  { id: 3, title: "Пять углов", latitude: 69.1839, longitude: 33.3462 },
];

export default function MapScreen({ navigation }: any) {
  const [userLocation, setUserLocation] = useState<any>(null); // Состояние для местоположения пользователя
  const [locationErrorMsg, setLocationErrorMsg] = useState<string>("");
  const [visitedLocations, setVisitedLocations] = useState<boolean[]>([false, false, false]); // Состояние для посещённых локаций
  const [allVisited, setAllVisited] = useState(false); // Состояние для проверки, все ли локации посещены

  // Функция для получения местоположения пользователя
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); // Используем новый метод
    if (status !== "granted") {
      setLocationErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    checkVisitedLocations(location.coords); // Проверяем, посетил ли пользователь локацию
  };

  // Функция для проверки, посетил ли пользователь локацию
  const checkVisitedLocations = (coords: any) => {
    const newVisitedLocations = locations.map((location) => {
      const distance = getDistance(coords.latitude, coords.longitude, location.latitude, location.longitude);
      return distance < 0.01; // Если расстояние меньше 10 метров, считаем локацию посещённой
    });
    setVisitedLocations(newVisitedLocations);

    // Проверяем, все ли локации посещены
    const allVisited = newVisitedLocations.every((visited) => visited);
    setAllVisited(allVisited);
  };

  // Функция для вычисления расстояния между двумя точками на земле (в километрах)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371; // Радиус Земли в километрах
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Расстояние в километрах
    return distance;
  };

  useEffect(() => {
    getUserLocation(); // Получаем местоположение при монтировании компонента
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Карта</Text>
      {userLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {locations.map((location, index) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.title}
              description={`Вы находитесь возле ${location.title}`}
              pinColor={visitedLocations[index] ? "green" : "red"} // Меняем цвет маркера
            />
          ))}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Ваше местоположение"
            description="Вы находитесь здесь"
            pinColor="blue"
          />
        </MapView>
      ) : (
        <Text>Загрузка местоположения...</Text>
      )}
      {locationErrorMsg ? <Text>{locationErrorMsg}</Text> : null}

      <Text style={styles.visitedHeader}>Посещенные локации:</Text>
      {locations.map((location, index) => (
        <Text key={location.id}>
          {location.title}: {visitedLocations[index] ? "Посещено" : "Не посещено"}
        </Text>
      ))}

      {allVisited && (
        <Text style={styles.achievement}>Поздравляем! Вы посетили все локации!</Text> // Специальное достижение
      )}
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
  visitedHeader: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  achievement: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});





