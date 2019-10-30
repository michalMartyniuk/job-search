import React from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {
  set_logIn_password, set_logIn_email,
  set_logIn_state, auth_log_in
} from '../../store/auth/authActions';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: 500,
    margin: "auto",
    marginTop: 150
  },
  error: {
    display: "flex",
  },
  errorText: {
    fontSize: "1.3rem",
    color: "red",
    margin: "auto"
  }
}))

function MDLogIn(props) {
  const classes = useStyles()
  const handleLogIn = (event) => {
    event.preventDefault()
    props.auth_log_in(props.logIn_email, props.logIn_password)
    props.set_logIn_state(false)
  }
  return (
    <MDBContainer className={classes.container}>
      {props.loggedIn && <Redirect to="/profile" />}
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
                onChange={props.set_logIn_email}
                value={props.logIn_email}
                error="wrong"
                success="right"
              />
              <MDBInput
                size="lg"
                label="Hasło"
                icon="lock"
                group
                type="password"
                onChange={props.set_logIn_password}
                value={props.logIn_password}
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
            {
              props.logIn_error &&
              <div className={classes.error}>
                <span className={classes.errorText}>{props.logIn_error}</span>
              </div>
            }
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer >
  );
};

const mapStateToProps = (state) => ({ ...state.auth })
const mapDispatchToProps = (dispatch) => ({
  auth_log_in: (email, password) => dispatch(auth_log_in(email, password)),
  set_logIn_email: event => dispatch(set_logIn_email(event.target.value)),
  set_logIn_password: event => dispatch(set_logIn_password(event.target.value)),
  set_logIn_state: state => dispatch(set_logIn_state(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(MDLogIn)