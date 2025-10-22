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
  const { isAuthenticated, user } = useAuth()

  // Load cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      loadCartFromDB()
    } else {
      loadCartFromLocalStorage()
    }
  }, [isAuthenticated])

  // Calculate totals whenever cart changes
  useEffect(() => {
    calculateTotals()
  }, [cart])

  const loadCartFromDB = async () => {
    try {
      const response = await cartAPI.getCart()
      if (response.data.cart && response.data.cart.items) {
        setCart(response.data.cart.items.map(item => ({
          ...item.product,
          quantity: item.quantity,
          _id: item.product._id
        })))
      }
    } catch (error) {
      console.error('Error loading cart from database:', error)
      // Fallback to localStorage
      loadCartFromLocalStorage()
    }
  }

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const calculateTotals = () => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setCartCount(count)
    setCartTotal(total)
  }

  const addToCart = async (product, quantity = 1) => {
    try {
      if (isAuthenticated) {
        // Save to database
        await cartAPI.addToCart({
          productId: product._id,
          quantity: quantity
        })
        await loadCartFromDB()
        return { success: true, message: 'Item added to cart' }
      } else {
        // Save to localStorage
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

        saveCartToLocalStorage(updatedCart)
        return { success: true, message: 'Item added to cart' }
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return { success: false, message: 'Failed to add item to cart' }
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      if (isAuthenticated) {
        // Find the cart item ID
        const response = await cartAPI.getCart()
        const cartItem = response.data.cart.items.find(
          item => item.product._id.toString() === productId.toString()
        )
        
        if (cartItem) {
          await cartAPI.updateCartItem(cartItem._id, quantity)
          await loadCartFromDB()
        }
      } else {
        const updatedCart = cart.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
        saveCartToLocalStorage(updatedCart)
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        const response = await cartAPI.getCart()
        const cartItem = response.data.cart.items.find(
          item => item.product._id.toString() === productId.toString()
        )
        
        if (cartItem) {
          await cartAPI.removeFromCart(cartItem._id)
          await loadCartFromDB()
        }
      } else {
        const updatedCart = cart.filter(item => item._id !== productId)
        saveCartToLocalStorage(updatedCart)
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartAPI.clearCart()
      }
      localStorage.removeItem('cart')
      setCart([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
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