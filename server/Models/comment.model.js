const { ObjectId } = require('mongodb');
const DB = require('../utils/db');

class CommentModel {
    _id
    idFilm;
    comments

    constructor(idFilm, comments = [{}]) {
        this.idFilm = idFilm;
        this.comments = comments
    }

    static async Addcomment(idFilm, comment) {
        let id = idFilm.idFilm

        console.log(id);
        let film = await new DB().FindOne('filmsComments', { id })
        console.log("film found : ", film);

        if (film) {
            film.Comments.push({ ...comment })
            console.log("comment added : ", comment);
        }
        else {
      
        }
    }
}

module.exports = CommentModel

  // this.idFilm = idFilm;
            // this.username = username;
            // this.text = text;
            // this.date = date;
            // this.picture = picture;