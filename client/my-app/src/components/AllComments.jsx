import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Comment from './Comments'
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
        allcomments.length == 0 ? <Text style={styles.txt}>No Comments</Text> : <FlatList
        style={styles.flatlist}
          data={allcomments}
          keyExtractor={(item, index) => index} // Assuming the item object has a unique 'id' property
          renderItem={({ item }) => (
            <Comment username={item.username} text={item.text} date={item.date} style={styles.txt} />
          )}
        />
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
  flatlist:{
    flexDirection:'column'
  }
})
export default AllComments;
