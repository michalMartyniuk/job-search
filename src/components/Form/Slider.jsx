import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

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

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

const Container = styled.div`
  width: 100%;
  margin: 50px 0;
  padding: 0 150px;
`;
const Heading = styled(Typography)`
  font-size: 1.8rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  margin-left: -5px;
  text-align: center;
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
  font-size: 1.7rem;
  margin: 30px 0;
  span {
    // margin: auto;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.43;
    white-space: nowrap;
    letter-spacing: 0.01071em;
  }
`;
export default function DiscreteSlider() {
  const [values, setValues] = useState([1000, 5000]);
  const handleChange = (event, value) => setValues(value);
  return (
    <Container>
      <Heading>Custom marks</Heading>
      <ValueLabel min={values[0]} max={values[1]} />
      <StyledSlider
        min={0}
        max={25000}
        step={1000}
        value={values}
        valueLabelDisplay="off"
        onChange={handleChange}
        marks={marks}
      />
    </Container>
  );
}
