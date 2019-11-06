let mongoose = require('mongoose');
let urlSchema = mongoose.Schema({
  originURL: {type: String},
  shortURLId: {type: String},
  timeStamp: {type: Date, default: Date.now }
});
module.exports = mongoose.model('ShortURL', urlSchema)
