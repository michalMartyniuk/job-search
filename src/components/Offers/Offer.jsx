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
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 5px;
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
const Countries = styled.span`
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
`;

function Offer({ offer, ...props }) {
  const history = useHistory();
  const { job, jobTypes, salary, cities, experience, ownerName } = offer;
  const handleEdit = offerId => {
    history.push(`/edit/${offerId}`);
  };
  return (
    <Root width={props.width}>
      <Title>{job}</Title>
      <Owner>Oferta użytkownika: {ownerName}</Owner>
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
      </Informations>
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
        {props.close ? (
          <Button onClick={() => props.close(offer.id)}>Zamknij</Button>
        ) : null}
        {props.reactivate ? (
          <Button onClick={() => props.reactivate(offer.id)}>Wznów</Button>
        ) : null}
        {props.edit ? (
          <Button onClick={() => handleEdit(offer.id)}>Edytuj</Button>
        ) : null}
      </Actions>
      <Divider component="span" />
    </Root>
  );
}
export default Offer;
