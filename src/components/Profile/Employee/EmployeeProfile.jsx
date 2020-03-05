import React from "react";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ProfileInfo from "../ProfileInfo";
import AppliedOffers from "./AppliedOffers";
import AppliedIvents from "./AppliedIvents";
import SavedOffers from "./SavedOffers";
import SavedIvents from "./SavedIvents";
import {
  applyToOffer,
  saveOffer,
  removeOffer,
  applyToIvent,
  saveIvent,
  removeIvent,
} from "../../../store/auth/authActions";

function TabPanel({ children, value, index, className }) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      index={index}
      hidden={value !== index}
      className={className}
    >
      {children}
    </Typography>
  );
}

const StyledTabPanel = styled(TabPanel)`
  margin-left: 100px;
`;
const Container = styled.div`
  display: flex;
  background-color: white;
  margin: 70px 100px;
  padding: 50px;
`;
const StyledTab = styled(Tab)`
  font-size: 1rem;
`;

function EmployeeProfile({ user, remove, removeIvent }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs orientation="vertical" value={value} onChange={handleChange}>
        <StyledTab label="Informacje" />
        <StyledTab label="Aplikowane oferty pracy" />
        <StyledTab label="Zapisane oferty pracy" />
        <StyledTab label="Aplikowane oferty szkoleń i konferencji" />
        <StyledTab label="Zapisane oferty szkoleń i konferencji" />
      </Tabs>

      <StyledTabPanel value={value} index={0}>
        <ProfileInfo />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={1}>
        <AppliedOffers offers={user.appliedOffers} remove={remove} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={2}>
        <SavedOffers offers={user.savedOffers} remove={remove} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={3}>
        <AppliedIvents ivents={user.appliedIvents} remove={removeIvent} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={4}>
        <SavedIvents ivents={user.savedIvents} remove={removeIvent} />
      </StyledTabPanel>
    </Container>
  );
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  apply: offerId => dispatch(applyToOffer(offerId)),
  save: offerId => dispatch(saveOffer(offerId)),
  remove: (offer, offerType) => dispatch(removeOffer(offer, offerType)),
  applyToIvent: iventId => dispatch(applyToIvent(iventId)),
  saveIvent: iventId => dispatch(saveIvent(iventId)),
  removeIvent: (ivent, iventType) => dispatch(removeIvent(ivent, iventType))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile);
