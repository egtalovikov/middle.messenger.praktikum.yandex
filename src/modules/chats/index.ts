import { Connect } from "../../services/Store";
import Chats from "./chats";

export default Connect(Chats, (state: { user: any; messages: any; sockets: any; }) => ({ user: state.user, messages: state.messages, sockets: state.sockets }));
