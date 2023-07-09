import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
import { UserContext } from '../../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';


const Profil = ({navigation}) => {
  const { user, mail } = useContext(UserContext);

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
        <Text style={styles.text}>{user?.name}</Text>
        <Text style={styles.text}>{mail}</Text>
      </View>
      <View style={styles.selections}>
        <TouchableOpacity style={styles.options}>
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
        <TouchableOpacity style={styles.options}>
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
});

export default Profil;
