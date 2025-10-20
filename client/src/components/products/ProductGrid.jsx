import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-dark-card rounded-lg overflow-hidden border border-dark-border animate-pulse">
            <div className="aspect-square bg-dark-elevated"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-dark-elevated rounded w-1/3"></div>
              <div className="h-5 bg-dark-elevated rounded w-3/4"></div>
              <div className="h-4 bg-dark-elevated rounded w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-dark-elevated rounded w-1/4"></div>
                <div className="h-10 w-10 bg-dark-elevated rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
