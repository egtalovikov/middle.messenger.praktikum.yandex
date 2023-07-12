import { Connect } from "../../services/Store";
import Home from "./home";

export default Connect(Home, (state: { chats: any; }) => state.chats);
