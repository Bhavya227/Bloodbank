const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inventory', InventorySchema); 