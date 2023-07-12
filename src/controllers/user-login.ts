import { router } from "..";
import prepareDataToRequest from "../utils/prepareDataToRequest";
import LoginAPI from "../pages/home/modules/login/login.api";
import validateLoginFields from "../utils/validateLoginFields";
import { validateRules } from "../utils/validateRules";

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

export default class UserLoginController {
    public async login(data: LoginFormModel) {
          try {
  
              const validateData = userLoginValidator(data);
  
              if (!validateData.isCorrect) {
                  throw new Error("Данные не валидны");
              }
          
              const user = await loginApi.request(prepareDataToRequest(data));

              if (user.id) {
                router.go('/messenger');
              }
  
          } catch (error) {
            console.log(error);
      }
    }
  } 
