import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { authLogOut } from "../store/auth/authActions";
import OfferList from "./Offers/OfferList";

const useStyles = makeStyles(() => ({
  container: {
    margin: "auto",
    marginTop: 150
  },
  paper: {},
  list: {
    listStyle: "none",
    padding: 20,
    margin: 0,
    marginBottom: 50,
    fontSize: "1.5rem"
  },
  profileHeader: {
    color: "white",
    padding: "12px 20px",
    backgroundColor: "#424653",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  profileHeaderText: {
    fontSize: "1.6rem"
  },
  infoItem: {
    margin: "5px 0",
    padding: 5
  },
  infoName: {
    fontWeight: "700"
  },
  infoValue: {}
}));

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
`;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 20px;
`;
const ActionButton = styled(Button)`
  height: 50px;
  margin-bottom: 10px;
`;
function Profile(props) {
  const classes = useStyles();
  let accountType;
  if (props.user) {
    if (props.user.accountType === "employer") {
      accountType = "pracodawca";
    } else if (props.user.accountType === "employee") {
      accountType = "pracownik";
    } else {
      accountType = null;
    }
  }
  const ListItem = props => (
    <li className={classes.infoItem}>
      <span className={classes.infoName}>{props.name}</span>
      <span className={classes.infoValue}>{props.value}</span>
    </li>
  );
  const handlePasswordReset = () => {
    return null;
  };
  const handleChangeInfo = () => {
    return null;
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Container>
          <ProfileInfo>
            <h3 className={classes.profileHeader}>
              <Typography variant="body1" className={classes.profileHeaderText}>
                {props.user.name}
              </Typography>
            </h3>
            <ul className={classes.list}>
              <ListItem name="Imię: " value={props.user.name} />
              <ListItem name="Email: " value={props.user.email} />
              <ListItem name="Rodzaj konta: " value={accountType} />
            </ul>
          </ProfileInfo>
          <Actions>
            <ActionButton variant="outlined" onClick={handleChangeInfo}>
              Zmień dane
            </ActionButton>
            <ActionButton variant="outlined" onClick={handlePasswordReset}>
              Zresetuj hasło
            </ActionButton>
          </Actions>
        </Container>
      </Paper>
      {props.user.offers && props.user.offers.length ? (
        <OfferList offers={props.user.offers} title="Offers" loggedIn />
      ) : null}
    </div>
  );
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  log_out: () => dispatch(authLogOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
