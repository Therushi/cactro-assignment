const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    numOfTickets: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
