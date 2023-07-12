export const validateRules = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    login: /^[a-zA-Z0-9_-]{3,20}$/,
    first_name: /^[А-ЯЁA-Z][а-яёa-z\-]*$/,
    second_name: /^[А-ЯЁA-Z][а-яёa-z\-]*$/,
    phone: /^\+?[0-9]{10,15}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/
}
