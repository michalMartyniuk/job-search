import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { set_password, set_email, set_signUp_state, auth_sign_up } from '../../store/auth/authActions';
import { connect } from 'react-redux';

function SignUp(props) {
  const handle_signUp = () => {
    props.auth_sign_up(props.email, props.password)
    props.set_signUp_state(false)
  }
  console.log(props)
  return (
    <div>
      <Dialog open={props.signUp_state} onClose={() => props.set_signUp_state(false)}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={props.set_email}
            value={props.email}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            onChange={props.set_password}
            value={props.password}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.set_signUp_state(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handle_signUp} color="primary">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({ ...state.auth })
const mapDispatchToProps = (dispatch) => ({
  auth_sign_up: (email, password) => dispatch(auth_sign_up(email, password)),
  set_password: event => dispatch(set_password(event.target.value)),
  set_email: event => dispatch(set_email(event.target.value)),
  set_signUp_state: state => dispatch(set_signUp_state(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)