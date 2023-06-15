const { json } = require('express');
const CommentModel = require('../Models/comment.model')
const commentRoutes = require('express').Router()


commentRoutes.post('/postComment', async (req, res) => {
    const { idFilm, comments } = req.body;
    try {
        let newComment = await CommentModel.Addcomment(idFilm, comments);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

commentRoutes.get('/allcomments', async (req, res) => {
    const { idFilm } = req.body;
    try {
        let comms = await CommentModel.PrintAllComments(idFilm)
        console.log("comms",comms);
        res.status(200).json(comms)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = commentRoutes