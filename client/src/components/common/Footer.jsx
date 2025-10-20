import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                <span className="text-dark-bg font-bold text-xl">PJ</span>
              </div>
              <h3 className="text-xl font-bold text-gold">Patil Jewellers</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Crafting timeless elegance since 1998. Your trusted destination for certified gold and diamond jewelry.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/collections" className="hover:text-gold">Shop All</Link></li>
              <li><Link to="/collections?category=new" className="hover:text-gold">New Arrivals</Link></li>
              <li><a href="#" className="hover:text-gold">Best Sellers</a></li>
              <li><a href="#" className="hover:text-gold">Custom Design</a></li>
              <li><a href="#" className="hover:text-gold">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-gold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-gold">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold">Track Order</a></li>
              <li><a href="#" className="hover:text-gold">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-gold">Certifications</a></li>
              <li><a href="#" className="hover:text-gold">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 MG Road, Pune, Maharashtra 411001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@patiljewellers.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 Patil Jewellers. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Service</a>
            <a href="#" className="hover:text-gold">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
