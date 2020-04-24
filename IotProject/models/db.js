const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.connection;
exports.on = function()
{
try
{
  mongoose.connect("mongodb://localhost:27017/Sensor",{useNewUrlParser: true});	
}
catch(e)
{
    console.log(e);
}
};
exports.off = function()
{
	connection.close();
}
