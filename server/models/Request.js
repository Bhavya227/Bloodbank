const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  requester: {
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
    default: 1 // in units
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'critical'],
    default: 'normal'
  },
  city: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'canceled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', RequestSchema); 