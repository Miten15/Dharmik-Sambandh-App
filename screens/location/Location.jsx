import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'; // Updated import
import { ListingGeo, listingGeo } from '../../components/Interfaces/ListingGeo'; // Importing the listingGeo data from ListingGeo.tsx
import { Stack } from 'expo-router';

import MapView, { Marker, Callout } from 'react-native-maps';



const Location = () => {
  const [category, setCategory] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onDataChanged = (category) => {
    setCategory(category);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapPress = () => {
    setSelectedMarker(null);
  };

  const coordinates = {
    latitude: 35.6855,
    longitude: 139.68884,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    title: "My Location"
  };

  const filteredMarkers = category
  ? listingGeo.filter((marker) => marker.categories.includes(category))
  : listingGeo;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <MapView
        style={{ flex: 1 }}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
      >
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
            onPress={() => handleMarkerPress(marker)}
          >
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {selectedMarker && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: {selectedMarker.name}</Text>
          <Text style={styles.infoText}>Description: {selectedMarker.description}</Text>
          <Text style={styles.infoText}>Host: {selectedMarker.host}</Text>
          <Text style={styles.infoText}>Venue: {selectedMarker.venue}</Text>
          <Text style={styles.infoText}>ID: {selectedMarker.id}</Text>
          <Text style={styles.infoText}>Gate: {selectedMarker.date}</Text>
          <Text style={styles.infoText}>Categories: {selectedMarker.categories.join(', ')}</Text>
          <Text style={styles.infoText}>Price: {selectedMarker.price}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  infoText: {
    marginBottom: 5,
  },
});

export default Location;
