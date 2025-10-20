// Save this as: client/src/pages/CustomDesign.jsx
import React, { useState } from 'react'
import { Sparkles, Upload, CheckCircle, Clock, Palette, MessageSquare } from 'lucide-react'

const CustomDesign = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Rings',
    metalType: 'Gold',
    budget: '',
    description: '',
    inspirationImages: []
  })
  const [submitted, setSubmitted] = useState(false)

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants', 'Custom Sets']
  const metalTypes = ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold']
  const budgetRanges = [
    'Under ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,00,000',
    '₹2,00,000 - ₹5,00,000',
    'Above ₹5,00,000'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Custom design request:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
          <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for your custom design request. Our expert designers will review your requirements 
            and contact you within 24-48 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gold hover:bg-gold-dark text-dark-bg font-medium px-8 py-3 rounded-lg"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gold-dark to-gold py-20">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="mx-auto text-dark-bg mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark-bg mb-4">
            Create Your Dream Jewelry
          </h1>
          <p className="text-dark-bg/80 text-lg max-w-2xl mx-auto">
            Bring your vision to life with our expert craftsmen. From concept to creation, 
            we'll design a unique piece that tells your story.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-dark-elevated">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gold text-dark-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Share Your Vision</h3>
              <p className="text-gray-400 text-sm">
                Tell us about your dream piece, style preferences, and budget
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-dark-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Design Consultation</h3>
              <p className="text-gray-400 text-sm">
                Our designers create sketches and 3D renderings for your approval
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-dark-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Expert Crafting</h3>
              <p className="text-gray-400 text-sm">
                Master artisans bring your design to life with precision
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-dark-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Delivery & Care</h3>
              <p className="text-gray-400 text-sm">
                Receive your unique piece with certification and care guide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-dark-card border border-dark-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Custom Design Request Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Design Preferences */}
              <div className="border-t border-dark-border pt-6 mt-6">
                <h3 className="text-lg font-bold mb-4">Design Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Metal *</label>
                    <select
                      name="metalType"
                      value={formData.metalType}
                      onChange={handleChange}
                      className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    >
                      {metalTypes.map(metal => (
                        <option key={metal} value={metal}>{metal}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Budget Range *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                  >
                    <option value="">Select your budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Design Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-dark-elevated border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold"
                    placeholder="Describe your vision in detail... Include any specific design elements, stones, engravings, or inspiration you have in mind."
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div className="border-t border-dark-border pt-6">
                <h3 className="text-lg font-bold mb-4">Inspiration Images (Optional)</h3>
                <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-gold transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                  <p className="text-gray-400 mb-2">Upload reference images, sketches, or inspiration photos</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="inline-block mt-4 bg-dark-elevated hover:bg-dark-border text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Choose Files
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-dark-bg font-medium py-4 rounded-lg transition-colors text-lg"
              >
                Submit Design Request
              </button>

              <p className="text-center text-sm text-gray-400">
                By submitting this form, you agree to be contacted by our design team regarding your custom jewelry request.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-dark-elevated">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Custom Design?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Palette className="mx-auto text-gold mb-4" size={48} />
              <h3 className="font-bold mb-2">Unique & Personal</h3>
              <p className="text-gray-400 text-sm">
                Create a one-of-a-kind piece that reflects your personality and style
              </p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto text-gold mb-4" size={48} />
              <h3 className="font-bold mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-400 text-sm">
                25+ years of experience in creating exceptional custom jewelry
              </p>
            </div>
            <div className="text-center">
              <MessageSquare className="mx-auto text-gold mb-4" size={48} />
              <h3 className="font-bold mb-2">Collaborative Process</h3>
              <p className="text-gray-400 text-sm">
                Work directly with designers to perfect every detail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Previous Custom Creations</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            See some of the beautiful custom pieces we've created for our clients
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-dark-elevated rounded-lg overflow-hidden group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-gold/20 to-accent-purple/20 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                  <Sparkles className="text-gold opacity-50" size={48} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomDesign