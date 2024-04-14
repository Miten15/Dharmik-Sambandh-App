// Location.js
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { listingGeo } from '../../components/Interfaces/ListingGeo';
import ExploreHeader from '../../components/Header/ExploreHeader'

const Location = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to filter markers based on selected category
  const filteredMarkers = selectedCategory
    ? listingGeo.filter(marker => marker.categories.includes(selectedCategory))
    : listingGeo;

  const handleCategoryChanged = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <ExploreHeader onCategoryChanged={handleCategoryChanged} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.5937, // India's latitude
          longitude: 78.9629, // India's longitude
          latitudeDelta: 15, // Adjust as needed
          longitudeDelta: 15, // Adjust as needed
        }}
      >
        {filteredMarkers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
            title={marker.name}
          >
            <Callout>
              <View>
                <Text>{marker.name}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Location;
