/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import ManageUserPopupAPI from '../modules/chats/components/manageUserPopup/manageUserPopup.api.ts';
import { setPopupText } from '../services/Store/Actions.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';

const manageUserPopupApi = new ManageUserPopupAPI();

export default class ManageUserController {
  public async addUser(data: { users: number[]; chatId: unknown; }) {
    try {
      await manageUserPopupApi.update(prepareDataToRequest(data))
        .then((x) => {
          if (x.status === 200) {
            setPopupText('Успешно');
          } else {
            setPopupText('Ошибка');
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteUser(data: { users: number[]; chatId: unknown; }) {
    try {
      await manageUserPopupApi.delete(prepareDataToRequest(data))
        .then((x) => {
          if (x.status === 200) {
            setPopupText('Успешно');
          } else {
            setPopupText('Ошибка');
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
}
