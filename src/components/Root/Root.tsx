import React, { FC } from "react";
import { Router } from "../Router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../../store";
import { Loader } from "../Loader";

interface IProps {}

export const Root: FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Loader>
          <Router />
        </Loader>
      </PersistGate>
    </Provider>
  );
};