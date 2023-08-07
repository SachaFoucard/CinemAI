import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming you've installed the "serpapi" package

export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    // states Genres ["Horror","Commedy"] of the User Who is connected / (Explore screen)
    //print only movies or series on the explore screen who correspond to the array genres 
    const [genreFav, SetGenreFav] = useState([]);

    // chat text for reading and showing user
    const [chat,SetChat] = useState()
    const [FromUser,SetFromUser] = useState()
    

    // states All Screens details of the user 
    const [mail, setmail] = useState();
    const [password, setpassword] = useState("");
    const [userId, setId] = useState('');

    // states setUp Screens details of the user 
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('M');
    const [country, setCountry] = useState('EU');
    const [image, setImage] = useState(null);

    // states popular films 
    const [popularF, setPopularF] = useState([]);
    //states topRated films
    const [topRatedF, setTopRatedF] = useState([]);
    //states UpComing films
    const [UpComingF, setUpComingF] = useState([]);
    // states AllFilm films (state values who change anytimes)
    const [TypePage2, setTypePage2] = useState([]);


    // Dinamic State Actors array is changing every time that ItemFilm is changing 
    const [actors, setActors] = useState([]);

    //set the highlite on the Help Center FAQ and CONTACT and show relevent text
    const [highlighted, setHighlighted] = useState([])
    // make visible the relevent text in help center
    const [modalVisible, setModalVisible] = useState(false);

    const [explorefilms, setexploreFilms] = useState([]);

    const getStockage30Films = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA',
            },
        };

        try {
            let data = await fetch('https://api.themoviedb.org/3/discover/movie', options);
            if (!data.ok) {
                throw new Error('Network response was not ok');
            }
            let response = await data.json();
            setexploreFilms(response.results);
        } catch (error) {
            console.error('Error fetching films:', error);
            // Handle the error or show an error message to the user.
        }
    };


    const Delay3s = (screen, navigation) => {
        setTimeout(() => {
            navigation.navigate(screen)
        }, 5000);
    }

    // state circle indicator
    const [loading, setloading] = useState(true);

    const LoadingCircle = () => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 2000);
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
    };

    // state to custome the login button 
    const [pushed, setPushed] = useState(false);
    // function to connect user
    const Login = async (navigation, mail, password) => {
        setPushed(true);
        let response = await fetch('https://cinemai.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, mail: mail })
        });
        if (response.status === 401) {
            alert('Check your fields, user not found');

        } else if (response.status === 201) {
            const jsonResponse = await response.json();
            alert(`Happy to see you Back ${jsonResponse?.user?.mail} !`);
            setId(jsonResponse?.user?._id)
            navigation.navigate('TabMenu');
            console.log();
        } else if (response.status === 402) {
            alert('fields empty');
        }

    };

    //screen after Registration //function to save in database the genre films that the users like 
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
        let response = await fetch('https://cinemai.onrender.com/api/setUpProfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: fullName, mail: mail, phone: phone, gender: gender, country: country })
        });

        if (response.status === 201) {
            navigation.navigate('TabMenu');
        } else {
            console.log('error');
            alert('An error occurred while saving the information');
        }
    };

    //function to get popular films
    const Popular = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA',
            },
        };
        try {
            let response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
            let data = await response.json();
            setPopularF(data.results);
        } catch (error) {
            console.error(error);
        }
    };
    //function to get top rated films
    const TopRated = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA'
            }
        };
        try {
            let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
            let data = await response.json();
            setTopRatedF(data.results);
        } catch (error) {
            console.error(error);
        }
    }
    //function to get  upcoming films
    const UpComing = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA'
            }
        };
        let response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
        let data = await response.json();
        setUpComingF(data.results);
    }

    // Function for "AllFilms screens" to know which page from the URL to print 
    const AllFilmType = async (type) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA',
            },
        };
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=2`, options);
            let data = await response.json();
            setTypePage2(data.results);
        } catch (error) {
            console.error(error);
        }
    };


    // Function for "Explore screen" to print all films with genres equal to the user.genres{
    //     mail:"Uu"
    //     genres=['Comedy','Action']
    // }
    const GetGenreofUser = async (mail) => {
        try {
            const response = await fetch('https://cinemai.onrender.com/api/getGenresFromUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mail })
            });
            if (response.status === 201) {
                const data = await response.json();

                SetGenreFav(data); // Update the state using the SetGenreFav function
            } else {
                throw new Error('Request failed');
                console.log('not enter into the good status ');
            }
        } catch (error) {
            console.log('error', error);
            console.error(error);
            throw error;
        }
    };

    // function for edit profile to remove or add genre to user 
    const handleGenreSelection = (itemValue) => {
        // Check if the itemValue is already in genreFav
        if (genreFav.includes(itemValue)) {
            // If already selected, remove it from genreFav
            const updatedGenreFav = genreFav.filter((genre) => genre !== itemValue);
            SetGenreFav(updatedGenreFav);
        } else {
            // If not selected, add it to genreFav
            SetGenreFav((prevGenres) => [...prevGenres, itemValue]);
        }
    };


    //function to get actors about idFilm that the function got as parameter
    const GetActorsAboutFilm = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA'
            }
        };
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&limit=10`, options);
            const res = await data.json();
            const limitedActors = res.cast.slice(0, 10); // Limit the actors array to the first 10 elements
            setActors(limitedActors);
        } catch (error) {
            console.log(error);
        }
    };


    // check if its the first time login in or not if it is show the intro if not go to the sign up 
    async function checkFirstTime(navigation) {
        const isFirstTime = await AsyncStorage.getItem('firstTime');
        let t = 4;
        setTimeout(async () => {
            if (isFirstTime == null) {
                await AsyncStorage.setItem('firstTime', 'false');
                Delay3s('Welcome', navigation);
            }
            else {
                navigation.navigate('SignIn');
            }
        }, 1000 * t);
    }

    //profil help center  
    const handlePress = (screen) => {
        if (highlighted === screen) {
            setHighlighted('');
        } else {
            setHighlighted(screen);
        }
    };
    //all functs of profile to logout or not 
    const handleLogout = () => {
        setModalVisible(true);
    };

    const handleConfirmLogout = (navigation) => {
        // Perform logout action here
        setModalVisible(false);
        navigation.navigate("SignIn")
        // Additional code to handle logout
    };

    const handleCancelLogout = () => {
        setModalVisible(false);
    };

    //in profile/editprofile its the func to change the info of user
    const SaveEditProfile = async (navigation) => {
        let response = await fetch('https://cinemai.onrender.com/api/editProfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: fullName, mail: mail, phone: phone, gender: gender, country: country, genres: genreFav })
        });
        if (response.status === 401) {
            alert('Check your fields, user not found');
        } else if (response.status === 201) {
            const jsonResponse = await response.json();
            alert('You Connected successfully');
            navigation.navigate('TabMenu')
        } else if (response.status === 402) {
            alert('fields empty');
        }
    };


    // State for all comments 
    const [allcomments, setAllcomments] = useState([]);

    //state just first comment for the itemfil component
    const [LastComment, setLastComment] = useState([]);
    const getAllcomments = async (itemId) => {
        try {
            let data = await fetch(`https://cinemai.onrender.com/api/comments/allcomments/${itemId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let response = await data.json();
            setAllcomments(response);
    
            // Check if the response is not empty before using .slice()
            if (response.length > 0) {
                // Slice the first two elements of the response array
                let firstTwoComments = response.slice(0, 2);
                setLastComment(firstTwoComments);
            } else {
                setLastComment([]); // Set an empty array if there are no comments
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
    


    //state favorites list films
    const [listFavs, setListFavs] = useState([]);

    //fetch films from database
    const getFavoritesList = async (mail) => {
        try {
          const response = await fetch(`https://cinemai.onrender.com/api/playlist/${mail}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch favorites');
          }
      
          const data = await response.json();
          setListFavs(data);
        } catch (error) {
          console.error('Error fetching favorites:', error.message);
          // You can add appropriate error handling here, like showing an error message to the user.
        }
      };
      

    //add films intodatabase
    const AddFilm = async (userId, film) => {
        let data = await fetch('https://cinemai.onrender.com/api/addFilm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: userId, obj: film })
        })
        if (data.status === 201) {
            alert('film added !')
        }
        else {
            alert('film already in your list')
        }
    }

    const removeFilmFromFavorites = async (_id,filmid) => {
        let data = await fetch('https://cinemai.onrender.com/api/deleteFilm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: _id, filmid: filmid })
        })
        if (data.status === 200) {
            alert('film removed !')
        }
        else {
            alert('try again')
        }
    }


    const GetChatForUser = async (mail) => {
        try {
          let response = await fetch('https://cinemai.onrender.com/api/chat/chatByMail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: mail })
          });
      
          if (response.ok) {
            let data = await response.json(); // Parse the response data as JSON
            console.log("data",data);
            return await data.chat,data.fromUser;
          } else {
            return null; // Return null or throw an error to indicate failure
          }
        } catch (error) {
          console.error('Error fetching chat:', error);
          alert('An error occurred while fetching chat');
          return null; // Return null or throw an error to indicate failure
        }
      };

      const AddChatForUser = async (mail,chat,fromUser) => {
        try {
          let response = await fetch('https://cinemai.onrender.com/api/chat/addchat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: mail,chat:chat,fromUser:fromUser})
          });
      
          if (response.ok) {
            let data = await response.json(); // Parse the response data as JSON
            console.log("dataaaaaaaaaaaaaaaaaaaaaa",data);
            SetChat(data.chat)
            SetFromUser(data.fromUser)
            return await data.chat,data.fromUser;
          } else {
            return null; // Return null or throw an error to indicate failure
          }
        } catch (error) {
          console.error('Error fetching chat:', error);
          alert('An error occurred while fetching chat');
          return null; // Return null or throw an error to indicate failure
        }
      };


    useEffect(() => {
        Popular()
        getStockage30Films();
    }, [])



    const value = { SetGenreFav, genreFav, mail, password, setmail, setpassword, Register, SetUpGenre, Delay3s, setFullName, setPhone, setGender, setCountry, setImage, image, country, gender, phone, fullName, SaveInformationSetUp, Login, popularF, Popular, LoadingCircle, setloading, loading, TopRated, topRatedF, UpComing, UpComingF, mail, AllFilmType, setTypePage2, TypePage2, GetGenreofUser, checkFirstTime, highlighted, setHighlighted, handlePress, modalVisible, setModalVisible, handleLogout, handleConfirmLogout, handleCancelLogout, GetActorsAboutFilm, actors, setActors, SaveEditProfile, fullName, handleGenreSelection, pushed, getAllcomments, LastComment, allcomments, setLastComment, explorefilms, getStockage30Films, listFavs, getFavoritesList, AddFilm, userId,removeFilmFromFavorites,GetChatForUser,AddChatForUser,chat,SetChat,FromUser,SetFromUser }
    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContextProvider
