import { v4 } from "uuid";
import { Category } from "./placemark.js";
import { placeMarkMongoStore } from "./place-mongo-store.js";

export const CategoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoriesById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarks = await placeMarkMongoStore.getPlaceMarksByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoriesById(categoryObj._id);
  },

  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  async getSeededCategories() {
    const categories = await Category.find({ seeded: true }).lean();
    return categories;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },
};
