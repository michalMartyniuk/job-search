import React from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import {
  setSignUpName,
  setSignUpPassword,
  setSignUpEmail,
  setSignUpState,
  authSignUp
} from "../../store/auth/authActions";

const useStyles = makeStyles(() => ({
  container: {
    width: 500,
  },
  error: {
    display: "flex"
  },
  errorText: {
    fontSize: "1.3rem",
    color: "red",
    margin: "auto"
  }
}));
const MDSignUp = props => {
  const classes = useStyles();
  const handleSignUp = event => {
    event.preventDefault();
    props.authSignUp(
      props.signUpName,
      props.signUpEmail,
      props.signUpPassword,
      props.accountType
    );
    props.setSignUpState(false);
  };
  return (
    <MDBContainer className={classes.container}>
      {props.loggedIn && <Redirect to="/profile" />}
      <MDBCard className="px-4">
        <MDBCardBody>
          <form>
            <p className="h3 text-center py-4">Rejestracja</p>
            <div className="grey-text">
              <MDBInput
                size="lg"
                label="Nazwa"
                icon="user"
                group
                type="text"
                validate
                onChange={props.setSignUpName}
                value={props.signUpName}
                error="wrong"
                success="right"
              />
              <MDBInput
                size="lg"
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                onChange={props.setSignUpEmail}
                value={props.signUpEmail}
                error="wrong"
                success="right"
              />
              <MDBInput
                size="lg"
                label="Nowe hasło"
                icon="lock"
                group
                onChange={props.setSignUpPassword}
                value={props.signUpPassword}
                type="password"
                validate
              />
            </div>
            <div className="text-center py-4 mt-3">
              <MDBBtn
                size="lg"
                color="cyan"
                type="submit"
                onClick={handleSignUp}
              >
                Zarejestruj
              </MDBBtn>
            </div>
            {props.signUpError && (
              <div className={classes.error}>
                <span className={classes.errorText}>{props.signUpError}</span>
              </div>
            )}
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  authSignUp: (name, email, password, accountType) =>
    dispatch(authSignUp(name, email, password, accountType)),
  setSignUpName: event => dispatch(setSignUpName(event.target.value)),
  setSignUpPassword: event => dispatch(setSignUpPassword(event.target.value)),
  setSignUpEmail: event => dispatch(setSignUpEmail(event.target.value)),
  setSignUpState: state => dispatch(setSignUpState(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MDSignUp);
