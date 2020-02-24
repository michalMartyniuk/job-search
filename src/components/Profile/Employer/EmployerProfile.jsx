import React from "react";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ProfileInfo from "../ProfileInfo";
import ActiveOffers from "./ActiveOffers";
import ClosedOffers from "./ClosedOffers";
import ActiveIvents from "./ActiveIvents";
import ClosedIvents from "./ClosedIvents";
import {
  removeOffer,
  closeOffer,
  reactivateOffer,
  editOffer,
  editIvent,
  closeIvent,
  removeIvent,
  reactivateIvent
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

function EmployerProfile({
  user,
  edit,
  editIvent,
  closeOffer,
  closeIvent,
  remove,
  removeIvent,
  reactivate,
  reactivateIvent
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs orientation="vertical" value={value} onChange={handleChange}>
        <StyledTab label="Informacje" />
        <StyledTab label="Aktywne Oferty" />
        <StyledTab label="Zamknięte Oferty" />
        <StyledTab label="Aktywne Szkolenia i Wydarzenia" />
        <StyledTab label="Zamknięte Szkolenia i Wydarzenia" />
      </Tabs>

      <StyledTabPanel value={value} index={0}>
        <ProfileInfo />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={1}>
        <ActiveOffers offers={user.offers} edit={edit} close={closeOffer} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={2}>
        <ClosedOffers
          items={user.closedOffers}
          remove={remove}
          reactivate={reactivate}
        />
      </StyledTabPanel>
      <StyledTabPanel value={value} index={3}>
        <ActiveIvents
          ivents={user.ivents}
          edit={editIvent}
          close={closeIvent}
        />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={4}>
        <ClosedIvents
          items={user.closedIvents}
          remove={removeIvent}
          reactivate={reactivateIvent}
        />
      </StyledTabPanel>
    </Container>
  );
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  remove: (offer, offerType) => dispatch(removeOffer(offer, offerType)),
  removeIvent: (ivent, iventType) => dispatch(removeIvent(ivent, iventType)),
  closeOffer: offerId => dispatch(closeOffer(offerId)),
  closeIvent: iventId => dispatch(closeIvent(iventId)),
  reactivate: offerId => dispatch(reactivateOffer(offerId)),
  reactivateIvent: iventId => dispatch(reactivateIvent(iventId)),
  edit: offer => dispatch(editOffer(offer)),
  editIvent: ivent => dispatch(editIvent(ivent))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerProfile);
