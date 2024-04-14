import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // Set the background color of the entire screen to black
  },
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    paddingTop: 50,
    color: 'black',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white', // Background color of the listing container
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  imageContainer: {
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default ListingItem;
