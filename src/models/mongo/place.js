import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeMarkSchema = new Schema({
  name: String,
  location: String,
  info: String,
  lat: String,
  lng: String,
  img: String,
  user: String,
  visible: Boolean,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
});

export const PlaceMark = Mongoose.model("PlaceMark", placeMarkSchema);
