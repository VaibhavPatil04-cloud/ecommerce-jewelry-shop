import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-card border-b border-dark-border">
      {/* Top Bar */}
      <div className="bg-dark-elevated text-gray-300 text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>✨ Certified Gold & Diamond Jewelry | Free Shipping on Orders ₹10,000+</p>
          <div className="hidden md:flex gap-4">
            <a href="#" className="hover:text-gold">Track Order</a>
            <a href="#" className="hover:text-gold">Store Locator</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
              <span className="text-dark-bg font-bold text-xl">PJ</span>
            </div>
            <h1 className="text-2xl font-bold text-gold font-roboto tracking-wide">
              Patil Jewellers
            </h1>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gold, diamond, rings..."
                className="w-full bg-dark-elevated border border-dark-border rounded-full px-6 py-2 text-gray-100 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="absolute right-4 top-2.5 text-gray-400 hover:text-gold">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-300">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="hover:text-gold transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block hover:text-gold transition-colors">
                <User size={24} />
              </Link>
            )}
            <Link to="/cart" className="relative hover:text-gold transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t border-dark-border pt-4">
          <ul className="hidden md:flex gap-8 text-sm font-medium justify-center">
            <li><Link to="/collections?category=new" className="hover:text-gold">New Arrivals</Link></li>
            <li><Link to="/collections?category=gold" className="hover:text-gold">Gold Jewelry</Link></li>
            <li><Link to="/collections?category=diamond" className="hover:text-gold">Diamond</Link></li>
            <li><Link to="/collections?category=rings" className="hover:text-gold">Rings</Link></li>
            <li><Link to="/collections?category=necklaces" className="hover:text-gold">Necklaces</Link></li>
            <li><Link to="/collections?category=earrings" className="hover:text-gold">Earrings</Link></li>
            <li><Link to="/collections?category=bracelets" className="hover:text-gold">Bracelets</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-elevated border-t border-dark-border p-4">
          <ul className="space-y-4">
            <li><Link to="/collections?category=new" className="block hover:text-gold">New Arrivals</Link></li>
            <li><Link to="/collections?category=gold" className="block hover:text-gold">Gold Jewelry</Link></li>
            <li><Link to="/collections?category=diamond" className="block hover:text-gold">Diamond</Link></li>
            <li><Link to="/collections?category=rings" className="block hover:text-gold">Rings</Link></li>
            <li><Link to="/collections?category=necklaces" className="block hover:text-gold">Necklaces</Link></li>
            <li><Link to="/collections?category=earrings" className="block hover:text-gold">Earrings</Link></li>
            <li><Link to="/collections?category=bracelets" className="block hover:text-gold">Bracelets</Link></li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
