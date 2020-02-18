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
  editOffer,
  applyToIvent,
  saveIvent,
  closeIvent,
  removeIvent,
  reactivateIvent,
  updateProfile,
  setUserKeySkills
} from "../../store/auth/authActions";
import { toggleUpdateProfile } from "../../store/app/appActions";

function Profile({ user, ...props }) {
  const {
    apply,
    save,
    remove,
    close,
    reactivate,
    edit,
    getOffer,
    applyToIvent,
    saveIvent,
    closeIvent,
    removeIvent,
    reactivateIvent,
    setUserKeySkills,
    updateProfileActive,
    toggleUpdateProfile
  } = props;
  switch (user.accountType) {
    case "employee":
      return (
        <EmployeeProfile
          user={user}
          apply={apply}
          applyToIvent={applyToIvent}
          save={save}
          saveIvent={saveIvent}
          remove={remove}
          removeIvent={removeIvent}
          setUserKeySkills={setUserKeySkills}
          updateProfile={updateProfile}
          updateProfileActive={updateProfileActive}
          toggleUpdateProfile={toggleUpdateProfile}
        />
      );
    case "employer":
      return (
        <EmployerProfile
          user={user}
          close={close}
          closeIvent={closeIvent}
          remove={remove}
          removeIvent={removeIvent}
          reactivate={reactivate}
          reactivateIvent={reactivateIvent}
          getOffer={getOffer}
          edit={edit}
        />
      );
    default:
      return <Redirect to="/" />;
  }
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  apply: offerId => dispatch(applyToOffer(offerId)),
  save: offerId => dispatch(saveOffer(offerId)),
  remove: (offer, offerType) => dispatch(removeOffer(offer, offerType)),
  close: offerId => dispatch(closeOffer(offerId)),
  reactivate: offerId => dispatch(reactivateOffer(offerId)),
  edit: offer => dispatch(editOffer(offer)),
  getOffer: offerId => dispatch(getOffer(offerId)),

  applyToIvent: iventId => dispatch(applyToIvent(iventId)),
  saveIvent: iventId => dispatch(saveIvent(iventId)),
  removeIvent: (ivent, iventType) => dispatch(removeIvent(ivent, iventType)),
  closeIvent: iventId => dispatch(closeIvent(iventId)),
  reactivateIvent: iventId => dispatch(reactivateIvent(iventId)),

  toggleUpdateProfile: () => dispatch(toggleUpdateProfile()),
  setUserKeySkills: value => dispatch(setUserKeySkills(value)),
  updateProfile: updateData => dispatch(updateProfile(updateData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
