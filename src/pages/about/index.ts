import { Connect } from "../../services/Store";
import About from "./about";

export default Connect(About, (state: { user: any; }) => state.user);
