const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    organiserUserId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    venue: {
      type: String,
    },
    city: {
      type: String,
    },
    price: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    specialGuestName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
