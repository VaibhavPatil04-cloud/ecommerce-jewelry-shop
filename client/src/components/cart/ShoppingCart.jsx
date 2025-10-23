// client/src/components/cart/ShoppingCart.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

const ShoppingCart = () => {
  const { cart, cartTotal, cartCount } = useCart()
  const navigate = useNavigate()

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-6">Start adding some beautiful jewelry pieces to your cart</p>
          <Link
            to="/collections"
            className="inline-block bg-gold hover:bg-gold-dark text-dark-bg font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    )
  }

  const gst = cartTotal * 0.03
  const total = cartTotal + gst

  const handleProceedToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-dark-card border border-dark-border rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>GST (3%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="border-t border-dark-border pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-gold">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gold hover:bg-gold-dark text-dark-bg font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>

            <Link
              to="/collections"
              className="block text-center text-gold hover:underline text-sm"
            >
              Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-dark-border space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-gold">✓</span> Secure Payment
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">✓</span> Free Shipping on orders above ₹10,000
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">✓</span> Easy Returns within 7 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart