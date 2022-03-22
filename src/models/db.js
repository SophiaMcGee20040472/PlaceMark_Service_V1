import { userMemStore } from "./mem/user-mem-store.js";
import { CategoryMemStore } from "./mem/placemark-mem-store.js";
import { placeMarkMemStore } from "./mem/place-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { CategoryJsonStore } from "./json/placemark-json-store.js";
import { placeMarkJsonStore } from "./json/place-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { CategoryMongoStore } from "./mongo/placemark-mongo-store.js";
import { placeMarkMongoStore } from "./mongo/place-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  CategoryStore: null,
  placeMarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.CategoryStore = CategoryJsonStore;
        this.placeMarkStore = placeMarkJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.CategoryStore = CategoryMongoStore;
        this.placeMarkStore = placeMarkMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.CategoryStore = CategoryMemStore;
        this.placeMarkStore = placeMarkMemStore;
    }
  },
};
