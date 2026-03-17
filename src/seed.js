require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('./models/user.model');
const Event = require('./models/event.model');
const Booking = require('./models/booking.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cractro_db';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Event.deleteMany({});
    await Booking.deleteMany({});

    console.log('Seeding Users...');
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        userType: 'ATTENDEE',
        password: 'password123',
        contactNo: 1234567890,
        age: 28,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        userType: 'ORGANISER',
        password: 'password123',
        contactNo: 9876543210,
        age: 35,
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        userType: 'ATTENDEE',
        password: 'password123',
        contactNo: 5551234567,
        age: 24,
      }
    ]);

    const organiser = users.find(u => u.userType === 'ORGANISER');
    const attendee1 = users.find(u => u.name === 'John Doe');
    const attendee2 = users.find(u => u.name === 'Alice Johnson');

    console.log('Seeding Events...');
    const events = await Event.insertMany([
      {
        organiserUserId: organiser._id.toString(),
        name: 'Tech Conference 2026',
        description: 'A massive tech conference covering AI, Web3, and standard web technologies.',
        venue: 'Grand Convention Center',
        city: 'San Francisco',
        price: 199.99,
        startDate: new Date('2026-06-15T09:00:00Z'),
        endDate: new Date('2026-06-17T18:00:00Z'),
        specialGuestName: 'Elon Musk',
      },
      {
        organiserUserId: organiser._id.toString(),
        name: 'Music Festival Summer',
        description: 'An outdoor music festival featuring top electronic artists.',
        venue: 'Open Air Arena',
        city: 'Miami',
        price: 89.50,
        startDate: new Date('2026-07-20T14:00:00Z'),
        endDate: new Date('2026-07-20T23:59:00Z'),
        specialGuestName: 'David Guetta',
      }
    ]);

    console.log('Seeding Bookings...');
    await Booking.insertMany([
      {
        userId: attendee1._id.toString(),
        eventId: events[0]._id.toString(),
        numOfTickets: 2,
        totalPrice: 199.99 * 2,
        paymentStatus: 'PAID',
        bookingDate: new Date(),
      },
      {
        userId: attendee2._id.toString(),
        eventId: events[1]._id.toString(),
        numOfTickets: 1,
        totalPrice: 89.50,
        paymentStatus: 'PENDING',
        bookingDate: new Date(),
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
