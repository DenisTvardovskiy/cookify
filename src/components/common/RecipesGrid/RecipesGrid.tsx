import React, { FC } from "react";
import useStyles from "./styles";
import { IRecipe } from "../../../models";
import { Recipe } from "../../shared/Recipe";
import { EmptyListMessage } from "../../shared/EmptyListMessage";
import { useApi, useAuthorization } from "../../../hooks";
import { SET_AUTHORIZATION } from "../../../store/authorization/authorization.actions";
import { useDispatch } from "react-redux";
import { useStore } from "../../../hooks/useStore";

interface IProps {
  items: IRecipe[];
  noActions?: boolean;
}

export const RecipesGrid: FC<IProps> = ({ items, noActions = false }: IProps): JSX.Element => {
  const classes = useStyles();
  const api = useApi();
  const { user } = useAuthorization();
  const dispatch = useDispatch();
  const { jsonWebToken, refreshToken } = useStore((store) => store.authorization);

  const refreshUser = () => {
    api.account.info.get({ jsonWebToken }).then((user) => {
      dispatch({ type: SET_AUTHORIZATION, jsonWebToken, refreshToken, user });
    });
  };

  const handleLike = (id: string) => {
    api.recipes.actions.like({ recipeId: id }).then(() => refreshUser());
  };
  const handleUnLike = (id: string) => {
    api.recipes.actions.unLike({ recipeId: id }).then(() => refreshUser());
  };
  const handleFavorite = (id: string) => {
    api.recipes.actions.favorite({ recipeId: id }).then(() => refreshUser());
  };
  const handleUnFavorite = (id: string) => {
    api.recipes.actions.unFavorite({ recipeId: id }).then(() => refreshUser());
  };

  return (
    <>
      {Boolean(items.length) ? (
        <div className={classes.gridContainer}>
          {items.map((item) => (
            <Recipe
              key={item.id}
              item={item}
              onLike={!noActions && handleLike}
              onFavorite={!noActions && handleFavorite}
              onUnFavorite={!noActions && handleUnFavorite}
              onUnLike={!noActions && handleUnLike}
              user={!noActions && user}
            />
          ))}
        </div>
      ) : (
        <EmptyListMessage />
      )}
    </>
  );
};
