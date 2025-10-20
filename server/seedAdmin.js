import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import connectDB from './config/db.js'

dotenv.config()

const seedAdmin = async () => {
  try {
    await connectDB()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@patiljewellers.com' })
    
    if (existingAdmin) {
      console.log('⚠ Admin user already exists!')
      console.log('\nAdmin Credentials:')
      console.log('─────────────────────────────────────')
      console.log('Email: admin@patiljewellers.com')
      console.log('Password: admin123')
      console.log('─────────────────────────────────────\n')
      process.exit(0)
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@patiljewellers.com',
      password: 'admin123',
      phone: '+91 98765 43210',
      role: 'admin'
    })

    console.log('✓ Admin user created successfully!')
    console.log('\nAdmin Credentials:')
    console.log('─────────────────────────────────────')
    console.log('Email: admin@patiljewellers.com')
    console.log('Password: admin123')
    console.log('─────────────────────────────────────\n')

    process.exit(0)
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

seedAdmin()