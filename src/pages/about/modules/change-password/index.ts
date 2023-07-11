import { Connect } from "../../../../services/Store";
import ChangePassword from "./change-password";

export default Connect(ChangePassword, (state: { user: any; }) => state.user);
