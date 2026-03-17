const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/cractro_db';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String },
  password: { type: String },
  contactNo: Number,
  age: Number,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
  organiserUserId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  venue: { type: String },
  city: { type: String },
  price: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  specialGuestName: { type: String },
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  numOfTickets: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  bookingDate: { type: Date, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);
const Booking = mongoose.model("Booking", bookingSchema);

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
      { name: 'John Doe', email: 'john@example.com', userType: 'ATTENDEE', password: 'password123', contactNo: 1234567890, age: 28 },
      { name: 'Jane Smith', email: 'jane@example.com', userType: 'ORGANISER', password: 'password123', contactNo: 9876543210, age: 35 },
      { name: 'Alice Johnson', email: 'alice@example.com', userType: 'ATTENDEE', password: 'password123', contactNo: 5551234567, age: 24 }
    ]);

    const organiser = users.find(u => u.userType === 'ORGANISER');
    const attendee1 = users.find(u => u.name === 'John Doe');
    const attendee2 = users.find(u => u.name === 'Alice Johnson');

    console.log('Seeding Events...');
    const events = await Event.insertMany([
      { organiserUserId: organiser._id.toString(), name: 'Tech Conference 2026', description: 'A massive tech conference', venue: 'Grand Convention Center', city: 'San Francisco', price: 199.99, startDate: new Date('2026-06-15T09:00:00Z'), endDate: new Date('2026-06-17T18:00:00Z'), specialGuestName: 'Elon Musk' },
      { organiserUserId: organiser._id.toString(), name: 'Music Festival Summer', description: 'Outdoor music festival', venue: 'Open Air Arena', city: 'Miami', price: 89.50, startDate: new Date('2026-07-20T14:00:00Z'), endDate: new Date('2026-07-20T23:59:00Z'), specialGuestName: 'David Guetta' }
    ]);

    console.log('Seeding Bookings...');
    await Booking.insertMany([
      { userId: attendee1._id.toString(), eventId: events[0]._id.toString(), numOfTickets: 2, totalPrice: 399.98, paymentStatus: 'PAID', bookingDate: new Date() },
      { userId: attendee2._id.toString(), eventId: events[1]._id.toString(), numOfTickets: 1, totalPrice: 89.50, paymentStatus: 'PENDING', bookingDate: new Date() }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
