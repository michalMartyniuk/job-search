import React from 'react';
import { connect } from 'react-redux';
import { classes } from 'istanbul-lib-coverage';
import { auth_log_out } from '../store/auth/authActions';

function Profile (props) {
  return (
    <div className={classes.container}>
      <h1>Profile</h1>
    </div>
  )
}

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({
  log_out: () => dispatch(auth_log_out())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)