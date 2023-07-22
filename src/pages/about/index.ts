import { Connect } from '../../services/Store/index.ts';
import About from './about.ts';

export default Connect(About, (state: { user: unknown; }) => state.user);
