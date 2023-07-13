import ChangePasswordAPI from '../pages/about/modules/change-password/change-password.api.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';

const changePasswordApi = new ChangePasswordAPI();

export default class UserChangePasswordController {
  // eslint-disable-next-line class-methods-use-this, no-undef
  public async changePassword(data: UpdatePasswordFormModel) {
    try {
      await changePasswordApi.update(prepareDataToRequest(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
