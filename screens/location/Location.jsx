import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { listingGeo } from '../../components/Interfaces/ListingGeo';
import ExploreHeader from '../../components/Header/ExploreHeader';
import { HeightSpacer, NetworkImage, ReusableText, WidthSpacer } from '../../components';
import { COLORS, TEXT } from '../../constants/theme';
import { AntDesign } from "@expo/vector-icons";
import reusable from "../../components/Reusable/reusable.style";

const Location = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkers = listingGeo.filter(marker => {
    const categoryMatch = !selectedCategory || marker.categories.includes(selectedCategory);
    const searchMatch = marker.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleCategoryChanged = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeightSpacer height={15} />
      
      <View style={reusable.rowWithSpace("space-between")}>
     
      <ReusableText
        text={"Maps"}
        family={"regular"}
        size={TEXT.large}
        color={COLORS.black}
      />
      
      <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Search")}
          >
            <AntDesign name="search1" size={26} />
          </TouchableOpacity>
          </View>
          
      
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
                <NetworkImage
                  source={marker.thumbnail_url}
                  width={50} // Adjust width as needed
                  height={50} // Adjust height as needed
                  radius={10} // Adjust radius as needed
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  map: {
    flex: 1,
  },
});

export default Location;
