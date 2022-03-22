import { v4 } from "uuid";

let placemarks = [];

export const placeMarkMemStore = {
  async getAllPlaceMarks() {
    return placemarks;
  },
  // method I will work on further for map creation.
  getPlaceLocation: async function () {
    let locations = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < placemarks.length; i++) {
      locations.push(placemarks[i].lat, placemarks[i].lng);
    }
    return locations;
  },
  async addPlaceMark(categoryId, placemark) {
    placemark._id = v4();
    placemark.placemarkid = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlaceMarksByCategoryId(id) {
    return placemarks.filter((placemark) => placemark.categoryid === id);
  },

  async getPlaceMarkById(id) {
    return placemarks.find((placemark) => placemark._id === id);
  },

  async getPlaceMarkCategories(categoryId) {
    return placemarks.filter((placeMark) => placeMark.categoryid === categoryId);
  },

  async deletePlaceMark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllPlaceMarks() {
    placemarks = [];
  },

  async updatePlaceMark(placemark, updatedPlaceMark) {
    placemark.name = updatedPlaceMark.name;
    placemark.location = updatedPlaceMark.location;
    placemark.info = updatedPlaceMark.info;
    placemark.lat = updatedPlaceMark.lat;
    placemark.lng = updatedPlaceMark.lng;
  },
};
