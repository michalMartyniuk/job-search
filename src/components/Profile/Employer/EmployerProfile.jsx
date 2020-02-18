import React from "react";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ProfileInfo from "../ProfileInfo";
import ActiveOffers from "./ActiveOffers";
import ClosedOffers from "./ClosedOffers";
import ActiveIvents from "./ActiveIvents";
import ClosedIvents from "./ClosedIvents";

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
  close,
  closeIvent,
  remove,
  removeIvent,
  reactivate,
  reactivateIvent
}) {
  const [value, setValue] = React.useState(0);
  const { offers, closedOffers, ivents, closedIvents } = user;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs orientation="vertical" value={value} onChange={handleChange}>
        <StyledTab label="Informacje" />
        <StyledTab label="Aktywne oferty" />
        <StyledTab label="Zamknięte oferty" />
        <StyledTab label="Aktywne wydarzenia" />
        <StyledTab label="Zamknięte wydarzenia" />
      </Tabs>

      <StyledTabPanel value={value} index={0}>
        <ProfileInfo />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={1}>
        <ActiveOffers offers={offers} edit={edit} close={close} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={2}>
        <ClosedOffers
          offers={closedOffers}
          remove={remove}
          reactivate={reactivate}
        />
      </StyledTabPanel>
      <StyledTabPanel value={value} index={3}>
        <ActiveIvents ivents={ivents} closeIvent={closeIvent} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={4}>
        <ClosedIvents
          ivents={closedIvents}
          removeIvent={removeIvent}
          reactivateIvent={reactivateIvent}
        />
      </StyledTabPanel>
    </Container>
  );
}
export default EmployerProfile;
