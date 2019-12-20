import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ProfileInfo from "./ProfileInfo";
import OfferList from "../Offers/OfferList";

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

const Container = styled.div`
  display: flex;
  background-color: white;
  margin: 70px 100px;
  padding: 50px;
`;
const StyledTab = styled(Tab)`
  font-size: 1rem;
`;
const StyledTabPanel = styled(TabPanel)`
  margin-left: 100px;
`;
const AppliedOffers = ({ offers }) => {
  if (!offers || !offers.length) {
    return <h2>Nie masz aplikowanych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offersType="appliedOffers"
      title="Aplikowane oferty"
      loggedIn
    />
  );
};
const SavedOffers = ({ offers }) => {
  if (!offers || !offers.length) {
    return <h2>Nie masz zapisanych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offersType="savedOffers"
      title="Zapisane oferty"
      loggedIn
    />
  );
};
const ActiveOffers = ({ offers }) => {
  if (!offers || !offers.length) {
    return <h2>Nie masz aktywnych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offersType="activeOffers"
      title="Aktywne oferty"
      loggedIn
    />
  );
};
const ClosedOffers = ({ offers }) => {
  if (!offers || !offers.length) {
    return <h2>Nie masz zamkniętych ofert</h2>;
  }
  return (
    <OfferList
      offers={offers}
      offersType="closedOffers"
      title="Zamknięte oferty"
      loggedIn
    />
  );
};
const EmployeeTabs = ({ value, onChange, appliedOffers, savedOffers }) => {
  return (
    <Container>
      <Tabs orientation="vertical" value={value} onChange={onChange}>
        <StyledTab label="Informacje" />
        <StyledTab label="Aplikowane oferty" />
        <StyledTab label="Zapisane oferty" />
      </Tabs>
      <StyledTabPanel value={value} index={0}>
        <ProfileInfo />
      </StyledTabPanel>
      <StyledTabPanel value={value} index={1}>
        <AppliedOffers offers={appliedOffers} />
      </StyledTabPanel>
      <StyledTabPanel value={value} index={2}>
        <SavedOffers offers={savedOffers} />
      </StyledTabPanel>
    </Container>
  );
};
const EmployerTabs = ({ value, onChange, closedOffers, activeOffers }) => {
  return (
    <Container>
      <Tabs orientation="vertical" value={value} onChange={onChange}>
        <StyledTab label="Informacje" />
        <StyledTab label="Aktywne oferty" />
        <StyledTab label="Zamknięte oferty" />
      </Tabs>
      <StyledTabPanel value={value} index={0}>
        <ProfileInfo />
      </StyledTabPanel>
      <StyledTabPanel value={value} index={1}>
        <ActiveOffers offers={activeOffers} />
      </StyledTabPanel>
      <StyledTabPanel value={value} index={2}>
        <ClosedOffers offers={closedOffers} />
      </StyledTabPanel>
    </Container>
  );
};
function Profile({ user }) {
  const [value, setValue] = React.useState(0);
  const { appliedOffers, savedOffers, offers, closedOffers } = user;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (user.accountType === "employer") {
    return (
      <EmployerTabs
        value={value}
        onChange={handleChange}
        activeOffers={offers}
        closedOffers={closedOffers}
      />
    );
  }
  return (
    <EmployeeTabs
      value={value}
      onChange={handleChange}
      appliedOffers={appliedOffers}
      savedOffers={savedOffers}
    />
  );
}
const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
