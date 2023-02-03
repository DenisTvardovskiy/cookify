import React, { FC } from "react";
import { useAuthorization } from "../hooks";
import { SignIn } from "../pages";

type TWithCheckAuthorization = <T>(Component: FC<JSX.IntrinsicAttributes & T>) => FC<JSX.IntrinsicAttributes & T>;

export const withCheckAuthorization: TWithCheckAuthorization = (Page) => {
  return (props) => {
    const { isAuthorized } = useAuthorization();
    if (!isAuthorized) {
      return <SignIn/>;
    }

    return <Page {...props} />;
  };
};
