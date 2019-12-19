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

export default function Offer({
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
  close
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
        <ButtonsContainer>
          <Button variant="outlined" onClick={apply}>
            Aplikuj
          </Button>
          <Button variant="outlined" onClick={save}>
            Zapisz
          </Button>
        </ButtonsContainer>
      ) : null}
      {accountType === "employer" ? (
        <ButtonsContainer>
          <Button variant="outlined" onClick={edit}>
            Edytuj
          </Button>
          <Button variant="outlined" onClick={close}>
            Zamknij
          </Button>
        </ButtonsContainer>
      ) : null}
      <Divider component="span" />
    </Root>
  );
}
