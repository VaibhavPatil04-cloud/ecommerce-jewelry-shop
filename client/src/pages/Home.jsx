import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Award, Truck } from 'lucide-react'
import Slider from 'react-slick'  // Import the Slider component
import ProductCard from '../components/products/ProductCard'
import { productAPI } from '../services/api'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const heroImages = [
    '/category-earrings.jpg',
    '/category-bracelets.jpg',
    '/hero-jewelry.jpg',
  ]

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productAPI.getAllProducts({ limit: 8, featured: true })
      setFeaturedProducts(response.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  }

  // Category data with image paths
  const categories = [
    { name: 'Rings', image: '/category-rings.jpg' },
    { name: 'Necklaces', image: '/category-necklaces.jpg' },
    { name: 'Earrings', image: '/category-earrings.jpg' },
    { name: 'Bracelets', image: '/category-bracelets.jpg' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          <Slider {...sliderSettings}>
            {heroImages.map((img, i) => (
              <div key={i} className="relative h-[600px]">
                <img
                  src={img}
                  alt={`Jewelry slide ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay - more subtle */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <p className="text-gold text-sm uppercase tracking-widest mb-4">Timeless Elegance</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover <span className="text-gold">Premium</span><br />
              Gold & Diamond<br />
              Jewelry
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Certified authenticity. Handcrafted perfection. Traditional designs with modern elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="bg-gold hover:bg-gold-dark text-dark-bg font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Shop Collection
                <ArrowRight size={20} />
              </Link>
              <a
                href="#"
                className="border border-gold text-gold hover:bg-gold hover:text-dark-bg font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Custom Design
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl z-0"></div>
      </section>

      {/* Trust Badges */}
      <section className="bg-dark-elevated py-8 border-y border-dark-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Shield className="mx-auto text-gold mb-2" size={32} />
              <p className="text-2xl font-bold text-gold mb-1">100%</p>
              <p className="text-sm text-gray-400">Certified Gold</p>
            </div>
            <div>
              <Star className="mx-auto text-gold mb-2" size={32} />
              <p className="text-2xl font-bold text-gold mb-1">25+</p>
              <p className="text-sm text-gray-400">Years Experience</p>
            </div>
            <div>
              <Award className="mx-auto text-gold mb-2" size={32} />
              <p className="text-2xl font-bold text-gold mb-1">50K+</p>
              <p className="text-sm text-gray-400">Happy Customers</p>
            </div>
            <div>
              <Truck className="mx-auto text-gold mb-2" size={32} />
              <p className="text-2xl font-bold text-gold mb-1">Free</p>
              <p className="text-sm text-gray-400">Lifetime Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/collections?category=${category.name.toLowerCase()}`}
                className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-gold/20 transition-shadow duration-300"
              >
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent z-10"></div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <span className="text-gold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-dark-elevated">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <Link to="/collections" className="text-gold hover:underline flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-dark-card rounded-lg animate-pulse">
                  <div className="aspect-square bg-dark-elevated"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-dark-elevated rounded"></div>
                    <div className="h-5 bg-dark-elevated rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
<section className="py-16 bg-gradient-to-r from-gold-dark to-gold">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-dark-bg mb-4">
      Can't Find What You're Looking For?
    </h2>
    <p className="text-dark-bg/80 text-lg mb-8 max-w-2xl mx-auto">
      Let our expert craftsmen create a custom piece just for you. From engagement rings to family heirlooms.
    </p>
    <Link
      to="/custom-design"
      className="inline-block bg-dark-bg hover:bg-dark-card text-gold font-medium px-8 py-3 rounded-lg transition-colors"
    >
      Request Custom Design
    </Link>
  </div>
</section>
    </div>
  )
}

export default Home
