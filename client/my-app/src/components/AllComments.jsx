import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

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

  return (
    <ScrollView>
      {
        allcomments.length == 0 ? <Text>No Comments</Text> : <FlatList
          data={allcomments}
          keyExtractor={(item) => item.id.toString()} // Assuming the item object has a unique 'id' property
          renderItem={({ item }) => (
            <Comment username={item.username} text={item.text} date={item.date} />
          )}
        />
      }

    </ScrollView>
  );
};

export default AllComments;
