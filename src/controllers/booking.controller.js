const Booking = require("../models/booking.model");
const Event = require("../models/event.model");
const myQueue = require("../utils/jobQueue");

exports.bookEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId, numOfTickets, totalPrice, paymentStatus, bookingDate } =
      req.body;
    const isEventValid = await Event.findById({ _id: eventId });
    if (!eventId && !isEventValid) {
      next({
        message: "Invalid req body",
        statusCode: 404,
      });
    }
    const booking = await Booking.create({
      eventId,
      userId,
      numOfTickets,
      totalPrice,
      paymentStatus,
      bookingDate,
    });
    const queueRes = await myQueue.add({
      type: "Booking confirmed",
      data: booking,
    });
    return res.status(200).json({
      message: "Booking confirmed",
      data: { booking, queueRes },
    });
  } catch (error) {
    next(error);
  }
};
