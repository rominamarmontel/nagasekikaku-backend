const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      qty: {
        type: Number,
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
  },
  purchaseDate: {
    type: Date,
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    default: 0.0,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
})

const Order = model('Order', orderSchema)

module.exports = Order
