import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { placeMarks: [] };

export const placeMarkJsonStore = {
  async addPlaceMark(categoryId, placeMark) {
    await db.read();
    placemark._id = v4();
    placemark.categoryid = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlaceMarksByCategoryId(id) {
    await db.read();
    return db.data.places.filter((place) => place.placemarkid === id);
  },

  async getPlaceMarkById(id) {
    await db.read();
    return db.data.placemarks.find((placemark) => placemark._id === id);
  },

  async deletePlaceMark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaceMarks() {
    db.data.placemarks = [];
    await db.write();
  },
  // unused might use at some point
  async updatePlaceMark(placemark, updatedCategory) {
    placemark.name = updatedCategory.name;
    placemark.location = updatedCategory.location;
    placemark.info = updatedCategory.info;
    placemark.lat = updatedCategory.lat;
    placemark.lng = updatedCategory.lng;
    await db.write();
  },
};
