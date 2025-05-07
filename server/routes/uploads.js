const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Configure multer for storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Configure upload
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// @route   POST api/uploads/profile
// @desc    Upload user profile image
// @access  Private
router.post('/profile', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Update user's profile photo in database would go here
    // Example: const user = await User.findByIdAndUpdate(req.user.id, { photoUrl: `/uploads/${req.file.filename}` }, { new: true });

    res.json({ 
      msg: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/uploads/id-proof
// @desc    Upload user ID proof
// @access  Private
router.post('/id-proof', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Update user's ID proof in database would go here
    
    res.json({ 
      msg: 'ID proof uploaded successfully',
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/uploads/gallery
// @desc    Upload gallery image (admin only)
// @access  Private/Admin
router.post('/gallery', auth, upload.single('photo'), async (req, res) => {
  try {
    // Check if user is admin - example implementation
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Store gallery image reference in database would go here
    
    res.json({ 
      msg: 'Gallery image uploaded successfully',
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Error handling for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ msg: 'File size too large. Max size is 5MB' });
    }
    return res.status(400).json({ msg: err.message });
  }
  next(err);
});

module.exports = router; 