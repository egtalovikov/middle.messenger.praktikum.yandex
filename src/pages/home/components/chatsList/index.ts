import { Connect } from "../../../../services/Store";
import ChatsList from "./chatsList";

export default Connect(ChatsList, state => ({chats: state.chats}));