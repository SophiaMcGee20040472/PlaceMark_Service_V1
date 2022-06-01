import Mongoose from "mongoose";

const { Schema } = Mongoose;

const ReviewSchema = new Schema({
  review: String,
  star: String,
  date: String,
  User: String,
  secondName: String,
  placeMarkName: String,
  userCount: String,
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: "review",
  },
  userId: String,
  placeId: String,
});
export const Review = Mongoose.model("review", ReviewSchema);
