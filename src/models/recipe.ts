import { ICategory } from './category';
import { IRecipeIngredient } from './recipeIngredient';

export interface IRecipe {
  id: string;
  createdBy: string;
  createdAt: Date;
  title: string;
  ukrainianTitle: string;
  instruction: string;
  ukrainianInstruction: string;
  imageLink: string;
  pdfLink: string;
  isPublic: boolean;
  likesCount: number;
  category: ICategory;
  ingredients: IRecipeIngredient[];
}
