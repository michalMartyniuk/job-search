import React from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || "auto"};
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
`;
const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    color: #00bcd4;
  }
`;
const Owner = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Informations = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 10px 0;
`;
const Salary = styled.span`
  margin-right: 20px;
`;
const Cities = styled.span`
  margin-right: 20px;
`;
const JobTypes = styled.span`
  margin-right: 20px;
`;
const Experience = styled.span`
  margin-right: 20px;
`;
const InfoTitle = styled.span`
  font-weight: 500;
`;
const Actions = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Header = styled.div`
  display: flex;
`;
const Header_col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 400px;
`;
const Header_col_2 = styled(Header_col)`
  width: auto;
`;
const AppliedCountContainer = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  background-color: #cbcdd4;
  padding: 10px;
  border-radius: 0px;
`;
const Date = styled.div`
  font-size: 1rem;
`;

function convertDateObject({ year, month, day, hours, minutes }) {
  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;
  // hours = hours.length === 1 ? `0${hours}` : hours;
  // minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  return `${year}-${month}-${day}`;
}
function Offer({ offer, ...props }) {
  const history = useHistory();
  const {
    job,
    jobTypes,
    salary,
    cities,
    experience,
    ownerName,
    keySkills
  } = offer;
  const handleEdit = offerId => {
    history.push(`/edit/offer/${offerId}`);
  };
  const date = offer.date && convertDateObject(offer.date);
  const expireDate = offer.expireDate && convertDateObject(offer.expireDate);
  const handleOfferDetails = id => {
    history.push(`/details/offer/${id}`);
  };
  return (
    <Root width={props.width}>
      <Header>
        <Header_col>
          <Title onClick={() => handleOfferDetails(offer.id)}>{job}</Title>
          <Owner>Oferta użytkownika: {ownerName}</Owner>
        </Header_col>
        <Header_col_2>
          <AppliedCountContainer>
            Liczba aplikacji: {offer.appliedCount || 0}
          </AppliedCountContainer>
        </Header_col_2>
      </Header>
      <Divider component="span" />
      <Informations>
        {jobTypes.length ? (
          <JobTypes>
            <InfoTitle>Branża:</InfoTitle> {jobTypes.join(", ")}
          </JobTypes>
        ) : null}

        {salary.length ? (
          <Salary>
            <InfoTitle>Wynagrodzenie:</InfoTitle> {salary[0]} - {salary[1]}
          </Salary>
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
        {keySkills.length ? (
          <JobTypes>
            <InfoTitle>Kluczowe umiejętności:</InfoTitle> {keySkills.join(", ")}
          </JobTypes>
        ) : null}
      </Informations>
      {date ? <Date>Data utworzenia: {date}</Date> : null}
      {expireDate ? <Date>Data wygaśnięcia: {expireDate}</Date> : null}
      <Actions>
        {props.apply ? (
          <Button onClick={() => props.apply(offer.id)}>Aplikuj</Button>
        ) : null}
        {props.save ? (
          <Button onClick={() => props.save(offer.id)}>Zapisz</Button>
        ) : null}
        {props.remove ? (
          <Button onClick={() => props.remove(offer, props.offerType)}>
            Usuń
          </Button>
        ) : null}
        {props.edit ? (
          <Button onClick={() => handleEdit(offer.id)}>Edytuj</Button>
        ) : null}
        {props.close ? (
          <Button onClick={() => props.close(offer.id)}>Zamknij</Button>
        ) : null}
        {props.reactivate ? (
          <Button onClick={() => props.reactivate(offer.id)}>Wznów</Button>
        ) : null}
      </Actions>
      <Divider component="span" />
    </Root>
  );
}
export default Offer;
