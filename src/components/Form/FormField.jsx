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
  fontSize: props.fontSize || "1.2rem",
  transform: props.transform || "translate(14px, 22px) scale(1)",
  shrinkedFontSize: props.shrinkeFontSize || "1rem",
  shrinkedTransform:
    props.shrinkedTransform || "translate(14px, -10px) scale(1)",
  shrinkedFocusedTransform:
    props.shrinkedFocusedTransform || "translate(14px, -6px) scale(1)"
}))`
  color: black;
  font-size: ${props => props.fontSize};
  transform: ${props => props.transform};
  &.shrink {
    transform: ${props => props.shrinkedTransform};
  }
  &.shrink.Mui-focused {
    font-size: ${props => props.shrinkedFontSize};
    font-weight: 500;
    transform: ${props => props.shrinkedFocusedTransform};
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
  fontSize: props.fontSize || "1.2rem",
  border: props.border || "2px solid #686c78",
  borderRadius: props.borderRadius || "0px",
  borderHover: props.borderHover || "2px solid #686c78",
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
  color: black;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.fontSize};
  font-weight: 400;
  margin: ${props => props.margin};
  & .notched {
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius}
    &:hover: {
      border: ${props => props.borderHover};
    }
  }
  & .notched legend {
    width: ${props => props.topBorderGapValue()};
  }
  &.Mui-focused {
    background-color: white;
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
