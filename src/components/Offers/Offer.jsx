import React from "react";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
  StyledGrid,
  StyledListItemText,
  textStyles,
  gridStyles
} from "./OffersStyles";

export default function Offer({
  key,
  job,
  jobTypes,
  countries,
  cities,
  experience,
  salary,
  fontSize
}) {
  const GridContainer = StyledGrid(gridStyles);
  const Text = StyledListItemText(textStyles);
  return (
    <>
      <GridContainer container>
        <Grid item xs={2}>
          <Text primary={job} />
        </Grid>
        <Grid item xs={2}>
          <Text primary={[...jobTypes]} />
        </Grid>
        <Grid item xs={2}>
          <Text primary={[...countries]} />
        </Grid>
        <Grid item xs={2}>
          <Text primary={[...cities]} />
        </Grid>
        <Grid item xs={2}>
          <Text primary={experience} />
        </Grid>
        <Grid item xs={2}>
          <Text primary={`${salary[0]} - ${salary[1]}`} />
        </Grid>
      </GridContainer>
      <Divider component="li" />
    </>
  );
}
