import { Connect } from '../../services/Store/index.ts';
import Home from './home.ts';

export default Connect(Home, (state: { chats: unknown; }) => state.chats);
