import React, { useState } from 'react'
import { createContext } from 'react'


export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    // states Genres ["Horror","Commedy"] of the User Who is connected / (Explore screen)
    //print only movies or series on the explore screen who correspond to the array genres 
    const [genreFav, SetGenreFav] = useState([]);

    // states All Screens details of the user 
    const [mail, setmail] = useState();
    const [password, setpassword] = useState("");

    // states setUp Screens details of the user 
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('M');
    const [country, setCountry] = useState('EU');
    const [image, setImage] = useState(null);


    const Delay3s = (screen, navigation) => {
        setTimeout(() => {
            navigation.navigate(screen)
        }, 5000);
    }

    const Register = async (navigation, mail, password) => {
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
            alert('You Registered successfully ');
            navigation.navigate('InterestScreen');
        } else if (response.status === 500) {
            alert('User already exists with this email address');
        }

        const data = await response.json();
        console.log(data);
    };

    const Login = async (navigation, mail, password) => {
        let response = await fetch('https://cinemai.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, mail: mail })
        });

        if (response.status === 404) {
            alert('Check your fields, user not found');
        } else if (response.status === 201) {
            alert('You Registered successfully ');
            navigation.navigate('TabMenu');
        } else if (response === 402) {
            alert('fields empty')
        }
    }

    const SetUpGenre = async (navigation) => {
        let response = await fetch('https://cinemai.onrender.com/api/updateGenre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ genreFav: genreFav, mail: mail })
        })
        if (response.status === 201) { navigation.navigate('ProfilSetUp'); }
        else { alert('genre not added, there is a problem') }
    }

    // function ProfilSetUp screen to save account informations (phone,gender,name,mail,country)
    const SaveInformationSetUp = async (navigation) => {
        console.log('enter into the Function');
        let response = await fetch('https://cinemai.onrender.com/api/setUpProfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: fullName, mail: mail, phone: phone, gender: gender, country: country })
        });

        if (response.status === 201) {
            console.log("navigate...");
            navigation.navigate('TabMenu');
        } else {
            console.log('error');
            alert('An error occurred while saving the information');
        }
    };

    const value = { SetGenreFav, genreFav, mail, password, setmail, setpassword, Register, SetUpGenre, Delay3s, setFullName, setPhone, setGender, setCountry, setImage, image, country, gender, phone, fullName, SaveInformationSetUp, Login }
    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContextProvider
