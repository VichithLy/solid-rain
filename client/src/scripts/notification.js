import meteoriteImg from "../assets/logo.png";

export default {
  requestNotifPerm() {
    return Notification.requestPermission();
  },
  createNotif(title, msg) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: msg,
        icon: meteoriteImg,
      });
    } else {
      this.requestNotifPerm().then((res) => {
        console.log(res);
      });
    }
  },
};
