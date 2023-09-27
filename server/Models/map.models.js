const { ObjectId } = require('mongodb');
const DB = require('../utils/db');

class MapModel {
  constructor(long, lat, tel, name) {
    this.long = long;
    this.lat = lat;
    this.tel = tel,
      this.name = name
  }

  // Static method to get all places from the database
  static async AllPlaces() {
    try {
      const places = await new DB().FindAll('map');
      return places;
    } catch (error) {
      console.error('Error fetching places from the database:', error);
      throw error;
    }
  }

  static async MoreClosestPlaces(lat1, lon1, closestDistance) {
    try {
      const places = await this.AllPlaces();
      let closestPlace;

      for (const place of places) {
        const distance = calculateDistance(lat1, lon1, place.lat, place.long);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPlace = place;
        }
      }
      return closestPlace;

    } catch (error) {
      console.error('Error finding closest place:', error);
      throw error;
    }
  }
}

//return km from to there
function calculateDistance(lat1, lon1, lat2, lon2,) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance; // Distance in kilometers
}


module.exports = MapModel;
