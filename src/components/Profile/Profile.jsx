import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EmployeeProfile from "./Employee/EmployeeProfile";
import EmployerProfile from "./Employer/EmployerProfile";

function Profile({ user }) {
  switch (user.accountType) {
    case "employee":
      return <EmployeeProfile />;
    case "employer":
      return <EmployerProfile />;
    default:
      return <Redirect to="/" />;
  }
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });

export default connect(mapStateToProps, null)(Profile);
