// ExploreHeader.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HeightSpacer from '../Reusable/HeightSpacer';

const categories = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  
  // Add more categories as needed
];

const ExploreHeader = ({ onCategoryChanged }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    onCategoryChanged(newCategory);
  };

  return (
   
    <View style={styles.container}>
          <HeightSpacer height={10} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              { backgroundColor: selectedCategory === category ? '#3461A8' : '#E5E5E5' },
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text style={[styles.categoryText, { color: selectedCategory === category ? '#FFFFFF' : '#000000' }]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExploreHeader;
