import { View, Text } from 'react-native'
import React from 'react'
import { createContext } from 'react'

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    const value = {}
    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContextProvider