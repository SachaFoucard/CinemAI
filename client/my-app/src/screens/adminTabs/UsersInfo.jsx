import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { UserContext } from '../../context/UserContext';

export default function UsersInfo() {
  const { GetAllUsers, allUser, setAllUser, userDelete,SaveEditProfileAdmin } = useContext(UserContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    GetAllUsers();
  }, []);

  const handleDeleteAllUsers = (mail) => {
    userDelete(mail);
  };

  const handleEditUser = (user) => {
    // Show the edit form and pass the user data
    setShowEditForm(true);
    setEditUser(user);
  };

  const handleSaveEdit = () => {
    // Implement the logic to save edited user data
    // You can use the editUser state to get the edited data
    // and send it to your API or update the context state
    SaveEditProfileAdmin(editUser);
    setShowEditForm(false);
    // Call a function to save the edited data
    // For example: saveEditedUser(editUser);
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
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditUser(item)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAllUsers(item.mail)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Edit User Form */}
      <Modal visible={showEditForm} animationType="slide">
  <View style={styles.formContainer}>
    <Text style={styles.formTitle}>Edit User</Text>
    <TextInput
      style={styles.input}
      placeholder={editUser?.name || "name"}
      value={editUser?.name}
      onChangeText={(text) => setEditUser({ ...editUser, name: text })}
    />
    <TextInput
      style={styles.input}
      placeholder={editUser?.phone || "phone"}
      value={editUser?.phone}
      onChangeText={(text) => setEditUser({ ...editUser, phone: text })}
    />
    <TextInput
      style={styles.input}
      placeholder={editUser?.country || "country"}
      value={editUser?.country}
      onChangeText={(text) => setEditUser({ ...editUser, country: text })}
    />
    <TextInput
      style={styles.input}
      placeholder={editUser?.gender || "gender"}
      value={editUser?.gender}
      onChangeText={(text) => setEditUser({ ...editUser, gender: text })}
    />
    <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  </View>
</Modal>
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
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
