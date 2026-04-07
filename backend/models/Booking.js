const mongoose = require('mongoose');

// Define the database table structure 
const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true }, // Identifier 1
  vehicleId: { type: String, required: true },               // Identifier 2 
  customerName: { type: String, required: true },            // Non-editable field 
  chargingDuration: { type: Number, required: true },        // Editable field 
  slotTiming: { type: String, required: true },              // Editable field
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'completed', 'expired'] 
  } // Business rule field 
});

module.exports = mongoose.model('Booking', BookingSchema);