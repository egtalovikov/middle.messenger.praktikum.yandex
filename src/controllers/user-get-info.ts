import UserAPI from '../api/user-api.ts';
import { Actions } from '../services/Store/index.ts';

const userApi = new UserAPI();

export default class UserGetInfoController {
  // eslint-disable-next-line class-methods-use-this
  public async getInfo() {
    try {
      await userApi.request()
        .then((user) => Actions.setUser(user));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
