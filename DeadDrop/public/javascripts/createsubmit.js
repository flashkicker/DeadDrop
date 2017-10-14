function createSubmit() {
  var errmsg = "<p>Geolocation is not supported by your browser. You will not be able to create messages.</p>"
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
    err.innerHTML = errmsg;
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function getTimestamp() {
  return Date.now();
}