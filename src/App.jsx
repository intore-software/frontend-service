import * as React from "react";
import "./styles/output.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./views/auth/Login";
import ForgotPassword from "./views/auth/ForgotPassword";
import PageNotFound from "./views/page-not-found";
import LogoutPage from "./views/auth/LogoutPage";
import CheckEmail from "./views/auth/CheckEmail";
import EnterCode from "./views/auth/EnterCode";
import CreatePassword from "./views/auth/CreatePassword"
import VerifyEmail from "./views/auth/VerifyEmail"
import { clearMessage } from "./actions/auth/MessageAction";
import Dashboard from "./views/shared/Dashboard";
import AdminMayorsPage from "./views/admin/AdminMayorsPage";
import AdminSystemOperatorsPage from "./views/admin/AdminSystemOperatorsPage";
import MayorMembersPage from "./views/mayor/MayorMembersPage";
import AdminMembersPage from "./views/admin/AdminMembersPage";
import SystemOperatorMembersPage from "./views/system-operator/SystemOperatorMembersPage";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

function PublicRoute({ children, ...rest }) {
  if (!sessionStorage.getItem("token")) {
    localStorage.removeItem("user");
  }
  return (
    <Route
      {...rest}
      render={() => {
        return !sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    />
  );
}

export default function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(clearMessage());
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/">
          <Redirect to="/login"/>
        </PublicRoute>
        {/* Login */}
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        {/* Logout */}
        <Route exact path="/logout">
          <LogoutPage />
        </Route>
        {/* forgot password  */}
        <PublicRoute exact path="/reset-password">
          <ForgotPassword />
        </PublicRoute>
        {/* verify your email */}
        <PublicRoute exact path="/check-email">
          <CheckEmail />
        </PublicRoute>
        {/* create new password  */}
        <PublicRoute exact path="/new-password">
          <CreatePassword />
        </PublicRoute>
        {/* enter code page  */}
        <PublicRoute exact path="/code">
          <EnterCode />
        </PublicRoute>
        {/* verify email page  */}
        <PublicRoute exact path="/verify-email">
          <VerifyEmail />
        </PublicRoute>

        {/* Private Routes */}
        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        {/* Admin Routes */}
        <PrivateRoute exact path="/admin/system-operators">
          <AdminSystemOperatorsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/mayors">
          <AdminMayorsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/members">
          <AdminMembersPage />
        </PrivateRoute>

        {/* Mayor Routes */}
        <PrivateRoute exact path="/mayor/members">
          <MayorMembersPage />
        </PrivateRoute>

        {/* System Operator Routes */}
            <PrivateRoute exact path="/system-operator/members">
          <SystemOperatorMembersPage />
        </PrivateRoute>
        {/* 404 */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
