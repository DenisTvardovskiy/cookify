import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Container, Footer, GridContainer, ImageContainer, Navigation } from '../../components';
import useStyles from './styles';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '../../hooks';
import { IIngredient, IRecipe } from '../../models';

interface IProps {}

export const Ingredient: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  const api = useApi();
  const [ingredient, setItem] = useState<IIngredient>();

  useEffect(() => {
    api.ingredients
      .one({ ingredientId: '002c09e5-f6dd-44d3-a9f1-33fd943d155b' })
      .then((ingredient) => setItem(ingredient));
  }, []);

  const date = new Date(ingredient?.createdAt);

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.ingredientWrap}>
          <div>
            <h2>{ingredient?.name}</h2>
            <p>Опубліковано {date.toDateString()}</p>
          </div>

          {ingredient?.imageLink && (
            <div className={classes.imageWrap}>
              <ImageContainer>
                <img src={ingredient?.imageLink} alt={ingredient?.name} />
              </ImageContainer>
            </div>
          )}
          <p>{ingredient?.ukrainianDescription}</p>
        </div>
      </Container>
      <Footer />
    </>
  );
};
