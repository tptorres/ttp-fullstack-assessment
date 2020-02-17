const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  symbol: {
    type: String,
    required: true
  },
  shareAmount: {
    type: Number,
    required: true
  },
  sharePrice: {
    type: Number,
    required: true,
    default: 0
  },
  color: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('stock', StockSchema);
