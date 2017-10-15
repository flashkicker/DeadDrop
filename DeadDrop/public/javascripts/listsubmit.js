function listSubmit() {
  var status = document.getElementById("status");
  status.innerHTML = "Getting your location...";
  var errmsg = "<p>Geolocation is not supported by your browser. Nearby messages cannot be shown.</p>"
  var err = document.getElementById("error");
  var latdest = document.getElementById("list-latitude");
  var longdest = document.getElementById("list-longitude");
  if (!navigator.geolocation){
    err.innerHTML = errmsg;
    return;
  }
  function success(position) {
    latdest.value = position.coords.latitude;
    longdest.value = position.coords.longitude;
    document.getElementById("list").submit();
  }
  function error() {
    err.innerHTML = errmsg;
  }
  navigator.geolocation.getCurrentPosition(success, error);
}