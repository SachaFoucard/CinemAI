const chatAdminModel = require('../Models/chatAdmin.model')
const admingChatRoutes = require('express').Router()


admingChatRoutes.post('/addchat', async (req, res) => {
    let { mail, chat } = req.body;
    let text = await chatAdminModel.AddTochat(mail, chat);
    res.status(201).json(text)
  }
  )

  admingChatRoutes.post('/chatByMail', async (req, res) => {
    let { mail, chat } = req.body;
    let text = await chatAdminModel.GetChatByMail(mail, chat);
    res.status(201).json(text)
  }
  )

  admingChatRoutes.post('/allchats', async (req, res) => {
    let text = await chatAdminModel.GetAllChats();
    res.status(201).json(text)
  }
  )





  module.exports = admingChatRoutes