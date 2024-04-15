import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';


const SelectUserForChat = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUsers = async () => {
        try {
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWMyYTViM2JiYWVkZGQ2NTZlMDk3OCIsImlhdCI6MTcxMzEyMTg5NywiZXhwIjoxNzE0OTM2Mjk3fQ.Cv0RMCNE64hM-HBB9bbsLQhbdHKydo5HRR_zONJ7Z8Y';
          const response = await axios.get('http://192.168.0.151:5003/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = response.data; // No need for response.json()
          setUsers(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      
      
    fetchUsers();
  }, []);

  // Render each user as a card
  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.username}>{item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Assuming each user has a unique _id
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectUserForChat;
