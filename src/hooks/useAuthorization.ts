import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "../store/authorization/authorization.actions";
import * as jose from "jose";
import { useLoader } from "./useLoader";
import { IUser } from "../models/user.";
import { useApi } from "./useApi";

type TUseAuthorization = () => {
  isAuthorized: boolean;
  jsonWebToken: string;
  refreshToken: string;
  user: IUser;
  setAuthorization: (token: string, user: IUser, type?: string) => void;
  resetAuthorization: () => void;
  // refreshUser: ()=> void;
};

export const useAuthorization: TUseAuthorization = () => {
  const loader = useLoader();
  const dispatch = useDispatch();
  // const api = useApi();
  const { jsonWebToken, refreshToken, user } = useStore((store) => store.authorization);
  const isValid = (): boolean => {
    if (!jsonWebToken) {
      return false;
    }

    const payload = jose.decodeJwt(jsonWebToken);
    const now = Math.round(Date.now() / 1000);

    return (!!payload && !!payload.exp && (payload.exp - now > 0));
  };

  const setAuthorization = (token: string, user: IUser, refresh: string): void => {
    dispatch({ type: SET_AUTHORIZATION, jsonWebToken: token, refreshToken: refresh, user });
  };

  // const refreshUser = () => {
  //   api.account.info.get({ jsonWebToken }).then((user) => {
  //     // dispatch({ type: SET_AUTHORIZATION, jsonWebToken, refreshToken, user });
  //   });
  // };

  const resetAuthorization = (): void => {
    const logout = loader.create("Processing logout...");

    logout.start();

    const ref = setTimeout(() => {
      dispatch({ type: RST_AUTHORIZATION });

      logout.stop();

      clearTimeout(ref);
    }, 1000);
  };

  return {
    isAuthorized: isValid(),
    jsonWebToken,
    user,
    refreshToken,
    setAuthorization,
    resetAuthorization,
    // refreshUser
  };
};
