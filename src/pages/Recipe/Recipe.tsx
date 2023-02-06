import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import {
  Container,
  Footer,
  GridContainer,
  ImageContainer,
  Navigation,
  Recipe as RecipeItem,
} from '../../components';
import useStyles from './styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../hooks';
import { IRecipe } from '../../models';
import { useGlobalElements } from '../../theme/globalElements';

interface IProps {}

export const Recipe: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  let { id } = useParams();
  const navigate = useNavigate();

  const api = useApi();
  const [recipe, setItem] = useState<IRecipe>();
  const [similarRecipes, setSimilarRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    api.recipes.one({ recipeId: id, loader: 'Loading recipe...' }).then((recipe) => {
      setItem(recipe);
      api.recipes
        .random({
          params: { PageSize: 4, CategoryIdEquals: recipe.category.id },
          loader: 'Завантаження рецептів...',
        })
        .then((data) => {
          setSimilarRecipes(data.items);
        });
    });
  }, [id]);

  const userLiked = false;

  const date = new Date(recipe?.createdAt);

  const globalElements = useGlobalElements();

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
              <Button variant='outlined' onClick={() => console.log('LIKE!')}>
                {userLiked ? <FavoriteIcon className={classes?.like} /> : <FavoriteBorderIcon />}{' '}
                {recipe?.likesCount}
              </Button>
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
                      {item?.name}
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

            <GridContainer>
              {similarRecipes.map((item, index) => (
                <RecipeItem item={item} key={index} />
              ))}
            </GridContainer>
          </Container>
        )}
        <Footer />
      </>
    )
  );
};
