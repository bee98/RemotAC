const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('tah', new Schema({temperature: Number, humidity: Number, time: Date}),'tah');
