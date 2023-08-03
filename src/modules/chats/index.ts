import { Connect } from '../../services/Store/index.ts';
import Chats from './chats.ts';

export default Connect(Chats, (state:
    { user: unknown; messages: unknown; sockets: unknown; }) => (
  { user: state.user, messages: state.messages, sockets: state.sockets }));
