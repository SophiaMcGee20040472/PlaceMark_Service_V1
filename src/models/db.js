import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/placemark-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,
  placeStore: null,

  init() {
    this.userStore = userMemStore;
    this.placeMarkStore = placeMarkMemStore;
    this.placeStore = placeMemStore;
  },
};
