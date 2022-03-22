import { db } from "../models/db.js";
import { PlaceMarkSpec } from "../models/joi-schemas.js";

export const CategoryController = {
  // method to display placemarks
  index: {
    handler: async function (request, h) {
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      const viewData = {
        title: "category",
        category: category,
      };
      return h.view("placeMark-view", viewData);
    },
  },
  // Method to add placeMarks
  addPlaceMark: {
    validate: {
      payload: PlaceMarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Add category error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      // new placeMark criteria and keys
      const newPlaceMark = {
        name: request.payload.name,
        location: request.payload.location,
        info: request.payload.info,
        lat: request.payload.lat,
        lng: request.payload.lng,
      };
      await db.placeMarkStore.addPlaceMark(category._id, newPlaceMark);
      return h.redirect(`/placemark/${category._id}`);
    },
  },

  deletePlaceMark: {
    handler: async function (request, h) {
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      await db.placeMarkStore.deletePlaceMark(request.params.categoryid);
      return h.redirect(`/placemark/${category._id}`);
    },
  },
};