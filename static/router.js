import main from "../src/layout/main";
import chats from "../src/modules/chats";
import about from "../src/pages/about";
import changePassword from "../src/pages/about/modules/change-password";
import editProfile from "../src/pages/about/modules/edit-profile";
import home from "../src/pages/home";
import login from "../src/pages/home/modules/login";
import register from "../src/pages/home/modules/register";
import internalServerError from "../src/pages/internal-server-error";
import notFound from "../src/pages/not-found";

const root = document.getElementById("root");

const routes = [
  {
    path: '/',
    data: main(home)
  },
  {
    path: '/signin',
    data: main(login)
  },
  {
    path: '/signup',
    data: main(register)
  },
  {
    path: '/chats',
    data: main(chats)
  },
  {
    path: '/about',
    data: main(about)
  },
  {
    path: '/edit-profile',
    data: main(editProfile)
  },
  {
    path: '/change-password',
    data: main(changePassword)
  },
  {
    path: '/not-found',
    data: main(notFound)
  },
  {
    path: '/internal-server-error',
    data: main(internalServerError)
  },
 ];

 function router(event) {
  event.preventDefault();
  history.pushState({}, 'newUrl', event.target.href);
  let route = routes.find(route => route.path ==  window.location.pathname);
  root.innerHTML = route.data;
}

window.addEventListener('popstate', function() {
  let data = routes.find(route => route.path == window.location.pathname);
  root.innerHTML = data.data;
});

window.addEventListener('DOMContentLoaded', function() {
  let route = routes.find(route => route.path == window.location.pathname);
  root.innerHTML = route.data;
});
