import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(placemarkId, place) {
    await db.read();
    place._id = v4();
    place.placemarkid = placemarkId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByPlaceMarkId(id) {
    await db.read();
    return db.data.places.filter((place) => place.placemarkid === id);
  },

  async getPlaceById(id) {
    await db.read();
    return db.data.places.find((place) => place._id === id);
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.location = updatedPlace.location;
    place.info = updatedPlace.info;
    place.lat = updatedPlace.lat;
    place.lng = updatedPlace.lng;
    await db.write();
  },
};
