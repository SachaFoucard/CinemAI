import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {

    // states Genres ["Horror","Commedy"] of the User Who is connected / (Explore screen)
    //print only movies or series on the explore screen who correspond to the array genres 
    const [genreFav, SetGenreFav] = useState([]);

    // states All Screens details of the user 
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");


    const Register = async (navigation) => {
        let response = await fetch('https://cinemai.onrender.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, mail: mail })
        });

        if (response.status === 400) {
            alert('Check your fields, one or more are empty');
        } else if (response.status === 201) {
            alert('Registered successfully');
            navigation.navigate('InterestScreen');
        } else if (response.status === 500) {
            alert('User already exists with this email address');
        }

        const data = await response.json();
        console.log(data);
    };


    const value = { SetGenreFav, genreFav, setmail, setpassword, Register }
    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContextProvider