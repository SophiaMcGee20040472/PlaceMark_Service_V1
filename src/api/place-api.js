import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlaceMarkSpec, PlaceMarkSpecPlus, PlaceMarkArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const placeMarkApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemarks = await db.placeStore.getAllPlaceMarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaceMarkArraySpec, failAction: validationError },
    description: "Get all placeMarkApi",
    notes: "Returns all placeMarkApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
    tags: ["api"],
    description: "Find a PlaceMark",
    notes: "Returns a PlaceMark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceMarkSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = await db.placeMarkStore.addPlaceMark(request.params.id, request.payload);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlaceMarkSpec },
    response: { schema: PlaceMarkSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.placeMarkStore.deleteAllPlaceMarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placeMarkApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlace(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
