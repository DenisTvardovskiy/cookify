import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "./authorization.actions";

export interface IState {
  readonly refreshToken: string;
  readonly jsonWebToken: string;
}

export type TReducer = (state: IState, action: any) => IState;

const initialState: IState = {
  refreshToken: "",
  jsonWebToken: "",
};

export const authorizationReducer: TReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        jsonWebToken: action.jsonWebToken,
        refreshToken: action.refreshToken,
      };
    case RST_AUTHORIZATION:
      return { ...initialState };
    default:
      return state;
  }
};
