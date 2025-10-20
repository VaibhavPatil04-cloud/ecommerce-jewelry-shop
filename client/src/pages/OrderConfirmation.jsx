import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Package, Mail, Phone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import OrderSummary from '../components/checkout/OrderSummary'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear cart after order placement
    clearCart()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-400">Thank you for your purchase from Patil Jewellers</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-gold mb-4">Order Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Order ID: <span className="text-white font-medium">{orderId}</span></p>
                <p className="text-gray-400">Date: <span className="text-white">{new Date().toLocaleDateString()}</span></p>
                <p className="text-gray-400">Status: <span className="text-green-500 font-medium">Confirmed</span></p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gold mb-4">Delivery Details</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Estimated Delivery:</p>
                <p className="text-white font-medium">5-7 Business Days</p>
                <p className="text-gray-400 mt-4">
                  A confirmation email with tracking details will be sent shortly.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-border pt-6">
            <OrderSummary />
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
            <Package className="mx-auto text-gold mb-3" size={32} />
            <h4 className="font-bold mb-2">Track Your Order</h4>
            <p className="text-sm text-gray-400">Monitor your order status in real-time</p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
            <Mail className="mx-auto text-gold mb-3" size={32} />
            <h4 className="font-bold mb-2">Check Your Email</h4>
            <p className="text-sm text-gray-400">Order confirmation sent to your email</p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-lg p-6 text-center">
            <Phone className="mx-auto text-gold mb-3" size={32} />
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-sm text-gray-400">Call us at +91 98765 43210</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/collections"
            className="bg-gold hover:bg-gold-dark text-dark-bg font-medium px-8 py-3 rounded-lg transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="border border-gold text-gold hover:bg-gold hover:text-dark-bg font-medium px-8 py-3 rounded-lg transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
