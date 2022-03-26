import { v4 } from "uuid";

let categories = [];

export const CategoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async addCategories(category) {
    category._id = v4();
    categories.push(category);
    return category;
  },

  async getCategoryById(id) {
    const list = categories.find((category) => category._id === id);
    list.placemarks = await CategoryMemStore.getPlaceMarksByCategoryId(list._id);
    return list;
  },

  async deleteCategoryById(id) {
    const index = categories.findIndex((category) => category._id === id);
    categories.splice(index, 1);
  },
  async getUserCategories(userid) {
    return categories.filter((category) => category.userid === userid);
  },
  async deleteAllCategories() {
    categories = [];
  },
};
