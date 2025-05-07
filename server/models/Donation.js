const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // in units
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Donation', DonationSchema); 