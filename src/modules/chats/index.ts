import { Connect } from '../../services/Store/index.ts';
import Chats from './chats.ts';

export default Connect(Chats, (state:
    { user: any; messages: any; sockets: any; }) => (
  { user: state.user, messages: state.messages, sockets: state.sockets }));
