const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodBankSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  location: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  isHospital: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BloodBank', BloodBankSchema); 