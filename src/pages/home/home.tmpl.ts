import tmpl from "./home.hbs";
import styles from "./home.module.scss";
import avatar from "../../../static/mock-avatar.svg";
import chats from "../../modules/chats";

export const home = () => {
  const context = {
    styles,
    chatsList: [
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
      {
        name: "Андрей",
        avatar,
        message: "Изображение",
        count: 2,
        time: "10:49"
      },
    ],
    chats
  };

  return tmpl(context);
};
