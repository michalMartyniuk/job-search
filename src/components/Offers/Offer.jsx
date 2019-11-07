import React from "react";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
  StyledGrid,
  StyledListItemText,
  textStyles,
  gridStyles
} from "./OffersStyles";

export default function Offer(props) {
  const GridContainer = StyledGrid(gridStyles);
  const Text = StyledListItemText(textStyles);

  return (
    <>
      <GridContainer container>
        {Object.entries(props).map(prop => {
          const [propKey, value] = prop;
          if (propKey === "fontSize") return null;
          return (
            <Grid item xs={2} key={propKey}>
              <Text primary={value} />
            </Grid>
          );
        })}
      </GridContainer>
      <Divider component="li" />
    </>
  );
}
