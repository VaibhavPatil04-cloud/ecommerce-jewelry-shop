import React from 'react'
import { useCart } from '../../context/CartContext'

const OrderSummary = () => {
  const { cart, cartTotal } = useCart()

  const gst = cartTotal * 0.03
  const total = cartTotal + gst

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>

      {/* Order Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cart.map((item) => (
          <div key={item._id} className="flex gap-4">
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
    </div>
  )
}

export default OrderSummary
