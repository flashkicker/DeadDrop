function createSubmit() {
  clearStatus();
  getTimestamp();
  var status = document.getElementById("working");
  status.innerHTML = "Getting your location...";  
  var errmsg = "Geolocation is not supported by your browser. You will not be able to create messages.";
  var err = document.getElementById("error");
  var latdest = document.getElementById("create-latitude");
  var longdest = document.getElementById("create-longitude");
  var timedest = document.getElementById("create-timestamp");
  if (!navigator.geolocation){
    err.innerHTML = errmsg;
    return;
  }
  function success(position) {
    latdest.value = position.coords.latitude;
    longdest.value = position.coords.longitude;
    timedest.value = getTimestamp();
    document.getElementById("create").submit();
  }
  function error() {
    clearStatus();
    err.innerHTML = errmsg;
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function getTimestamp() {
  var now = new Date();
  var year = zeroPad(now.getFullYear());
  var month = zeroPad(now.getMonth());
  var day = zeroPad(now.getDay());
  var hours = zeroPad(now.getHours());
  var mins = zeroPad(now.getMinutes());
  var seconds = zeroPad(now.getSeconds());
  return year+"-"+month+"-"+day+" "+hours+":"+mins+":"+seconds;
}

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}