import React, { FC } from "react";
import { Container, Footer, Ingredient, Navigation, Recipe } from "../../components";
import { useAuthorization } from "../../hooks";

interface IProps {}

export const Profile: FC<IProps> = (props: IProps): JSX.Element => {
  const { user } = useAuthorization();
  return (
    <>
      <Navigation />
      <Container>
        <div>
          <img src={user.avatarImageLink} alt="user" />
          <div>
            <div>
              <p>Username</p>
              <p>{user.username}</p>
            </div>
            <div>
              <p>Email</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div>
          <h5>AvailableIngredients</h5>
          {user.availableIngredients.map((ingredient) => <Ingredient
            item={ingredient}
            measure={ingredient.ukrainianMeasure}
          />)}
        </div>
        <div>
          <h5>Favorite Recipes</h5>
          {user.favoriteRecipes.map((recipe) => <Recipe item={recipe} />)}
        </div>
        <div>
          <h5>Liked Recipes</h5>
          {user.likedRecipes.map((recipe) => <Recipe item={recipe} />)}
        </div>
      </Container>
      <Footer />
    </>
  );
};
