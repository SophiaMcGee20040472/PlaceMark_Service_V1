import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const CategoryService = {
  categoryUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.categoryUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.categoryUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.categoryUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.categoryUrl}/api/users`);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.categoryUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.categoryUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.categoryUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.categoryUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.categoryUrl}/api/categories/${id}`);
    return res.data;
  },
  async getAllPlaceMarks() {
    const res = await axios.get(`${this.categoryUrl}/api/placemarks`);
    return res.data;
  },

  async createPlaceMark(id, placemark) {
    const res = await axios.post(`${this.categoryUrl}/api/placemarks/${id}/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlaceMarks() {
    const res = await axios.delete(`${this.categoryUrl}/api/placemarks`);
    return res.data;
  },

  async getPlaceMark(id) {
    const res = await axios.get(`${this.categoryUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async deletePlaceMark(id) {
    const res = await axios.delete(`${this.categoryUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.categoryUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
};
