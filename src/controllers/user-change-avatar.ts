import ChangeAvatarAPI from '../pages/about/components/changeAvatarPopup/changeAvatar.api.ts';
import { Actions } from '../services/Store/index.ts';

const changeAvatarApi = new ChangeAvatarAPI();

export default class UserChangeAvatarController {
  // eslint-disable-next-line class-methods-use-this
  public async changeAvatar(data: FormData) {
    try {
      const { avatar } = await changeAvatarApi.update(data);
      Actions.setAvatar(avatar);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
