import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const UserSelectionScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWMyYTViM2JiYWVkZGQ2NTZlMDk3OCIsImlhdCI6MTcxMzEyMTg5NywiZXhwIjoxNzE0OTM2Mjk3fQ.Cv0RMCNE64hM-HBB9bbsLQhbdHKydo5HRR_zONJ7Z8Y';
        const response = await axios.get('http://192.168.0.151:5003/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Response data:', response.data);
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once
  
  

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>List of Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );

}
export default UserSelectionScreen;
