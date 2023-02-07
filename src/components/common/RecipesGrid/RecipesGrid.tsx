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
  noActions: boolean;
}

export const RecipesGrid: FC<IProps> = (props: IProps): JSX.Element => {
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
      {Boolean(props.items.length) ? (
        <div className={classes.gridContainer}>
          {props.items.map((item) => (
            <Recipe
              key={item.id}
              item={item}
              onLike={!props.noActions && handleLike}
              onFavorite={!props.noActions && handleFavorite}
              onUnFavorite={!props.noActions && handleUnFavorite}
              onUnLike={!props.noActions && handleUnLike}
              user={!props.noActions && user}
            />
          ))}
        </div>
      ) : (
        <EmptyListMessage />
      )}
    </>
  );
};
