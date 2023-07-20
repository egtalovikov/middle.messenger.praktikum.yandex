import { Connect } from '../../../../services/Store/index.ts';
import ManageUserPopup from './manageUserPopup.ts';

export default Connect(ManageUserPopup, (state:
    { popupText: string }) => (
  { popupText: state.popupText }));
