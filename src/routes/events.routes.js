const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/events.controller");

router.get("/", eventsController.getEvents);
router.post("/", eventsController.createEvents);
router.get("/:eventId", eventsController.findEventById);
router.put("/:eventId", eventsController.updateEvent);

module.exports = router;
