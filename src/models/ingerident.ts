export interface IIngredient {
  id: string;
  ingredientId?: string;
  createdBy: string;
  createdAt: Date;
  name: string;
  ukrainianName: string;
  description: string;
  ukrainianDescription: string;
  ukrainianMeasure?: string;
  imageLink: string;
}