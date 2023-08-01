import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

const List = () => {

  const { listFavs, getFavoritesList,mail } = useContext(UserContext);

  useEffect(() => {
    getFavoritesList(mail)
  }, [])
  {console.log(listFavs);
  console.log("mail",mail);}
  return (
    <View>
      <Text>List</Text>
    </View>
  )
}

export default List