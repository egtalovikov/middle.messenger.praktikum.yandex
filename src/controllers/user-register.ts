import RegisterAPI from '../pages/home/modules/register/register.api.ts';
import { router } from '../index.ts';
import validateRegisterFields from '../utils/validateRegisterFields.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';
import { validateRules } from '../utils/validateRules.ts';

const registerApi = new RegisterAPI();
const userRegisterValidator = validateRegisterFields(validateRules);

export default class UserRegisterController {
  // eslint-disable-next-line class-methods-use-this, no-undef
  public async register(data: RegisterFormModel) {
    try {
      const validateData = userRegisterValidator(data);

      if (!validateData.isCorrect) {
        throw new Error('Данные не валидны');
      }

      registerApi.create(prepareDataToRequest(data));

      router.go('/messenger');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
