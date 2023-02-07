import React, { FC } from 'react';
import { Container, Footer, Ingredient, Navigation, RecipesGrid } from '../../components';
import { useApi, useAuthorization } from '../../hooks';
import { SET_AUTHORIZATION } from '../../store/authorization/authorization.actions';
import { useStore } from '../../hooks/useStore';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { IngredientsGrid } from '../../components/common/IngredientsGrid';

interface IProps {}

export const Storage: FC<IProps> = (props): JSX.Element => {
  const { user } = useAuthorization();
  const api = useApi();
  const dispatch = useDispatch();
  const { jsonWebToken, refreshToken } = useStore((store) => store.authorization);
  const refreshUser = () => {
    api.account.info.get({ jsonWebToken, loader: 'Refreshing user info...' }).then((user) => {
      dispatch({ type: SET_AUTHORIZATION, jsonWebToken, refreshToken, user });
    });
  };

  const handleRemoveIngredient = (id: string) => {
    api.ingredients.remove({ ingredientId: id }).then(() => refreshUser());
  };

  return (
    <>
      <Navigation />
      <Container>
        <div>
          <h5>Доступні інгрідієнти</h5>
          <div>
            <span>Total: {user.availableIngredients.length}</span>
            <span role='button' onClick={() => refreshUser()}>
              <RefreshIcon /> Оновити
            </span>
          </div>
          <div>
            {user.availableIngredients.map((ingredient) => (
              <div>
                <Button onClick={() => handleRemoveIngredient(ingredient.ingredientId)}>
                  Видала
                </Button>
              </div>
            ))}
          </div>
          <IngredientsGrid items={user.availableIngredients} />
        </div>
      </Container>
      <Footer />
    </>
  );
};
