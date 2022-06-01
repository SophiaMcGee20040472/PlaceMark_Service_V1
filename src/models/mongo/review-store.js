import { Review } from "./review.js";

export const ReviewStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
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
