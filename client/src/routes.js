import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mints from "./pages/Mints";

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/mints", component: Mints, exact: true },
  { path: "/login", component: Login, open: true },
  { path: "/register", component: Register, open: true },
];

export default routes;
