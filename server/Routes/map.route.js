const mapRoutes = require('express').Router()
const MapModel = require('../Models/map.models.js')

mapRoutes.post('/findCinema', async (req, res) => {
    let { lat, long } = req.body
    let places = await MapModel.MoreClosestPlaces(lat, long);
    return res.status(201).json(places)
})

mapRoutes.get('/findallCinema', async (req, res) => {
    let places = await MapModel.AllPlaces();
    return res.status(201).json(places)
})

module.exports = mapRoutes;