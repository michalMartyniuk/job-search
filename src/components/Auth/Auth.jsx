import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { setAccountType } from "../../store/auth/authActions";
import MDSignUp from "./MDSignUp";
import MDLogIn from "./MDLogIn";

const useStyles = makeStyles(() => ({
  authContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    marginTop: 0
  }
}));

const AuthRoot = styled.div`
  display: flex;
  flex-direction: column;
`;
const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin: 50px 0;
  text-align: center;
`;
const FormContainer = styled.div`
  display: flex;
`;
const AuthContent = ({ name, accountTypeFunc }) => {
  React.useEffect(() => {
    accountTypeFunc();
  }, []);
  return (
    <AuthRoot>
      <Heading>{name}</Heading>
      <FormContainer>
        <MDLogIn />
        <MDSignUp />
      </FormContainer>
    </AuthRoot>
  );
};

function Auth({ setAccountType }) {
  const classes = useStyles();
  return (
    <div className={classes.authContainer}>
      <Switch>
        <Route path="/auth/employer">
          <AuthContent
            name="Strefa pracodawcy"
            accountTypeFunc={() => setAccountType("employer")}
          />
        </Route>
        <Route path="/auth/employee">
          <AuthContent
            name="Strefa pracownika"
            accountTypeFunc={() => setAccountType("employee")}
          />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  setAccountType: accountType => dispatch(setAccountType(accountType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
