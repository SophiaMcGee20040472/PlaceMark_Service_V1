import { Review } from "./review.js";
import { PlaceMark } from "./place.js";

export const ReviewStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  async getAllDiscussions() {
    const discussions = await Review.find().lean();
    return discussions;
  },

  async addDiscussions(placeMarkId) {
    const newDiscussion = new Review(placeMarkId);
    const discussionObj = await newDiscussion.save();
    return this.getDiscussionsById(discussionObj._id);
  },
  async getDiscussionsById(id) {
    const discussion = await Review.find({ placeId: id }).lean();
    return discussion;
  },

  async addReviews(placeMarkId) {
    const newReview = new Review(placeMarkId);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },
  async getReviewsById(id) {
    const review = await Review.find({ placeId: id }).lean();
    return review;
  },
  async addPlaceMark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlaceMark = new PlaceMark(placemark);
    const placemarkObj = await newPlaceMark.save();
    return this.getPlaceMarkById(placemarkObj._id);
  },

  async getPlaceMarksByCategoryId(id) {
    const placemark = await PlaceMark.find({ categoryid: id }).lean();
    return placemark;
  },

  async getReviewById(id) {
    if (id) {
      const review = await Review.findOne({ _id: id }).lean();
      return review;
    }
    return null;
  },

  async deleteReview(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllReviews() {
    await Review.deleteMany({});
  },

  async updateReview(reviewId, updatedReview) {
    const review = await Review.findOne({ _id: reviewId });
    review.review = updatedReview.review;
    review.star = updatedReview.star;
    await review.save();
  },
};
