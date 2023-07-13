import UserAPI from '../api/user-api.ts';
import store from '../services/Store/index.ts';
import prepareDataToRequest from '../utils/prepareDataToRequest.ts';

const userApi = new UserAPI();

export default class UserUpdateInfoController {
  // eslint-disable-next-line class-methods-use-this
  public async updateInfo(data: {[key: string]: string;}) {
    try {
      const user = await userApi.update(prepareDataToRequest(data));
      store.set('user', user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
