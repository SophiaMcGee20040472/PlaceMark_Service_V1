import { assert } from "chai";
import { db } from "../../src/models/db.js";
// eslint-disable-next-line import/named
import { testPlaceMarks, Woodlands, Swamp, FreshWater, testUsers, testCategories, Reviews } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {
  let ReviewList = null;
  let testUsersList = null;

  setup(async () => {
    db.init("mongo");
    await db.ReviewStore.deleteAllReviews();
    await db.placeMarkStore.deleteAllPlaceMarks();
    ReviewList = await db.ReviewStore.addReviews(Reviews);
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaceMarks[i] = await db.placeMarkStore.addPlaceMark(ReviewList._id, testPlaceMarks[i]);
    }
  });

  test("testing User", async () => {
    await db.userStore.getAllUsers();
    testUsersList = await db.userStore.addUser(testUsers);
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsersList._id, testUsers[i]);
      console.log(testUsers);
    }
  });

  test("create single place review", async () => {
    const reviewList = await db.ReviewStore.addReviews(Reviews);
    const placemark = await db.placeMarkStore.addPlaceMark(reviewList._id, Reviews);
    assert.isNotNull(placemark._id);
    assertSubset(Reviews, placemark);
  });

  test("get multiple reviews", async () => {
    const reviews = await db.ReviewStore.getReviewById(ReviewList._id);
    assert.equal(reviews.length, reviews.length);
  });

  test("delete all reviews", async () => {
    const reviews = await db.ReviewStore.getAllReviews();
    assert.equal(reviews.length, reviews.length);
    await db.ReviewStore.deleteAllReviews();
    const newReviews = await db.ReviewStore.getAllReviews();
    assert.equal(0, newReviews.length);
  });
  test("get a review - success", async () => {
    const reviewList = await db.ReviewStore.addReviews(Reviews);
    const review = await db.ReviewStore.addReviews(reviewList._id, Reviews);
    const newReview = await db.ReviewStore.getReviewsById(review._id);
    assertSubset(Reviews, newReview);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placeMarkStore.getPlaceMarkById(""));
    assert.isNull(await db.placeMarkStore.getPlaceMarkById());
  });
  test("get a review - bad params", async () => {
    assert.isNull(await db.ReviewStore.getReviewById(""));
    assert.isNull(await db.ReviewStore.getReviewById());
  });

  test("delete one review - fail", async () => {
    await db.ReviewStore.deleteReview("bad-id");
    const placemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(placemarks.length, testCategories.length);
  });
});
