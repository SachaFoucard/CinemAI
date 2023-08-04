const CommentModel = require('../Models/comment.model')
const commentRoutes = require('express').Router()


commentRoutes.post('/postComment', async (req, res) => {
    const { idFilm, comments} = req.body;
    console.log(comments);
    try {
        const newComment = await CommentModel.Addcomment(idFilm, comments);
        console.log(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(("pd"));
    }
})

commentRoutes.get('/allcomments/:idFilm', async (req, res) => {
    const { idFilm } = req.params;
    try {
        let comms = await CommentModel.PrintAllComments(String(idFilm))
        res.status(200).json(comms)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



module.exports = commentRoutes