import changeAvatarAPI from "../pages/about/components/changeAvatarPopup/changeAvatar.api";
import { Actions } from "../services/Store";

const changeAvatarApi = new changeAvatarAPI();

export default class UserChangeAvatarController {
    public async changeAvatar(data: FormData) {
        try {
            const { avatar } = await changeAvatarApi.update(data);
            Actions.setAvatar(avatar);
        } catch (error) {
            console.log(error);
        }
    }
} 
