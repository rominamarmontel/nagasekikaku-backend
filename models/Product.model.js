const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      default: 'no-brand',
    },
    category: {
      type: String,
      required: true,
      enum: ['Furniture', 'Table-ware', 'Art & Decoration', 'Etc'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = model('Product', productSchema)

module.exports = Product
