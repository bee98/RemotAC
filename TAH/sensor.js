var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/Sensor",{useNewUrlParser: true});
var connection = mongoose.connection;
connection.on('errors',console.error.bind(console, 'connection error:'));
module.exports = mongoose.model('tah', new Schema({ temperature: Number, humidity: Number, time: Date}),'tah');
//Đây là file cấu hình DB của em 