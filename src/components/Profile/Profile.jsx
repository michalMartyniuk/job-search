import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EmployeeProfile from "./Employee/EmployeeProfile";
import EmployerProfile from "./Employer/EmployerProfile";
import {
  getOffer,
  applyToOffer,
  saveOffer,
  removeOffer,
  closeOffer,
  reactivateOffer,
  editOffer
} from "../../store/auth/authActions";

function Profile({ user, ...props }) {
  const { apply, save, remove, close, reactivate, edit, getOffer } = props;
  switch (user.accountType) {
    case "employee":
      return (
        <EmployeeProfile
          user={user}
          apply={apply}
          save={save}
          remove={remove}
        />
      );
    case "employer":
      return (
        <EmployerProfile
          user={user}
          close={close}
          remove={remove}
          reactivate={reactivate}
          getOffer={getOffer}
          edit={edit}
        />
      );
    default:
      return <Redirect to="/" />;
  }
}
const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  apply: offerId => dispatch(applyToOffer(offerId)),
  save: offerId => dispatch(saveOffer(offerId)),
  remove: (offer, offerType) => dispatch(removeOffer(offer, offerType)),
  close: offerId => dispatch(closeOffer(offerId)),
  reactivate: offerId => dispatch(reactivateOffer(offerId)),
  edit: offer => dispatch(editOffer(offer)),
  getOffer: offerId => dispatch(getOffer(offerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
