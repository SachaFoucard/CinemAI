import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { Avatar } from '@react-native-material/core';
const Comment = ({ username, text, date }) => {
  return (
    <View style={styles.post}>
      <Avatar alt={username}/>
      <Text style={styles.txt} >{text}</Text>
      <Text style={styles.txt}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
txt:{
  color:'white'
},
post:{
  flex:1
}
})
export default Comment;
