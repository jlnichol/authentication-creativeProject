var mongoose = require('mongoose');
var PresentSchema = new mongoose.Schema({
  name: String,
  price: Number,
  url: String
});

mongoose.model('Present', PresentSchema);