import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Comment from './Comments'
import Ionicons from '@expo/vector-icons/Ionicons'

const AllComments = ({ route }) => {
  // State for all comments 
  const [allcomments, setAllcomments] = useState([]);
  const { itemId } = route.params;

  const getAllcomments = async (itemId) => {
    let data = await fetch(`https://cinemai.onrender.com/api/comments/allcomments/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let response = await data.json();
    setAllcomments(response);
  };

  useEffect(() => {
    getAllcomments(itemId);
  }, [itemId]);

  {
    console.log(itemId);
  }

  return (
    <View style={styles.container}>
      {
        !allcomments ? <Text style={styles.txt}> 0 comments</Text> :
          <View style={styles.comments}>
            <View style={styles.headerBar}>
              <Ionicons name='arrow-back-outline' color='white' size='40' style={styles.icon} />
              <Text style={styles.nbrscomm}>{allcomments.length} Comments</Text>
            </View>
            <FlatList
              style={styles.flatlist}
              data={allcomments}
              keyExtractor={(item, index) => index} // Assuming the item object has a unique 'id' property
              renderItem={({ item }) => (
                <Comment username={item.username} text={item.text} date={item.date} style={styles.txt} />
              )}
            />
          </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  txt: {
    color: 'white',
    fontSize: 30
  },
  flatlist: {
    flexDirection: 'column'
  },
  comments: {
    marginTop: 100,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nbrscomm: {
    fontSize: 25,
    color: 'white',
    marginLeft: 15,

  },
  icon: {
    marginLeft: 10,
    fontWeight: 100
  }
})
export default AllComments;
