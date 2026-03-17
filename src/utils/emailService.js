const Event = require("../models/event.model");
const Booking = require("../models/booking.model");

exports.sendEmailBookingConfirmation = async () => {
  setTimeout(() => {
    console.log(`Email Sent Sucessfully`);
  }, 1000);
};

exports.sendEmailEventUpdated = async (event) => {
  const eventDetails = await Event.findById({ _id: event._id });
  const bookings = await Booking.aggregate([
    {
      $match: {
        eventId: String(event._id),
      },
    },
    {
      $addFields: {
        userObjectId: { $toObjectId: "$userId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userObjectId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        userName: "$user.name",
        userEmail: "$user.email",
        userId: 1,
        eventId: 1,
        numOfTickets: 1,
        totalPrice: 1,
        paymentStatus: 1,
        bookingDate: 1,
      },
    },
  ]);

  if (bookings.length) {
    bookings.forEach((booking, index) => {
      setTimeout(() => {
        console.log(
          `Event Updated Email Sent Sucessfully to ${booking.userEmail}`,
        );
      }, index * 1000);
    });
  }
};
