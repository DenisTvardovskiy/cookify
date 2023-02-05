import React, { FC } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { useGlobalStyles } from '../../../theme/globalStyles';
import { Router } from '../Router';
import { Loader } from '../../shared/Loader';
import { RootLayout } from '../../../layouts';
import { persistor, store } from '../../../store';

interface IProps {}

export const Root: FC<IProps> = (props: IProps): JSX.Element => {
  useGlobalStyles();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RootLayout>
          <Loader>
            <Router />
          </Loader>
        </RootLayout>
      </PersistGate>
    </Provider>
  );
};
