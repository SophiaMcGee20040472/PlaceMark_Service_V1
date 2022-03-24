import Mongoose from "mongoose";

const { Schema } = Mongoose;

const CategorySchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // seeded a boolean so that I could create seeded data that would be seen throughout any user who logged in.
  seeded: Boolean,
});

export const Category = Mongoose.model("Category", CategorySchema);
