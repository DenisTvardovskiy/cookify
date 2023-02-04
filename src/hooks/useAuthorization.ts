import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "../store/authorization/authorization.actions";
import * as jose from "jose";
import { useLoader } from "./useLoader";

type TUseAuthorization = () => {
  isAuthorized: boolean;
  jsonWebToken: string;
  refreshToken: string;
  setAuthorization: (token: string, type?: string) => void;
  resetAuthorization: () => void;
};

export const useAuthorization: TUseAuthorization = () => {
  const loader = useLoader();
  const dispatch = useDispatch();
  const { jsonWebToken, refreshToken } = useStore((store) => store.authorization);
  const isValid = (): boolean => {
    if (!jsonWebToken) {
      return false;
    }

    const payload = jose.decodeJwt(jsonWebToken);
    const now = Math.round(Date.now() / 1000);

    return (!!payload && !!payload.exp && (payload.exp - now > 0));
  };

  const setAuthorization = (token: string, refresh: string): void => {
    dispatch({ type: SET_AUTHORIZATION, jsonWebToken: token, refreshToken: refresh });
  };

  const resetAuthorization = (): void => {
    console.log('dddd')
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
    refreshToken,
    setAuthorization,
    resetAuthorization,
  };
};
