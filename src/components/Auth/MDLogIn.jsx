import React from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  setLogInPassword,
  setLogInEmail,
  setLogInState,
  authLogIn
} from "../../store/auth/authActions";

const useStyles = makeStyles(() => ({
  container: {
    width: 500,
    margin: "auto",
    marginTop: 150
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

function MDLogIn({
  loggedIn,
  authLogIn,
  setLogInState,
  setLogInEmail,
  setLogInPassword,
  logInPassword,
  logInEmail,
  logInError
}) {
  const classes = useStyles();
  const handleLogIn = event => {
    event.preventDefault();
    authLogIn(logInEmail, logInPassword);
    setLogInState(false);
  };
  console.log(logInEmail)
  return (
    <MDBContainer className={classes.container}>
      {loggedIn && <Redirect to="/profile" />}
      <MDBCard className="px-4">
        <MDBCardBody>
          <form>
            <p className="h3 text-center py-4">Logowanie</p>
            <div className="grey-text">
              <MDBInput
                size="lg"
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                onChange={setLogInEmail}
                value={logInEmail}
                error="wrong"
                success="right"
              />
              <MDBInput
                size="lg"
                label="Hasło"
                icon="lock"
                group
                type="password"
                onChange={setLogInPassword}
                value={logInPassword}
                validate
              />
            </div>
            <div className="text-center py-4">
              <MDBBtn
                size="lg"
                color="cyan"
                type="submit"
                onClick={handleLogIn}
              >
                Zaloguj
              </MDBBtn>
            </div>
            {logInError && (
              <div className={classes.error}>
                <span className={classes.errorText}>{logInError}</span>
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
  authLogIn: (email, password) => dispatch(authLogIn(email, password)),
  setLogInEmail: event => dispatch(setLogInEmail(event.target.value)),
  setLogInPassword: event => dispatch(setLogInPassword(event.target.value)),
  setLogInState: state => dispatch(setLogInState(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MDLogIn);

MDLogIn.propTypes = {
  authLogIn: PropTypes.func,
  setLogInEmail: PropTypes.func,
  setLogInState: PropTypes.func,
  setLogInPassword: PropTypes.func,
  loggedIn: PropTypes.bool,
  logInEmail: PropTypes.string,
  logInPassword: PropTypes.string,
  logInError: PropTypes.string
};
