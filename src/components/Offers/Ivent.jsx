/* eslint-disable no-param-reassign */
import React from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  min-width: 400px;
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
const Cities = styled.span`
  margin-right: 20px;
`;
const Description = styled.div`
  margin-right: 20px;
`;
const JobTypes = styled.span`
  margin-right: 20px;
`;
const InfoTitle = styled.span`
  font-weight: 500;
`;
const Actions = styled.div`
  display: flex;
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
  hours = hours.length === 1 ? `0${hours}` : hours;
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function Ivent({ ivent, ...props }) {
  const history = useHistory();
  const { job, jobTypes, cities, description, ownerName, keySkills } = ivent;
  const handleEdit = iventId => {
    history.push(`/edit/event/${iventId}`);
  };
  const date = convertDateObject(ivent.date);
  const handleIventDetails = id => {
    history.push(`/details/event/${id}`);
  };
  return (
    <Root>
      <Header>
        <Header_col>
          <Title onClick={() => handleIventDetails(ivent.id)}>{job}</Title>
          <Owner>Wydarzenie użytkownika: {ownerName}</Owner>
        </Header_col>
        <Header_col_2>
          <AppliedCountContainer>
            Liczba aplikacji: {ivent.appliedCount || 0}
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
        {cities.length ? (
          <Cities>
            <InfoTitle>Miasta:</InfoTitle> {cities.join(", ")}
          </Cities>
        ) : null}
        {keySkills.length ? (
          <JobTypes>
            <InfoTitle>Kluczowe umiejętności:</InfoTitle> {keySkills.join(", ")}
          </JobTypes>
        ) : null}
        {description ? (
          <Description>
            <p>
              <strong>Opis: </strong>
              {description}
            </p>
          </Description>
        ) : null}
        {date ? <Date>Data wydarzenia: {date}</Date> : null}
      </Informations>
      <Actions>
        {props.apply ? (
          <Button onClick={() => props.apply(ivent.id)}>Aplikuj</Button>
        ) : null}
        {props.save ? (
          <Button onClick={() => props.save(ivent.id)}>Zapisz</Button>
        ) : null}
        {props.remove ? (
          <Button onClick={() => props.remove(ivent, props.iventType)}>
            Usuń
          </Button>
        ) : null}
        {props.edit ? (
          <Button onClick={() => handleEdit(ivent.id)}>Edytuj</Button>
        ) : null}
        {props.close ? (
          <Button onClick={() => props.close(ivent.id)}>Zamknij</Button>
        ) : null}
        {props.reactivate ? (
          <Button onClick={() => props.reactivate(ivent.id)}>Wznów</Button>
        ) : null}
      </Actions>
      <Divider component="span" />
    </Root>
  );
}
export default Ivent;
