import { db } from "../models/db.js";
import { PlaceMarkSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { Review } from "../models/mongo/review.js";

export const CategoryController = {
  // method to display placemarks
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      const review = await db.ReviewStore.getAllReviews();
      const viewData = {
        title: "category",
        category: category,
        review: review,
        user: loggedInUser._id,
      };
      return h.view("placeMark-view", viewData);
    },
  },
  uploadImage: {
    handler: async function (request, h) {
      try {
        const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.placemarkid);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placeMark.img = url;
          db.placeMarkStore.addPlaceMarkImage(placeMark._id, placeMark);
        }
        return h.redirect(`/placemark/${request.params.id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${request.params.id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deletePlaceMark: {
    handler: async function (request, h) {
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      await db.placeMarkStore.deletePlaceMark(request.params.categoryid);
      return h.redirect(`/placemark/${category._id}`);
    },
  },
  update: {
    validate: {
      payload: PlaceMarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("update-placemark-view", {
            title: "Edit placemark error",
            errors: error.details,
            placemark: request.payload,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const newPlaceMark = {
        name: request.payload.name,
        location: request.payload.location,
        info: request.payload.info,
        lat: request.payload.lat,
        lng: request.payload.lng,
        visible: request.payload.visible,
      };
      try {
        await db.placeMarkStore.updatePlaceMark(request.params.placemarkid, newPlaceMark);
      } catch (error) {
        console.log(error);
      }

      // if (newPlaceMark.visible !== true) {
      //   await db.placeMarkStore.updatePlaceMark(request.params.placemarkid, newPlaceMark);
      //   return request.view(`/placemark/${request.params.id}`);
      // }
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },

  placeMarkDetails: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.placemarkid);
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      const reviews = await db.ReviewStore.getReviewsById(request.params.placemarkid);

      const viewData = {
        title: "Update PlaceMark",
        placemark: placemark,
        category: category,
        review: reviews,
      };
      return h.view("update-placemark-view", viewData);
    },
  },
  // Method to add placeMarks
  addPlaceMark: {
    validate: {
      payload: PlaceMarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Add category error", errors: error.details, placemark: request.payload }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      // new placeMark criteria and keys
      const newPlaceMark = {
        name: request.payload.name,
        location: request.payload.location,
        info: request.payload.info,
        lat: request.payload.lat,
        lng: request.payload.lng,
        user: loggedInUser._id,
        visible: true,
      };
      await db.placeMarkStore.addPlaceMark(category._id, newPlaceMark);
      return h.redirect(`/placemark/${category._id}`);
    },
  },
};
