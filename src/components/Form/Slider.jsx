import React, { useState } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const marks = [
  { value: 0, label: "0" },
  {
    value: 5000,
    label: "5000"
  },
  {
    value: 10000,
    label: "10000"
  },
  {
    value: 15000,
    label: "15000"
  },
  {
    value: 20000,
    label: "20000"
  },
  {
    value: 25000,
    label: "25000"
  }
];

const Container = styled.div`
  width: 100%;
  margin: 0px;
  border: 5px solid #686c78;
`;
const Header = styled.div`
  display: flex;
  padding: 20px 30px;
`;
const Heading = styled(Typography)`
  font-size: 1.6rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
`;
const ValueLabel = styled(({ className, min, max }) => {
  return (
    <div className={className}>
      <span>{min} PLN - </span>
      <span>{max} PLN</span>
    </div>
  );
})`
  display: flex;
  justify-content: center;
  margin-left: auto;
  font-size: 1.4rem;
  span {
    font-size: 1.6rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.43;
  }
`;
const StyledSlider = styled(props => (
  <Slider
    classes={{
      thumb: "thumb",
      rail: "rail",
      track: "track",
      mark: "mark",
      markLabel: "markLabel",
      markActive: "markActive",
      valueLabel: "valueLabel"
    }}
    {...props}
  />
))`
  & .thumb {
    width: 20px;
    height: 20px;
    margin-top: -7px;
  }
  & .rail {
    height: 5px;
  }
  & .track {
    height: 5px;
  }
  & .markLabel {
    font-size: 1.2rem;
    top: 35px;
  }
  & .mark {
    width: 3px;
    height: 5px;
    padding: 0;
    background-color: white;
  }
  & .markActive {
    opacity: 1;
    width: 3px;
    height: 17px;
    padding: 0;
    background-color: rgb(63, 81, 181);
  }
`;

const SliderContainer = styled.div`
  padding: 0px 60px 32px 30px;
`;
export default function FormSlider({ values, onChange, name }) {
  const [localValues, setLocalValues] = useState(values);
  const handleChange = (event, values) => setLocalValues(values);
  return (
    <Container>
      <Header>
        <Heading>{name}</Heading>
        <ValueLabel min={localValues[0]} max={localValues[1]} />
      </Header>
      <SliderContainer>
        <StyledSlider
          min={0}
          max={25000}
          step={1000}
          value={localValues}
          valueLabelDisplay="off"
          onChange={handleChange}
          onChangeCommitted={onChange}
          marks={marks}
        />
      </SliderContainer>
    </Container>
  );
}
