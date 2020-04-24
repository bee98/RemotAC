function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var obj = JSON.parse(this.responseText);
     document.getElementById("demo").innerHTML = 'Time: ' + new Date(obj.time) +' \ntemperature: ' + obj.temperature + '°C\n' + 'humidity: ' + obj.humidity + '%';
    }
  };
  xhttp.open("GET", "/sensor", true);
  xhttp.send();
}
let timerId = setInterval(loadDoc,1500);