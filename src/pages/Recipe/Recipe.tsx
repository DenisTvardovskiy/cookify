import React, { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { Container, Footer, GridContainer, ImageContainer, Navigation, Recipe as RecipeItem } from "../../components";
import useStyles from "./styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { IRecipe } from "../../models";

interface IProps {}

export const Recipe: FC<IProps> = (props: IProps): JSX.Element => {
  const classes = useStyles();

  let { id } = useParams();
  const navigate = useNavigate();

  const api = useApi();
  const [ recipe, setItem ] = useState<IRecipe>();
  const [ similarRecipes, setSimilarRecipes ] = useState<IRecipe[]>(
    []);

  useEffect(() => {
    api.recipes
      .one({ recipeId: id, loader: "Loading recipe..." })
      .then((recipe) => {
        setItem(recipe);
        api.recipes.random({
          params: { PageSize: 4, CategoryIdEquals: recipe.category.id },
          loader: "Loading recipes...",
        })
          .then((data) => {
            console.log(data.items);
            setSimilarRecipes(data.items);
          });
      });

  }, [ id ]);

  const userLiked = false;

  const date = new Date(recipe?.createdAt);

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
            <div>
              <Button variant="outlined" onClick={() => console.log("LIKE!")}>
                {userLiked ? <FavoriteIcon className={classes?.like} /> : <FavoriteBorderIcon />}{" "}
                {recipe?.likesCount}
              </Button>
              {recipe.pdfLink && <Link target="_blank" to={recipe?.pdfLink || ""}>
                <CloudDownloadIcon className={classes?.like} />{" "}
                Завантажити
              </Link>}
            </div>
            {recipe?.imageLink && (
              <div className={classes.imageWrap}>
                <ImageContainer>
                  <img src={recipe?.imageLink} alt={recipe?.title} />
                </ImageContainer>
              </div>
            )}
            <div className={classes.description}>
              <div>
                <h5>Інгредієнти</h5>
                <div className={classes?.ingredientsList}>
                  {recipe?.ingredients.map((item) => (
                    <div>
                      <Link
                        className={classes?.ingredientsLink}
                        to={`/ingredient/${item?.ingredientId}`}
                        key={item?.ingredientId}
                      >
                        <img src={item.imageLink} alt={item.ukrainianName} />
                        {item?.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={classes.steps}>{recipe?.ukrainianInstruction}</p>
              </div>
            </div>
          </div>
        </Container>
        {similarRecipes.length > 0 && <Container>
          <h2>Схожі Рецепти</h2>

          <GridContainer>
            {similarRecipes.map((item, index) => <RecipeItem item={item} key={index} />)}
          </GridContainer>
        </Container>}
        <Footer />
      </>
    )
  );
};
