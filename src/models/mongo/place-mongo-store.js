import { PlaceMark } from "./place.js";
import { User } from "./user.js";

export const placeMarkMongoStore = {
  async getAllPlaceMarks() {
    const placemarks = await PlaceMark.find().lean();
    return placemarks;
  },

  async addPlaceMark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlaceMark = new PlaceMark(placemark);
    const placemarkObj = await newPlaceMark.save();
    return this.getPlaceMarkById(placemarkObj._id);
  },
  async getPlaceMarksByCategoryId(id) {
    const placemark = await PlaceMark.find({ categoryid: id }).lean();
    return placemark;
  },
  async getPlaceMarkById(id) {
    if (id) {
      const placemark = await PlaceMark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlaceMark(id) {
    try {
      await PlaceMark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaceMarks() {
    await PlaceMark.deleteMany({});
  },

  async updatePlaceMark(placemarkId, updatedPlaceMark) {
    const placemark = await PlaceMark.findOne({ _id: placemarkId });
    placemark.name = updatedPlaceMark.name;
    placemark.location = updatedPlaceMark.location;
    placemark.info = updatedPlaceMark.info;
    placemark.lat = updatedPlaceMark.lat;
    placemark.lng = updatedPlaceMark.lng;
    placemark.img = updatedPlaceMark.img;
    placemark.visible = updatedPlaceMark.visible;
    await placemark.save();
  },

  async addPlaceMarkImage(placemarkId, updatedPlaceMark) {
    const placemark = await PlaceMark.findOne({ _id: placemarkId });
    placemark.img = updatedPlaceMark.img;
    await placemark.save();
  },
};
