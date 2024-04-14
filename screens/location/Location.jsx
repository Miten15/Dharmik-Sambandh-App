import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const Location = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.6855,
          longitude: 139.68884,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 35.6855, longitude: 139.68884 }}
          title="Marker Title"
          description="Marker Description"
        >
          {/* Display a callout when the marker is tapped */}
          <Callout>
            <View>
              <Text>Additional Information</Text>
              <Text>More details about the location...</Text>
            </View>
          </Callout>
        </Marker>
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
