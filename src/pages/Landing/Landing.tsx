import React, { FC } from "react";
import { Container, Footer, Navigation, RecipesList } from "../../components";
import useStyles from "./styles";
import { Sort } from "@mui/icons-material";
import { Button } from "@mui/material";

interface IProps {}

export const Landing: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.filterWrap}>
          <h2>Last recipes</h2>
          <Button variant="outlined">
            <Sort /> Filter
          </Button>

        </div>
      </Container>
      <RecipesList />
      <Footer />
    </>
  );
};
