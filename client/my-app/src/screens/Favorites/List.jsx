import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

const List = () => {

  const { listFavs, getFavoritesList, mail } = useContext(UserContext);

  useEffect(() => {
    getFavoritesList(mail);
  }, [mail,listFavs])


  return (
    <View style={styles.container}>
      {
        !listFavs ? <Text style={styles.txt}>Empty</Text> : <Text style={styles.txt}>not Empty</Text>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  txt: {
    color: 'white',
    fontSize: 30
  }
})

export default List