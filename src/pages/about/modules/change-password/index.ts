import { Connect } from '../../../../services/Store/index.ts';
import ChangePassword from './change-password.ts';

export default Connect(ChangePassword, (state: { user: any; }) => state.user);
