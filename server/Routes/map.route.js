const mapRoutes = require('express').Router()
const { json } = require('express');
const MapModel = require('../Models/map.models.js')

mapRoutes.post('/findCinema', async (req, res) => {
    let { lat, long, km} = req.body
    let places = await MapModel.MoreClosestPlaces(lat, long, km);
    if(places){
        return res.status(201).json(places)
    }
    else{
        return res.status(401).json({message:'not found make your search more far'})
    }
})

mapRoutes.get('/findallCinema', async (req, res) => {
    let places = await MapModel.AllPlaces();
    return res.status(201).json(places)
})

module.exports = mapRoutes;