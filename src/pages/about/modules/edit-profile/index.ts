import { Connect } from "../../../../services/Store";
import EditProfile from "./edit-profile";

export default Connect(EditProfile, (state: { user: any; }) => state.user);
