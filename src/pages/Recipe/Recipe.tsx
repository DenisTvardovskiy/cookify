import React, { FC, useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { Container, Footer, ImageContainer, Navigation, RecipesGrid } from '../../components';
import useStyles from './styles';
import { Link, useParams } from 'react-router-dom';
import { useApi, useAuthorization } from '../../hooks';
import { IRecipe } from '../../models';
import { useGlobalElements } from '../../theme/globalElements';
import { IRecipeIngredient } from '../../models/recipeIngredient';
import { useDispatch } from 'react-redux';
import { useStore } from '../../hooks/useStore';
import { SET_AUTHORIZATION } from '../../store/authorization/authorization.actions';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Button } from '@mui/material';

interface IProps {}

export const Recipe: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const globalElements = useGlobalElements();
  const { user } = useAuthorization();
  let { id } = useParams();

  const api = useApi();
  const [recipe, setItem] = useState<IRecipe>();
  const [similarRecipes, setSimilarRecipes] = useState<IRecipe[]>([]);

  const dispatch = useDispatch();
  const { jsonWebToken, refreshToken } = useStore((store) => store.authorization);

  const date = new Date(recipe?.createdAt);

  useEffect(() => {
    api.recipes.one({ recipeId: id, loader: 'Loading recipe...' }).then((recipe) => {
      setItem(recipe);
      api.recipes
        .random({
          params: { IsPublicEquals: true, PageSize: 4, CategoryIdEquals: recipe.category.id },
          loader: 'Завантаження рецептів...',
        })
        .then((data) => {
          setSimilarRecipes(data.items);
        });
    });
  }, [id]);

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

  const userHasIngredient = (item: IRecipeIngredient): Boolean => {
    return !!user.availableIngredients.filter(
      (userIngredient) => userIngredient.id === item.ingredientId,
    ).length;
  };

  return (
    !!recipe && (
      <>
        <Navigation />
        <Container>
          <div className={classes.recipeWrap}>
            <div>
              <h2>{recipe?.ukrainianTitle}</h2>
              <p>Опубліковано {date.toDateString()}</p>
            </div>
            <p>Категорія: {recipe?.category?.ukrainianName}</p>
            <div className={classes.actions}>
              {user && (
                <Button variant='outlined'>
                  {user.likedRecipes.filter((item) => item.id === recipe.id).length > 0 ? (
                    <FavoriteIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        handleUnLike(recipe.id);
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={(event: any) => {
                        event.stopPropagation();
                        event.preventDefault();
                        handleLike(recipe.id);
                      }}
                    />
                  )}
                  <p>{recipe.likesCount}</p>
                </Button>
              )}

              {user && (
                <Button variant='outlined'>
                  {user.favoriteRecipes.filter((item) => item.id === recipe.id).length > 0 ? (
                    <StarIcon
                      onClick={(event: any) => {
                        event.stopPropagation();
                        event.preventDefault();
                        handleUnFavorite(recipe.id);
                      }}
                    />
                  ) : (
                    <StarOutlineIcon
                      onClick={(event: any) => {
                        event.stopPropagation();
                        event.preventDefault();
                        handleFavorite(recipe.id);
                      }}
                    />
                  )}
                </Button>
              )}
              {recipe.pdfLink && (
                <Link
                  className={globalElements.primaryButton}
                  target='_blank'
                  to={recipe?.pdfLink || ''}
                >
                  <CloudDownloadIcon className={classes?.like} /> Завантажити
                </Link>
              )}
            </div>
            {recipe?.imageLink && (
              <div className={classes.imageWrap}>
                <ImageContainer>
                  <img src={recipe?.imageLink} alt={recipe?.title} />
                </ImageContainer>
              </div>
            )}
            <div className={classes.mainInfo}>
              <h5>Інгредієнти</h5>
              <div className={classes?.ingredientsList}>
                {recipe?.ingredients.map((item) => (
                  <div key={item?.ingredientId}>
                    <Link
                      className={classes?.ingredientsLink}
                      to={`/ingredient/${item?.ingredientId}`}
                    >
                      <img src={item.imageLink} alt={item.ukrainianName} />
                      <p>{!userHasIngredient(item) && <strong>(Відсутній)</strong>}</p>
                      <p>{item?.ukrainianName}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.mainInfo}>
              <h5>Приготування</h5>
              <p className={classes.steps}>{recipe?.ukrainianInstruction}</p>
            </div>
          </div>
        </Container>
        {similarRecipes.length > 0 && (
          <Container>
            <h2>Схожі Рецепти</h2>

            <RecipesGrid items={similarRecipes} noActions/>
          </Container>
        )}
        <Footer />
      </>
    )
  );
};
