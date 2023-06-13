const DB = require('../utils/db');
const bcrypt = require('bcrypt');

class UserModel {
  _id;
  name;
  mail;
  password;
  phone;
  gender;
  country;

  constructor(name, mail, password) {
    this.name = name;
    this.mail = mail;
    this.password = password;
  }

  static async Register(name, mail, password1) {
    try {
      let password = await bcrypt.hash(password1, 10);
      let user = { name, mail, password }
      console.log(user);
      if (name && mail && password) {
        return await new DB().Insert('users', { name, mail, password });
      }
      if (!name || !mail || !password) {
        throw new Error('One or more fields are empty');
      }
    } catch (error) {
      return error
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
}
module.exports = UserModel