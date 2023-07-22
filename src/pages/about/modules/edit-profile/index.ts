import { Connect } from '../../../../services/Store/index.ts';
import EditProfile from './edit-profile.ts';

export default Connect(EditProfile, (state: { user: unknown; }) => state.user);
