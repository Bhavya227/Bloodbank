const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { check, validationResult } = require('express-validator');

const Request = require('../models/Request');
const Inventory = require('../models/Inventory');

// @route   GET api/requests
// @desc    Get all blood requests
// @access  Private (Admin only)
router.get('/', [auth, roleCheck('admin')], async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/requests/me
// @desc    Get logged in user's requests
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/requests
// @desc    Create a blood request
// @access  Private (Hospital role)
router.post(
  '/',
  [
    auth,
    roleCheck('hospital'),
    [
      check('bloodGroup', 'Blood group is required').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      check('quantity', 'Quantity is required and must be at least 1').isInt({ min: 1 }),
      check('urgency', 'Urgency is required').isIn(['normal', 'urgent', 'critical']),
      check('city', 'City is required').not().isEmpty(),
      check('hospital', 'Hospital name is required').not().isEmpty(),
      check('patientName', 'Patient name is required').not().isEmpty(),
      check('contactNumber', 'Contact number is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      bloodGroup,
      quantity,
      urgency,
      city,
      hospital,
      patientName,
      contactNumber,
      notes
    } = req.body;

    try {
      // Check if enough blood is available
      const inventory = await Inventory.findOne({ bloodGroup });
      
      let requestStatus = 'pending';
      
      // If inventory exists and has enough quantity, fulfill the request
      if (inventory && inventory.quantity >= quantity) {
        requestStatus = 'fulfilled';
        
        // Reduce inventory
        inventory.quantity -= quantity;
        inventory.lastUpdated = Date.now();
        await inventory.save();
      }

      const newRequest = new Request({
        requester: req.user.id,
        bloodGroup,
        quantity,
        urgency,
        city,
        hospital,
        patientName,
        contactNumber,
        notes,
        status: requestStatus
      });

      const request = await newRequest.save();
      
      res.json(request);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/requests/:id
// @desc    Update request status
// @access  Private (Admin only)
router.put(
  '/:id',
  [
    auth,
    roleCheck('admin'),
    [
      check('status', 'Status is required').isIn(['pending', 'fulfilled', 'canceled'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    try {
      const request = await Request.findById(req.params.id);
      
      if (!request) {
        return res.status(404).json({ msg: 'Request not found' });
      }
      
      // If changing from pending to fulfilled, check inventory
      if (request.status === 'pending' && status === 'fulfilled') {
        const inventory = await Inventory.findOne({ bloodGroup: request.bloodGroup });
        
        if (!inventory || inventory.quantity < request.quantity) {
          return res.status(400).json({ msg: 'Not enough blood in inventory' });
        }
        
        // Update inventory
        inventory.quantity -= request.quantity;
        inventory.lastUpdated = Date.now();
        await inventory.save();
      }
      
      // If changing from fulfilled to canceled, restore inventory
      if (request.status === 'fulfilled' && status === 'canceled') {
        let inventory = await Inventory.findOne({ bloodGroup: request.bloodGroup });
        
        if (!inventory) {
          inventory = new Inventory({
            bloodGroup: request.bloodGroup,
            quantity: 0
          });
        }
        
        inventory.quantity += request.quantity;
        inventory.lastUpdated = Date.now();
        await inventory.save();
      }
      
      request.status = status;
      await request.save();
      
      res.json(request);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/requests/urgent
// @desc    Get all urgent and critical requests
// @access  Public
router.get('/urgent', async (req, res) => {
  try {
    const urgentRequests = await Request.find({
      status: 'pending',
      urgency: { $in: ['urgent', 'critical'] }
    }).sort({ createdAt: -1 });
    
    res.json(urgentRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 