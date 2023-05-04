import { default as renderDOM } from './utils/render';
import IndexLayout from './layout/index';
import Home from './pages/home';
import Login from './pages/home/modules/login';
import Register from './pages/home/modules/register';
import About from './pages/about';
import ChangePassword from './pages/about/modules/change-password';
import EditProfile from './pages/about/modules/edit-profile';
import InternalServerError from './pages/internal-server-error';
import NotFound from './pages/not-found';

const content = location.pathname === '/' ? new Home
: location.pathname === '/signin' ? new Login
: location.pathname === '/signup' ? new Register
: location.pathname === '/about' ? new About
: location.pathname === '/change-password' ? new ChangePassword
: location.pathname === '/edit-profile' ? new EditProfile
: location.pathname === '/internal-server-error' ? new InternalServerError
: new NotFound;

const page = new IndexLayout(
    'main',
    {
        content: content
    }
);

renderDOM('.app', page);
