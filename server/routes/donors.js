const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Donation = require('../models/Donation');
const Inventory = require('../models/Inventory');

// @route   GET api/donors/donations
// @desc    Get all donations for logged in donor
// @access  Private (donors only)
router.get('/donations', [auth, roleCheck('donor')], async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .sort({ donationDate: -1 });
    
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/donors/donations
// @desc    Create a new donation
// @access  Private (donors only)
router.post(
  '/donations',
  [
    auth,
    roleCheck('donor'),
    [
      check('bloodGroup', 'Blood group is required').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      check('quantity', 'Quantity is required and must be at least 1').isInt({ min: 1 }),
      check('location', 'Location is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bloodGroup, quantity, location, notes } = req.body;

    try {
      const newDonation = new Donation({
        donor: req.user.id,
        bloodGroup,
        quantity,
        location,
        notes
      });

      const donation = await newDonation.save();

      // Update inventory once donation is approved (in a real-world scenario, this would happen after verification)
      if (donation.status === 'approved') {
        let inventory = await Inventory.findOne({ bloodGroup });
        
        if (!inventory) {
          inventory = new Inventory({ bloodGroup, quantity: 0 });
        }
        
        inventory.quantity += quantity;
        inventory.lastUpdated = Date.now();
        await inventory.save();
      }

      res.json(donation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/donors/available
// @desc    Get all available donors
// @access  Private (admin and hospital)
router.get('/available', [auth, roleCheck(['admin', 'hospital'])], async (req, res) => {
  try {
    // Filter query params
    const { bloodGroup, city } = req.query;
    
    const query = { role: 'donor' };
    
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    
    if (city) {
      query.city = city;
    }
    
    const donors = await User.find(query).select('-password');
    
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/donors/stats
// @desc    Get donation statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    // Get total donations count
    const totalDonations = await Donation.countDocuments({ status: 'approved' });
    
    // Get total donors count
    const totalDonors = await User.countDocuments({ role: 'donor' });
    
    // Get blood inventory
    const inventory = await Inventory.find();
    
    res.json({
      totalDonations,
      totalDonors,
      inventory
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 