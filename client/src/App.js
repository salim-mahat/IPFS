import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";

import "./assets/styles.scss";
import UserResolver from "./components/UserResolver";
import Layout from "./Layout";
import Navigation from "./components/Navigation";
import APIResponseHandler from "./components/APIResponseHandler";
import routes from "./routes";

function App() {
  const userData = useSelector((s) => s.userData);

  const authenticRoutes = routes.filter((route) => !route.open);
  const openRoutes = routes.filter((route) => route.open);
  const currentRoutes = userData.isLoggedIn ? authenticRoutes : openRoutes;

  return (
    <Router>
      <UserResolver>
        <Layout>
          <Navigation />
          <Layout.Body>
            <SnackbarProvider maxSnack={3}>
              <APIResponseHandler />
              <Switch>
                {currentRoutes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                ))}
                {userData.isLoggedIn && <Redirect from="/login" to="/" />}
                {!userData.isLoggedIn && <Redirect to="/login" />}
              </Switch>
            </SnackbarProvider>
          </Layout.Body>
        </Layout>
      </UserResolver>
    </Router>
  );
}

export default App;
