import changePasswordAPI from "../pages/about/modules/change-password/change-password.api";
import prepareDataToRequest from "../utils/prepareDataToRequest";

const changePasswordApi = new changePasswordAPI();

export default class UserChangePasswordController {
    public async changePassword(data: UpdatePasswordFormModel) {
        try {
            await changePasswordApi.update(prepareDataToRequest(data));
        } catch (error) {
            console.log(error);
        }
    }
} 
