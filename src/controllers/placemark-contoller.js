import { db } from "../models/db.js";

export const placeMarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
      const viewData = {
        title: "placemark",
        placemark: placemark,
      };
      return h.view("placeMark-view", viewData);
    },
  },

  addPlace: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
      const newPlace = {
        name: request.payload.name,
        location: request.payload.location,
        info: request.payload.info,
      };
      await db.placeStore.addPlace(placemark._id, newPlace);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
  deletePlace: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
