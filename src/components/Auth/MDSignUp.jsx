import React from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {
  set_signUp_name, set_signUp_password, set_signUp_email,
  set_signUp_state, auth_sign_up
} from '../../store/auth/authActions';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: 500,
    margin: 0,
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
const MDSignUp = (props) => {
  const classes = useStyles()
  const handleSignUp = (event) => {
    event.preventDefault()
    const account_type = () => {
      if(props.work_giver) {
        return "work_giver"
      } 
      else if (props.work_taker){
        return "work_taker"
      }
      else { return null }
    }
    props.auth_sign_up(props.signUp_email, props.signUp_password, account_type())
    props.set_signUp_state(false)
  }
  return (
    <MDBContainer className={classes.container}>
      <MDBCard className="px-4">
        <MDBCardBody>
          <form>
            <p className="h3 text-center py-4">Rejestracja</p>
            <div className="grey-text">
              <MDBInput
                size="lg"
                label="Imię"
                icon="user"
                group
                type="text"
                validate
                onChange={props.set_signUp_name}
                value={props.signUp_name}
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
                onChange={props.set_signUp_email}
                value={props.signUp_email}
                error="wrong"
                success="right"
              />
              <MDBInput
                size="lg"
                label="Hasło"
                icon="lock"
                group
                onChange={props.set_signUp_password}
                value={props.signUp_password}
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
            { 
              props.signUp_error &&
              <div className={classes.error}>
                <span className={classes.errorText}>{props.signUp_error}</span>
              </div>
            }
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

const mapStateToProps = (state) => ({ ...state.auth })
const mapDispatchToProps = (dispatch) => ({
  auth_sign_up: (email, password) => dispatch(auth_sign_up(email, password)),
  set_signUp_name: event => dispatch(set_signUp_name(event.target.value)),
  set_signUp_password: event => dispatch(set_signUp_password(event.target.value)),
  set_signUp_email: event => dispatch(set_signUp_email(event.target.value)),
  set_signUp_state: state => dispatch(set_signUp_state(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(MDSignUp)