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
    static async AddTochat(mail,chat,fromUser) { 
        let query = { mail: mail };
        let userComplaint = await new DB().FindOne('chatAdmin', query);

        if (userComplaint) {
            userComplaint.chat.push(...chat)
            userComplaint.fromUser.push(...fromUser)
            await new DB().UpdateById('chatAdmin', userComplaint._id, userComplaint)
            return userComplaint;
        }
        else {
            mail = {mail: mail, chat: chat, date: this.date,fromUser: fromUser };
            await new DB().Insert("chatAdmin", mail);
            return "Added To Chat";
        }
    }
    //Print all comments about one Film
    static async GetChatByMail(mail) {
        let query = { mail: mail };
        let userComplaint = await new DB().FindOne('chatAdmin', query);
        if (userComplaint) {
            let info = {chat:userComplaint.chat,mail:userComplaint.mail,fromUser: userComplaint.fromUser}
            return info;
        }
        else if(!userComplaint){
            return "new chat"
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

    static async RemoveChat(mail) {
        let query = { mail: mail }; 
        let userComplaint = await new DB().RemoveOne('chatAdmin',query);
        console.log(userComplaint);
        if (userComplaint.acknowledged) {
            return "The chat has been deleted";
        } else {
            throw new Error('chat not found'); // or handle the case where the film is not found
        }
    }
}

module.exports = adminChatModel
