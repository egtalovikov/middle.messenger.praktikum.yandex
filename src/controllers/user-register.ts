import RegisterAPI from "../pages/home/modules/register/register.api";
import { router } from "..";
import validateRegisterFields from "../utils/validateRegisterFields";
import prepareDataToRequest from "../utils/prepareDataToRequest";
import { validateRules } from "../utils/validateRules";

const registerApi = new RegisterAPI();
const userRegisterValidator = validateRegisterFields(validateRules);

export default class UserRegisterController {
    public async register(data: RegisterFormModel) {
          try {
  
              const validateData = userRegisterValidator(data);
  
              if (!validateData.isCorrect) {
                  throw new Error("Данные не валидны");
              }
          
              registerApi.create(prepareDataToRequest(data));
  
              router.go('/messenger');
  
          } catch (error) {
            console.log(error);
      }
    }
  } 
  