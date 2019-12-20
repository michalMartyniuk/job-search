import React from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const arrayToString = array => {
  if (!array) {
    return null;
  }
  if (array.length === 1) {
    return array[1];
  }
  return array.join(", ");
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 5px;
`;
const Owner = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 10px;
`;
const Informations = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: 400;
  padding: 10px 0;
`;
const BottomBar = styled.div`
  display: flex;
`;
const Salary = styled.span`
  margin-right: 20px;
`;
const Countries = styled.span`
  margin-right: 20px;
`;
const Cities = styled.span`
  margin-right: 20px;
`;
const Experience = styled.span`
  margin-right: 20px;
`;
const InfoTitle = styled.span`
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;
const EmployeeButtons = ({ offer, offersType, apply, save, remove }) => {
  switch (offersType) {
    case "appliedOffers":
      return (
        <ButtonsContainer>
          <Button variant="outlined" onClick={remove}>
            Usuń
          </Button>
        </ButtonsContainer>
      );
    case "savedOffers":
      return (
        <ButtonsContainer>
          <Button variant="outlined" onClick={remove}>
            Usuń
          </Button>
        </ButtonsContainer>
      );
    default:
      return (
        <ButtonsContainer>
          <Button variant="outlined" onClick={apply}>
            Aplikuj
          </Button>
          <Button variant="outlined" onClick={save}>
            Zapisz
          </Button>
        </ButtonsContainer>
      );
  }
};
const EmployerButtons = ({ offer, offersType, edit, close, remove, reactivate }) => {
  switch (offersType) {
    case "activeOffers":
      return (
        <ButtonsContainer>
          <Button variant="outlined" onClick={edit}>
            Edytuj
          </Button>
          <Button variant="outlined" onClick={close}>
            Zamknij
          </Button>
        </ButtonsContainer>
      );
    case "closedOffers":
      return (
        <ButtonsContainer>
          <Button variant="outlined" onClick={reactivate}>
            Wznów
          </Button>
          <Button variant="outlined" onClick={remove}>
            Usuń
          </Button>
        </ButtonsContainer>
      );
    default:
      return null;
  }
};
export default function Offer({
  offer,
  offersType,
  job,
  countries,
  cities,
  experience,
  salary,
  date,
  owner,
  accountType,
  apply,
  save,
  edit,
  close,
  remove,
  reactivate
}) {
  return (
    <Root>
      <Title>{job}</Title>
      {/* <Owner>{owner}</Owner> */}
      <Divider component="span" />
      <Informations>
        {salary ? (
          <Salary>
            <InfoTitle>Wynagrodzenie:</InfoTitle> {salary[0]} - {salary[1]}
          </Salary>
        ) : null}
        {countries.length ? (
          <Countries>
            <InfoTitle>Kraje:</InfoTitle> {countries.join(", ")}
          </Countries>
        ) : null}
        {cities.length ? (
          <Cities>
            <InfoTitle>Miasta:</InfoTitle> {cities.join(", ")}
          </Cities>
        ) : null}
        {experience ? (
          <Experience>
            <InfoTitle>Doświadczenie: </InfoTitle>
            {experience}
          </Experience>
        ) : null}
      </Informations>
      {accountType === "employee" ? (
        <EmployeeButtons
          offer={offer}
          offersType={offersType}
          apply={apply}
          save={save}
          remove={remove}
        />
      ) : null}
      {accountType === "employer" ? (
        <EmployerButtons
          offer={offer}
          offersType={offersType}
          edit={edit}
          close={close}
          reactivate={reactivate}
          remove={remove}
        />
      ) : null}
      <Divider component="span" />
    </Root>
  );
}
