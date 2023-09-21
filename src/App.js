import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import {
  StylesProvider,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import MainComponent from "./pages/main";
import NotificationMessage from "./components/common/NotificationMessage";
import { useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Layout from "./pages/main";
const theme = createTheme({});

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Layout} />
          </Switch>
          <NotificationMessage></NotificationMessage>
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
