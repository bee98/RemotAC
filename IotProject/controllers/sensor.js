const mongoose = require('mongoose');
const Sensor = require('../models/sensor');
let database = require("../models/db");
exports.index = function(req,res,next)
{   
    database.on();
	Sensor.findOne().sort({ time: -1 }).limit(1).exec(function(err, post) {  
    database.off();
    res.json(post);


});
}