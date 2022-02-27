import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { placeJsonStore } from "./place-json-store.js";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

export const placemarkJsonStore = {
  async getAllPlaceMarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlaceMark(placemark) {
    await db.read();
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlaceMarksById(id) {
    await db.read();
    const list = db.data.placemarks.find((placemark) => placemark._id === id);
    list.places = await placeJsonStore.getPlacesByPlaceMarkId(list._id);
    return list;
  },

  async getUserPlaceMarks(userid) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlaceMarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaceMarks() {
    db.data.placemarks = [];
    await db.write();
  },
};
