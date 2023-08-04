const { ObjectId } = require('mongodb');
const DB = require('../utils/db');

class CommentModel {
    _id
    idFilm;
    comments

    constructor(idFilm, comments = [], date = new Date()) {
        this.idFilm = idFilm;
        this.comments = comments,
        this.date = date;
    }
    //add comment about one film
    static async Addcomment(idFilm, comments) { 
        let query = { idFilm: idFilm };
        let film = await new DB().FindOne('filmsComments', query);

        if (film) {
            film.comments.push(...comments)
            await new DB().UpdateById('filmsComments', film._id, film)
            return film;
        }
        else {
            film = { idFilm, comments };
            await new DB().Insert("filmsComments", film);
            return "comments posted";
        }
    }
    //Print all comments about one Film
    static async PrintAllComments(idFilm) {
        let query = { idFilm: idFilm };
        let film = await new DB().FindOne('filmsComments', query);
        if (film) {
            return film.comments;
        } else {
            throw new Error('Film not found'); // or handle the case where the film is not found
        }
    }
}

module.exports = CommentModel
