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
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDay();
  // zero pad month and day
  if (month.toString().length==1) { month = '0' + month; }
  if (day.toString().length==1) { day = '0' + day; }
  return year+"-"+month+"-"+day;
}