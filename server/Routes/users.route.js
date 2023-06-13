const userRoutes = require('express').Router()
const UserModel = require('../Models/users.model')

userRoutes.post('/register', async (req, res) => {
    try {
        let {name,mail,password} = req.body;
   
        let user = await UserModel.Register(name,mail,password);
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = userRoutes