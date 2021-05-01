import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import Home from "./containers/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterInstitution from "./containers/RegisterInstitution";
import AwardCertificate from "./containers/AwardCertificate";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <RegisterInstitution />
          </Route>
          <Route path="/award">
            <AwardCertificate />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
