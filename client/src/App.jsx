import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import ProductPage from './pages/ProductPage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ShoppingCart from './components/cart/ShoppingCart'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-dark-bg text-gray-100 font-roboto'>
        <Header />
        <main className='min-h-screen'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collections' element={<Collections />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<ShoppingCart />} />
            <Route path='/order-confirmation/:orderId' element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App