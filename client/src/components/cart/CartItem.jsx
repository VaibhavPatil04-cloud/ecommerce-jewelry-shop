import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleIncrement = () => {
    updateQuantity(item._id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    removeFromCart(item._id)
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-4 flex gap-4">
      {/* Product Image */}
      <Link to={`/product/${item._id}`} className="flex-shrink-0">
        <img
          src={item.images?.[0] || '/placeholder-jewelry.jpg'}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1">
        <Link to={`/product/${item._id}`} className="hover:text-gold">
          <h3 className="font-medium mb-1">{item.name}</h3>
        </Link>
        <p className="text-sm text-gray-400 mb-2">{item.category} • {item.metalType}</p>
        <p className="text-gold font-bold">₹{item.price?.toLocaleString()}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>

        <div className="flex items-center border border-dark-border rounded-lg">
          <button
            onClick={handleDecrement}
            className="p-2 hover:bg-dark-elevated transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 border-x border-dark-border min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="p-2 hover:bg-dark-elevated transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default CartItem
