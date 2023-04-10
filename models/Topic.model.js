const { Schema, model } = require('mongoose')

const topicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryTopic: {
      type: String,
      required: true,
      enum: ['イベント', '新商品', 'コラム'],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Topic = model('Topic', topicSchema)

module.exports = Topic
