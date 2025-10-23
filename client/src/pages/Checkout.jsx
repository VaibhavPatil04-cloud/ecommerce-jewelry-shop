// client/src/pages/Checkout.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CreditCard, Truck, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { orderAPI } from '../services/api'

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  })

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [orderNotes, setOrderNotes] = useState('')

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  const gst = cartTotal * 0.03
  const total = cartTotal + gst

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0] || ''
        })),
        totalAmount: total,
        shippingAddress,
        paymentMethod,
        orderNotes,
      }

      const response = await orderAPI.createOrder(orderData)
      
      if (response.data.success) {
        await clearCart()
        navigate(`/order-confirmation/${response.data.order._id}`)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-6">Add items to your cart before checkout</p>
          <button
            onClick={() => navigate('/collections')}
            className="bg-gold hover:bg-gold-dark text-dark-bg font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Browse Collections
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="text-gold" size={24} />
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="123 Main Street, Apartment 4B"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="Maharashtra"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="400001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="India"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-gold" size={24} />
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-400">Pay when you receive the order</p>
                  </div>
                  <Truck className="text-gold" size={24} />
                </label>

                <label className="flex items-center gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Online Payment</p>
                    <p className="text-sm text-gray-400">Pay now using UPI, Cards, Net Banking</p>
                  </div>
                  <CreditCard className="text-gold" size={24} />
                </label>

                <label className="flex items-center gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-400">Visa, Mastercard, Amex</p>
                  </div>
                  <CreditCard className="text-gold" size={24} />
                </label>

                <label className="flex items-center gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-gray-400">PhonePe, Google Pay, Paytm</p>
                  </div>
                  <div className="text-gold font-bold">₹</div>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="font-bold mb-4">Order Notes (Optional)</h3>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows="3"
                className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                placeholder="Any special instructions for your order..."
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <img
                      src={item.images?.[0] || '/placeholder-jewelry.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-sm text-gold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-dark-border pt-4">
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
                <div className="border-t border-dark-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-gold">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-dark text-dark-bg font-medium py-3 rounded-lg transition-colors mt-6 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-dark-border space-y-3 text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="text-gold">✓</span> Secure Payment
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gold">✓</span> 100% Authentic Products
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gold">✓</span> Easy Returns within 7 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout