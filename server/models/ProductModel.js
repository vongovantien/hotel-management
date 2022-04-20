import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: 
    }
})
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
