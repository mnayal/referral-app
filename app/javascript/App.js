import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthProvider from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnAuthenticatedRoute from "./routes/UnAuthenticatedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <UnAuthenticatedRoute exact path="/signin">
              <SignIn />
            </UnAuthenticatedRoute>
            <UnAuthenticatedRoute exact path="/signup">
              <SignUp />
            </UnAuthenticatedRoute>
            <AuthenticatedRoute path={["/"]}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/invitations" />
                </Route>
                <Route path="/invitations" exact>
                  <HomePage />
                </Route>
              </Switch>
            </AuthenticatedRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
