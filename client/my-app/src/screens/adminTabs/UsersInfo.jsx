import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/UserContext';

export default function UsersInfo() {
  const { GetAllUsers, allUser, setAllUser,userDelete } = useContext(UserContext);
  const [users, setUsers] = useState();

  useEffect(() => {
    // Assuming GetAllUsers returns an array of user objects
    // const fetchedUsers = GetAllUsers();
    // setUsers(fetchedUsers);
    GetAllUsers(); // Assuming GetAllUsers updates the 'allUser' state
    console.log(allUser,"yup");

    // console.log(GetAllUsers(),'whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  }, []);

  const handleDeleteAllUsers = (mail) => {
    // Call the function to delete all users (you need to implement this function)
    // For example, if you have a function called 'deleteAllUsers' in your context:
    // deleteAllUsers();
    userDelete(mail)
    console.log("yes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Names</Text>
      <FlatList
        data={allUser}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.column}>
            <Text style={styles.userName}>{item.mail}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() =>handleDeleteAllUsers(item.mail)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
  },
  column: {
    backgroundColor: 'white', // Background color for each column
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
