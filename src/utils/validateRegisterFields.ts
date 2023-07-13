export default function validateRegisterFields(validateRules: { [x: string]: RegExp; }) {
  // eslint-disable-next-line no-undef, func-names
  return function (data: RegisterFormModel) {
    let isCorrect = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (isCorrect) {
        switch (key) {
          case 'email':
            if (!validateRules.email.test(data[key])) {
              isCorrect = false;
            }
            break;
          case 'login':
            if (!validateRules.login.test(data[key])) {
              isCorrect = false;
            }
            break;
          case 'first_name':
            if (!validateRules.first_name.test(data[key])) {
              isCorrect = false;
            }
            break;
          case 'second_name':
            if (!validateRules.second_name.test(data[key])) {
              isCorrect = false;
            }
            break;
          case 'phone':
            if (!validateRules.phone.test(data[key])) {
              isCorrect = false;
            }
            break;
          case 'password':
          case 'confirm_password':
            if (!validateRules.password.test(data[key])) {
              isCorrect = false;
            }
            break;
          default: break;
        }
      }
    }
    return { isCorrect };
  };
}
