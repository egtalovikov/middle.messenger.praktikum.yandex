import AboutAPI from '../pages/about/about.api.ts';
import { router } from '../index.ts';

const aboutApi = new AboutAPI();

export default class UserLogoutController {
  // eslint-disable-next-line class-methods-use-this
  public async logout() {
    try {
      aboutApi.request();

      router.go('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
