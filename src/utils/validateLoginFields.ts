export default function validateLoginFields(validateRules: { [key: string]: RegExp; }) {
  // eslint-disable-next-line no-undef, func-names
  return function (data: LoginFormModel) {
    let isCorrect = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (isCorrect) {
        switch (key) {
          case 'login':
            if (!validateRules.login.test(data[key])) {
              isCorrect = false;
            }
            break;
          case 'password':
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
