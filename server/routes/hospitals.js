const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { check, validationResult } = require('express-validator');

const BloodBank = require('../models/BloodBank');

// @route   GET api/hospitals
// @desc    Get all hospitals and blood banks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    
    let query = {};
    
    if (city) {
      query.city = city;
    }
    
    const bloodBanks = await BloodBank.find(query);
    res.json(bloodBanks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/hospitals
// @desc    Add a new hospital or blood bank
// @access  Private (Admin only)
router.post(
  '/',
  [
    auth,
    roleCheck('admin'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('phone', 'Phone number is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, city, phone, email, location, isHospital } = req.body;

    try {
      const newBloodBank = new BloodBank({
        name,
        address,
        city,
        phone,
        email,
        location,
        isHospital: isHospital || false
      });

      const bloodBank = await newBloodBank.save();
      res.json(bloodBank);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/hospitals/:id
// @desc    Update a hospital or blood bank
// @access  Private (Admin only)
router.put(
  '/:id',
  [
    auth,
    roleCheck('admin'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('address', 'Address is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('phone', 'Phone number is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, city, phone, email, location, isHospital } = req.body;

    try {
      const bloodBank = await BloodBank.findById(req.params.id);
      
      if (!bloodBank) {
        return res.status(404).json({ msg: 'Blood bank not found' });
      }
      
      bloodBank.name = name;
      bloodBank.address = address;
      bloodBank.city = city;
      bloodBank.phone = phone;
      
      if (email) {
        bloodBank.email = email;
      }
      
      if (location) {
        bloodBank.location = location;
      }
      
      if (isHospital !== undefined) {
        bloodBank.isHospital = isHospital;
      }
      
      await bloodBank.save();
      
      res.json(bloodBank);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/hospitals/:id
// @desc    Delete a hospital or blood bank
// @access  Private (Admin only)
router.delete('/:id', [auth, roleCheck('admin')], async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    
    if (!bloodBank) {
      return res.status(404).json({ msg: 'Blood bank not found' });
    }
    
    await bloodBank.remove();
    
    res.json({ msg: 'Blood bank removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/hospitals/seed
// @desc    Seed Gujarat blood banks (only in development)
// @access  Private (Admin only)
router.get('/seed', [auth, roleCheck('admin')], async (req, res) => {
  // Only allow in development environment
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ msg: 'Not allowed in production' });
  }
  
  try {
    const gujaratBloodBanks = [
      {
        name: 'Red Cross Blood Bank',
        address: 'Civil Hospital Campus, Asarwa',
        city: 'Ahmedabad',
        phone: '079-22681892',
        email: 'bloodbank@redcross.org',
        isHospital: false,
        location: { lat: 23.0522, lng: 72.5710 }
      },
      {
        name: 'Prathama Blood Centre',
        address: 'Opp. V.S. Hospital, Ellis Bridge',
        city: 'Ahmedabad',
        phone: '079-26576923',
        email: 'info@prathama.org',
        isHospital: false,
        location: { lat: 23.0225, lng: 72.5714 }
      },
      {
        name: 'Surat Raktadan Kendra',
        address: 'Khatodara Health Center, Ring Road',
        city: 'Surat',
        phone: '0261-2462262',
        email: 'srkbloodbank@gmail.com',
        isHospital: false,
        location: { lat: 21.1702, lng: 72.8311 }
      },
      {
        name: 'Civil Hospital Blood Bank',
        address: 'Civil Hospital Campus, Majura Gate',
        city: 'Surat',
        phone: '0261-2244456',
        email: 'civilhospitalbloodbank@gmail.com',
        isHospital: true,
        location: { lat: 21.1959, lng: 72.8302 }
      },
      {
        name: 'Rajkot Voluntary Blood Bank',
        address: 'Panchvati, Kalawad Road',
        city: 'Rajkot',
        phone: '0281-2576935',
        email: 'rajkotvbb@gmail.com',
        isHospital: false,
        location: { lat: 22.2920, lng: 70.7874 }
      },
      {
        name: 'SSG Hospital Blood Bank',
        address: 'SSG Hospital, Jail Road',
        city: 'Vadodara',
        phone: '0265-2426110',
        email: 'ssghospitalbb@gmail.com',
        isHospital: true,
        location: { lat: 22.3072, lng: 73.1812 }
      }
    ];
    
    await BloodBank.deleteMany({});
    await BloodBank.insertMany(gujaratBloodBanks);
    
    res.json({ msg: 'Blood banks seeded successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 