import { userApi } from "./api/user-api.js";
import { CategoryApi } from "./api/placemark-api.js";
import { placeMarkApi } from "./api/place-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/categories", config: CategoryApi.create },
  { method: "DELETE", path: "/api/categories", config: CategoryApi.deleteAll },
  { method: "GET", path: "/api/categories", config: CategoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: CategoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: CategoryApi.deleteOne },
  { method: "GET", path: "/api/placemarks", config: placeMarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placeMarkApi.findOne },
  { method: "POST", path: "/api/categoriess/{id}/placemarks", config: placeMarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placeMarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placeMarkApi.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];
