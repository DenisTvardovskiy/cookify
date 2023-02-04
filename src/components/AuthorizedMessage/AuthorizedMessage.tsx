import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useGlobalElements } from '../../theme/globalElements';
import { Logo } from '../Logo';
import { ServerResponseLayout } from '../../layouts';

interface IProps {}

export const AuthorizedMessage: FC<IProps> = (props: IProps): JSX.Element => {
  const globalElements = useGlobalElements();

  return (
    <ServerResponseLayout>
      <Logo vertical />
      <h2>You are authorized</h2>
      <Link to='/' className={globalElements.primaryButton}>
        Son, go home
      </Link>
    </ServerResponseLayout>
  );
};
