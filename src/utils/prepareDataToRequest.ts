export default function prepareDataToRequest(data: RegisterFormModel | LoginFormModel) {
    return JSON.stringify(data);
}