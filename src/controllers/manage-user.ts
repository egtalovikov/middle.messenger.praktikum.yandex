import AddUserPopupAPI from "../modules/chats/components/manageUserPopup/manageUserPopup.api";
import prepareDataToRequest from "../utils/prepareDataToRequest";

const manageUserPopupApi = new AddUserPopupAPI();

export default class ManageUserController {
    public async addUser(data: { users: number[]; chatId: any; }) {
        try {
            await manageUserPopupApi.update(prepareDataToRequest(data));
        } catch (error) {
            console.log(error);
        }
    }
    public async deleteUser(data: { users: number[]; chatId: any; }) {
        try {
            await manageUserPopupApi.delete(prepareDataToRequest(data));
        } catch (error) {
            console.log(error);
        }
    }
} 
