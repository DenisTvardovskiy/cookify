import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "./authorization.actions";
import { IUser } from "../../models/user.";

export interface IState {
  readonly refreshToken: string;
  readonly jsonWebToken: string;
  readonly user: IUser;
}

export type TReducer = (state: IState, action: any) => IState;

const initialState: IState = {
  refreshToken: "",
  jsonWebToken: "",
  user: {
    id: "",
    createdAt: new Date(),
    email: "",
    username: "",
    avatarImageLink: "",
    favoriteRecipes: [],
    likedRecipes: [],
    availableIngredients: [],
  },
};

export const authorizationReducer: TReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        jsonWebToken: action.jsonWebToken,
        refreshToken: action.refreshToken,
        user: action.user
      };
    case RST_AUTHORIZATION:
      return { ...initialState };
    default:
      return state;
  }
};
