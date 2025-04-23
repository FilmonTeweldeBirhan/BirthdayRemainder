const mongoose = require("mongoose");

const circlesSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "first name is a must"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "last name is a must"],
    },

    birthDay: {
      type: Date,
      required: true,
    },

    age: Number,

    sex: {
      type: String,
      enum: ["F", "M"],
      required: [true, "gender is required"],
    },

    isYou: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Circles = mongoose.model("Circles", circlesSchema);
module.exports = Circles;
