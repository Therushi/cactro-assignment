const Event = require("../models/event.model");
const myQueue = require("../utils/jobQueue");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.status(200).json({
      message: "Events fetched sucessfully",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

exports.createEvents = async (req, res, next) => {
  try {
    const {
      organiserUserId,
      name,
      description,
      venue,
      city,
      price,
      startDate,
      endDate,
      specialGuestName,
    } = req.body;
    if (!organiserUserId) {
      next({
        message: "Invalid req body",
        statusCode: 404,
      });
    }
    const event = await Event.create({
      organiserUserId,
      name,
      description,
      venue,
      city,
      price,
      startDate,
      endDate,
      specialGuestName,
    });
    return res.status(201).json({
      message: "Event created sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.findEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      next({
        message: "Invalid eventId",
        statusCode: 404,
      });
    }
    const event = await Event.findById({
      _id: eventId,
    });
    if (!event) {
      next({
        message: "Invalid event id",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      message: "Event fetched sucessfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const {
      name,
      description,
      venue,
      city,
      price,
      startDate,
      endDate,
      specialGuestName,
    } = req.body;
    if (!eventId) {
      next({
        message: "Invalid eventId",
        statusCode: 404,
      });
    }
    const event = await Event.findByIdAndUpdate(
      { _id: eventId },
      {
        name,
        description,
        venue,
        city,
        price,
        startDate,
        endDate,
        specialGuestName,
      },
      { new: true },
    );
    if (!event) {
      next({
        message: "Invalid event id",
        statusCode: 404,
      });
    }
    const queueRes = await myQueue.add({
      type: "Event updated",
      data: event,
    });
    return res.status(200).json({
      message: "Event updated sucessfully",
      data: { event, queueRes },
    });
  } catch (error) {
    next(error);
  }
};
