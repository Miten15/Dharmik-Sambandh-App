// ExploreHeader.js
import React, { useState } from 'react';
import { View, Button } from 'react-native';

const ExploreHeader = ({ onCategoryChanged }) => {
  const [category, setCategory] = useState(null);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    onCategoryChanged(newCategory);
  };

  return (
    <View>
      <Button title="Category 1" onPress={() => handleCategoryChange('Category1')} />
      <Button title="Category 2" onPress={() => handleCategoryChange('Category2')} />
      {/* Add more buttons or UI elements for other filter criteria */}
    </View>
  );
};

export default ExploreHeader;
