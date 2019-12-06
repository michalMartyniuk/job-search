import React from "react";
import styled from "styled-components";
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";

export const Input_Root = styled(FormControl).attrs(props => ({
  variant: "outlined",
  width: props.width || "200px",
  margin: props.margin || "50px"
}))`
  width: ${props => props.width};
  margin: ${props => props.margin};
`;
export const Input_Label = styled(props => (
  <InputLabel classes={{ shrink: "shrink", outlined: "outlined" }} {...props} />
)).attrs(props => ({
  fontSize: "1rem",
  transform: props.transform || "translate(14px, 24px) scale(1)",
  shrinkedFontSize: "1rem",
  shrinkedTransform: "translate(14px, -6px) scale(1)"
}))`
  font-size: ${props => props.fontSize};
  transform: ${props => props.transform};
  &.shrink.Mui-focused {
    font-size: ${props => props.shrinkedFontSize};
    transform: ${props => props.shrinkedTransform};
  }
`;
export const Outlined_Input = styled(
  ({ topBorderGapWidth, value, ...other }) => (
    <OutlinedInput
      classes={{ notchedOutline: "notched" }}
      topBorderGapWidth={topBorderGapWidth}
      value={value}
      {...other}
    />
  )
).attrs(props => ({
  width: props.width || "auto",
  height: props.height || "auto",
  margin: props.margin || "0px",
  fontSize: props.fontSize || "1rem",
  topBorderGap: `${props.topBorderGapWidth} !important`,
  topBorderGapValue: () => {
    const { value, animateGapWidth } = props;
    if (value) {
      return animateGapWidth
        ? `${animateGapWidth} !important`
        : "50px !important";
    }
    return "0px !important";
  }
}))`
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};
  & .notched legend {
    width: ${props => props.topBorderGapValue()};
  }
  &.Mui-focused {
    & .notched legend {
      width: ${props => props.topBorderGap};
    }
  }
`;
export default function FormField({
  label,
  value,
  onChange,
  styles = { root: {}, label: {}, input: {} }
}) {
  return (
    <Input_Root {...styles.root}>
      <Input_Label {...styles.label}>{label}</Input_Label>
      <Outlined_Input value={value} onChange={onChange} {...styles.input} />
    </Input_Root>
  );
}
