import React, { FC, useEffect, useState } from 'react';
import { Container, Footer, Navigation, GridContainer } from '../../components';
import useStyles from './styles';
import { Sort } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useApi } from '../../hooks';
import { IIngredient } from '../../models';

interface IProps {}

export const Ingredients: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const api = useApi();
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   api.ingredients.paginatedList({}).then(({ items }) => setItems(items));
  // }, []);

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.filterWrap}>
          <h2>Last ingredients</h2>
          <Button variant='outlined'>
            <Sort /> Filter
          </Button>
        </div>
      </Container>
      <GridContainer>
        {items.map((item) => (
          <p>test</p>
        ))}
      </GridContainer>
      <Footer />
    </>
  );
};
