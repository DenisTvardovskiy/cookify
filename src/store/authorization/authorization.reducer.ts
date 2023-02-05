import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "./authorization.actions";

export interface IState {
  readonly accessToken: string;
  readonly tokenType: string;
}

export type TReducer = (state: IState, action: any) => IState;

const initialState: IState = {
  accessToken: "",
  tokenType: "",
};

export const authorizationReducer: TReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        accessToken: action.accessToken,
        tokenType: action.tokenType,
      };
    case RST_AUTHORIZATION:
      return { ...initialState };
    default:
      return state;
  }
};
