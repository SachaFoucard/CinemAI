const mapRoutes = require('express').Router()
const MapModel = require('../Models/map.models.js')

mapRoutes.post('/findCinema', async (req, res) => {
    let { lat, long,km} = req.body
    let places = await MapModel.MoreClosestPlaces(lat, long, km);
    return res.status(201).json(places)
})

mapRoutes.get('/findallCinema', async (req, res) => {
    let places = await MapModel.AllPlaces();
    return res.status(201).json(places)
})

module.exports = mapRoutes;