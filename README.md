# Patil Jewellers - Jewelry E-Commerce Platform

A full-stack MERN e-commerce application for jewelry shopping with dark theme and modern UI.

## Features

- 🔐 JWT Authentication (Register/Login)
- 💍 Product Browsing & Filtering
- 🛒 Shopping Cart Management
- 📦 Order Placement (Dummy)
- 🎨 Dark Theme with Roboto Font
- 📱 Fully Responsive Design
- ⚡ Fast Performance with Vite

## Tech Stack

**Frontend:**
- React.js 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB

### Clone Repository
git clone https://github.com/yourusername/patil-jewellers.git
cd patil-jewellers

text

### Backend Setup
cd server
npm install

Create .env file and add your MongoDB URI
npm run dev

text

### Frontend Setup
cd client
npm install
npm run dev

text

## Environment Variables

### Server (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/patil-jewellers
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

text

### Client (.env)
VITE_API_URL=http://localhost:5000/api

text

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- GET `/api/products/search?q=query` - Search products
- GET `/api/products/category/:category` - Get by category

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/user` - Get user orders

## Developed By

Vaibhav - MCA Student

## License

MIT License
