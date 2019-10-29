import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { set_password, set_email, set_logIn_state, auth_log_in } from '../../store/auth/authActions';
import { connect } from "react-redux";

function LogIn({
  email, password, set_email, set_password,
  logIn_state, set_logIn_state, auth_log_in }) {
  const handle_logIn = () => {
    auth_log_in(email, password)
    set_logIn_state(false)
  }
  return (
    <div>
      <Dialog open={logIn_state} onClose={() => set_logIn_state(false)}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={set_email}
            value={email}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={set_password}
            value={password}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => set_logIn_state(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handle_logIn} color="primary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({ ...state.auth })
const mapDispatchToProps = (dispatch) => ({
  auth_log_in: (email, password) => dispatch(auth_log_in(email, password)),
  set_password: event => dispatch(set_password(event.target.value)),
  set_email: event => dispatch(set_email(event.target.value)),
  set_logIn_state: state => dispatch(set_logIn_state(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)