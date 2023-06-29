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
  genres

  constructor(name, mail, password, favorite, phone, gender, country, genres) {
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.favorites = favorite;
    this.phone = phone;
    this.gender = gender;
    this.country = country;
    this.genres = genres;
  }

  static async Register(name, mail, password1, favorites = [{}], phone = "", gender = "", country = "", genres = []) {
    try {
      const password = await bcrypt.hash(password1, 10);
      const checkIfAlreadyExist = await new DB().FindOne('users', { mail });
      if (checkIfAlreadyExist) {
        throw new Error('User already exists');
      }
      if (mail && password) {
        return await new DB().Insert('users', { name, mail, password, favorites, phone, gender, country, genres });
      } else {
        throw new Error('One or more fields are empty');
      }
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
    let user = await new DB().FindOne('users',query)
    return user.genres
  }
}
module.exports = UserModel