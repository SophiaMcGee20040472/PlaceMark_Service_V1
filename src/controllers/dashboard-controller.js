import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";

export const dashboardController = {
  // Method to get logged in users credentials and display there categories and other related seeded data.
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.CategoryStore.getUserCategories(loggedInUser._id);
      const seededCategories = await db.CategoryStore.getSeededCategories();
      const data = categories.concat(seededCategories);
      const viewData = {
        title: "PlaceMark Dashboard",
        user: loggedInUser,
        categories: data,
      };
      return h.view("dashboard-view", viewData);
    },
  },
  // Method to add category
  addCategory: {
    validate: {
      payload: CategorySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Category error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      // create new category
      const newCategory = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };

      await db.CategoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },
  // Delete Categories other than the ones I don't want to delete from seeding.
  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.CategoryStore.getCategoriesById(request.params.id);
      if (category.seeded !== true) {
        await db.CategoryStore.deleteCategoryById(category._id);
      }
      return h.redirect("/dashboard");
    },
  },
};
