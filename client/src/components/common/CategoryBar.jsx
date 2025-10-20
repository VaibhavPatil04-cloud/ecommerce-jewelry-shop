import React from 'react'
import { Link } from 'react-router-dom'

const CategoryBar = () => {
  const categories = [
    { name: 'Rings', icon: '💍' },
    { name: 'Necklaces', icon: '📿' },
    { name: 'Earrings', icon: '👂' },
    { name: 'Bracelets', icon: '⌚' },
    { name: 'Bangles', icon: '⭕' },
    { name: 'Pendants', icon: '💎' },
  ]

  return (
    <div className="bg-dark-elevated border-b border-dark-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/collections?category=${category.name.toLowerCase()}`}
              className="flex flex-col items-center gap-2 min-w-[80px] hover:text-gold transition-colors group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryBar
