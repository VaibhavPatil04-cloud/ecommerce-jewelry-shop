import React, { createContext, useState, useEffect, useContext } from 'react'
import { cartAPI } from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    loadCart()
  }, [isAuthenticated])

  useEffect(() => {
    calculateTotals()
  }, [cart])

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }

  const saveCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const calculateTotals = () => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setCartCount(count)
    setCartTotal(total)
  }

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item._id === product._id)
    let updatedCart

    if (existingItem) {
      updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity }]
    }

    saveCart(updatedCart)
    return { success: true, message: 'Item added to cart' }
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    )
    saveCart(updatedCart)
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId)
    saveCart(updatedCart)
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setCart([])
  }

  const value = {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
