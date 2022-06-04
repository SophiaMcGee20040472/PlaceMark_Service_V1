import { db } from "../models/db.js";
import { userMongoStore } from "../models/mongo/user-mongo-store.js";

export const reviewController = {
  // About Method to control view output.
  index: {
    handler: async function (request, h) {
      const review = await db.ReviewStore.getAllReviews();
      const userdata = await db.userStore.getAllUsers(request.params.id);
      const user = await db.userStore.getUserById(request.state.category.id);
      const usersCount = await db.userStore.getAllUsers();
      const categoryCounts = await db.CategoryStore.getAllCategories();
      const placeMarkCounts = await db.placeMarkStore.getAllPlaceMarks();
      const placemarks = await db.placeMarkStore.getAllPlaceMarks();
      const reviewCount = await db.ReviewStore.getAllReviews();

      const userAnalytics = {
        userCount: usersCount.length,
        categoryCount: categoryCounts.length,
        placeMarkCount: placeMarkCounts.length,
        reviewCount: reviewCount.length,
      };

      const viewData = {
        users: userdata,
        review: review,
        userAnalytics: userAnalytics,
        placemarks: placemarks,
      };
      return h.view("review-view", viewData);
    },
  },
  addReview: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.placemarkid);
      const date = new Date().toLocaleString("en-IE");
      const User = loggedInUser.firstName;
      const secondName = loggedInUser.lastName;
      const placeMarkName = placeMark.name;

      const newReview = {
        review: request.payload.review,
        star: request.payload.star,
        date: date,
        userId: loggedInUser._id,
        placeId: request.params.placemarkid,
        User: User,
        secondName: secondName,
        placeMarkName: placeMarkName,
      };
      await db.ReviewStore.addReviews(newReview);
      return h.redirect(`/placemark/${placeMark.categoryid}/placemark/${request.params.placemarkid}`);
    },
  },
};
