import React from "react";
import styled from "styled-components";

const UserList = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 10px 40px;
  padding: 30px;
`;
const UserName = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 5px;
`;
const DataField = styled.div`
  display: flex;
`;
const Label = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
`;
const Text = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  margin-left: 20px;
`;

function SimilarOffers({ users }) {
  console.log(users);
  return (
    <div>
      <UserList>
        {users.length
          ? users.map(user => {
              if (user.accountType === "employer") {
                return;
              }
              return (
                <UserContainer>
                  <UserName>{user.name}</UserName>
                  <DataField>
                    <Label>Email:</Label>
                    <Text>{user.email}</Text>
                  </DataField>
                </UserContainer>
              );
            })
          : null}
      </UserList>
    </div>
  );
}

export default SimilarOffers;
