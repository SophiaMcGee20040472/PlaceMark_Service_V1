import { db } from "../models/db.js";
import { PlaceSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
      const newPlace = {
        name: request.payload.name,
        location: request.payload.location,
        info: request.payload.info,
        lat: request.payload.lat,
        lng: request.payload.lng,
      };
      await db.placeStore.addPlace(placemark._id, newPlace);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
  // addPlace: {
  //   handler: async function (request, h) {
  //     const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
  //     const newPlace = {
  //       name: request.payload.name,
  //       location: request.payload.location,
  //       info: request.payload.info,
  //       lat: request.payload.lat,
  //       lng: request.payload.lng,
  //     };
  //     await db.placeStore.addPlace(placemark._id, newPlace);
  //     return h.redirect(`/placemark/${placemark._id}`);
  //   },
  // },
  deletePlace: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
