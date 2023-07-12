export default function validateLoginFields(validateRules: { [key: string]: RegExp; }) {
    return function (data: LoginFormModel) {
        let isCorrect = true;
        for (var key in data) {
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
                }
            }
        }
        return { isCorrect };
    }
}
