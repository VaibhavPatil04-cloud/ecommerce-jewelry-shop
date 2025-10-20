import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bangles', 'Pendants', 'Sets'],
    },
    subCategory: {
      type: String,
    },
    metalType: {
      type: String,
      required: [true, 'Metal type is required'],
      enum: ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'],
    },
    purity: {
      type: String,
      required: [true, 'Purity is required'],
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
    },
    images: [{
      type: String,
    }],
    specifications: {
      grossWeight: Number,
      netWeight: Number,
      stoneDetails: String,
      dimensions: String,
    },
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
)

// Index for search
productSchema.index({ name: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)
