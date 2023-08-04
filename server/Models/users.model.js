const { ObjectId } = require('mongodb');
const DB = require('../utils/db');
const bcrypt = require('bcrypt');

class UserModel {
  _id;
  name;
  mail;
  password;
  favorites;
  phone;
  gender;
  country;
  genres;
  image;

  constructor(name, mail, password, favorite, phone, gender, country, genres, image) {
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.favorites = favorite;
    this.phone = phone;
    this.gender = gender;
    this.country = country;
    this.genres = genres;
    this.image = image;
  }
  static async Register(mail, password) {
    try {
      const saltRounds = 10; // Define the number of salt rounds
      const hashedPassword = await bcrypt.hash(password, saltRounds); // Provide the salt rounds as the second argument

      const checkIfAlreadyExist = await new DB().FindOne('users', { mail });
      if (checkIfAlreadyExist) {
        throw new Error('User already exists');
      }

      const userData = {
        mail,
        password: hashedPassword,
        name: '',
        phone: '',
        gender: '',
        country: '',
        favorites: [{}],
        genres: [],
      };

      return await new DB().Insert('users', userData);
    } catch (error) {
      throw error;
    }
  }
  static async Login(mail, password) {
    let query = { mail: mail }
    let user = await new DB().FindOne("users", query);
    if (!user || !(await bcrypt.compare(password, user.password)))
      return null;
    else {
      return {
        user
      };
    }
  }

  //add film into playlist
  static async AddFilmtoPlaylist(_id, doc) {
    try {
      const id = new ObjectId(_id); // Convert string _id to ObjectId

      const user = await new DB().FindOne('users', { _id: id });
      console.log("user", user);

      if (user) {
        const favorites = user.favorites || []; // Ensure favorites array exists

        // Check if the document already exists in the favorites array
        const isDocumentAlreadyInFavorites = favorites.some(
          (item) => item.id === doc.id
        );

        if (!isDocumentAlreadyInFavorites) {
          // Add the document to the favorites array
          favorites.push({ ...doc });

          // Update the user document with the updated favorites array
          await new DB().UpdateById('users', _id, user); // Fixed method name from 'UpdateOne' to 'UpdateById'
          return user
        }
        else {
          throw new Error('obj(film) already exist in your playlist')
        }
      }
    } catch (error) {
      throw error;
    }
  }

  // print all film from playlist
  static async PrintAllFilmPlayList(mail) {
    let query = { mail: mail }
    let user = await new DB().FindOne('users', query)
    return user.favorites
  }

  // add film type (horror,comedy) to user profil 
  static async AddSetUpGenreFav(mail, array) {
    let query = { mail: mail }
    let user = await new DB().FindOne('users', query);
    const _id = new ObjectId(user._id);
    console.log(_id);
    if (user.genres) {
      user.genres = array
      console.log(user.genres);
    }
    let userUpdated = await new DB().UpdateById('users', _id, user); // Fixed method name from 'UpdateOne' to 'UpdateById'
    return userUpdated;
  }

  static async GetAllGenreFromUser(mail) {
    let query = { mail: mail }
    let user = await new DB().FindOne('users', query)
    return user.genres
  }

  static async SetUpProfil(name, mail, gender, phone, country) {
    let query = { mail: mail }
    let user = await new DB().FindOne('users', query);
    console.log("user", user);
    const _id = new ObjectId(user._id);
    user.name = name
    user.gender = gender;
    user.phone = phone;
    user.country = country;
    let newUser = await new DB().UpdateById('users', _id, user)
    return newUser;
  }

  static async EditProfil(name, mail, gender, phone, country, genres) {
    try {
      let query = { mail: mail }
      let user = await new DB().FindOne('users', query);
      const _id = new ObjectId(user._id);
      user.name = name
      user.gender = gender;
      user.phone = phone;
      user.country = country;
      user.genres = genres
      let newUser = await new DB().UpdateById('users', _id, user)
      return newUser;

    } catch (error) {
      throw error;
    }
  }

  static async deleteFilmById(_id, filmid) {
    try {

      const id = new ObjectId(_id); // Convert string _id to ObjectId

      const user = await new DB().FindOne("users", { _id: id })
      if (!user || !user.favorites) {
        console.log('User or favorites array not found.');
        return;
      }
      const favorites = user.favorites
      console.log("favorites", favorites);
      const favoritesArray = favorites.filter((obj) => obj.id != filmid) // create new array without the film that got as parameter
      user.favorites = favoritesArray; // push the new new array updated
      const newUser = await new DB().UpdateById("users", _id, user)
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = UserModel