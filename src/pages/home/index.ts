import { Connect } from "../../services/Store";
import Home from "./home";

export default Connect(Home, state => state.chats);