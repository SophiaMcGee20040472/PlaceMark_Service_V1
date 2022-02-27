import { db } from "../models/db.js";
import { PlaceMarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placeMarkStore.getUserPlaceMarks(loggedInUser._id);
      const viewData = {
        title: "PlaceMark Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaceMark: {
    validate: {
      payload: PlaceMarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add PlaceMark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.placeMarkStore.addPlaceMark(newPlacemark);
      return h.redirect("/dashboard");
    },
  },
  deletePlaceMark: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarksById(request.params.id);
      await db.placeMarkStore.deletePlaceMarkById(placemark._id);
      return h.redirect("/dashboard");
    },
  },
};
