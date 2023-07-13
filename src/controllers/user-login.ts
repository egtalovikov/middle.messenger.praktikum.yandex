import { router } from '../index.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';
import LoginAPI from '../pages/home/modules/login/login.api.ts';
import validateLoginFields from '../utils/validateLoginFields.ts';
import { validateRules } from '../utils/validateRules.ts';

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

export default class UserLoginController {
  // eslint-disable-next-line class-methods-use-this, no-undef
  public async login(data: LoginFormModel) {
    try {
      const validateData = userLoginValidator(data);

      if (!validateData.isCorrect) {
        throw new Error('Данные не валидны');
      }

      const user = await loginApi.request(prepareDataToRequest(data));

      if (user.id) {
        router.go('/messenger');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
