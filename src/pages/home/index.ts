import Block from "../../services/Block";
import tpl from "./tpl";
import styles from "./home.module.scss";
import avatar from "../../../static/mock-avatar.svg";
import Chats from "../../modules/chats";
import Form from "../../components/form";

const form = new Form({formClassName: styles.form, inputs: [`<input class=${styles.input} placeholder="Поиск" />`]})

export default class Home extends Block {
  constructor() {
    super('section', {
      Chats: new Chats(),
      styles,
      attr: {
        class: styles.home
      },
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
      form
    });
  }

    render() {
        return this.compile(tpl, {...this._props, form: this._children.form});
    }
}
