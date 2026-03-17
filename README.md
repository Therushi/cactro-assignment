# Event Booking System – Backend API Requirements

## Overview

Design and implement backend APIs for an Event Booking System supporting two user roles:

- **Event Organizers**
- **Customers**

## Core Functionality

- **Event Organizers**
  - Create, update, and manage events

- **Customers**
  - Browse available events
  - Book tickets for events

- **Access Control**
  - APIs must enforce role-based access (Organizer vs Customer)

## Background Processing

Implement asynchronous/background tasks using any queue or async mechanism.

---

## Background Task 1: Booking Confirmation

- **Trigger:** When a customer successfully books tickets
- **Action:** Simulate sending a booking confirmation email
- **Output Requirement:** Console log / print statement indicating email sent

---

## Background Task 2: Event Update Notification

- **Trigger:** When an event is updated
- **Action:** Notify all customers who booked tickets for that event
- **Output Requirement:** Console log / print statement indicating notifications sent

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Environment Variables**:
   A `.env` file has been generated for you with default values (port 3000). You can change them as needed.

3. **Start the application in Development Mode**:

   ```bash
   npm run dev
   ```

   The server will start running on `http://localhost:3000/`. nodemon will watch for code changes and automatically restart the server.

4. **Start the application in Production Mode**:
   ```bash
   npm start
   ```

## API Testing

You can verify the setup by sending a GET request to the root or the test endpoint:

- **Base Route:** `GET http://localhost:3000/`
- **Home Route:** `GET http://localhost:3000/api/home`
