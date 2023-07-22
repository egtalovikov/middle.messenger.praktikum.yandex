import { Connect } from '../../../../services/Store/index.ts';
import ChatsList from './chatsList.ts';

export default Connect(ChatsList, (state: { chats: unknown; }) => ({ chats: state.chats }));
