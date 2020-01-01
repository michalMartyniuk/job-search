import React from "react";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ProfileInfo from "../ProfileInfo";
import AppliedOffers from "./AppliedOffers";
import SavedOffers from "./SavedOffers";

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
const StyledTabs = styled(props => (
  <Tabs classes={{ flexContainer: "flexContainer" }} {...props}>
    {props.children}
  </Tabs>
))`
  & .flexContainer {
    display: flex;
    flex-direction: column;
  }
`;
const StyledTab = styled(Tab)`
  font-size: 1rem;
`;

function EmployeeProfile({ user, remove }) {
  const [value, setValue] = React.useState(0);
  const { appliedOffers, savedOffers } = user;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs orientation="vertical" value={value} onChange={handleChange}>
        <StyledTab label="Informacje" />
        <StyledTab label="Aplikowane oferty" />
        <StyledTab label="Zapisane oferty" />
      </Tabs>

      <StyledTabPanel value={value} index={0}>
        <ProfileInfo />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={1}>
        <AppliedOffers offers={appliedOffers} remove={remove} />
      </StyledTabPanel>

      <StyledTabPanel value={value} index={2}>
        <SavedOffers offers={savedOffers} remove={remove} />
      </StyledTabPanel>
    </Container>
  );
}
export default EmployeeProfile;
