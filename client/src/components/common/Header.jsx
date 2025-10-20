import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu, X, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const categories = [
    { name: 'Rings', icon: '💍' },
    { name: 'Necklaces', icon: '📿' },
    { name: 'Earrings', icon: '👂' },
    { name: 'Bracelets', icon: '⌚' },
    { name: 'Bangles', icon: '⭕' },
    { name: 'Pendants', icon: '💎' },
  ]

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

  const scrollToFooter = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
    setMobileMenuOpen(false)
  }

  const handleCategoryClick = (category) => {
    navigate(`/collections?category=${category.toLowerCase()}`)
    setCategoriesOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-card border-b border-dark-border">
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

          {/* Navigation Buttons - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gold transition-colors font-medium">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="hover:text-gold transition-colors font-medium flex items-center gap-1"
              >
                Categories
                <ChevronDown size={16} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Categories Dropdown */}
              {categoriesOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setCategoriesOpen(false)}
                  ></div>
                  <div className="absolute top-full mt-2 left-0 bg-dark-card border border-dark-border rounded-lg shadow-lg py-2 min-w-[200px] z-20">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                        className="w-full text-left px-4 py-2 hover:bg-dark-elevated hover:text-gold transition-colors flex items-center gap-3"
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={scrollToFooter}
              className="hover:text-gold transition-colors font-medium"
            >
              About
            </button>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-elevated border-t border-dark-border p-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-dark-card border border-dark-border rounded-full px-4 py-2 text-gray-100 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Navigation */}
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-gold font-medium"
              >
                Home
              </Link>
            </li>
            
            {/* Categories in Mobile */}
            <li>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="w-full text-left hover:text-gold font-medium flex items-center justify-between"
              >
                Categories
                <ChevronDown size={16} className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {categoriesOpen && (
                <ul className="mt-2 ml-4 space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className="w-full text-left py-2 hover:text-gold text-sm flex items-center gap-2"
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={scrollToFooter}
                className="block hover:text-gold font-medium"
              >
                About
              </button>
            </li>

            {/* Mobile Auth */}
            {isAuthenticated ? (
              <>
                <li className="text-sm text-gray-300 pt-2 border-t border-dark-border">
                  Hello, {user?.name}
                </li>
                <li>
                  <button 
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block hover:text-gold text-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="pt-2 border-t border-dark-border">
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-gold"
                >
                  Login / Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header