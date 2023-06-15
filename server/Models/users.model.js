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

  constructor(name, mail, password, favorite, phone, gender, country) {
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.favorites = favorite;
    this.phone = phone;
    this.gender = gender;
    this.country = country;
  }

  static async Register(name, mail, password1, favorites = [{}], phone = "", gender = "", country = "") {
    try {
      const password = await bcrypt.hash(password1, 10);
      console.log(password);
      const checkIfAlreadyExist = await new DB().FindOne('users', { mail });
      if (checkIfAlreadyExist) {
        throw new Error('User already exists');
      }

      if (name && mail && password) {
        return await new DB().Insert('users', { name, mail, password, favorites, phone, gender, country });
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
  static async AddFavtoPlaylist(_id, doc) {
    try {
    
      const id = new ObjectId(_id); // Convert string _id to ObjectId
      console.log(id);

      const user = await new DB().FindOne('users', {_id:id});
      console.log("user",user);
    
      if (user) {
        const favorites = user.favorites || []; // Ensure favorites array exists

        // Check if the document already exists in the favorites array
        const isDocumentAlreadyInFavorites = favorites.some(
          (item) => item.id === doc.id
        );

        if (!isDocumentAlreadyInFavorites) {
          // Add the document to the favorites array
          favorites.push({...doc});

          // Update the user document with the updated favorites array
          await new DB().UpdateById('users', _id, user); // Fixed method name from 'UpdateOne' to 'UpdateById'
          return user
        }
        else{
           throw new Error('obj(film) already exist in your playlist')
        }
      }
    } catch (error) {
      throw error;
    }
  }
}


module.exports = UserModel