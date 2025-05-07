const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('phone', 'Phone is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, city, bloodGroup } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Update fields
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.city = city || user.city;
      
      if (bloodGroup && ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(bloodGroup)) {
        user.bloodGroup = bloodGroup;
      }

      await user.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/password
// @desc    Update user password
// @access  Private
router.put(
  '/password',
  [
    auth,
    [
      check('currentPassword', 'Current password is required').exists(),
      check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findById(req.user.id);

      // Check current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Current password is incorrect' }] });
      }

      // Update password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await user.save();

      res.json({ msg: 'Password updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/users/donors
// @desc    Get all donors
// @access  Private (Admin and Hospital only)
router.get('/donors', [auth, roleCheck(['admin', 'hospital'])], async (req, res) => {
  try {
    const donors = await User.find({ role: 'donor' }).select('-password');
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/hospitals
// @desc    Get all hospitals
// @access  Private (Admin only)
router.get('/hospitals', [auth, roleCheck('admin')], async (req, res) => {
  try {
    const hospitals = await User.find({ role: 'hospital' }).select('-password');
    res.json(hospitals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users
// @desc    Delete user account
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 