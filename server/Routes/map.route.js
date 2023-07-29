const mapRoutes = require('express').Router()
const MapModel = require('../Models/map.models.js')

mapRoutes.get('/findCinema', async (req, res) => {
    let { lat, long } = req.body
    let places = await MapModel.MoreClosestPlace(lat, long);
    return res.status(201).json(places)
    // calculateDistance(long, lat,)
})


module.exports = mapRoutes;