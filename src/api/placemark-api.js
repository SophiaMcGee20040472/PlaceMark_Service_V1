import Boom from "@hapi/boom";
import { IdSpec, CategoryArraySpec, CategorySpec, CategorySpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const CategoryApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const categories = await db.CategoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: CategoryArraySpec, failAction: validationError },
    description: "Get all Categories",
    notes: "Returns all Categories",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const category = await db.CategoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No PlaceMark with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Find a Catergory",
    notes: "Returns a Category",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = request.payload;
        const newCategory = await db.CategoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Category",
    notes: "Returns the newly created category",
    validate: { payload: CategorySpec, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.CategoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.CategoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No PlaceMark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.CategoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all CategoryApi",
  },
};
