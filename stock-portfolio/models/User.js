const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cash: {
    type: Number,
    required: true,
    default: 5000
  },
  portfolio: {
    type: Number
  },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stocks', default: [] }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
