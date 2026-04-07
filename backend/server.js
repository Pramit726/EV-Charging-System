const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Booking = require('./models/Booking');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection 
mongoose.connect('mongodb://127.0.0.1:27017/ev_charging')
  .then(() => console.log("Connected to MongoDB for seeding..."))
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

/**
 * TASK: Search and View Record
 * Logic: Accept two unique identifiers
 */
app.get('/api/search', async (req, res) => {
  try {
    const { bookingId, vehicleId } = req.query;
    
    // Server-side validation: Check if both identifiers are provided 
    if (!bookingId || !vehicleId) {
      throw new Error("Missing search identifiers.");
    }

    const record = await Booking.findOne({ bookingId, vehicleId });

    if (!record) {
      // Failure case: record not found 
      return res.status(404).json({ message: "Record not found in database." });
    }

    // Success: Display complete details only if record exists 
    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Server-side exception handling
  }
});

/**
 * TASK: Update Selected Fields
 * Business Rule: Only if status is 'active' 
 */
app.put('/api/update/:id', async (req, res) => {
  try {
    const { chargingDuration, slotTiming } = req.body;
    const record = await Booking.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Business Rule Check: Verify record status
    if (record.status !== 'active') {
      return res.status(403).json({ message: "Update restricted: Booking is no longer active." });
    }

    // Update only permitted fields 
    record.chargingDuration = chargingDuration;
    record.slotTiming = slotTiming;

    await record.save();
    res.status(200).json({ message: "Record updated successfully." }); // Success page trigger 
  } catch (error) {
    res.status(500).json({ message: "Server error during update." }); // Exception handling 
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));