const { ObjectId } = require('mongodb');
const DB = require('../utils/db');

class CommentModel {
    _id
    idFilm;
    comments

    constructor(idFilm, comments = []) {
        this.idFilm = idFilm;
        this.comments = comments
    }

    static async Addcomment(idFilm, comments) {
        let query = {idFilm : idFilm};    
        let film = await new DB().FindOne('filmsComments', query,comments);

        if (film) {
            film.comments.push(...comments)
            await new DB().UpdateById('filmsComments', film._id, film)
            return film;
        }
        else {
            film ={idFilm,comments};
            await new DB().Insert("filmsComments",film);
            return "Added To Favourite";
        }
    }
}

module.exports = CommentModel

  // this.idFilm = idFilm;
            // this.username = username;
            // this.text = text;
            // this.date = date;
            // this.picture = picture;