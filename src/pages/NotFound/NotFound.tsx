import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ServerResponseLayout } from '../../layouts';
import { Logo } from '../../components';

import { useGlobalElements } from '../../theme/globalElements';

interface IProps {}

export const NotFound: FC<IProps> = (props: IProps): JSX.Element => {
  const globalElements = useGlobalElements();

  return (
    <ServerResponseLayout>
      <Logo vertical />
      <h2>404 Not Found Page</h2>
      <Link to='/' className={globalElements.primaryButton}>
        Son, come back home
      </Link>
    </ServerResponseLayout>
  );
};
