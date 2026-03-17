const connectMongoDB = require("../utils/mongoConnection");
connectMongoDB();

const myQueue = require("../utils/jobQueue");
const {
  sendEmailBookingConfirmation,
  sendEmailEventUpdated,
} = require("../utils/emailService");

myQueue.process(async (job) => {
  console.log("Worker received job data:", job.data);

  switch (job.data.type) {
    case "Booking confirmed":
      await sendEmailBookingConfirmation();
      break;
    case "Event updated":
      await sendEmailEventUpdated(job.data.data);
      break;
    default:
      console.log(`Unknown Job`);
  }
});

myQueue.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed with error: ${err.message}`);
});
myQueue.on("error", (err) => {
  console.log(`Queue error: ${err.message}`);
});

console.log("Email Worker is running and waiting for jobs...");
