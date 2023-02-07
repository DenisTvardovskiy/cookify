import { IIngredient } from "./ingerident";
import { IRecipe } from "./recipe";

export interface IUser {
  id: string;
  createdAt: Date;
  email: string;
  username: string;
  avatarImageLink: string;
  favoriteRecipes: IRecipe[];
  likedRecipes: IRecipe[];
  availableIngredients: IIngredient[];
}