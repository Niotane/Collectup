const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: String,
  dateListed: { type: Date, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  category: { type: String, required: true },
  city: { type: String, required: true },
  image: String,
  isCollected: { type: Boolean, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
