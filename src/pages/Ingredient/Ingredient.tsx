import React, { FC, useEffect, useState } from "react";

import { Container, Footer, ImageContainer, Navigation, Recipe } from "../../components";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { IIngredient, IRecipe } from "../../models";

interface IProps {}

export const Ingredient: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();
  const { id } = useParams();
  const api = useApi();
  const [ ingredient, setItem ] = useState<IIngredient>();
  const [ recipes, setRecipes ] = useState<IRecipe[]>([]);
  const [ params, setParams ] = useState({
    NameContains: null,
    NameEquals: null,
    UkrainianNameContains: null,
    IsPublicEquals: true,
    IngredientsIdsIntersects: [],
    UkrainianNameEquals: null,
    Pagination: {
      Page: 1,
      PageSize: 12,
      Offset: 0,
    },
  });

  useEffect(() => {
    api.ingredients
      .one({ ingredientId: id, loader: "Loading ingredient..." })
      .then((ingredient) => {
        api.recipes.paginatedList({
          params: { ...params, IngredientsIdsIntersects: [ ingredient.id ] },
          loader: "Loading recipes...",
        })
          .then((data) => setRecipes(data.items));
        setItem(ingredient);
      });
  }, []);

  const date = new Date(ingredient?.createdAt);

  return (
    <>
      <Navigation />
      <Container>
        <div className={classes.ingredientWrap}>
          <div>
            <h2>{ingredient?.ukrainianName}</h2>
            <p>Опубліковано {date.toDateString()}</p>
          </div>

          {ingredient?.imageLink && (
            <div className={classes.imageWrap}>
              <ImageContainer>
                <img src={ingredient?.imageLink} alt={ingredient?.ukrainianName} />
              </ImageContainer>
            </div>
          )}
          <p>{ingredient?.ukrainianDescription}</p>
        </div>

        {recipes.length > 0 && <div>
          <h5>Рецепти з цим інгридієнтом</h5>
          {recipes.map((recipe) => <Recipe key={recipe.id} item={recipe} />)}
        </div>}
      </Container>
      <Footer />
    </>
  );
};
