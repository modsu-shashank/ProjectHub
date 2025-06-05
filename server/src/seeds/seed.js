const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('../models/Category');
const User = require('../models/User');
const categories = require('./categories');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Seed categories
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@projecthub.com' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@projecthub.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created');
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
