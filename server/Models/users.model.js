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

  constructor(name, mail, password,favorite,phone,gender,country) {
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.favorites = favorite;
    this.phone = phone;
    this.gender = gender;
    this.country = country;
  }

  static async Register(name, mail, password1, favorites = [], phone = "", gender = "", country = "") {
    try {
      const password = await bcrypt.hash(password1, 10);

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
  // static async AddFavtoPlaylist(_id, doc) {
  //   try {
  //     const query = { id: _id }; // Fixed parameter name from 'id' to '_id'
  //     const db = new DB();
  //     const user = await db.FindOne('users', query);
  
  //     if (user) {
  //       const favorites = user.favorites || []; // Ensure favorites array exists
  
  //       // Check if the document already exists in the favorites array
  //       const isDocumentAlreadyInFavorites = favorites.some(
  //         (favorite) => favorite.id === doc.id
  //       );
  
  //       if (!isDocumentAlreadyInFavorites) {
  //         // Add the document to the favorites array
  //         favorites.push(doc);
  
  //         // Update the user document with the updated favorites array
  //         await db.UpdateById('users', _id, { $set: { favorites: favorites } }); // Fixed method name from 'UpdateOne' to 'UpdateById'
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
  

module.exports = UserModel