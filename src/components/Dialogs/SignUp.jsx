/* eslint-disable no-unused-vars */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  setSignUpPassword,
  setSignUpEmail,
  setSignUpState,
  authSignUp
} from "../../store/auth/authActions";

function SignUp(props) {
  const handleSignUp = () => {
    props.authSignUp(props.email, props.password);
    props.setSignUpState(false);
  };
  console.log(props);
  return (
    <div>
      <Dialog
        open={props.signUp_state}
        onClose={() => props.setSignUpState(false)}
      >
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={props.setEmail}
            value={props.email}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={props.setPassword}
            value={props.password}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setSignUpState(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignUp} color="primary">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  authSignUp: (email, password) => dispatch(authSignUp(email, password)),
  setPassword: event => dispatch(setSignUpPassword(event.target.value)),
  setEmail: event => dispatch(setSignUpEmail(event.target.value)),
  setSignUpState: state => dispatch(setSignUpState(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
