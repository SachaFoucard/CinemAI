const DB = require('../utils/db')

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

    static async Register(name,mail,password) {
      try {
       let user = {name,mail,password}
        return await new DB().Insert('users', {user});
      } catch (error) {
        return error
      }       
    }
}
module.exports = UserModel