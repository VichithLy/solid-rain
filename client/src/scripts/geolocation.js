export default {
  handleError(error) {
    const { code } = error;
    let msg = null;
    switch (code) {
      case error.TIMEOUT:
        msg = "The request to get user location timed out.";
        break;
      case error.PERMISSION_DENIED:
        msg = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        msg = "Location information is unavailable.";
        break;
    }
    alert(msg);
  },
  options: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  },
  stopWatchCurrentPos(watchId) {
    navigator.geolocation.clearWatch(watchId);
  },
};
