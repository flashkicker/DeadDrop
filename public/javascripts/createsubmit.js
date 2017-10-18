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
    err.innerHTML = errmsg;``
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function getTimestamp() {
  var now = new Date();
  var year = zeroPad(now.getUTCFullYear());
  var month = zeroPad(now.getUTCMonth()+1);
  var day = zeroPad(now.getUTCDate());
  var hours = zeroPad(now.getUTCHours());
  var mins = zeroPad(now.getUTCMinutes());
  var seconds = zeroPad(now.getUTCSeconds());
  var timestamp = year+"-"+month+"-"+day+" "+hours+":"+mins+":"+seconds;
  return timestamp;
}

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

module.exports = {
  getTimestamp: getTimestamp,
  createSubmit: createSubmit
}