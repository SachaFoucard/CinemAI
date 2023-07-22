import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

const Comments = (name, title) => {
  const { fullName } = useContext(UserContext)
  return (
    <View>
      
    </View>
  )
}

export default Comments