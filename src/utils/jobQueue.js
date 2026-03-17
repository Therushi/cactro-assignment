const Queue = require("bull");
require("dotenv").config();

const myQueue = new Queue("emailQueue", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
});

module.exports = myQueue;
