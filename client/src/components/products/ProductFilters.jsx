import React, { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

const ProductFilters = ({ onFilterChange, onClose }) => {
  const [filters, setFilters] = useState({
    category: '',
    metalType: '',
    priceRange: '',
  })

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants']
  const metalTypes = ['Gold', 'Silver', 'Platinum', 'Rose Gold']
  const priceRanges = [
    { label: 'Under ₹25,000', value: '0-25000' },
    { label: '₹25,000 - ₹50,000', value: '25000-50000' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: 'Above ₹1,00,000', value: '100000-999999' },
  ]

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setFilters({ category: '', metalType: '', priceRange: '' })
    onFilterChange({ category: '', metalType: '', priceRange: '' })
  }

  return (
    <div className="bg-dark-card rounded-lg border border-dark-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-gold" />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        <button onClick={onClose} className="md:hidden">
          <X size={20} />
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => handleFilterChange('category', category)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Metal Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Metal Type</h4>
        <div className="space-y-2">
          {metalTypes.map((metal) => (
            <label key={metal} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="metalType"
                checked={filters.metalType === metal}
                onChange={() => handleFilterChange('metalType', metal)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-300">{metal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range.value}
                onChange={() => handleFilterChange('priceRange', range.value)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-300">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full border border-gold text-gold hover:bg-gold hover:text-dark-bg py-2 rounded-lg transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  )
}

export default ProductFilters
