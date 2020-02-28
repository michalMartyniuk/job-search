import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setUsers } from "../store/app/appActions";

const UserList = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 10px 40px;
  padding: 20px;
`;
const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    color: #00bcd4;
  }
`;

function Clients({ users, setUsers }) {
  const history = useHistory();
  const handleUserDetails = id => {
    history.push(`/details/employer/${id}`);
  };
  React.useEffect(() => {
    setUsers();
  }, []);
  return (
    <div>
      <UserList>
        {users.length
          ? users.map(user => {
              if (user.accountType === "employee") {
                return;
              }
              return (
                <UserContainer key={user.id}>
                  <div>
                    <UserName onClick={() => handleUserDetails(user.id)}>
                      {user.name.split(" ")[0]}
                    </UserName>
                  </div>
                </UserContainer>
              );
            })
          : null}
      </UserList>
    </div>
  );
}
const mapStateToProps = state => ({
  ...state.auth,
  ...state.app,
  form: { ...state.form }
});
const mapDispatchToProps = dispatch => ({
  setUsers: () => dispatch(setUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
