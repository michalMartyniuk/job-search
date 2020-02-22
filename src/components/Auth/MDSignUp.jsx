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
    width: 500
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

function MDSignUp({
  signUpName,
  signUpEmail,
  signUpPassword,
  signUpError,
  accountType,
  setSignUpName,
  setSignUpEmail,
  setSignUpPassword,
  setSignUpState,
  authSignUp,
  loggedIn
}) {
  const classes = useStyles();
  const signUp = () => {
    authSignUp(signUpName, signUpEmail, signUpPassword, accountType);
    setSignUpState(false);
  };
  const handleSignUp = event => {
    event.preventDefault();
    signUp();
  };
  const onEnterDetected = (event, callback) => {
    if (event.which == 13 || event.keyCode == 13) {
      callback();
      return 1;
    }
    return 0;
  };
  const handleInput = (event, setFunction) => {
    onEnterDetected(event, signUp);
    setFunction(event);
  };
  return (
    <MDBContainer className={classes.container}>
      {loggedIn && <Redirect to="/profile" />}
      <MDBCard className="px-4">
        <MDBCardBody>
          <form>
            <p className="h3 text-center py-4">Rejestracja</p>
            <div className="grey-text">
              <MDBInput
                size="lg"
                label={accountType === "employer" ? "Nazwa" : "Imię i nazwisko"}
                icon="user"
                group
                type="text"
                validate
                onChange={event => handleInput(event, setSignUpName)}
                value={signUpName}
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
                onChange={event => handleInput(event, setSignUpEmail)}
                value={signUpEmail}
                error="wrong"
                success="right"
              />
              <MDBInput
                size="lg"
                label="Nowe hasło"
                icon="lock"
                group
                onChange={event => handleInput(event, setSignUpPassword)}
                value={signUpPassword}
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
            {signUpError && (
              <div className={classes.error}>
                <span className={classes.errorText}>{signUpError}</span>
              </div>
            )}
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  authSignUp: (name, email, password, accountType) =>
    dispatch(authSignUp(name, email, password, accountType)),
  setSignUpName: event => dispatch(setSignUpName(event.target.value)),
  setSignUpPassword: event => dispatch(setSignUpPassword(event.target.value)),
  setSignUpEmail: event => dispatch(setSignUpEmail(event.target.value)),
  setSignUpState: state => dispatch(setSignUpState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(MDSignUp);
