import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    const [genreFav, SetGenreFav] = useState([])
    const value = {SetGenreFav,genreFav}
    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContextProvider