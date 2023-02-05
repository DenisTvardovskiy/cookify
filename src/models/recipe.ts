import { ICategory } from "./category";

export interface IRecipe {
  id: string;
  createdBy: string;
  createdAt: Date;
  title: string;
  ukrainianTitle: string;
  instruction: string;
  ukrainianInstruction: string;
  imageLink: string;
  likesCount: number;
  category: ICategory;
  ingredients: {
    ingredientId: string;
    name: string;
    ukrainianName: string;
    imageLink: string;
    measure: string;
    ukrainianMeasure: string;
  }[];
}