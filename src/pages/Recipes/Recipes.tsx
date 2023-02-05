import React, { FC, useEffect, useState } from 'react';
import { Container, Footer, GridContainer, Navigation, Recipe } from '../../components';
import useStyles from './styles';
import { Sort } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useApi } from '../../hooks';
import { IRecipe } from '../../models';

interface IProps {}

export const Recipes: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const api = useApi();
  const [items, setItems] = useState<IRecipe[]>([]);

  useEffect(() => {
    api.recipes.paginatedList({}).then(({ items }) => setItems(items));
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.filterWrap}>
          <h2>Last recipes</h2>
          <Button variant='outlined'>
            <Sort /> Filter
          </Button>
        </div>
      </Container>
      <Container>
        <GridContainer>
          {items.map((item) => (
            <Recipe key={item.id} item={item} />
          ))}
        </GridContainer>
      </Container>
      <Footer />
    </>
  );
};
