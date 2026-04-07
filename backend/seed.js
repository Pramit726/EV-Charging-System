const mongoose = require('mongoose');
const Booking = require('./models/Booking');

// Connect 
mongoose.connect('mongodb://127.0.0.1:27017/ev_charging')
  .then(() => console.log("Connected to MongoDB for seeding..."))
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

const sampleBookings = [
  {
    bookingId: "BK-101",
    vehicleId: "TN-01-1234",
    customerName: "Alice",
    chargingDuration: 30, // Field from case study 
    slotTiming: "10:00 AM", // Field from case study 
    status: "active" // Status for business rule 
  },
  {
    bookingId: "BK-102",
    vehicleId: "KA-05-5678",
    customerName: "Bob",
    chargingDuration: 45,
    slotTiming: "11:30 AM",
    status: "completed" // Used to test update restriction
  }
];

const seedDB = async () => {
  try {
    // Check if connection is ready before running operations
    await Booking.deleteMany({});
    console.log("Old records cleared.");

    await Booking.insertMany(sampleBookings);
    console.log("Sample records inserted successfully!");
  } catch (error) {
    console.error("Error during database operation:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed.");
  }
};

seedDB();