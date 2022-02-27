import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },
  getPlaceLocation: async function () {
    let locations = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < places.length; i++) {
      locations.push(places[i].lat, places[i].lng);
    }
    return locations;
  },
  async addPlace(placemarkId, place) {
    place._id = v4();
    place.placemarkid = placemarkId;
    places.push(place);
    return place;
  },

  async getPlacesByPlacemarkId(id) {
    return places.filter((place) => place.placemarkid === id);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async getPlaceMarkPlaces(placemarkId) {
    return places.filter((place) => place.placemarkid === placemarkId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.location = updatedPlace.location;
    place.info = updatedPlace.info;
    place.lat = updatedPlace.lat;
    place.lng = updatedPlace.lng;
  },
};
