const { ObjectId } = require('mongodb');
const DB = require('../utils/db');

class adminChatModel {
    mail;
    chat;
    date;
  

    constructor(mail, chat = [], date = new Date()) {
        this.mail = mail;
        this.chat = chat,
        this.date = date;
    }
    //add comment about one film
    static async AddTochat(mail, chat) { 
        let query = { mail: mail };
        let userComplaint = await new DB().FindOne('chatAdmin', query);

        if (userComplaint) {
            userComplaint.chat.push(...chat)
            await new DB().UpdateById('chatAdmin', userComplaint._id, userComplaint)
            return userComplaint;
        }
        else {
            mail = {mail: mail, chat: chat, date: this.date };
            await new DB().Insert("chatAdmin", mail);
            return "Added To Chat";
        }
    }
    //Print all comments about one Film
    static async GetChatByMail(mail) {
        let query = { mail: mail };
        let userComplaint = await new DB().FindOne('chatAdmin', query);
        if (userComplaint) {
            let info = {chat:userComplaint.chat,mail:userComplaint.mail}
            return info;
        } else {
            throw new Error('chat not found'); // or handle the case where the film is not found
        }
    }

    static async GetAllChats() { 
        let userComplaint = await new DB().FindAll('chatAdmin');
        if (userComplaint) {
            return userComplaint;
        } else {
            throw new Error('chat not found'); // or handle the case where the film is not found
        }
    }
}

module.exports = adminChatModel
