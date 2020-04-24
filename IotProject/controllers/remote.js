const cmd = require('node-cmd'); 
let oldCode =  true;
let newCode = true;
let oldSwing =  true;
let newSwing = true;
let isWorking = false;
let isSwing = false;

exports.index = function(req,res,next)
{   
    const {code} = req.body;
    newCode= req.body.code.power;
    newSwing = req.body.code.swingOne;
    if(oldCode == newCode &&  false == oldCode) 
    	isWorking = true;
    else
    	isWorking = false;
    if(oldSwing != newSwing) 
    	isSwing = true;
    else 
    	isSwing = false;
    oldCode = req.body.code.power;
    oldSwing = req.body.code.swingOne;
    // console.log('Working:  ' + isWorking);
    // console.log('Swing:  ' + isSwing);
    //console.log('Signal: ' + JSON.stringify(req.body.code));
    makeCharCode(code,isWorking,isSwing).then((code)=>{
      console.log(code);
    });
    res.json('OK');

}
const  makeCharCode = (code,isWorking,isSwing) => new Promise(function(resolve, reject) {
 const codeRemote = charCode(code,isWorking,isSwing);
 resolve(codeRemote);

});
const charCode = (code,isWorking,isSwing) => {

	let codeRemote = '';
	if( false == code.power && false == isWorking)  return 'AC_ON';
    if (true == code.power) return 'AC_OFF';
    if(true == isSwing &&  false == code.swingOne)  return 'SWING_ON';
    if(true == isSwing &&  true == code.swingOne)  return 'SWING_OFF';
    if(0 == code.mode) codeRemote +='AC_';
    if(1 == code.mode) codeRemote +='HEAT_';
    if(2 == code.mode) codeRemote +='DEHUM_';
    if(1 == code.fan) codeRemote +='LOW';
    if(2 == code.fan) codeRemote +='MID'
    if(3 == code.fan) codeRemote +='HIGH';
    if(4 == code.fan) codeRemote +='CHAOS';
    if(2 == code.mode) return codeRemote;
    codeRemote += '_' + code.temp;
    return codeRemote;
}
function sendSignal(command,file)
{  
	 
	cmd.run('sudo /etc/init.d/lircd stop');  
	cmd.run('sudo cp' +' ' + file +' ' + '/etc/lirc/lircd.conf');  
	cmd.run('sudo /etc/init.d/lircd start');  
	setTimeout(function(){
    console.log("Command sent");
    cmd.run('irsend SEND_ONCE LG_AC' +command);}, 500);  
}
