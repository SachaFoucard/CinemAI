import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView, Modal } from 'react-native';
import { UserContext } from '../../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';


const Profil = ({navigation}) => {
  
  const { mail,handleLogout,handleConfirmLogout,handleCancelLogout,modalVisible,setModalVisible} = useContext(UserContext);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={(require('../../../assets/logoScreen/logo.png'))}
          style={styles.logo}
        />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.userDisplay}>
        <TouchableOpacity>
          <Image source={(require('../../../assets/setUpProfil/blankPp.webp'))} style={styles.profileImg} />
        </TouchableOpacity>
        <Text style={styles.text}>{mail}</Text>
      </View>
      <View style={styles.selections}>
        <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('EditProfile')}>
          <Ionicons style={styles.icon} name="person-outline" />
          <Text style={styles.textOption}>Edit Profile</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <Ionicons style={styles.icon} name="notifications-outline" />
          <Text style={styles.textOption}>Notification</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <Ionicons style={styles.icon} name="download-outline" />
          <Text style={styles.textOption}>Download</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <Ionicons style={styles.icon} name="checkbox-outline" />
          <Text style={styles.textOption}>Security</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <Ionicons style={styles.icon} name="language-outline" />
          <Text style={styles.textOptionLen}>Language</Text>
          <Text style={styles.textOptionLen}>English(US)</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.options} onPress={()=>navigation.navigate('HelpCenter')} >
          <Ionicons style={styles.icon} name="information-circle-outline" />
          <Text style={styles.textOption}>Help Center</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}  onPress={()=>navigation.navigate('AppPolicy')}>
          <Ionicons style={styles.icon} name="document-text-outline" />
          <Text style={styles.textOption}> App Policy</Text>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
        
      </View>

    



      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
              <Text style={styles.modalTitle} >Logout</Text>
              <View style={styles.modalLine}></View>
            
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={ handleCancelLogout}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleConfirmLogout(navigation)}>
                <Text style={styles.modalButtonText}>Yes,Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,//for scrolling through all the content
    backgroundColor: '#181A21',
  },
  selections: {
    padding: 20
  },
  textOption: {
    color: 'white',
    fontSize: 20,
    marginRight: 200 // changed from 200 check if iphone it works !!important
  },
  textOptionLen: {
    color: 'white',
    fontSize: 20,
    marginRight: 40
  },
  header: {
    marginTop: 70,
    flexDirection: 'row',
   marginLeft:20
  },
  logo: {
    width: 60,
    height: 30,
    marginRight:13
  },
  profileImg: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  userDisplay: {
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
  icon: {
    fontSize: 30,
    color: 'white',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    marginBottom:20,
  },
  logoutButtonText: {
   fontSize:20,
    textAlign:"center",
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    width:"100%",
    height:"100%",
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#181A21',
    padding: 20,
    borderTopStartRadius:50,
    borderTopEndRadius:50
  },
  modalText: {
    color:"white",
    fontSize: 18,
    marginBottom: 20,
    textAlign:"center",
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalTitle:{
    color:"red",
    fontSize:24,
    textAlign:"center",
  },
  modalLine:{
    margin:15,
    width:"100%",
    height:2,
    backgroundColor:"grey",
    alignSelf:"center",
    
  }
  
 
});

export default Profil;
