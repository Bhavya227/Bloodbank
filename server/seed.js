const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const User = require('./models/User');
const Inventory = require('./models/Inventory');
const BloodBank = require('./models/BloodBank');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const seedDatabase = async () => {
  try {
    // Clear all existing data
    await User.deleteMany({});
    await Inventory.deleteMany({});
    await BloodBank.deleteMany({});

    console.log('Previous data cleared');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
      name: 'Admin User',
      email: 'admin@bloodbank.com',
      password: adminPassword,
      phone: '9876543210',
      bloodGroup: 'O+',
      city: 'Ahmedabad',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created');

    // Seed blood inventory with initial values
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    
    for (const bloodGroup of bloodGroups) {
      const randomQuantity = Math.floor(Math.random() * 50) + 5; // Random between 5-55
      
      const inventory = new Inventory({
        bloodGroup,
        quantity: randomQuantity
      });
      
      await inventory.save();
    }
    
    console.log('Blood inventory seeded');

    // Seed blood banks and hospitals in Gujarat
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
    
    await BloodBank.insertMany(gujaratBloodBanks);
    console.log('Blood banks seeded');

    // Create some sample users
    const gujaratCities = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Jamnagar'];
    const sampleUsers = [];
    
    // Generate 5 sample donors
    for (let i = 1; i <= 5; i++) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('password123', salt);
      
      const randomCity = gujaratCities[Math.floor(Math.random() * gujaratCities.length)];
      const randomBloodGroup = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
      
      sampleUsers.push({
        name: `Donor User ${i}`,
        email: `donor${i}@example.com`,
        password,
        phone: `99887766${i}${i}`,
        bloodGroup: randomBloodGroup,
        city: randomCity,
        role: 'donor'
      });
    }
    
    // Generate 3 sample hospitals
    for (let i = 1; i <= 3; i++) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('password123', salt);
      
      const randomCity = gujaratCities[Math.floor(Math.random() * gujaratCities.length)];
      
      sampleUsers.push({
        name: `Hospital User ${i}`,
        email: `hospital${i}@example.com`,
        password,
        phone: `88776655${i}${i}`,
        bloodGroup: 'O+',
        city: randomCity,
        role: 'hospital'
      });
    }
    
    await User.insertMany(sampleUsers);
    console.log('Sample users created');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase(); 