import { Connect } from "../../services/Store";
import Chats from "./chats";

export default Connect(Chats, state => ({ user: state.user }));