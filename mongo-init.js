// Connect to the desired database (automatically created if it doesn't exist)
db = db.getSiblingDB('cractro_db');

print('Seeding Users...');
db.users.insertMany([
  {
    name: 'John Doe',
    email: 'john@example.com',
    userType: 'ATTENDEE',
    password: 'password123',
    contactNo: 1234567890,
    age: 28,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    userType: 'ORGANISER',
    password: 'password123',
    contactNo: 9876543210,
    age: 35,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    userType: 'ATTENDEE',
    password: 'password123',
    contactNo: 5551234567,
    age: 24,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Find specific users for relations
var organiser = db.users.findOne({ userType: 'ORGANISER' });
var attendee1 = db.users.findOne({ name: 'John Doe' });
var attendee2 = db.users.findOne({ name: 'Alice Johnson' });

print('Seeding Events...');
db.events.insertMany([
  {
    organiserUserId: organiser._id.valueOf(),
    name: 'Tech Conference 2026',
    description: 'A massive tech conference covering AI, Web3, and standard web technologies.',
    venue: 'Grand Convention Center',
    city: 'San Francisco',
    price: 199.99,
    startDate: new Date('2026-06-15T09:00:00Z'),
    endDate: new Date('2026-06-17T18:00:00Z'),
    specialGuestName: 'Elon Musk',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    organiserUserId: organiser._id.valueOf(),
    name: 'Music Festival Summer',
    description: 'An outdoor music festival featuring top electronic artists.',
    venue: 'Open Air Arena',
    city: 'Miami',
    price: 89.50,
    startDate: new Date('2026-07-20T14:00:00Z'),
    endDate: new Date('2026-07-20T23:59:00Z'),
    specialGuestName: 'David Guetta',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

var event1 = db.events.findOne({ name: 'Tech Conference 2026' });
var event2 = db.events.findOne({ name: 'Music Festival Summer' });

print('Seeding Bookings...');
db.bookings.insertMany([
  {
    userId: attendee1._id.valueOf(),
    eventId: event1._id.valueOf(),
    numOfTickets: 2,
    totalPrice: 199.99 * 2,
    paymentStatus: 'PAID',
    bookingDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: attendee2._id.valueOf(),
    eventId: event2._id.valueOf(),
    numOfTickets: 1,
    totalPrice: 89.50,
    paymentStatus: 'PENDING',
    bookingDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database seeded successfully via mongo-init.js!');
