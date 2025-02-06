import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { StyleSheet, View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Importa la imagen del marcador (opcional)
const carImage = require('./assets/car.png');

export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: -9.298160,
    longitude: -76.000195,
  });

  const [destination, setDestination] = React.useState({
    latitude: -9.300000,
    longitude: -76.005000,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, []);

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso de ubicación denegado');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Mapa con marcadores</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador para la ubicación actual */}
        <Marker
          coordinate={origin}
          title="Tu ubicación"
          description="Aquí estás tú"
        />

        {/* Marcador para el destino */}
        <Marker
          coordinate={destination}
          title="Destino"
          description="Este es el destino"
          image={carImage} // Usa una imagen personalizada para el marcador (opcional)
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '40%',
  },
});