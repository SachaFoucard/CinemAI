const CommentModel = require('../Models/comment.model')
const commentRoutes = require('express').Router()


commentRoutes.post('/postComment', async (req, res) => {
    const { idFilm, comments } = req.body;

    let newComment = await CommentModel.Addcomment(idFilm, comments);
    res.status(201).json(newComment);
}
);

module.exports = commentRoutes