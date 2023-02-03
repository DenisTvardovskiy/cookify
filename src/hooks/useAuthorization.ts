import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "../store/authorization/authorization.actions";
import * as jose from "jose";
import { useLoader } from "./useLoader";

type TUseAuthorization = () => {
  isAuthorized: boolean;
  accessToken: string;
  tokenType: string;
  setAuthorization: (token: string, type?: string) => void;
  resetAuthorization: () => void;
};

export const useAuthorization: TUseAuthorization = () => {
  const loader = useLoader();
  const dispatch = useDispatch();
  const { accessToken, tokenType } = useStore((store) => store.authorization);

  const isValid = (): boolean => {
    if (!accessToken) {
      return false;
    }

    const payload = jose.decodeJwt(accessToken);
    const now = Math.round(Date.now() / 1000);

    return (!!payload && !!payload.exp && (payload.exp - now > 0));
  };

  const setAuthorization = (token: string, type: string = "Bearer"): void => {
    dispatch({ type: SET_AUTHORIZATION, accessToken: token, tokenType: type });
  };

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
    accessToken,
    tokenType,
    setAuthorization,
    resetAuthorization,
  };
};
