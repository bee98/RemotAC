const Sensor = require('/home/kai/Downloads/TAH/sensor.js');
const mongoose = require('mongoose');
const connection = mongoose.connection;
let arr = [];
arr = process.argv.slice(2);
Sensor.deleteMany({},()=>{console.log('Deleted old collections');});
function sensorInf()
{
const temperature = Math.floor(Math.random() * 8) + 24;
const humidity = Math.floor(Math.random() * 50) + 40;
Sensor.create({temperature:temperature,humidity:humidity,time:new Date()});
console.log('temperature: '+ temperature + '°C\n' + 'humidity: ' + humidity + '%');
}
let timerId= setInterval(sensorInf,Number(arr[0]));
setTimeout(() => { 
clearInterval(timerId);
console.log('Bye'); 
connection.close();}
,Number(arr[0])*Number(arr[1]));
//Đây là file tạo dữ liệu ngẫu nhiên mô phỏng dữ liệu gửi về từ cảm biến của em (do em chưa mua được cảm biến) 
//em sử dụng MongoDB để lưu trữ dữ liệu file chạy nhận vao 2 tham số số mini giây tạo ra một bản ghi và số bản ghi để thử 
// mỗi lần chạy nó sinh ra như em vừa làm vừa nãy là sinh ra 560 bản ghi mỗi bản ghi mới xuất hiện trong 1,2s