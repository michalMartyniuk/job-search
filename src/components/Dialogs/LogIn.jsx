import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  setLogInPassword,
  setLogInEmail,
  setLogInState,
  authLogIn
} from "../../store/auth/authActions";

function LogIn({
  email,
  password,
  setEmail,
  setPassword,
  logInState,
  setLogInState,
  authLogIn
}) {
  const handleLogIn = () => {
    authLogIn(email, password);
    setLogInState(false);
  };
  return (
    <div>
      <Dialog open={logInState} onClose={() => setLogInState(false)}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={setEmail}
            value={email}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={setPassword}
            value={password}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogInState(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogIn} color="primary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  authLogIn: (email, password) => dispatch(authLogIn(email, password)),
  setPassword: event => dispatch(setLogInPassword(event.target.value)),
  setEmail: event => dispatch(setLogInEmail(event.target.value)),
  setLogInState: state => dispatch(setLogInState(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
