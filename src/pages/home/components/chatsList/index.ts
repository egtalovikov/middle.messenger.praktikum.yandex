import { Connect } from '../../../../services/Store/index.ts';
import ChatsList from './chatsList.ts';

export default Connect(ChatsList, (state: { chats: any; }) => ({ chats: state.chats }));
