import React, { FC, useState } from 'react';
import { Container, Footer, ImageContainer, Navigation, RecipesGrid } from '../../components';
import { useApi, useAuthorization } from '../../hooks';
import { IngredientsGrid } from '../../components/common/IngredientsGrid';
import useStyles from './styles';

interface IProps {}

export const Profile: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const { user } = useAuthorization();

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.avatar}>
          <ImageContainer>
            <img src={user.avatarImageLink} alt='user' />
          </ImageContainer>
        </div>

        <div>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
        <h5>Доступні інгредієнти</h5>
        <IngredientsGrid items={user.availableIngredients} />

        <h5>Улюблені рецепти</h5>
        <RecipesGrid items={user.favoriteRecipes} noActions />

        <h5>Вам подобаються рецепти:</h5>
        <RecipesGrid items={user.likedRecipes} noActions />
      </Container>
      <Footer />
    </>
  );
};
