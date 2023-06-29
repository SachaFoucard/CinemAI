import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {

    // states Genres ["Horror","Commedy"] of the User Who is connected / (Explore screen)
    //print only movies or series on the explore screen who correspond to the array genres 
    const [genreFav, SetGenreFav] = useState([]);

    // states All Screens details of the user 
    const [userMail, setUsermail] = useState("");
    const [userPassword, setUserpassword] = useState("");





    const value = { SetGenreFav, genreFav,setUsermail,setUserpassword,userMail,userPassword }
    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContextProvider