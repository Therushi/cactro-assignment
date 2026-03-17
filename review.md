# Event Booking System - Backend API Review

## Rating
**Rating: 6.5 / 10**

Your implementation has a solid foundation, utilizing Express, MongoDB, and a Bull queue for background tasks. However, it lacks crucial security and access control mechanisms requested in the requirements, along with a few logical bugs.

## What is Missing / Areas for Improvement

### 1. Authentication and Role-Based Access Control (Critical)
The requirement explicitly stated: *"API access must be controlled based on user roles (Event Organizers manage events, Customers browse and book)."*
- **Missing Auth Middleware:** Currently, there is no authentication mechanism (like JWT). Anyone can hit the API endpoints.
- **Missing Role Checks:** There are no middleware functions checking if a user has the `Event Organizer` or `Customer` role before allowing access to specific routes.
- **Insecure Data Passing:** `organiserUserId` (for event creation) and `userId` (for booking) are passed directly in the request body, which is insecure. They should be extracted from an authenticated user token.
- **Missing Authorization Logic:** When updating an event (`updateEvent`), there is no check to ensure the user requesting the update is actually the `organiserUserId` who created the event.

### 2. Logic Bugs & Flaws
- **Incorrect Condition in `bookEvent`:** 
  In `src/controllers/booking.controller.js`, you have:
  ```javascript
  const isEventValid = await Event.findById({ _id: eventId });
  if (!eventId && !isEventValid) {
  ```
  This condition uses `&&` when it should logically be `||`. If an invalid `eventId` is provided, `!eventId` is `false`, making the whole `&&` condition `false`. The API will then attempt to create a booking for a non-existent event.
- **Missing Ticket Availability Check:** While not explicitly asked in the brief, a robust booking system should ideally ensure that the number of tickets being booked does not exceed the event's capacity.
- **Mismatched Error Status Codes:** In `events.controller.js`, missing `eventId` or `organiserUserId` returns a `404 Not Found`. It should ideally be a `400 Bad Request`.

## What Works Well (The Good Parts)

### Background Tasks & Queue Implementation
- **Queue Setup:** Your use of Bull queue (`jobQueue.js`) and separating the processing into a worker process (`npm run worker`) is an excellent architectural choice for async processing.
- **Booking Confirmation (Task 1):** The queue correctly receives the job on successful booking and effectively simulates the email trigger in `emailWorker.js`.
- **Event Update Notification (Task 2):** Your database aggregation pipeline in `emailService.js` to find booked users based on `eventId` and join with the `users` collection is very well written. Staggering notifications is also a nice touch.

## Conclusion
The base architecture (Routes, Controllers, Mongoose Models, Job Workers) is set up nicely. To bump this implementation to a 9 or 10, incorporate proper authentication (e.g., JWT) and ensure every controller strictly verifies user roles and authorization before processing the request.
