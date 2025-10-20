import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import { productAPI } from '../services/api'

const Collections = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    fetchProducts()
  }, [searchParams, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const category = searchParams.get('category')
      const search = searchParams.get('search')

      let response
      if (search) {
        response = await productAPI.searchProducts(search)
      } else if (category) {
        response = await productAPI.getByCategory(category)
      } else {
        response = await productAPI.getAllProducts({ sort: sortBy })
      }

      setProducts(response.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = async (filters) => {
    setLoading(true)
    try {
      const response = await productAPI.filterProducts(filters)
      setProducts(response.data.products || [])
    } catch (error) {
      console.error('Error applying filters:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Jewelry Collections</h1>
        <p className="text-gray-400">Explore our exquisite range of handcrafted jewelry</p>
      </div>

      {/* Filters & Sort Bar */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-dark-card border border-dark-border px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>

        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-dark-card border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <ProductFilters 
            onFilterChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
          />
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <p className="text-gray-400 mb-4">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default Collections
