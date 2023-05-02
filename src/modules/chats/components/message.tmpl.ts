import tmpl from "./message.hbs";
import styles from "./message.module.scss";
import readMarker from "../../../../static/read-marker.svg";

export const message = (messageObj) => {
  const context = {
    styles,
    message: messageObj.message,
    owner: messageObj.owner,
    time: messageObj.time,
    isRead: messageObj.isRead,
    readMarker
  };

  return tmpl(context);
};
