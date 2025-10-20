import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import { productAPI } from '../services/api'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await productAPI.getProductById(id)
      setProduct(response.data.product)

      // Fetch related products
      if (response.data.product?.category) {
        const relatedResponse = await productAPI.getByCategory(response.data.product.category)
        setRelatedProducts(relatedResponse.data.products?.filter(p => p._id !== id).slice(0, 4) || [])
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-dark-elevated rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-dark-elevated rounded w-3/4"></div>
              <div className="h-12 bg-dark-elevated rounded w-1/2"></div>
              <div className="h-32 bg-dark-elevated rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-400">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  )
}

export default ProductPage
