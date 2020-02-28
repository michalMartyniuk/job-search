import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getItemWithId } from "../../utility";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const KeyValueContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const Key = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 10px;
`;
const Value = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;
const GoBackButton = styled(props => {
  return (
    <Button variant="contained" {...props}>
      Wróć
    </Button>
  );
})`
  margin-top: 20px;
  width: 200px;
  background-color: #6ec7f4;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #a3e0ff;
  }
`;
const Date = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

function convertDateObject({ year, month, day, hours, minutes }) {
  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;
  // hours = hours.length === 1 ? `0${hours}` : hours;
  // minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  return `${year}-${month}-${day}`;
}
function createDetailsData(item) {
  const detailsObj = {
    name: item.name || "Brak",
    email: item.email || "Brak",
    job: item.job || "Brak",
    jobTypes:
      item.jobTypes && item.jobTypes.length ? item.jobTypes.join(", ") : "Brak",
    appliedCount: item.appliedCount || "Brak",
    description: item.description || "Brak",
    id: item.id || "Brak",
    ownerId: item.ownerId || "Brak",
    salary: item.salary && item.salary.length ? item.salary : "Brak",
    userKeySkills: item.userKeySkills
      ? Object.keys(item.userKeySkills)
          .filter(key => item.userKeySkills[key])
          .join(", ")
      : "Brak",
    keySkills:
      item.keySkills && item.keySkills.length
        ? item.keySkills.join(", ")
        : "Brak",
    cities: item.cities && item.cities.length ? item.cities.join(", ") : "Brak",
    experience: item.experience || "Brak",
    date: item.date || "Brak",
    expireDate: item.expireDate || "Brak"
  };
  return detailsObj;
}
export const Details = ({ collection, type }) => {
  const { id } = useParams();
  let data = getItemWithId(id, collection);
  if (!collection || !data) return null;
  data = createDetailsData(data);
  switch (type) {
    case "offer":
      return <OfferDetails offer={data} />;
    case "ivent":
      return <IventDetails ivent={data} />;
    case "employee":
      return <EmployeeDetails employee={data} />;
    case "employer":
      return <EmployerDetails employer={data} />;
    default:
      return null;
  }
};
export const OfferDetails = ({ offer }) => {
  const history = useHistory();
  const date = offer.date && convertDateObject(offer.date);
  const expireDate = offer.expireDate && convertDateObject(offer.expireDate);
  return (
    <Container>
      <KeyValueContainer>
        <Key>Nazwa: </Key>
        <Value>{offer.job}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Branża: </Key>
        <Value>{offer.jobTypes}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Miasta: </Key>
        <Value>{offer.cities}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Doświadczenie: </Key>
        <Value>{offer.experience}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Wynagrodzenie: </Key>
        <Value>
          {offer.salary[0]} PLN - {offer.salary[1]} PLN
        </Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Kluczowe umiejętności: </Key>
        <Value>{offer.keySkills || "Brak"}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Opis: </Key>
        <Value>{offer.description}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Date>Data utworzenia: {date}</Date>
      </KeyValueContainer>
      <KeyValueContainer>
        <Date>Data wygaśnięcia: {expireDate}</Date>
      </KeyValueContainer>
      <GoBackButton onClick={() => history.goBack()} />
    </Container>
  );
};
export const EmployeeDetails = ({ employee }) => {
  const history = useHistory();
  return (
    <Container>
      <KeyValueContainer>
        <Key>Imię: </Key>
        <Value>{employee.name.split(" ")[0]}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Kluczowe umiejętności: </Key>
        <Value>{employee.userKeySkills || "Brak"}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Opis: </Key>
        <Value>{employee.description}</Value>
      </KeyValueContainer>
      <GoBackButton onClick={() => history.goBack()} />
    </Container>
  );
};
export const EmployerDetails = ({ employer }) => {
  const history = useHistory();
  return (
    <Container>
      <KeyValueContainer>
        <Key>Nazwa: </Key>
        <Value>{employer.name}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Email: </Key>
        <Value>{employer.email}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Opis: </Key>
        <Value>{employer.description}</Value>
      </KeyValueContainer>
      <GoBackButton onClick={() => history.goBack()} />
    </Container>
  );
};

export const IventDetails = ({ ivent }) => {
  const history = useHistory();
  const date = ivent.date && convertDateObject(ivent.date);
  return (
    <Container>
      <KeyValueContainer>
        <Key>Nazwa: </Key>
        <Value>{ivent.job}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Branża: </Key>
        <Value>{ivent.jobTypes}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Miasta: </Key>
        <Value>{ivent.cities}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Kluczowe umiejętności: </Key>
        <Value>{ivent.keySkills}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Key>Opis: </Key>
        <Value>{ivent.description}</Value>
      </KeyValueContainer>
      <KeyValueContainer>
        <Date>Data wydarzenia: {date}</Date>
      </KeyValueContainer>
      <GoBackButton onClick={() => history.goBack()} />
    </Container>
  );
};
